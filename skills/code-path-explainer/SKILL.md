---
name: code-path-explainer
description: Trace a concrete behavior through source code and produce an annotated HTML execution-path explainer. Use when the user wants to understand how a specific code path works, with real snippets and source-linked flow diagrams.
---

# Code Path Explainer

Explain what the code actually does from an entry point to its observable outcome.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Adapt `../html-artifact/assets/artifact.html` with artifact kind `explainer`. This is a read-only explanation unless the user asks for an interactive model.

## Inputs

Identify the behavior or question, concrete entry point if known, repository revision, and reader familiarity. Prefer one bounded trace over an unfocused architecture survey.

## Workflow

1. Locate the entry point, follow important calls and state transitions, and read relevant tests. Track async boundaries, ownership, and external dependencies.
2. Trace the happy path with concrete representative input. Explain where data is transformed, buffered, persisted, or emitted.
3. Trace relevant failure, cancellation, retry, cleanup, and concurrency paths. State which behaviors are inferred rather than exercised.
4. Select three to six key actual snippets with file/revision/line references. Explain their role instead of dumping full files.
5. Summarize invariants, configuration effects, common misconceptions, and gotchas.

## HTML output

Lead with a plain-language answer. Include a numbered execution path, accessible SVG flow or sequence diagram, annotated snippets, key configuration, and a files-read list. Show unknown external behavior explicitly instead of inventing it.

If a simulation is helpful, label it as a simplified model and document differences from production. It must not execute arbitrary repository code or connect to live services.

## Acceptance checks

Every diagram edge is supported by code or clearly marked as inference. Snippets and line references match the stated revision. Account for the paths relevant to the question, not just success. Apply the foundation contract.

## Example request

"Trace our streaming backpressure path and explain it in an HTML page with the key code snippets."
