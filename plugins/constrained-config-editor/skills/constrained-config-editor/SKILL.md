---
name: constrained-config-editor
description: Build an HTML form for editing structured configuration with schema validation, dependency checks, and changed-value export. Use when the user wants a safe visual editor for feature flags or JSON/YAML configuration.
---

# Constrained Config Editor

Edit typed configuration without silently changing unrelated values or applying changes to a live system.

## Shared foundation

Read `./foundation/INSTRUCTIONS.md` and `./foundation/references/contract.md`. Replace the workspace and validator in `./foundation/assets/artifact.html`; use artifact kind `editor`. The starter's shallow change helper is not sufficient for nested configuration.

## Inputs

Use the configuration snapshot, schema, constraints, dependency rules, target format, and source version. Do not embed real secrets, credentials, or environment-variable values; request a redacted or synthetic fixture.

## Workflow

1. Parse the source using appropriate trusted tooling without executing it. Record baseline values, types, key presence, and source identity.
2. Map fields to labeled native controls grouped by area. Preserve distinctions among absent, null, false, zero, and empty string.
3. Implement local validation and cross-field dependencies. Explain warnings near the affected fields and associate blocking errors with controls.
4. Model nested paths and explicit deletions. Preserve unedited keys and avoid prototype-pollution paths or unsafe object assignment.
5. Show an exact baseline/current comparison. Document if comments, anchors, key order, or formatting cannot round-trip.

## HTML output

Export validated current values and a versioned change list with stable paths, old values, new values, and explicit add/replace/remove semantics. Use a standard patch format only if implemented and tested accurately.

Warn that exports require review against the source version. No automatic file writes, environment updates, or service calls.

## Acceptance checks

Test field types, dependency failures, null/absent distinctions, nested edits, deletions, reset, and unchanged output. Validate exported configuration with the target schema. Apply the foundation contract and never claim comment preservation without verifying it.

## Example request

"Build an HTML editor for this redacted feature-flag YAML with dependency warnings and changed-key export."
