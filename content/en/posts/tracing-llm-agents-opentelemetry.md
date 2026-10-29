---
title: "Tracing LLM agents with OpenTelemetry: span model, tenant isolation, and what it costs"
description: "A clean-room reference service that traces workflow, agent, tool and LLM calls with OpenTelemetry, isolates tenants with Postgres row-level security, and measures what the tracing costs."
date: "2026-10-29 21:00:00"
tags:
  - EN_US
  - opentelemetry
  - observability
  - genai
  - postgres
  - fastapi
---

An agent request is not a single call. A workflow starts an agent, the agent calls a tool, the tool calls a model, and when the bill or the latency looks wrong you want to know which of those steps did it, for which customer. A flat log line per request cannot answer that. A [trace](/en/notes/glossary#Trace) can.

I did similar work professionally, and I wanted a public version that I could show without showing anyone's code. So I built one from scratch: [`otel-genai-tenant-service`](https://github.com/Calebe94/otel-genai-tenant-service). It is an independent reference implementation, not derived from any employer's code. The model is a deterministic local stub, so nothing in it calls a paid API or a cloud service.

This post covers the span model, how the tenant gets onto every span, how Postgres keeps tenants apart, how cost lands on the span, and what the tracing cost me in latency. Every measurement in the post comes from [`bench/RESULTS.md`](https://github.com/Calebe94/otel-genai-tenant-service/blob/main/bench/RESULTS.md) in the repo, measured on 2026-10-29.

## The span model

One request to `POST /v1/runs` produces one trace with 4 [spans](/en/notes/glossary#Span), each the child of the one before it:

```
invoke_workflow run
└── invoke_agent assistant
    └── execute_tool summarize
        └── chat stub-small
```

The tool is a summarizer, so it is the step that calls the model. That is why the model call sits under the tool and not beside it. A real agent usually has several tools and several model calls per workflow; I kept the chain linear so the parent and child relations are easy to assert in a test.

The attribute names are not strings I typed. They come from the constants in `opentelemetry-semantic-conventions`:

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

The module is named `_incubating`, which is the package telling you these [semantic conventions](/en/notes/glossary#Semantic-conventions) can still change between versions. Importing the constants means a rename shows up as an import error in CI instead of as a silently empty dashboard. The repo pins the package version in `uv.lock`.

The tests use `InMemorySpanExporter` and assert the four operation names, the parent and child chain, the tenant on every span, and that the token counts on the model span are positive.

## Putting the tenant on every span

I wanted `tenant.id` on all 4 spans without every call site remembering to set it. The request puts the tenant in [baggage](/en/notes/glossary#Baggage), and a span processor copies it onto each span as it starts:

```python
class TenantBaggageSpanProcessor(SpanProcessor):
    def on_start(self, span: Span, parent_context: Context | None = None) -> None:
        tenant_id = baggage.get_baggage(TENANT_ID, parent_context)
        if tenant_id is not None:
            span.set_attribute(TENANT_ID, str(tenant_id))
```

Baggage also travels across service boundaries with the standard propagator, so a downstream service can read the same tenant. Inside this single service the processor is what matters: a new span added next month gets the tenant without anyone touching it. A test sends requests for two tenants and checks that every trace carries exactly one tenant and that they do not leak into each other.

## Isolating tenants in Postgres

The data side uses [row-level security](/en/notes/glossary#Row-Level-Security) in Postgres 16. Both tenant tables have it enabled and forced, with one policy:

```sql
ALTER TABLE runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE runs FORCE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation ON runs
    USING (tenant_id = current_setting('app.tenant_id', true))
    WITH CHECK (tenant_id = current_setting('app.tenant_id', true));
```

Every query runs in a transaction that first sets `app.tenant_id` with `set_config(..., true)`. The `true` makes it transaction-local, which is what makes it safe behind a connection pool: the value cannot leak to the next request that borrows the connection. The read queries deliberately have no `WHERE tenant_id = ...`. The policy does the filtering, so a bug in my query code cannot widen the result. If the setting is missing, the policy compares against null and the query returns zero rows instead of raising an error. It fails closed.

There is one trap, and it is the reason I wrote the test the way I did. A superuser, or any role with `BYPASSRLS`, skips every policy. If the app and the tests connect as the default `postgres` user, the isolation tests pass and prove nothing. So the migration creates an `app_user` role with `NOSUPERUSER NOBYPASSRLS`, the service connects as that role, and the tests do too. The test file has:

- an assertion on `pg_roles` that the role is neither superuser nor `BYPASSRLS`
- an assertion on `pg_class` that RLS is both enabled and forced on both tables
- `test_cross_tenant_read_returns_zero_rows`, which saves runs as one tenant and reads as another, using both the store and hand-written SQL with no `WHERE` clause
- a write test: inserting a row for another tenant is rejected by the `WITH CHECK` clause
- a control test showing that the same query as a superuser sees every tenant's rows

To check that the tests are not vacuous, I made `app_user` a superuser by hand and re-ran them. The role, read, no-tenant and write tests failed. Then I reverted it and they passed again. A passing isolation test is only worth something if you have seen it fail for the right reason.

## Cost on the span

Prices are per thousand tokens: a default table in code, and a per-tenant override table in Postgres. The override wins, and another tenant keeps the default. `test_override_beats_default` runs against both the in-memory store and the real Postgres store.

The computed cost is stored with the run and set as the `app.cost.usd` attribute on the model span, next to the token counts. That makes "which tenant spent what, on which model" a query over spans instead of a separate reporting job. The token counts come from the stub (one token per word) and the prices are made up for the stub models, so the amounts are illustrative. The mechanism is the point, not the values. `tenant.id` and `app.cost.usd` are this app's own attribute names; no convention defines them.

## What the tracing costs

`bench/bench.py` sends 1000 sequential requests per cell after 100 warm-up requests, with tracing off and on, in 3 rounds. The order of on and off alternates by round. It runs once against Postgres (as `app_user`, with RLS active) and once against an in-memory store. With tracing on, spans go over [OTLP](/en/notes/glossary#OTLP) to an OpenTelemetry [Collector](/en/notes/glossary#Collector) and then to Jaeger. With tracing off, the app uses a no-op tracer on the same code path.

The machine is an Apple M5 Pro (Mac17,8). Client and server share it, and Postgres runs in a container in a Colima VM.

In-memory store, round 1:

| Tracing | p50 (ms) | p95 (ms) |
|---|---|---|
| off | 0.34 | 0.37 |
| on | 0.39 | 0.45 |

Added latency from tracing, same round, by store:

| Store | Added p50 (ms) | Added p95 (ms) |
|---|---|---|
| In-memory, across rounds | 0.05 to 0.07 | 0.08 to 0.19 |
| Postgres, across rounds | 0.07 to 0.81 | -0.09 to 1.12 |

Read the Postgres row with care. Rounds 2 and 3 added 0.09 and 0.07 ms at p50. Round 1 added 0.81 ms, and I did not isolate why. The 3 rounds are all in the file, and I did not drop the outlier. A negative number in the p95 range means that in one round the tracing-on run was faster than the tracing-off run, which tells you the noise between runs is as large as the effect I am trying to measure.

I also checked that tracing-on runs really delivered their spans, instead of assuming it. After each tracing-on cell I counted traces in Jaeger: 1100 of 1100 in every cell, 1000 benchmark requests plus 100 warm-up.

What these numbers do not say matters more than what they say:

- The model is a stub that returns almost instantly, so the benchmark measures the span machinery against close to no work. A real model call takes far longer than the added time, so the same absolute overhead would be a much smaller share of a real request. I have not measured that ratio and do not quote one.
- It is one laptop, 3 rounds, one run per cell, no confidence intervals.
- These numbers describe this reference implementation. They say nothing about any other system.

One more honest note. While checking for lost spans I first counted spans by parsing the Collector's container logs, got a number lower than expected, and suspected the exporter was dropping data. The Jaeger counts later showed no loss, so my log parsing was the broken part. I had also added a flush of the batch span processor on shutdown, so the last spans of a process are exported. I cannot show that it was needed, because my first measurement was wrong, but it is the right behavior for a service that batches spans.

## What this is not

The repo's README has a "What this is not" section, and it belongs here too:

- The `X-Tenant-ID` header is trusted as given. A real service would take the tenant from authenticated identity.
- Every request is traced. Production would use [sampling](/en/notes/glossary#Sampling) in the SDK or in the Collector; neither is configured.
- Prompts and responses are not recorded on spans, because GenAI payloads often contain user data and recording them should be a per-tenant decision.
- Row-level security keeps one schema and fails closed, but it does not isolate resources. A noisy tenant still shares the pool, the disk and the locks. Schema-per-tenant isolates more at the cost of more migrations and more connection handling.

## Run it

```sh
docker compose up -d --build
curl -s -X POST localhost:8000/v1/runs -H 'X-Tenant-ID: acme' \
  -H 'Content-Type: application/json' -d '{"input":"hello"}'
```

Then open the Jaeger UI at `localhost:16686` and look for the service `otel-genai-tenant-service`. The code, the tests, the benchmark script and `bench/RESULTS.md` are in [the repo](https://github.com/Calebe94/otel-genai-tenant-service).

> Don't know a term? Check the [Glossary](/en/notes/glossary).
