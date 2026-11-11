---
name: feature-brief
description: Create a concise HTML overview of a feature's purpose, behavior, architecture, and limitations. Use when the user wants a source-backed feature summary for onboarding, handoff, or stakeholder understanding.
---

# Feature Brief

Explain the feature at the right level for its audience without confusing planned and shipped behavior.

## Shared foundation

Load the shared `html-artifact` skill (`html-artifact:html-artifact` for Claude plugin installs, otherwise `html-artifact`) before generating HTML. Read its `references/contract.md` and resolve `assets/artifact.html` relative to that loaded skill's actual directory, never this specialist or a guessed plugin-cache path. If unavailable, stop and request installation/enabling of `html-artifact@html-skills`; do not invent a fallback or install anything automatically.

Use the foundation's `assets/artifact.html` with artifact kind `explainer`. Prefer a short read-only artifact.

## Inputs

Identify the feature, intended audience, relevant version or revision, and scope. Use existing code, documentation, tests, and supplied product decisions.

## Workflow

1. Establish the user problem, supported workflows, entry points, and boundaries.
2. Inspect the implementation and relevant tests. Distinguish current behavior, configurable behavior, proposed behavior, and unknowns.
3. Explain the happy path and important empty, error, permission, and failure states.
4. Map the feature to a small architecture view: components, data ownership, dependencies, and external systems.
5. Summarize operational limitations, rollout prerequisites, and links for deeper investigation.

## HTML output

Include a one-paragraph summary, who/what/why, user-flow diagram when useful, capabilities and limitations, architecture sketch, and source links. Label mockups or sample data explicitly.

Do not turn this into a full code trace or implementation plan unless requested. Avoid claims about availability, scale, or reliability unsupported by the sources.

## Acceptance checks

The brief answers the audience's likely questions and distinguishes current from future behavior. Every key capability has source evidence. Check diagrams against actual ownership and integration boundaries, then apply the foundation contract.

## Example request

"Make a one-page HTML brief explaining our new document ingestion feature to engineers joining the team."
