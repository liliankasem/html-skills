---
name: pr-walkthrough
description: Create a source-linked HTML companion explaining a pull request to reviewers. Use when the user wants an HTML PR overview, reviewer guide, or visual walkthrough of a change, rather than a defect review.
---

# PR Walkthrough

Help a reviewer understand why a change exists and where to focus.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Use `../html-artifact/assets/artifact.html` with artifact kind `explainer`. Remove the sample editor unless reviewer notes are explicitly requested.

## Inputs

Resolve the exact PR or comparison, base and head revisions, audience, and requested focus. Use supplied repository context; ask if multiple changes could reasonably be intended.

## Workflow

1. Read the PR description, actual diff, relevant surrounding code, and available check results. Record base/head revisions so the walkthrough is tied to a specific change.
2. Explain motivation, user-visible behavior, and the before/after model. Separate stated intent from behavior established by code.
3. Group changed files by responsibility rather than listing every file equally. Identify entry points and the recommended reading order.
4. Show selected actual diff hunks with line labels and source links. Explain important interfaces, data flow, compatibility, and rollout decisions.
5. Summarize verification evidence, unverified claims, review hotspots, and questions for the author.

## HTML output

Provide a concise overview, change map, walkthrough, before/after diagrams where helpful, and a verification/limitations section. Keep code escaped and distinguish added, removed, and context lines with text markers as well as color.

Link the canonical PR and specific source revisions. If no PR exists, describe the comparison accurately; do not create or publish a PR unless explicitly requested.

## Acceptance checks

Each displayed hunk matches the real diff. Links and line labels refer to the correct side/revision. Do not label tests as passed unless observed or reported by a named check. Apply the foundation contract, including printed diff readability.

## Example request

"Create an HTML reviewer guide for this PR, focusing on how cancellation flows through the change."
