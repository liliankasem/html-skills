---
name: dataset-curator
description: Build an offline HTML interface for approving, rejecting, tagging, and selecting dataset examples with auditable export. Use when the user wants to curate a concrete dataset through a purpose-built review UI.
---

# Dataset Curator

Preserve row identity and make every curation decision explicit and exportable.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Replace the workspace in `../html-artifact/assets/artifact.html` with artifact kind `editor`. Define a row-level model rather than reusing the sample decision schema.

## Inputs

Use the authorized dataset snapshot, row identifiers, review criteria, labels, and export format. Establish the handling of unreviewed examples; never silently treat them as rejected.

## Workflow

1. Inspect schema and volume, identify stable IDs and duplicate/conflicting rows, and assess whether a single-file offline interface is practical.
2. Preserve immutable source rows and baseline review decisions separately from current decisions. Use explicit approve/reject/unreviewed states with optional tags and reasons.
3. Provide readable row detail, filtering, progress counts, and keyboard-operable actions. Filtering must not change the underlying selection.
4. Support undo or clear/reset for decisions and make bulk-action scope explicit. Do not default a destructive bulk action to all hidden rows.
5. Build exports from the complete state, not the current viewport. Include criteria and dataset snapshot identity.

## HTML output

Provide separate exports for selected rows and an audit manifest containing all row IDs, review states, tags, and reasons. Use JSON or JSONL; if CSV is required, handle quoting and spreadsheet-formula injection explicitly.

Avoid embedding sensitive or unnecessary personal data. Do not infer protected attributes or suitability labels not requested by the review task.

## Acceptance checks

Verify counts, stable IDs, no dropped rows, filters, bulk scope, undo, reset, and exact exported selection. Test empty/large fields, Unicode, and HTML-looking data. Apply the foundation contract and disclose any dataset size limits.

## Example request

"Create an HTML review interface to approve examples, tag failure modes, and export the selected JSONL rows."
