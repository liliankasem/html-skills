---
name: animation-playground
description: Build an HTML animation prototype with tunable timing, easing, and transition parameters plus export. Use when the user wants to compare or fine-tune motion interactively before coding it into a product.
---

# Animation Playground

Help the reader choose motion parameters through controlled, repeatable previews.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Replace the workspace in `../html-artifact/assets/artifact.html` with artifact kind `prototype` and an animation-specific schema.

## Inputs

Identify the trigger, initial/final states, target platform, adjustable parameters, and any existing motion tokens. Preserve user-specified timing and visual requirements.

## Workflow

1. Model the sequence explicitly: trigger, delays, transitions, completion, cancellation, and repeated activation. Preserve baseline parameters separately from current values.
2. Add labeled controls for relevant duration, delay, easing, scale, color, and other parameters. Show units and define bounds.
3. Provide a play/replay action and a stop/reset action. Prevent duplicate overlapping runs unless overlap is part of the behavior being explored.
4. Respect reduced-motion preferences with a static or shortened alternative. Do not silently override the preference or autoplay a continuous loop.
5. Explain the target-platform mapping. Do not claim a CSS cubic-bezier curve is equivalent to a spring's stiffness/damping parameters.

## HTML output

Include the preview, sequence explanation, parameter controls, and a reduced-motion alternative. Export JSON and a handoff prompt with initial/final states, trigger, property units, timing/easing representation, baseline parameters, and current values.

## Acceptance checks

Test boundary values, repeated activation, stopping mid-animation, reset, and reduced-motion behavior. Ensure the exported parameters reproduce the selected sequence in the declared model. Apply the foundation contract and avoid flashing content.

## Example request

"Prototype this button's click animation with timing and easing controls and a copy-parameters button."
