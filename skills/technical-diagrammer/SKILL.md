---
name: technical-diagrammer
description: Produce accessible SVG technical diagrams embedded in a self-contained HTML artifact. Use when the user wants architecture, sequence, workflow, or state diagrams grounded in supplied evidence.
---

# Technical Diagrammer

Choose a diagram that answers a specific question and preserve the semantics behind every shape and edge.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Adapt `../html-artifact/assets/artifact.html` with artifact kind `explainer`. Use inline SVG, not a remote rendering service or runtime diagram dependency.

## Inputs

Establish the question, audience, system boundary, evidence, and desired abstraction level. Do not infer infrastructure or trust boundaries from names alone.

## Workflow

1. Extract entities, relationships, direction, ownership, and evidence references. List ambiguous or missing relationships.
2. Choose architecture, sequence, state, or workflow notation based on the question rather than aesthetic preference.
3. Build the smallest faithful model. Label synchronous/asynchronous edges, conditions, cardinality, or state transitions when relevant.
4. Lay out nodes and connectors to minimize crossings. Use readable labels, a legend for non-obvious symbols, and text or line patterns in addition to color.
5. Add an equivalent relationship table or ordered textual walkthrough and record excluded detail.

## HTML output

Embed SVG with a viewBox, meaningful title/description, readable labels, and a neighboring textual explanation. Provide source references and label inferred edges explicitly.

If pan or zoom is necessary, provide keyboard-operable controls and a useful initial fit. Avoid requiring precise pointer gestures to understand the diagram.

## Acceptance checks

Check every node and edge against evidence, arrow direction, sequence ordering, state reachability, and legend consistency. Inspect label clipping and print readability. Apply the foundation contract and do not execute untrusted SVG markup.

## Example request

"Diagram this ingestion pipeline as SVG inside an HTML page, including failure paths and source references."
