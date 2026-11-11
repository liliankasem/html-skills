---
name: weekly-status-report
description: Create an evidence-linked HTML status report for an explicit reporting period. Use when the user wants a weekly HTML update synthesized from authorized issues, PRs, commits, documents, or supplied notes.
---

# Weekly Status Report

Report outcomes and decisions, not a misleading activity count.

## Shared foundation

Load the shared `html-artifact` skill (`html-artifact:html-artifact` for Claude plugin installs, otherwise `html-artifact`) before generating HTML. Read its `references/contract.md` and resolve `assets/artifact.html` relative to that loaded skill's actual directory, never this specialist or a guessed plugin-cache path. If unavailable, stop and request installation/enabling of `html-artifact@html-skills`; do not invent a fallback or install anything automatically.

Use the foundation's `assets/artifact.html` with artifact kind `report`. Keep the report read-only unless editable commentary is requested.

## Inputs

Resolve the reporting interval, timezone, team or project scope, audience, and accessible evidence. Use the user's convention; if absent, state the chosen seven-day interval explicitly.

## Workflow

1. Query relevant work within a clearly defined start-inclusive/end-exclusive interval. Distinguish creation, update, completion, and merge dates.
2. Group evidence by workstream and outcome. Deduplicate multiple commits, issues, and PRs describing the same deliverable.
3. Separate completed, in-progress, blocked, and planned work using actual status evidence. Do not equate an open PR with a shipped feature.
4. Highlight decisions, meaningful changes, risks, dependencies, and requests for help. Include owners only when supported and appropriate for the report.
5. Show next steps as documented commitments or explicitly labeled proposals. Record source freshness and coverage gaps.

## HTML output

Include the exact reporting period, executive summary, outcomes by workstream, blockers/decisions, and next-period outlook. Link claims to canonical work items. Add metrics only with a defined denominator and calculation.

Do not send messages, update tickets, or publish the report without authorization. Exclude sensitive personal or personnel assessments.

## Acceptance checks

Verify interval boundaries, status semantics, deduplication, and every completion claim. Do not treat absence of evidence as evidence of no work. Apply the foundation contract and make incomplete source coverage visible.

## Example request

"Build an HTML weekly update from this project's PRs and issues for the last seven days."
