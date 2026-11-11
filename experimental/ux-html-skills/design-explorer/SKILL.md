---
name: design-explorer
description: Create an HTML gallery of distinct visual directions for one feature. Use when the user wants side-by-side design alternatives, layout explorations, or a visual decision page rather than a single polished design.
---

# Design Explorer

Make design tradeoffs visible by comparing different solutions to the same user task.

## Shared foundation

Load the shared `html-artifact` skill (`html-artifact:html-artifact` for Claude plugin installs, otherwise `html-artifact`) before generating HTML. Read its `references/contract.md` and resolve `assets/artifact.html` relative to that loaded skill's actual directory, never this specialist or a guessed plugin-cache path. If unavailable, stop and request installation/enabling of `html-artifact@html-skills`; do not invent a fallback or install anything automatically.

Start from the foundation's `assets/artifact.html` with artifact kind `prototype`. Replace the starter's example workspace with actual design alternatives.

## Inputs

Identify the user task, target surface, required content, brand or existing design system, and requested number of alternatives. Use four alternatives by default when no count is supplied.

## Workflow

1. Inspect available screenshots, design tokens, existing components, and product constraints. Identify the content and actions every variant must retain.
2. Choose distinct axes such as layout, information density, hierarchy, tone, and interaction. Do not substitute color changes for different approaches.
3. Build comparable HTML mockups using the same representative content. Label fabricated data and unimplemented actions.
4. Explain the audience, strength, compromise, and likely failure mode of each variant. Include narrow-screen behavior.
5. Summarize which direction best fits the supplied constraints and what still needs user research.

## HTML output

Produce a responsive comparison gallery with stable variant IDs, readable full-size previews, consistent framing, and textual tradeoff labels. Do not embed remote tracking or imply a static mockup is connected to a backend.

If the reader can select a direction, export its ID, retained elements, requested changes, and rationale as JSON and a handoff prompt. Selecting a variant does not authorize implementation.

## Acceptance checks

The variants are meaningfully distinct, preserve the core task, and can be compared at the same scale. Critical interactions have keyboard alternatives. Check mobile reflow and exported selection using the foundation contract. Mark design assumptions rather than inventing user-validation results.

## Example request

"Show six onboarding directions in one HTML gallery, each labeled with its tradeoff."
