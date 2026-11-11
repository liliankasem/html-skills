---
name: annotated-code-review
description: Render an evidence-backed code review as an HTML diff with line-anchored findings and severity labels. Use when the user specifically wants an annotated HTML PR review or interactive diff review artifact.
---

# Annotated Code Review

Perform a real review and attach findings to actual changed code. The HTML renderer is not the review method.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Use `../html-artifact/assets/artifact.html` with artifact kind `review`. Follow applicable repository review instructions and specialist review requirements.

## Inputs

Establish the exact base/head revisions and review scope. Identify the user-requested focus and any files excluded by access policy.

## Workflow

1. Read the actual diff, relevant surrounding code, call sites, and tests. Trace changed behavior before drawing conclusions.
2. Find actionable defects introduced by or materially affected by the change. Establish a concrete trigger, failure mechanism, and user impact.
3. Assign stable finding IDs and severity using the repository rubric. If absent, use blocking/high/medium/low with definitions visible in the report.
4. Anchor each finding to a file, revision side, and line range. Include evidence, confidence, suggested correction, and verification needed.
5. Separate confirmed findings, unresolved questions, and optional improvements. If no defects are found, say so and state coverage limits.

## HTML output

Render the actual escaped diff with old/new line numbers, addition/removal markers, a severity summary, and inline or adjacent annotations. Ensure annotations follow a sensible reading order on narrow screens.

Filtering must not discard findings. If users can triage findings, export finding IDs, dispositions, and notes separately from immutable review evidence. Do not submit reviews, resolve threads, or apply fixes without authorization.

## Acceptance checks

Verify every hunk and anchor against the reviewed revisions. Each defect includes a plausible reproducible failure path; avoid speculative warnings disguised as findings. Validate filters, keyboard access, and export completeness using the foundation contract.

## Example request

"Review this PR and produce an HTML diff with severity-tagged, line-anchored findings."
