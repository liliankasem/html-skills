---
name: component-gallery
description: Create a browsable HTML catalog of component variants and states tied to their source definitions. Use when the user wants a visual component library, state matrix, or design-system coverage gallery.
---

# Component Gallery

Make existing component coverage and gaps visible without pretending a static gallery is the production runtime.

## Shared foundation

Read `./foundation/INSTRUCTIONS.md` and `./foundation/references/contract.md`. Adapt `./foundation/assets/artifact.html` with artifact kind `catalog`. Remove editing controls by default.

## Inputs

Use component source, stories, design references, and the requested catalog scope. Identify what can be faithfully rendered without a build or network.

## Workflow

1. Inventory scoped components, public variants, states, dependencies, and source references. Distinguish documented variants from inferred examples.
2. Build a coverage matrix: component by variant/state, including disabled, loading, error, and empty states where applicable.
3. Render comparable examples with consistent sample content and frames. Label approximations and unavailable assets.
4. Organize by meaningful component families. Add search or filters when the collection is large enough to justify them.
5. Describe source usage, key properties, known constraints, and missing coverage without inventing undocumented behavior.

## HTML output

Provide a catalog, state matrix, source-linked component cards, and coverage summary. Keep necessary code snippets in disclosures. Filters should announce counts and expose an explicit empty state.

If a selection export is requested, preserve component IDs, variants, states, and source references; do not export only the currently visible names.

## Acceptance checks

Verify each catalog entry against its source and each rendered state against the specified properties. Confirm filtering does not lose selection or misstate totals. Mark simulated behavior and apply the foundation contract.

## Example request

"Create an offline HTML gallery of our form components and their validation states."
