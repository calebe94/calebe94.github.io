---
title: "Como orquestro subagentes autônomos no terminal com Hermes, Kanban SQLite e Fallback de LLMs"
description: "Por dentro da arquitetura de 4 camadas, despacho via daemon launchd e isolamento com git worktree para executar tarefas de desenvolvimento sem intervenção humana."
date: "2026-08-02 04:55:00"
tags:
  - PT_BR
  - DIY
  - hermes
  - local-llm
  - automation
  - architecture
---

Se você já tentou deixar um agente de IA rodando em segundo plano para resolver tarefas no seu código, provavelmente esbarrou em três problemas clássicos: o agente travou a sua branch do `git`, estourou a sua cota de API no meio do processo, ou perdeu o contexto de onde tinha parado.

No meu último post, contei [como aposentei R$200/mês de LLM Cloud](/pt/posts/m5-pro-48gb-hermes-local-llm-pipeline) montando um setup local com o M5 Pro e uma matriz de roteamento de modelos. Hoje quero dar um passo além e abrir as engrenagens de **como o meu agente realmente trabalha de forma autônoma**.

Vou mostrar como o [Hermes Agent](https://hermes-agent.nousresearch.com/docs) orquestra subagentes em segundo plano utilizando um quadro Kanban baseado em [SQLite](https://www.sqlite.org/), tarefas encadeadas em pipeline e [git worktree](https://git-scm.com/docs/git-worktree) para nunca mais ter que parar o que estou fazendo no terminal.

## A Arquitetura do Despachante: Como o Hermes Trabalha em Segundo Plano

Diferente de um chat convencional onde você espera a resposta na tela, um agente agentico precisa operar de maneira assíncrona.

O coração do sistema é o **Hermes Gateway**, um [daemon](/pt/notes/glossary#daemon) que roda como um serviço do [launchd](/pt/notes/glossary#launchd) no macOS. A cada 60 segundos, ele faz um *polling* no banco de dados do Kanban (`~/.hermes/kanban.db`) em busca de tarefas que estejam no estado `ready` e com um responsável designado.

> **📋 Fluxo de Execução Assíncrona:**
>
> | Etapa | Ação realizada pelo sistema |
> |---|---|
> | **1. Enfileiramento** | Tarefa é criada com o padrão de pipeline (`Debug` ➔ `Fix` ➔ `Test` ➔ `PR` ➔ `Merge`) |
> | **2. Despacho** | Gateway detecta a task em `ready` e dispara um subagente isolado (`delegate_task`) |
> | **3. Isolamento** | Subagente cria uma `git worktree` em um diretório temporário para não tocar na branch atual |
> | **4. Execução & Fallback** | O subagente resolve o problema alternando entre modelos (Claude CLI, Gemini, Ollama ou Local) |
> | **5. Integração** | Executa testes, faz o push da branch, abre a PR e realiza o merge automaticamente |

## O Padrão de Engenharia em 5 Etapas

Para garantir que uma IA não saia alterando código de forma caótica no repositório, toda tarefa complexa no blog ou em projetos pessoais é decomposta rigorosamente em 5 sub-tarefas encadeadas:

```
1. Debug ──► 2. Fix em Worktree ──► 3. Test ──► 4. PR ──► 5. Merge e Notificação
```

Esse encadeamento é feito via dependências nativas no Kanban do Hermes. A tarefa `2. Fix` só é promovida para `ready` no momento exato em que a tarefa `1. Debug` é concluída com sucesso.

Para ilustrar na prática, este é o comando que uso para criar uma sequência completa de correção:

```sh
hermes kanban create "1. Debug do problema" && \
hermes kanban create "2. Fix em worktree" && \
hermes kanban create "3. Testar build local" && \
hermes kanban create "4. Enviar branch e abrir PR" && \
hermes kanban create "5. Merge da PR e notificação"
```

E para vincular a cadeia de dependências onde cada etapa aguarda a anterior:

```sh
hermes kanban link t_debug_id t_fix_id && \
hermes kanban link t_fix_id t_test_id && \
hermes kanban link t_test_id t_pr_id && \
hermes kanban link t_pr_id t_merge_id
```

## O Segredo do Isolamento: Evitando Colisões com `git worktree`

Se você tem 2 ou 3 subagentes trabalhando simultaneamente no mesmo repositório, deixar todos eles editando o mesmo diretório de trabalho é uma receita certa para desastre no `git`.

A solução para isso foi adotar o [git worktree](https://git-scm.com/docs/git-worktree). Em vez de fazer checkout de branches na pasta principal do projeto, cada subagente cria uma árvore de trabalho totalmente isolada em uma pasta temporária:

Para criar um ambiente de trabalho limpo e isolado sem afetar a pasta principal:

```sh
git worktree add /tmp/blog-fix-branch -b feat/fix-bug main
```

O subagente trabalha, roda os testes e faz o commit dentro de `/tmp/blog-fix-branch`. Quando o trabalho termina e a PR é enviada, o worktree é destruído sem deixar rastro no meu diretório atual:

Para remover a pasta temporária do worktree após o término do trabalho:

```sh
git worktree remove --force /tmp/blog-fix-branch
```

## Roteamento Dinâmico de LLMs durante a Execução

A grande vantagem dessa arquitetura é que o subagente não fica travado se uma API falhar. Durante a execução da tarefa, ele utiliza uma **cadeia de contingência de 4 níveis**:

1. **Claude Pro via CLI (`claude-task.sh`)**: Usado para engenharia de software pesada e refatorações complexas sem gastar créditos de API.
2. **Gemini 3.6 Flash/Pro via [OpenRouter](/pt/notes/glossary#OpenRouter) [BYOK](/pt/notes/glossary#BYOK)**: Usado quando a tarefa exige ler repositórios inteiros utilizando a janela de contexto de 1 milhão de tokens.
3. **Ollama Cloud (`kimi-k2.7-code` / `deepseek-v4-flash`)**: Usado para automações recorrentes e tarefas secundárias do Kanban em lote.
4. **Local M5 Pro (`qwen3-coder-30b-local`)**: O fallback final rodando a 89 tokens/segundo no [llama.cpp](https://github.com/ggml-org/llama.cpp) com aceleração por [Metal](/pt/notes/glossary#Metal). Se a internet cair ou o cloud retornar erro 402, o subagente migra para o Mac local instantaneamente.

## Aprendizados Práticos e Otimizações de Gargalos

Ao colocar esse fluxo em produção intensa em segundo plano, nem tudo funcionou de forma mágica no primeiro dia. Mapeei três aprendizados fundamentais para evitar gargalos na execução autônoma de tarefas longas:

### 1. Fallback Declarativo e Budget de Iterações
Subagentes podem entrar em loops infinitos ao tentar corrigir testes que quebraram em cadeia. O limite ideal de iterações (`max_turns`) deve ser mantido em torno de 30 a 60 passos. Quando um subagente estoura esse limite sem concluir o trabalho, o supervisor deve intervir salvando a pesquisa e os arquivos alterados na branch temporária e promovendo uma tarefa de apoio em vez de simplesmente descartar a execução.

### 2. Bootstrap de Dependências no Worktree
Quando um subagente cria uma árvore com `git worktree`, a nova pasta não contém arquivos ignorados pelo `.gitignore` (como `node_modules` ou ambientes virtuais `.venv`). Para evitar que os comandos de build falhem imediatamente no ambiente isolado, a primeira ação da tarefa de `Fix` precisa ser a criação de links simbólicos para as dependências da raiz ou a execução do comando de instalação (ex: `npm install` ou `uv sync`).

### 3. Decomposição com Dependências Reais
O enfileiramento automático de tarefas deve vincular apenas sub-tarefas estritamente dependentes. Dependências falsas travam o paralelismo dos subagentes no gateway. O modelo de 5 etapas funciona justamente por ser estritamente sequencial e ter checkpoints verificáveis entre o `Debug` e o `Fix`.

## Considerações Finais

Delegar tarefas para agentes autônomos no terminal só funciona de verdade quando você constrói trilhos claros para a IA rodar.

Com a combinação de um **quadro Kanban relacional no SQLite**, **isolamento de código com `git worktree`**, a **matriz de fallback resiliente** e os **cuidados de dependências e worktree**, consegui transformar o meu agente em um verdadeiro colega de equipe que resolve bugs, roda suítes de testes e abre PRs em segundo plano enquanto eu continuo focado em outras atividades.

> Não sabe algum termo? Consulte o [Glossário](/pt/notes/glossary).
