---
name: implementation-explorer
description: Create an HTML comparison of implementation approaches grounded in the actual codebase. Use when the user wants alternative technical approaches, tradeoffs, or an HTML decision aid before choosing an implementation.
---

# Implementation Explorer

Compare credible ways to solve the same engineering problem without prematurely implementing one.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Use `../html-artifact/assets/artifact.html` as the presentation starter. Supply a brief with artifact kind `plan`; replace the example editor and remove controls unless selection or weighting helps.

## Inputs

Use the problem, repository context, constraints, and decision criteria already provided. Establish consequential missing constraints before ranking approaches.

## Workflow

1. Trace the relevant existing behavior, interfaces, tests, and conventions. Identify invariants every approach must preserve.
2. Develop two to four genuinely different feasible approaches, including the smallest viable change. Include the status quo when it is a meaningful option.
3. Evaluate each against the same criteria: correctness, integration effort, operational complexity, performance, migration risk, reversibility, and fit with existing patterns.
4. Show representative interfaces or small code sketches. Mark sketches as proposals; do not present invented symbols as existing code.
5. Recommend an approach with explicit assumptions, disqualifying conditions, unknowns, and the smallest experiment that would reduce uncertainty.

## HTML output

Lead with the decision and recommendation. Include comparison cards, a tradeoff matrix, source-linked current-state evidence, a data-flow diagram when useful, and unresolved questions. Do not invent benchmark numbers or numeric scores without a defined scoring method.

If selection is interactive, keep evidence immutable. Export the selected approach ID, criteria or weights, rationale, and open questions as JSON and a handoff prompt; do not initiate implementation.

## Acceptance checks

Every approach solves the same problem and respects the invariants. Each important assessment has evidence or an uncertainty label. The recommendation follows from the criteria, not visual prominence. Verify selection exports against the currently chosen option and the foundation contract.

## Example request

"Compare three ways to add debounced search to this codebase and make an HTML decision page."
