---
name: artifact-inventory
description: Catalog and categorize an authorized collection of generated artifacts in a searchable HTML inventory. Use when the user wants to discover recurring artifact types, inspect coverage, or browse existing HTML outputs.
---

# Artifact Inventory

Describe what exists in a bounded collection without executing the files being cataloged.

## Shared foundation

Read `./foundation/INSTRUCTIONS.md` and `./foundation/references/contract.md`. Adapt `./foundation/assets/artifact.html` with artifact kind `catalog`. Remove the sample editor unless category correction is requested.

## Inputs

Establish the explicit root directories or file list, included types, exclusions, desired taxonomy, and whether source links may reference local files. Do not scan unrelated home or repository directories.

## Workflow

1. Enumerate files read-only within scope. Record relative paths, types, size, and observed filesystem metadata without treating modification time as creation time.
2. Read text and structural metadata statically. Do not run scripts, load remote resources, follow symlinks outside scope, or render untrusted HTML previews.
3. Group artifacts by purpose using evidence from titles, headings, and content. Label inferred categories and ambiguous cases.
4. Report counts, duplicates or near-duplicates when supported, unreadable files, exclusions, and incomplete coverage. Use content digests for exact-duplicate claims.
5. Build a catalog with search, category filters, representative descriptions, and category diagrams when useful.

## HTML output

Include the scope, methodology, category counts, source-referenced entries, and uncertainty. Use escaped excerpts rather than active embedded source HTML. If users open original files, warn that those files may contain active content.

Export an inventory manifest with stable entry IDs, relative paths, category, evidence, and coverage notes. For editable categorization, preserve baseline and user corrections separately. Use authorized relative links only; do not expose absolute private paths in a shared artifact.

## Acceptance checks

Reconcile totals with scanned, excluded, duplicate, and failed-read files. Verify filter counts and exported coverage. Ensure no artifact content was executed and no out-of-scope paths were read. Apply the foundation contract.

## Example request

"Scan this output folder and build an HTML catalog grouping my generated artifacts by use case."
