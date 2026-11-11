---
name: prompt-template-lab
description: Create an HTML prompt or text-template editor with highlighted variables, live sample previews, and export. Use when the user wants to tune a prompt or template against concrete examples without live model calls.
---

# Prompt Template Lab

Make template substitution visible while keeping template editing separate from model evaluation.

## Shared foundation

Read `./foundation/INSTRUCTIONS.md` and `./foundation/references/contract.md`. Replace the editor in `./foundation/assets/artifact.html`; use artifact kind `editor` and a template-specific data model.

## Inputs

Use the current template, declared variable syntax, sample inputs, required variables, and target consumer. Do not insert credentials or private sample data into a shareable artifact.

## Workflow

1. Define the supported grammar explicitly, such as literal `{{name}}` substitution. Do not silently interpret expressions, loops, includes, or arbitrary JavaScript.
2. Preserve the baseline template and sample identities. Render template and sample values as text, never executable markup.
3. Provide an accessible editor and live filled previews for supplied samples. Highlight variables without replacing the labeled native editing surface with an inaccessible custom widget.
4. Distinguish missing variables, unused variables, empty strings, and malformed placeholders. Avoid recursive substitution unless required and documented.
5. Show character counts with the counting convention. Label token counts as estimates unless an exact target tokenizer is actually available offline.

## HTML output

Include side-by-side or stacked editing and previews, grammar help, errors, and current counts. Export the raw template, variable declarations, sample fixtures, and baseline/current changes as JSON and plain text.

Do not claim better model quality from template preview alone. No model calls, evaluation charges, or remote tokenization unless separately authorized.

## Acceptance checks

Test repeated/missing variables, literal braces, Unicode, HTML-looking text, multiline samples, and non-recursive substitution. Confirm previews and exports use current edits and apply the foundation contract.

## Example request

"Make an HTML lab for this system prompt with three live sample renderings and an estimated token counter."
