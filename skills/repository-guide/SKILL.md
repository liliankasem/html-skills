---
name: repository-guide
description: Write a self-contained HTML repository or service guide explaining its architecture, scenarios, operations, and debugging playbook for new owners. Use when onboarding maintainers, handing a project to another team, or requesting a repository overview, internals guide, ownership document, or handoff doc.
---

# Repository Guide

Produce one offline HTML guide for a repository, project, or service. Explain what the system does, why it works that way, and how a new owner can change and diagnose it safely. This is a whole-project orientation, not a feature brief or a walkthrough of one pull request.

## Shared foundation

Load the shared `html-artifact` skill (`html-artifact:html-artifact` for Claude plugin installs, otherwise `html-artifact`) before generating HTML. Read its `references/contract.md` and resolve `assets/artifact.html` relative to that loaded skill's actual directory, never this specialist or a guessed plugin-cache path. If unavailable, stop and request installation/enabling of `html-artifact@html-skills`; do not invent a fallback or install anything automatically.

Use the documentation layout and components in the foundation's `assets/artifact.html`; use artifact kind `explainer`. Preserve the white page, fixed desktop sidebar, red section rules, blue subheadings, compact tables, and captioned diagram cards. Replace all example content.

The guide is read-only by default. Remove the starter's editor, export section, related navigation entries, and both scripts; no JavaScript is needed. Use native disclosures, HTML/CSS diagrams, and inline SVG, never Mermaid or external rendering dependencies. For a script-free printable guide, keep substantive scenario disclosures open in the delivered file.

## Inputs

Establish the repository and revision, audience, required topics, intended depth, authorized source scope, and output path. Use the future owner's questions as the outline when provided. Ask one focused question only if a consequential input cannot be inferred. For a small project, shorten the outline; do not invent services, operational responsibilities, state machines, or deployment procedures.

## Workflow

1. Gather facts from README files, design documents and ADRs, dependency manifests, configuration, entry points, orchestration and state code, external clients, tests, and debugging tools. Read only authorized sources; do not run project scripts merely to discover what they do.
2. Record components and single responsibilities, request or build flow, state and transitions, thresholds, failure modes, log keys, configuration, dependencies, and ownership boundaries. Verify every number, class, property, timeout, retry, and log identifier against the current source.
3. Build a source-backed outline using the blueprint below. Explain what, why, how to debug, and what not to do. Separate source facts, inferred rationale, documented decisions, unknowns, and illustrative scenarios.
4. Write the HTML using the foundation's visual language. Give every section a stable anchor and a matching sidebar link; add `.sub` links for important subsections. Show the inspected revision and repository-relative file/line references so claims can be checked.
5. Add diagrams only where they teach more than prose or a table. Use HTML/CSS component tiers and numbered flows, or accessible inline SVG for context, sequence, swimlane, or state diagrams. Keep diagram labels and code identifiers exact.
6. Cross-check the guide against source and tests. When docs disagree with code, list both sources in a "Docs vs code discrepancies" box; do not silently fix upstream documentation or present guessed intent as established fact.
7. Verify the actual HTML in a browser when available, including offline loading, navigation, diagrams, narrow screens, keyboard operation, and printing. State checks you could not perform. Deliver the guide without committing, pushing, publishing, or changing project files unless separately requested.

## HTML output

Use the following blueprint selectively. Keep enough detail for a new owner to answer practical questions, not just recognize component names.

| Section | Contents |
| --- | --- |
| Orientation | Purpose, mental model, glossary, repository/revision, audience, scope, and how to use the guide. |
| Component architecture | Context boundaries and dependencies; package/component responsibilities and must-not rules; an authority matrix for who owns, proposes, or never touches a concern. |
| End-to-end flow | Real entry points, time-ordered steps, handoffs, early exits, and properties that must be preserved. |
| State and transitions | Actual state fields, persistence, gates, thresholds, transition rules, crash safety, and uncertain outcomes; omit if not applicable. |
| Reading state and output | Output contracts, traces, state fingerprints, and what is and is not logged. |
| Scenario catalog | Native disclosures with before state, input, steps, decision, after state, output/reply, and "if broken"; mark synthetic examples explicitly. |
| Debugging playbook | Safe local setup, symptom / likely cause / evidence table, exact log keys, bisection method, and replay tools if present. |
| Design principles | Do/don't callouts, why boundaries exist, where changes belong, and ADR-backed rejected alternatives. |
| Configuration and operations | Verified local run commands, profiles, key settings, transport behavior, dependency timeouts/retries, and runbooks with prerequisites and risks. |
| Testing, limits, and gotchas | Actual test layout and commands, known limitations, unanswered questions, and docs-vs-code discrepancies. |
| Where to read more | Repository-relative source paths and line ranges, docs, ADRs, and authorized public references. |

Use fake data only in examples. Do not copy tokens, customer data, sensitive traces, or internal URLs into the guide. Source references may identify authorized repository files without embedding their confidential contents. Label redacted or unavailable evidence, and never fabricate owners or contacts.

### Component patterns

- `.dg` with `p.cap` for bordered diagram cards and a caption explaining how to read them; `.svgw` for a labeled, keyboard-scrollable SVG region.
- `.box`, `.box.ok`, `.box.warn`, and `.box.bad` with `<b class="t">` for informational, do, caution, and don't callouts. Use textual labels, not color alone.
- `.zone`, `.cols3`, `.lane`, and `.comp` for tiered component views; `.comp.key` marks a focal component. `.ext` and `.extn` describe dependencies.
- `ol.fl > li` with `.st`, `.st.q`, `.st.end`, and `.xit` or `.xit.stop` for numbered flows and explicit decision/exit labels.
- `.sm4 > .stc` and `.tr .to` for state cards; `.sq` and `.chip` for small step-by-step state comparisons.
- `details > summary` with a table for scenarios. Use `<code>` for identifiers, log keys, and configuration keys.
- Tables with captions and scoped headings for glossaries, authority matrices, symptoms, and configuration. Give scroll regions accessible names and keyboard focus.

### SVG conventions

Wrap a diagram in `.svgw` with `role="region"`, a meaningful `aria-label`, and `tabindex="0"`. Each SVG needs `role="img"`, a `viewBox`, a first-child `<title>`, a following `<desc>`, and unique `aria-labelledby` targets. Use a unique prefix for every diagram and marker ID.

Use the foundation palette: dark text, muted sublabels, red for one or two focal elements, blue for secondary structure, light gray cards, green for success, and amber for caution. Use system fonts for names and monospace for identifiers. Preserve `.svgw .al text` styling so arrow labels are not overridden by generic text rules.

Draw arrows before boxes, use orthogonal elbows, and mask arrow labels with an opaque background. Avoid text crossing lines or activation bars. In sequence diagrams, use dashed lifelines and narrow activation bars; place optional/alternative frame guards beside rather than behind the bars. Explain dashed/solid lines in a legend. Prefer one idea per diagram and split crowded diagrams rather than shrinking labels.

## Acceptance checks

- Check every number, name, threshold, timeout, retry, log key, and command against the inspected revision; qualify unverified behavior.
- Verify authority boundaries, normal and failure flows, scenario outcomes, and operational prerequisites. Record discrepancies rather than hiding them.
- Ensure the shared foundation's installed resources are available locally, and the HTML itself has no scripts, Mermaid, external assets, hidden persistence, or network calls.
- Check section/navigation anchors, one page `h1`, heading hierarchy, unique SVG IDs, title/description associations, contrast, keyboard focus, 320px reflow, and print visibility.
- Inspect every diagram at desktop and narrow widths. Confine necessary horizontal scrolling to labeled regions; check clipping and label overlaps.
- Do not claim project checks, screen reader testing, browser verification, or source verification that did not actually run. Guide generation does not authorize applying changes or running live operations.

## Example request

"Write an HTML repository guide so a new maintainer can understand its architecture, scenarios, operations, build and test workflow, design decisions, and common debugging paths. Use the current code as evidence, show what remains unknown, and keep it offline."
