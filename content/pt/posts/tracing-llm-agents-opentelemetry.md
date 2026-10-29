---
title: "Rastreando agentes de LLM com OpenTelemetry: modelo de spans, isolamento por tenant e quanto isso custa"
description: "Um serviço de referência feito do zero que rastreia chamadas de workflow, agent, tool e LLM com OpenTelemetry, isola tenants com row-level security no Postgres e mede o custo do tracing."
date: "2026-10-29 21:00:00"
tags:
  - PT_BR
  - opentelemetry
  - observability
  - genai
  - postgres
  - fastapi
---

Uma requisição a um agente não é uma chamada só. Um workflow inicia um agent, o agent chama uma tool, a tool chama um modelo, e quando a conta ou a latência parecem erradas você quer saber qual desses passos causou isso, para qual cliente. Uma linha de log por requisição não responde. Um [trace](/pt/notes/glossary#Trace) responde.

Eu já fiz trabalho parecido profissionalmente, e queria uma versão pública que eu pudesse mostrar sem mostrar o código de ninguém. Então construí uma do zero: [`otel-genai-tenant-service`](https://github.com/Calebe94/otel-genai-tenant-service). É uma implementação de referência independente, não derivada do código de nenhum empregador. O modelo é um stub local determinístico, então nada ali chama API paga nem serviço de cloud.

Este post cobre o modelo de spans, como o tenant chega em todos os spans, como o Postgres mantém os tenants separados, como o custo vai parar no span e quanto o tracing me custou em latência. Toda medição do post vem do arquivo [`bench/RESULTS.md`](https://github.com/Calebe94/otel-genai-tenant-service/blob/main/bench/RESULTS.md) do repositório, medida em 2026-10-29.

## O modelo de spans

Uma requisição a `POST /v1/runs` gera um trace com 4 [spans](/pt/notes/glossary#Span), cada um filho do anterior:

```
invoke_workflow run
└── invoke_agent assistant
    └── execute_tool summarize
        └── chat stub-small
```

A tool é um sumarizador, então é ela que chama o modelo. Por isso a chamada ao modelo fica embaixo da tool e não ao lado. Um agent real costuma ter várias tools e várias chamadas de modelo por workflow; mantive a cadeia linear para que as relações de pai e filho sejam fáceis de afirmar em um teste.

Os nomes dos atributos não são strings que eu digitei. Vêm das constantes do pacote `opentelemetry-semantic-conventions`:

```python
from opentelemetry.semconv._incubating.attributes import gen_ai_attributes as gen_ai

_OP = gen_ai.GenAiOperationNameValues

with tracer.start_as_current_span(
    f"{_OP.CHAT.value} {model}",
    kind=SpanKind.CLIENT,
    attributes={
        gen_ai.GEN_AI_OPERATION_NAME: _OP.CHAT.value,
        gen_ai.GEN_AI_PROVIDER_NAME: PROVIDER,
        gen_ai.GEN_AI_REQUEST_MODEL: model,
    },
) as span:
    ...
    span.set_attribute(gen_ai.GEN_AI_USAGE_INPUT_TOKENS, result.input_tokens)
    span.set_attribute(gen_ai.GEN_AI_USAGE_OUTPUT_TOKENS, result.output_tokens)
```

O módulo se chama `_incubating`, que é o pacote avisando que essas [semantic conventions](/pt/notes/glossary#Semantic-conventions) ainda podem mudar entre versões. Importar as constantes faz um renome aparecer como erro de import no CI, em vez de um dashboard vazio em silêncio. O repositório fixa a versão do pacote no `uv.lock`.

Os testes usam `InMemorySpanExporter` e afirmam os quatro nomes de operação, a cadeia de pai e filho, o tenant em todos os spans e que as contagens de tokens no span do modelo são positivas.

## Colocando o tenant em todos os spans

Eu queria `tenant.id` nos 4 spans sem depender de cada ponto de chamada lembrar de setar. A requisição coloca o tenant no [baggage](/pt/notes/glossary#Baggage), e um span processor copia o valor para cada span quando ele começa:

```python
class TenantBaggageSpanProcessor(SpanProcessor):
    def on_start(self, span: Span, parent_context: Context | None = None) -> None:
        tenant_id = baggage.get_baggage(TENANT_ID, parent_context)
        if tenant_id is not None:
            span.set_attribute(TENANT_ID, str(tenant_id))
```

O baggage também atravessa fronteiras de serviço com o propagador padrão, então um serviço downstream pode ler o mesmo tenant. Dentro deste serviço, o que importa é o processor: um span novo adicionado no mês que vem recebe o tenant sem ninguém mexer. Um teste envia requisições de dois tenants e confere que cada trace carrega exatamente um tenant e que eles não vazam um para o outro.

## Isolando tenants no Postgres

O lado dos dados usa [row-level security](/pt/notes/glossary#Row-Level-Security) no Postgres 16. As duas tabelas de tenant têm RLS habilitado e forçado, com uma policy:

```sql
ALTER TABLE runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE runs FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON runs
    USING (tenant_id = current_setting('app.tenant_id', true))
    WITH CHECK (tenant_id = current_setting('app.tenant_id', true));
```

Toda consulta roda em uma transação que primeiro define `app.tenant_id` com `set_config(..., true)`. O `true` torna o valor local à transação, o que o deixa seguro atrás de um pool de conexões: o valor não vaza para a próxima requisição que pegar a conexão emprestada. As consultas de leitura deliberadamente não têm `WHERE tenant_id = ...`. Quem filtra é a policy, então um bug no meu código de consulta não consegue ampliar o resultado. Se a configuração estiver ausente, a policy compara com nulo e a consulta retorna zero linhas em vez de levantar erro. Ela falha fechada.

Existe uma armadilha, e é por causa dela que escrevi o teste do jeito que escrevi. Um superuser, ou qualquer role com `BYPASSRLS`, pula todas as policies. Se a aplicação e os testes conectam como o usuário `postgres` padrão, os testes de isolamento passam e não provam nada. Então a migration cria uma role `app_user` com `NOSUPERUSER NOBYPASSRLS`, o serviço conecta com essa role e os testes também. O arquivo de testes tem:

- uma asserção em `pg_roles` de que a role não é superuser nem `BYPASSRLS`
- uma asserção em `pg_class` de que o RLS está habilitado e forçado nas duas tabelas
- `test_cross_tenant_read_returns_zero_rows`, que grava runs como um tenant e lê como outro, usando o store e também SQL escrito à mão sem nenhuma cláusula `WHERE`
- um teste de escrita: inserir uma linha de outro tenant é rejeitado pela cláusula `WITH CHECK`
- um teste de controle mostrando que a mesma consulta como superuser enxerga as linhas de todos os tenants

Para conferir que os testes não são vazios, transformei o `app_user` em superuser manualmente e rodei de novo. Os testes de role, leitura, sem tenant e escrita falharam. Depois reverti e voltaram a passar. Um teste de isolamento que passa só vale alguma coisa se você já o viu falhar pelo motivo certo.

## Custo no span

Os preços são por mil tokens: uma tabela padrão no código e uma tabela de override por tenant no Postgres. O override vence, e outro tenant continua com o padrão. O `test_override_beats_default` roda contra o store em memória e contra o store Postgres de verdade.

O custo calculado é gravado junto com o run e colocado como atributo `app.cost.usd` no span do modelo, ao lado das contagens de tokens. Isso transforma "qual tenant gastou quanto, em qual modelo" em uma consulta sobre spans, em vez de um job de relatório separado. As contagens de tokens vêm do stub (um token por palavra) e os preços são inventados para os modelos do stub, então os valores são ilustrativos. O que importa é o mecanismo, não os valores. `tenant.id` e `app.cost.usd` são nomes de atributo da própria aplicação; nenhuma convenção os define.

## Quanto o tracing custa

O `bench/bench.py` envia 1000 requisições sequenciais por célula depois de 100 requisições de aquecimento, com tracing desligado e ligado, em 3 rodadas. A ordem de ligado e desligado alterna a cada rodada. Roda uma vez contra Postgres (como `app_user`, com RLS ativo) e uma vez contra um store em memória. Com o tracing ligado, os spans vão por [OTLP](/pt/notes/glossary#OTLP) para um [Collector](/pt/notes/glossary#Collector) do OpenTelemetry e depois para o Jaeger. Com o tracing desligado, a aplicação usa um tracer no-op no mesmo caminho de código.

A máquina é um Apple M5 Pro (Mac17,8). Cliente e servidor dividem a máquina, e o Postgres roda em um container dentro de uma VM do Colima.

Store em memória, rodada 1:

| Tracing | p50 (ms) | p95 (ms) |
|---|---|---|
| desligado | 0.34 | 0.37 |
| ligado | 0.39 | 0.45 |

Latência adicionada pelo tracing, mesma rodada, por store:

| Store | p50 adicionado (ms) | p95 adicionado (ms) |
|---|---|---|
| Em memória, entre as rodadas | 0.05 a 0.07 | 0.08 a 0.19 |
| Postgres, entre as rodadas | 0.07 a 0.81 | -0.09 a 1.12 |

Leia a linha do Postgres com cuidado. As rodadas 2 e 3 adicionaram 0.09 e 0.07 ms no p50. A rodada 1 adicionou 0.81 ms, e eu não isolei o motivo. As 3 rodadas estão todas no arquivo e eu não descartei o outlier. Um número negativo no intervalo do p95 significa que, em uma rodada, a execução com tracing ligado foi mais rápida que a com tracing desligado, o que mostra que o ruído entre execuções é do mesmo tamanho do efeito que eu tento medir.

Também conferi que as execuções com tracing ligado entregaram mesmo os seus spans, em vez de presumir. Depois de cada célula com tracing ligado contei os traces no Jaeger: 1100 de 1100 em todas as células, 1000 requisições do benchmark mais 100 de aquecimento.

O que esses números não dizem importa mais do que o que eles dizem:

- O modelo é um stub que responde quase instantaneamente, então o benchmark mede a maquinaria de spans contra quase nenhum trabalho. Uma chamada real a um modelo leva muito mais tempo do que o tempo adicionado, então o mesmo overhead absoluto seria uma fração bem menor de uma requisição real. Não medi essa proporção e não cito nenhuma.
- É um laptop, 3 rodadas, uma execução por célula, sem intervalos de confiança.
- Esses números descrevem esta implementação de referência. Não dizem nada sobre nenhum outro sistema.

Mais uma observação honesta. Ao checar se havia spans perdidos, primeiro contei os spans lendo os logs do container do Collector, obtive um número menor que o esperado e suspeitei que o exporter estava descartando dados. As contagens do Jaeger depois mostraram que não havia perda, então quem estava errado era o meu parsing de log. Eu também tinha adicionado um flush do batch span processor no shutdown, para os últimos spans de um processo serem exportados. Não consigo mostrar que isso era necessário, porque minha primeira medição estava errada, mas é o comportamento certo para um serviço que agrupa spans em lote.

## O que isto não é

O README do repositório tem uma seção "What this is not", e ela cabe aqui também:

- O header `X-Tenant-ID` é aceito como vem. Um serviço de verdade tiraria o tenant da identidade autenticada.
- Toda requisição é rastreada. Em produção você usaria [sampling](/pt/notes/glossary#Sampling) no SDK ou no Collector; nenhum dos dois está configurado.
- Prompts e respostas não são gravados nos spans, porque payloads de GenAI costumam conter dados de usuário e gravá-los deveria ser uma decisão por tenant.
- O row-level security mantém um único schema e falha fechado, mas não isola recursos. Um tenant barulhento ainda divide o pool, o disco e os locks. Schema por tenant isola mais, ao custo de mais migrations e de uma gestão de conexões mais complicada.

## Rodando

```sh
docker compose up -d --build
curl -s -X POST localhost:8000/v1/runs -H 'X-Tenant-ID: acme' \
  -H 'Content-Type: application/json' -d '{"input":"hello"}'
```

Depois abra a UI do Jaeger em `localhost:16686` e procure o serviço `otel-genai-tenant-service`. O código, os testes, o script de benchmark e o `bench/RESULTS.md` estão [no repositório](https://github.com/Calebe94/otel-genai-tenant-service).

> Não sabe algum termo? Consulte o [Glossário](/pt/notes/glossary).
