---
title: 'Diagnóstico: gargalos e oportunidades no fluxo de subagentes'
description: Mapeamento dos gargalos reais do fluxo de subagentes do Hermes Agent
  e oportunidades de melhoria.
date: '2026-08-02'
tags:
- PT_BR
- diagnostico
- hermes
- subagentes
- gargalo
- performance
- quota
- fallback
---
# Diagnóstico: gargalos e oportunidades no fluxo de subagentes

> Diagnóstico original gerado durante a task `t_b3b07a43`. Relacionado ao post `[[como-orquestro-subagentes-autonomos-no-terminal|Como orquestro subagentes autônomos no terminal]]` e à pesquisa `[[pesquisa-aprofundada-otimizacao-subagentes|Pesquisa Aprofundada - Otimização de Subagentes]]`.

---

## 1. Contexto analisado

- **Post de referência:** `[[como-orquestro-subagentes-autonomos-no-terminal|Como orquestro subagentes autônomos no terminal]]`
- **Sistema:** Hermes Agent + Kanban SQLite + launchd gateway + git worktree + fallbacks LLM
- **Data do diagnóstico:** 2026-08-02

---

## 2. O que funciona conforme descrito no post

| Tema | Estado real | Evidência |
|------|-------------|-----------|
| Gateway launchd ativo | OK | `hermes gateway status` → PID ativo, plist em `~/Library/LaunchAgents/ai.hermes.gateway.plist` |
| Dispatcher embutido no gateway | OK | `kanban.dispatch_in_gateway: true`, log mostra `kanban dispatcher [default]: spawned=N ...` |
| Intervalo 60s de polling | OK | `dispatch_interval_seconds: 60` em `<HERMES_HOME>/config.yaml` |
| `git worktree` isolado | OK | Workspaces em `~/.hermes/kanban/workspaces/<task>`; tarefas de blog usam worktree do repo Quartz |
| Pipeline Debug→Fix→Test→PR→Merge | OK | Corrente `t_b3b07a43 → t_20d010be → t_b5df03b1 → t_c631dab6 → t_1d524aab` |

---

## 3. Gargalos mapeados

### 3.1 Fallback de LLM está incompleto (alto impacto)

**Problema:** O post promete 4 níveis de fallback (Claude CLI → Gemini/OpenRouter → Ollama Cloud → Local M5 Pro). Na prática:

- `fallback_providers: []` está vazio em `<HERMES_HOME>/config.yaml`.
- Todos os modelos auxiliares (`compression`, `triage_specifier`, `kanban_decomposer`, `approval`, `monitor`, `curator`, etc.) apontam **exclusivamente** para `ollama-cloud` com `deepseek-v4-flash:0731`.
- Provedor default `ollama-cloud` com `kimi-k2.7-code`.
- **Não há configuração de fallback automático** entre provedores; quando ollama-cloud cai, o agente trava.

**Evidência do log:**
```
API call failed (attempt 1/3): APIConnectionError — Provider: ollama-cloud Model: deepseek-v4-pro
... 3 retries ...
Final error: Connection error.
```

**Consequência:** Tarefas longas (cron, kanban auto-decompose, curator) falham em cascata se a Ollama Cloud falhar. Nenhuma rota para OpenRouter, Anthropic ou local M5 Pro está ativa.

**Oportunidade:** Popular `fallback_providers`, configurar modelos auxiliares com provider secundário (ex: `openrouter`/`gemini`) e garantir que o fallback local `qwen3-coder-30b` ou `minimax-m3` seja invocado quando cloud retornar 502/503/429/Connection error.

### 3.2 Iteration budget esgotado em tarefas de fix (alto impacto)

**Problema:** Tarefas `2. Fix` em `running` com `consecutive_failures=1` e erro `Iteration budget exhausted (60/60)`.

**Evidência:**
```
t_7f4407ec|running|1|Iteration budget exhausted (60/60)
t_9869748f|running|1|Iteration budget exhausted (60/60)
```

**Causa raiz provável:** Tarefa é muito ampla para 60 iterações (`agent.max_turns: 60`). O subagente gasta dezenas de turns em patching individual de links/rotas, validações incrementais e rebuilds.

**Oportunidade:**
1. Aumentar `agent.max_turns` ou usar `max_runtime_seconds` por task.
2. Dividir tarefas grandes de fix em sub-tarefas menores (ex: um patch por arquivo ou por idioma).
3. Usar `goal_mode: true` com `goal_max_turns` para tarefas abertas, ou adicionar `subagent_auto_approve: true` para reduzir interrupções.

### 3.3 Auto-decomposer pode gerar dependências falsas (médio impacto)

**Problema:** Skill `kanban-management` documenta que `hermes kanban link` e `decompose` podem fazer o auto-decomposer ligar um pai a tasks não relacionadas, bloqueando promotion.

**Consequência:** A pipeline atual depende de links manuais; se `auto_decompose: true`, pode haver interferência.

**Oportunidade:** Desligar `auto_decompose` durante criação manual de chains (`hermes gateway stop`, criar links, depois restart), ou rotina de `unlink`.

### 3.4 Board cresce sem limpeza de arquivados (baixo impacto)

**Problema:** `kanban.db` contém 51 tarefas arquivadas e 99 done. Não há mecanismo visível de compactação/retenção.

**Evidência:**
```
archived|51
done|99
running|3
todo|10
```

**Oportunidade:** Adicionar retenção configurável (`kanban.archive_retention_days`) e rotina de `hermes kanban gc`.

### 3.5 Falta visibilidade de progresso em tarefas longas (médio impacto)

**Problema:** Heartbeat do worker não carrega notas de progresso por padrão; dispatcher loga apenas `spawned=N reclaimed=0 crashed=0`.

**Oportunidade:** Workers de longa duração deveriam chamar `kanban_heartbeat(note=...)` a cada marco.

### 3.6 Worktree requer node_modules (médio impacto)

**Problema:** Em worktree de projeto Node, `node_modules` não é clonado automaticamente; builds falham se agente não rodar `npm install`.

**Oportunidade:** Criar hook/tarefa inicial de bootstrap no worktree (`npm ci` ou `uv sync`) para garantir ambiente compilável.

---

## 4. Conclusão e recomendações priorizadas

1. **Configurar fallback de LLM** — preencher `fallback_providers` e diversificar modelos auxiliares. Sem isso, a promessa do post de "fallback resiliente" não é real.
2. **Reduzir tamanho das tarefas de fix** ou eleger `max_turns`/`goal_mode` adequados para evitar esgotamento de iterações.
3. **Controlar auto-decompose** quando criar pipelines manualmente.
4. **Adicionar bootstrap de dependências** ao worktree e heartbeats com notas de progresso.
5. **Considerar GC de tarefas antigas** para manter o board enxuto.

---

## Referências

- [[como-orquestro-subagentes-autonomos-no-terminal|Como orquestro subagentes autônomos no terminal]]
- [[pesquisa-aprofundada-otimizacao-subagentes|Pesquisa Aprofundada - Otimização de Subagentes]]
- `<HERMES_HOME>/config.yaml`
- `<HERMES_HOME>/kanban.db`
- Skill: `kanban-management` (Hermes)
- Skill: `subagent-driven-development` (Hermes)

---
Gerado em: 2026-08-02
Task: t_b3b07a43
