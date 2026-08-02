---
title: "How I Orchestrate Autonomous Subagents in the Terminal using Hermes, SQLite Kanban, and LLM Fallback"
description: "Under the hood of the 4-layer architecture, launchd daemon dispatch, and git worktree isolation to execute software development tasks without human intervention."
date: "2026-08-02 04:55:00"
tags:
  - EN_US
  - DIY
  - hermes
  - local-llm
  - automation
  - architecture
---

If you've ever tried to let an AI agent run in the background to handle coding tasks in your repository, you probably hit three classic roadblocks: the agent locked your `git` branch, ran out of API quota halfway through, or lost context on where it left off.

In my last post, I shared [how I retired $200/month in Cloud LLM costs](/en/posts/m5-pro-48gb-hermes-local-llm-pipeline) by setting up a local pipeline on the M5 Pro with a model routing matrix. Today I want to take a step further and open up the engine room of **how my agent actually works autonomously**.

I'll show how [Hermes Agent](https://hermes-agent.nousresearch.com/docs) orchestrates background subagents using an [SQLite](https://www.sqlite.org/)-backed Kanban board, chained pipeline tasks, and [git worktree](https://git-scm.com/docs/git-worktree) so I never have to interrupt what I'm doing in the terminal.

## Dispatcher Architecture: How Hermes Operates in the Background

Unlike a conventional chat interface where you wait for the output on screen, an agentic system needs to operate asynchronously.

The core of the system is the **Hermes Gateway**, a [daemon](/en/notes/glossary#daemon) running as a [launchd](/en/notes/glossary#launchd) service on macOS. Every 60 seconds, it polls the Kanban database (`~/.hermes/kanban.db`) looking for tasks marked as `ready` with an assigned owner.

> **📋 Asynchronous Execution Flow:**
>
> | Stage | System Action |
> |---|---|
> | **1. Enqueueing** | Task is created using the pipeline pattern (`Debug` ➔ `Fix` ➔ `Test` ➔ `PR` ➔ `Merge`) |
> | **2. Dispatch** | Gateway detects the `ready` task and spawns an isolated subagent (`delegate_task`) |
> | **3. Isolation** | Subagent creates a `git worktree` in a temporary folder without touching the current branch |
> | **4. Execution & Fallback** | Subagent resolves the issue while switching models (Claude CLI, Gemini, Ollama, or Local) |
> | **5. Integration** | Runs test suite, pushes the branch, opens a PR, and completes the merge automatically |

## The 5-Stage Engineering Pattern

To prevent an AI from applying chaotic edits directly to the repository, every complex task across the blog or personal projects is strictly broken down into 5 chained sub-tasks:

```
1. Debug ──► 2. Fix in Worktree ──► 3. Test ──► 4. PR ──► 5. Merge & Notify
```

This sequence uses native dependencies on the Hermes Kanban board. The `2. Fix` task is only promoted to `ready` at the exact moment the `1. Debug` task finishes successfully.

To illustrate in practice, here is the command sequence to create a complete fix pipeline:

```sh
hermes kanban create "1. Debug issue" && \
hermes kanban create "2. Fix in worktree" && \
hermes kanban create "3. Test local build" && \
hermes kanban create "4. Push branch and open PR" && \
hermes kanban create "5. Merge PR and notify"
```

And to link the dependency chain so each step waits for the previous one:

```sh
hermes kanban link t_debug_id t_fix_id && \
hermes kanban link t_fix_id t_test_id && \
hermes kanban link t_test_id t_pr_id && \
hermes kanban link t_pr_id t_merge_id
```

## The Secret to Isolation: Preventing Collisions with `git worktree`

If you have 2 or 3 subagents working simultaneously in the same repository, allowing them all to edit the working directory at once is a recipe for `git` disaster.

The solution was adopting [git worktree](https://git-scm.com/docs/git-worktree). Instead of checking out branches in the main project folder, each subagent creates a clean, isolated working tree in a temporary directory:

To create a clean workspace without affecting your active working folder:

```sh
git worktree add /tmp/blog-fix-branch -b feat/fix-bug main
```

The subagent works, executes tests, and commits inside `/tmp/blog-fix-branch`. When the work finishes and the PR is submitted, the worktree is destroyed without leaving a trace in my current directory:

To clean up the temporary worktree directory when the work is complete:

```sh
git worktree remove --force /tmp/blog-fix-branch
```

## Dynamic LLM Routing During Execution

The key advantage of this architecture is that the subagent never stalls if an API endpoint fails. During execution, it leverages a **4-tier fallback matrix**:

1. **Claude Pro via CLI (`claude-task.sh`)**: Used for heavy software engineering and complex refactoring without spending API credits.
2. **Gemini 3.6 Flash/Pro via [OpenRouter](/en/notes/glossary#OpenRouter) [BYOK](/en/notes/glossary#BYOK)**: Used when tasks require ingesting entire repositories using the 1-million-token context window.
3. **Ollama Cloud (`kimi-k2.7-code` / `deepseek-v4-flash`)**: Used for recurring automations and secondary Kanban batch tasks.
4. **Local M5 Pro (`qwen3-coder-30b-local`)**: The final fallback running at 89 tokens/second on [llama.cpp](https://github.com/ggml-org/llama.cpp) accelerated by [Metal](/en/notes/glossary#Metal). If internet disconnects or cloud returns a 402 error, the subagent seamlessly fails over to the Mac locally.

## Practical Takeaways and Bottleneck Optimizations

Running this setup heavily in the background revealed key insights into subagent orchestration:

### 1. Declarative Fallback and Iteration Budget
Subagents can enter infinite retry loops when fixing cascading test failures. The optimal iteration limit (`max_turns`) should be kept around 30 to 60 steps. When a subagent hits this limit before completing, the supervisor saves the research and modified files into the temporary branch and promotes a support task rather than discarding the run.

### 2. Dependency Bootstrapping in Worktrees
When a subagent creates a worktree via `git worktree`, ignored files like `node_modules` or `.venv` are not copied over. To prevent build steps from immediately failing in the isolated tree, the `Fix` task must first symlink root dependencies or execute an installation step (e.g., `npm install` or `uv sync`).

### 3. Decomposition with Real Dependencies
Automatic task decomposition must only link strictly dependent sub-tasks. False dependencies block parallel dispatching in the gateway. The 5-stage model succeeds because it is strictly sequential with explicit checkpoints between `Debug` and `Fix`.

## Conclusion

Delegating terminal tasks to autonomous agents only works when you build firm guardrails for the AI.

By combining an **SQLite-backed relational Kanban board**, **code isolation via `git worktree`**, a **resilient fallback matrix**, and **worktree dependency bootstrapping**, I turned my agent into a true teammate that fixes bugs, runs test suites, and submits PRs in the background while I stay focused on other work.

> Don't know a term? Check the [Glossary](/en/notes/glossary).
