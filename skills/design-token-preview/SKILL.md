---
name: design-token-preview
description: Create an HTML reference that renders real design tokens as color swatches, typography, spacing, and component examples. Use when the user wants to inspect or compare a design system visually rather than read raw token files.
---

# Design Token Preview

Render token values faithfully and make their intended use visible.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Use `../html-artifact/assets/artifact.html` with artifact kind `catalog`. Keep the foundation's controls readable even when previewing inaccessible input colors.

## Inputs

Use the actual token files, theme definitions, aliases, and relevant component conventions. Establish included themes and platforms from context.

## Workflow

1. Parse tokens without executing configuration code. Record token names, source locations, primitive values, semantic aliases, and theme overrides.
2. Resolve alias chains. Identify cycles, missing references, unsupported value types, and ambiguous units explicitly.
3. Render colors with values and usage labels; typography with family/size/weight/line-height; spacing and radii at their real relative scale.
4. Show representative components using semantic tokens. Do not claim a system font fallback accurately previews a missing custom font.
5. Calculate contrast only for defined foreground/background pairs. Label failed pairs and distinguish calculated contrast from full accessibility conformance.

## HTML output

Provide theme-grouped token tables and previews, source links, alias relationships, and limitations. Use theme selectors only when multiple themes are supplied. Do not load remote fonts or assets automatically.

If token editing is requested, validate values and export stable token paths, baseline values, proposed values, and theme scope as JSON. Do not overwrite the source tokens.

## Acceptance checks

Rendered values match resolved tokens and preserve units. Unknown aliases are not replaced with plausible defaults. Check all theme controls and source mappings, and apply the foundation contract to the surrounding document.

## Example request

"Turn these design tokens into an HTML reference with light/dark swatches, type scales, and button examples."
