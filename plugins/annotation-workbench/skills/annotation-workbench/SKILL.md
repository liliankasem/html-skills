---
name: annotation-workbench
description: Build an HTML interface for source-anchored annotations on documents, transcripts, or diffs with structured export. Use when the user wants to label or comment on a specific source without modifying it.
---

# Annotation Workbench

Keep comments attached to stable evidence rather than fragile screen positions.

## Shared foundation

Read `./foundation/INSTRUCTIONS.md` and `./foundation/references/contract.md`. Replace the editor in `./foundation/assets/artifact.html` with artifact kind `editor` and an annotation schema.

## Inputs

Identify the immutable source snapshot, source type, annotation categories, and desired anchor semantics. Use source-provided segment IDs when available.

## Workflow

1. Record source identity and revision or content digest when possible. Normalize display without losing a mapping to original locations.
2. Define anchors appropriate to the source: segment IDs/time ranges, document offsets plus quoted context, or file/revision/side/line ranges.
3. Provide keyboard-operable segment or range selection, labeled annotation fields, and a clear way to edit and remove annotations.
4. Store stable annotation IDs, anchor, quote/context, category, and comment separately from source text. Preserve any baseline annotations separately from edits and define reset behavior. Define behavior for overlapping ranges.
5. Detect invalid or stale anchors. Never silently relocate a comment to a merely similar passage.

## HTML output

Show source text with an adjacent annotation list and links in both directions. Keep source and annotation content escaped. Export versioned JSON containing source identity, anchor conventions, and all current annotations; Markdown may be a secondary human-readable export.

Document offset units, indexing, and inclusive/exclusive boundaries. Do not overwrite the original document or post PR comments without authorization.

## Acceptance checks

Test duplicate passages, multiline ranges, Unicode offsets, first/last positions, overlap, deletion, and stale-source detection. Confirm filtering does not omit annotations from a full export. Apply the foundation contract.

## Example request

"Make an HTML workbench to annotate this transcript and export comments anchored to segment IDs."
