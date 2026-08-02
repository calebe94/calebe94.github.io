---
title: Pesquisa Aprofundada — Otimização de Subagentes no Hermes Agent
description: Proposta de arquitetura de orquestração com controle de quota, concorrência
  real e observabilidade para o fluxo de subagentes do Hermes Agent.
date: '2026-08-02'
tags:
- PT_BR
- research
- hermes
- subagents
- orquestração
- quota
- concorrência
- performance
---
# Pesquisa Aprofundada — Otimização de Subagentes no Hermes Agent

> TL;DR: O fluxo de subagentes do Hermes Agent (gateway + dispatcher + kanban + git worktree) funciona para tarefas pequenas, mas empaca em trabalhos grandes. As causas principais são: (1) **fallback de LLM inexistente**, (2) **budget de iterações pequeno demais para fixes amplos**, (3) **auto-decompose criando dependências falsas**, (4) **falta de bootstrap de dependências no worktree**, (5) **progresso invisível em tarefas longas** e (6) **acúmulo de tarefas antigas no board**. Esta nota propõe uma arquitetura de orquestração com controle de quota, concorrência real e observabilidade.

---

## 1. Contexto e diagnóstico resumido

A análise partiu do post `[[como-orquestro-subagentes-autonomos-no-terminal|Como orquestro subagentes autônomos no terminal]]` e do estado real do sistema em 2026-08-02. O diagnóstico completo está em `[[diagnostico-gargalos-fluxo-subagentes|Diagnóstico - gargalos no fluxo de subagentes]]`.

### 1.1 Gargalos mapeados

| # | Gargalo | Impacto | Causa raiz |
|---|---------|---------|------------|
| 1 | Fallback de LLM não configurado | Alto | `fallback_providers: []` e todos os modelos auxiliares exclusivamente em `ollama-cloud` |
| 2 | Iteration budget esgotado (60/60) em tarefas de fix | Alto | Tarefas amplas para o limite de `max_turns` |
| 3 | Auto-decompose gera dependências falsas | Médio | Ligação automática entre pais e tasks não relacionadas |
| 4 | Board cresce sem GC | Baixo | 51 arquivadas + 99 done sem retenção configurável |
| 5 | Progresso invisível em tarefas longas | Médio | Heartbeat sem notas de marco |
| 6 | Worktree sem bootstrap de dependências | Médio | Worktree Node chega sem `node_modules` |

---

## 2. Arquitetura proposta

O objetivo é transformar o fluxo de "um agente faz tudo em 60 turns" para "muitos agentes pequenos executando em paralelo, supervisionados por um orquestrador enxuto".

### 2.1 Visão geral

```text
┌─────────────────────────────────────────────────────────────────┐
│                         Gateway Hermes                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │   Kanban DB  │  │  Dispatcher  │  │  Provider Manager    │  │
│  │  (SQLite)    │  │  (60s poll)  │  │  (fallback + quota)   │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘  │
└─────────┼─────────────────┼─────────────────────┼───────────────┘
          │                 │                     │
          │                 │                     │
┌─────────▼─────────────────▼─────────────────────▼───────────────┐
│                      Worktree / Workspace                        │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ Task fix-1  │ │ Task fix-2 │ │ Task test  │ │ Task doc   │ │
│  │ (subagent)  │ │ (subagent) │ │ (subagent) │ │ (subagent) │ │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Princípios

1. **Decomposição explícita**: o usuário ou o `kanban_decomposer` define a cadeia de tasks. Auto-decompose é desligado durante criação manual.
2. **Subagentes pequenos**: cada task cabe em no máximo 30–40 turns. Se não cabe, subdivide.
3. **Quota por provider**: limitar chamadas simultâneas e RPM por provedor para evitar 429/503.
4. **Fallback determinístico**: quando um provider falha, o sistema tenta o próximo em até 4 níveis.
5. **Observabilidade obrigatória**: heartbeats com notas de progresso a cada marco.
6. **Bootstrap automático**: worktree Node roda `npm ci`; Python roda `uv sync` antes de começar.

---

## 3. Otimizações de quota

### 3.1 Problema atual

Todos os modelos auxiliares (`compression`, `triage_specifier`, `kanban_decomposer`, `approval`, `monitor`, `curator`) estão no mesmo provider (`ollama-cloud`) e no mesmo modelo (`deepseek-v4-flash:0731`). Isso cria:

- **Hot spot**: um único ponto de falha.
- **Contenção**: todos disputam a mesma quota.
- **Sem rotação**: não há load balancing entre provedores.

### 3.2 Distribuição de carga por função

| Função auxiliar | Provider primário | Provider secundário | Motivo |
|-----------------|-------------------|---------------------|--------|
| `compression` | `ollama-cloud` | `openrouter` | Tarefa leve, pode rodar em modelo barato |
| `triage_specifier` | `gemini` | `ollama-cloud` | Precisa de contexto moderado, Gemini tem janela grande |
| `kanban_decomposer` | `gemini` | `openrouter` | Gera estrutura; precisa ser confiável e barato |
| `approval` | `openrouter` | `anthropic` | Requer qualidade de julgamento |
| `monitor` | `ollama-cloud` | `local` | Monitoramento contínuo, pode rodar local |
| `curator` | `anthropic` | `openrouter` | Revisão crítica de skills |

> **Nota**: nomes de provider são exemplos. O config.yaml real do usuário (2026-08-02) só possui `ollama-cloud` e `ollama-launch` configurados. Antes de ativar fallbacks para `openrouter`, `anthropic` ou `gemini`, é necessário adicionar esses providers com `api_key`/`base_url` válidos. O único fallback local disponível hoje é `ollama-launch` na máquina M5 Pro (`http://192.168.1.13:8131` não aparece no config; o modelo local é acessado via `ollama-launch` em `http://127.0.0.1:11434/v1` ou similar).

### 3.3 Configuração de `fallback_providers`

Exemplo de configuração no `config.yaml`:

```yaml
providers:
  ollama-cloud:
    base_url: https://ollama.com/v1
    api_key: ollama
  ollama-launch:
    api: http://127.0.0.1:11434/v1
  # ⚠️ openrouter, anthropic e gemini precisam ser adicionados no config.yaml real antes de serem usados como fallback
  openrouter:
    api_key: ${OPENROUTER_API_KEY}
  anthropic:
    api_key: ${ANTHROPIC_API_KEY}
  gemini:
    api_key: ${GEMINI_API_KEY}

llm:
  provider: ollama-cloud
  model: kimi-k2.7-code
  fallback_providers:
    - provider: openrouter
      model: google/gemini-2.5-flash-preview-05-20
    - provider: anthropic
      model: claude-sonnet-4-20250514
    - provider: ollama-launch
      model: qwen3-coder-30b
```

### 3.4 Quotas e concorrência

Proposta de adicionar um bloco de rate-limiting por provider:

```yaml
llm:
  quota:
    ollama-cloud:
      max_concurrent: 4
      rpm: 60
      tpm: 40000
    openrouter:
      max_concurrent: 6
      rpm: 120
      tpm: 80000
    anthropic:
      max_concurrent: 3
      rpm: 30
      tpm: 20000
    local:
      max_concurrent: 2
      rpm: 30
      tpm: 20000
```

O dispatcher respeita essas quotas antes de spawnar novos subagentes. Se a quota está cheia, a task fica na fila `ready` até liberar.

---

## 4. Melhorias de concorrência

### 4.1 Divisão de tarefas grandes

Uma tarefa de fix com 140 links quebrados não deve ser uma task só. Modelo de split:

| Tamanho do problema | Estratégia | Exemplo |
|---------------------|------------|---------|
| 1 arquivo pequeno | 1 task direta | `fix typo em about.md` |
| 1 arquivo médio | 1 task com `goal_mode: true` | `refatorar componente X` |
| Vários arquivos | 1 task por arquivo ou por idioma | `fix links pt`, `fix links en` |
| Muitos itens idênticos | batch job interno | `corrigir 140 wikilinks` pode ser 1 agente iterando, mas com `max_turns: 120` |

Para o caso específico dos 140 links quebrados, a estratégia recomendada é:

1. Task mãe: "Corrigir links internos quebrados".
2. Subtasks por idioma: `fix-pt`, `fix-en`, `fix-protocols`.
3. Cada subtask tem `max_turns: 40` e `max_runtime_seconds: 1800`.
4. Task mãe só conclui quando todas as filhas estão `done`.

### 4.2 Goal mode para tarefas abertas

Tarefas de pesquisa ou debugging se beneficiam de `goal_mode: true`:

```yaml
goal_mode: true
goal_max_turns: 40
max_runtime_seconds: 3600
```

Isso permite que um juiz auxiliar decida se a task terminou, em vez de esgotar o budget do agente principal.

### 4.3 Subagentes auto-aprovados

Para tarefas repetitivas e de baixo risco (formatação, links, testes automatizados), ativar:

```yaml
subagent_auto_approve: true
```

Isso economiza turns gastos em pedidos de aprovação.

### 4.4 Pipeline paralela padrão

Para novos fluxos de trabalho, adotar o pipeline:

```
1. Debug  → 2. Fix A / Fix B / Fix C  → 3. Test  → 4. PR  → 5. Merge
```

Onde `Fix A`, `Fix B` e `Fix C` são tasks irmãs executadas em paralelo.

---

## 5. Observabilidade e progresso

### 5.1 Heartbeat com notas

Toda task com expectativa de duração > 10 minutos deve emitir:

```python
kanban_heartbeat(note="Milestone: 50/140 links corrigidos (pt)")
```

Recomendação de frequência:

| Duração esperada | Frequência de heartbeat |
|------------------|-------------------------|
| < 10 min | Apenas no início/fim |
| 10–30 min | A cada 10 min ou marco |
| 30–60 min | A cada 15 min ou marco |
| > 60 min | A cada 20 min + marcos |

### 5.2 Métricas no dispatcher

Proposta de enriquecer o log do dispatcher com:

- `spawned=N` (já existe)
- `queued=N` (tasks `ready` esperando quota)
- `running_by_provider={ollama-cloud:3, openrouter:2}`
- `reclaimed=0 crashed=0` (já existe)
- `avg_task_duration=420s`

Isso permite detectar filas crescentes e gargalos de provider.

---

## 6. Bootstrap de worktree

### 6.1 Problema

Worktree adicionado via `git worktree add` não traz `node_modules`. Subagente chega em um projeto Node sem dependências instaladas e gasta turns descobrindo isso.

### 6.2 Solução

Adicionar hook de preparação automática no início de toda task que usa worktree:

| Tipo de projeto | Comando de bootstrap | Observação |
|-----------------|----------------------|------------|
| Node / npm | `npm ci` ou `npm install` | Necessário quando `node_modules` não está no worktree |
| Node / pnpm | `pnpm install --frozen-lockfile` | Preferir se lockfile existir |
| Python / uv | `uv sync` | O `uv` já está instalado no host |
| Python / pip | `python -m pip install -r requirements.txt` | Fallback se uv não disponível |
| Rust | `cargo build` | Compila dependências no workspace |

### 6.3 Onde colocar

A skill `kanban-management` ou uma skill dedicada (`worktree-bootstrap`) pode oferecer um helper que o dispatcher executa antes de delegar para o subagente. Alternativamente, o agente principal faz o bootstrap no primeiro turn.

---

## 7. GC e retenção do board

### 7.1 Política proposta

```yaml
kanban:
  archive_retention_days: 90
  done_retention_days: 30
  gc_interval_hours: 24
```

### 7.2 Efeito

- Tarefas `done` com mais de 30 dias são movidas para `archived`.
- Tarefas `archived` com mais de 90 dias são apagadas do SQLite (ou exportadas para CSV de backup).
- Reduz bloat do board e acelera queries do dispatcher.

---

## 8. Recomendações priorizadas

1. **Configurar fallback_providers e distribuir modelos auxiliares** — sem isso, o sistema não é resiliente.
2. **Aumentar max_turns / usar goal_mode para tarefas grandes** — evitar esgotamento.
3. **Subdividir fixes amplos** — um patch por arquivo/idioma, não um agente para tudo.
4. **Desligar auto-decompose durante criação manual de chains** — evitar dependências falsas.
5. **Adicionar bootstrap de dependências no worktree** — economizar turns e evitar erros de build.
6. **Mandar heartbeats com notas de progresso** — melhorar observabilidade.
7. **Adicionar política de retenção e GC** — manter board enxuto.

---

## 9. Próximos passos sugeridos

- Task filha `t_c631dab6`: salvar arquivos de pesquisa/documentação na branch isolada e abrir PR se aplicável.
- Task seguinte `t_1d524aab`: implementar configuração de fallback e quota no `config.yaml`.

---

## Referências

- [[como-orquestro-subagentes-autonomos-no-terminal|Como orquestro subagentes autônomos no terminal]]
- [[diagnostico-gargalos-fluxo-subagentes|Diagnóstico - gargalos no fluxo de subagentes]]
- `<HERMES_HOME>/config.yaml`
- `<HERMES_HOME>/kanban.db`
- Skill: `kanban-management` (Hermes)
- Skill: `subagent-driven-development` (Hermes)

---
Gerado em: 2026-08-02
Task: t_20d010be
