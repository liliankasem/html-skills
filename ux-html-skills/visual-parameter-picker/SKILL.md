---
name: visual-parameter-picker
description: Build a focused HTML picker for values difficult to express in prose, such as colors, easing curves, crop regions, cron schedules, or regexes. Use when the user wants domain-specific preview and exact-value export.
---

# Visual Parameter Picker

Build one task-specific picker, not an unrelated collection of utilities.

## Shared foundation

Load the shared `html-artifact` skill (`html-artifact:html-artifact` for Claude plugin installs, otherwise `html-artifact`) before generating HTML. Read its `references/contract.md` and resolve `assets/artifact.html` relative to that loaded skill's actual directory, never this specialist or a guessed plugin-cache path. If unavailable, stop and request installation/enabling of `html-artifact@html-skills`; do not invent a fallback or install anything automatically.

Replace the workspace in the foundation's `assets/artifact.html` with artifact kind `editor` and a domain-specific schema.

## Inputs

Identify the value type, target consumer, baseline, constraints, units, and required preview. Resolve consequential dialect or coordinate ambiguities before implementation.

## Workflow

1. Define a canonical value representation and validation rules matching the target consumer.
2. Pair visual controls with native text/numeric inputs so exact values and keyboard operation remain possible.
3. Implement only the relevant domain behavior:
   - Colors: declare color space and alpha handling; show exact values and chosen contrast pairs.
   - Easing: distinguish cubic-bezier from spring parameters and expose a reduced-motion alternative.
   - Crops: declare original dimensions, coordinate origin, units, and bounds; use authorized local images only.
   - Cron: declare dialect, timezone, and day-of-week semantics; do not invent timezone-aware schedules from browser-local arithmetic.
   - Regex: declare engine and flags; run potentially expensive evaluation in a terminable worker only if supported by an explicitly scoped CSP, otherwise use bounded safe validation without executing arbitrary patterns.
4. Show baseline/current comparison and reset. Reject unsupported cases explicitly rather than offering plausible but incorrect previews.

## HTML output

Export JSON and an exact-value text representation containing the value, units/dialect, constraints, and assumptions. For cron previews, label DST behavior and evaluation limits.

## Acceptance checks

Check domain boundaries and round-trip precision, preview/export agreement, invalid input, reset, and keyboard operation. Test only the selected domain and document unsupported features. Apply the foundation contract without weakening its CSP silently.

## Example request

"Build an HTML picker for this image's crop region with numeric coordinates and exact JSON export."
