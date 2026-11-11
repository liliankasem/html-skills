---
name: incident-report
description: Assemble incident evidence into a blameless HTML report with impact, timeline, contributing factors, and follow-up actions. Use when the user requests an HTML incident review or visual postmortem.
---

# Incident Report

Describe the incident accurately without converting incomplete evidence into a confident causal story.

## Shared foundation

Read `./foundation/INSTRUCTIONS.md` and `./foundation/references/contract.md`. Use `./foundation/assets/artifact.html` with artifact kind `report`. Follow applicable incident-review instructions.

## Inputs

Use the incident identifier, affected system, authorized incident artifacts, reporting audience, and known time window. Identify the timezone and timestamp quality.

## Workflow

1. Gather alerts, deployment events, logs, status updates, and relevant changes. Separate observed timestamps from inferred ordering.
2. Establish impact, detection, mitigation, recovery, and resolution. State unknown impact instead of inventing user counts or duration.
3. Build a source-linked timeline in a consistent timezone, preserving original timezone information when necessary.
4. Explain trigger, contributing conditions, detection gaps, and recovery factors. Distinguish correlation, hypothesis, and evidence-supported causation.
5. Propose actionable follow-ups with a verification criterion. Assign owners and dates only when agreed; otherwise mark them unassigned or proposed.

## HTML output

Include a concise summary, impact/uncertainty, timeline, causal diagram when supported, what helped/hindered, and follow-up table. Keep language blameless and focus on system conditions.

Redact secrets, customer payloads, and unnecessary personal data. Do not create action tickets, contact stakeholders, or publish without authorization.

## Acceptance checks

Verify duration arithmetic, event ordering, evidence links, and claims about root cause and recovery. Each action addresses a contributing factor and has an observable completion condition. Apply the foundation contract and clearly label unresolved hypotheses.

## Example request

"Turn these incident notes and deployment logs into a blameless HTML postmortem."
