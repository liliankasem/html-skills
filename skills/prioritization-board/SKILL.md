---
name: prioritization-board
description: Build an HTML board for reordering and bucketing tickets, test cases, or feedback with structured export. Use when the user wants to prioritize a concrete collection interactively without changing the source tracker.
---

# Prioritization Board

Let the reader revise a proposed ordering while preserving every source item's identity.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Replace the editor in `../html-artifact/assets/artifact.html` with artifact kind `editor` and a collection-specific schema.

## Inputs

Use the concrete items, stable IDs, source links, requested buckets, ranking criteria, and dependency or capacity constraints. Default buckets to Now/Next/Later/Cut only when no scheme is supplied.

## Workflow

1. Normalize input without dropping duplicates silently. Identify missing IDs, conflicting duplicates, dependencies, and incomplete fields.
2. Propose an initial ordering with short rationales grounded in the supplied criteria. Label inferred priority and unknown effort.
3. Render cards with IDs, concise context, source links, bucket, and position. Keep the immutable source data separate from editable ordering.
4. Provide move-to-bucket and move-up/down controls usable by keyboard. Drag-and-drop may supplement, never replace, these controls.
5. Show counts and constraint warnings. Preserve state when filtering; hidden cards remain part of the ordering.

## HTML output

Export JSON containing every item exactly once with its ID, bucket, and position, plus bucket rationales and source snapshot identity. Provide Markdown and a handoff prompt when useful.

Keep baseline and current ordering distinct. Reset restores the full initial proposal. Do not update the source tracker or delete items.

## Acceptance checks

Assert no missing/duplicate IDs after moves, filtering, reset, and export. Verify keyboard reordering, dependency warnings, empty buckets, and long titles. Apply the foundation contract, including explicit persistence boundaries and copy failure recovery.

## Example request

"Make an HTML Now/Next/Later/Cut board for these 30 tickets and export my final ordering."
