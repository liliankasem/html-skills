---
name: technical-explainer
description: Create an HTML learning artifact that teaches a technical concept through diagrams, worked examples, and gotchas. Use when the user wants an interactive explanation or HTML lesson, rather than a source-code trace alone.
---

# Technical Explainer

Build a useful mental model, then connect it to realistic examples and limitations.

## Shared foundation

Load the shared `html-artifact` skill (`html-artifact:html-artifact` for Claude plugin installs, otherwise `html-artifact`) before generating HTML. Read its `references/contract.md` and resolve `assets/artifact.html` relative to that loaded skill's actual directory, never this specialist or a guessed plugin-cache path. If unavailable, stop and request installation/enabling of `html-artifact@html-skills`; do not invent a fallback or install anything automatically.

Adapt the foundation's `assets/artifact.html` with artifact kind `explainer`. Default to a navigable page; make a keyboard-operable deck only when requested.

## Inputs

Identify the concept, reader's familiarity, learning goal, and supplied implementation context. Distinguish a general explanation from claims about the user's system.

## Workflow

1. State the question and prerequisites. Gather reliable references and inspect local implementation only if the explanation concerns it.
2. Explain the simplest accurate model, defining terminology before relying on it.
3. Walk through a concrete example with actual intermediate values or state transitions.
4. Show counterexamples, boundary cases, misconceptions, and where the simplified model breaks down.
5. End with a compact recap or comprehension exercise that checks the stated learning goal.

## HTML output

Include a short answer, accessible SVG diagram with text equivalent, step-by-step example, optional deeper disclosures, gotchas, and references. Use interaction only when manipulating an input reveals something important.

For simulations, document assumptions, deterministic rules, and divergence from production. Never execute arbitrary user-entered code or make hidden requests. If parameters are editable, export their values and model assumptions as JSON.

## Acceptance checks

Check worked-example arithmetic, boundary conditions, diagram semantics, and terminology. Distinguish sourced facts from analogies. Validate any controls and exports using the foundation contract; do not claim a simplified simulation proves production correctness.

## Example request

"Explain token-bucket rate limiting in an HTML page with a worked example and a tunable simulation."
