---
name: visual-implementation-plan
description: Turn an agreed technical approach into an evidence-linked HTML implementation plan with interfaces, data flow, dependencies, and acceptance criteria. Use when the user requests a visual plan or an HTML handoff for implementation.
---

# Visual Implementation Plan

Produce an implementable plan, not a document that merely describes a desirable end state.

## Shared foundation

Read `./foundation/INSTRUCTIONS.md` and `./foundation/references/contract.md`. Customize `./foundation/assets/artifact.html` with artifact kind `plan`. A read-only plan normally does not need the sample editor.

## Inputs

Use the selected approach, desired behavior, repository, constraints, and prior decisions. If a major architecture choice is unresolved, expose it as a decision gate rather than silently selecting it.

## Workflow

1. Inspect the current implementation and tests. Record relevant files, interfaces, invariants, and compatibility requirements.
2. Define scope, non-goals, user-visible behavior, and measurable acceptance criteria. Separate confirmed requirements from suggestions.
3. Divide implementation into coherent vertical slices. Name affected surfaces, actual prerequisites, proposed interfaces, and error behavior.
4. Explain data flow, state ownership, persistence, failure paths, migration, rollout, and rollback where applicable.
5. Map each requirement to a verification step and each slice to dependencies. Identify unknowns that block execution and a concrete way to resolve them.

## HTML output

Include a summary, current/target flow, interface sketches, file-level work map, dependency order, acceptance matrix, and decision log. Use embedded SVG with a text equivalent for nontrivial flows. Link any companion artifacts through stable references.

Clearly distinguish existing code from proposed snippets. Export an implementation handoff containing scope, requirement IDs, dependencies, unresolved decisions, and artifact references if requested. Do not start implementation or create issues or PRs as a side effect.

## Acceptance checks

Every requirement has a verification step. Dependencies reflect actual prerequisites and contain no cycles. The plan preserves intended behavior and identifies all relevant integration surfaces. Apply the foundation contract to navigation, sources, print, and any exports.

## Example request

"Make an HTML implementation plan for the selected search design, including data flow and acceptance criteria."
