---
name: component-tuner
description: Build an offline HTML playground for tuning a component's appearance and behavior with parameter export. Use when the user wants sliders, toggles, or selectors to adjust a component before implementation.
---

# Component Tuner

Expose meaningful component parameters and return the chosen values to the implementation workflow.

## Shared foundation

Read `../html-artifact/SKILL.md` and `../html-artifact/references/contract.md`. Replace the example editor in `../html-artifact/assets/artifact.html`; use artifact kind `prototype`. Reuse export handling but replace the sample decision schema.

## Inputs

Identify the component, current implementation or specification, platform, editable parameters, and invariants. Define units, bounds, defaults, and allowed enum values from the actual component.

## Workflow

1. Inspect the component and existing design tokens. Separate adjustable parameters from fixed behavior and constraints.
2. Build an HTML approximation or faithful local rendering. State differences when the target is React, Swift, or another runtime.
3. Add labeled native controls with numeric alternatives for sliders. Bind every control to one validated state model.
4. Show meaningful states such as idle, hover, focus, disabled, busy, and error where relevant. Simulated actions must not call live services.
5. Provide baseline reset, current-value preview, and export of the selected configuration.

## HTML output

Include the preview, parameter controls, state selectors, constraints, and limitations. Export JSON and a handoff prompt containing component identity, stable parameter keys, units, baseline, current values, and changed fields.

Export formatting must match the downstream component's parameter vocabulary. Do not substitute CSS values for native-platform properties without explaining the mapping.

## Acceptance checks

Test each control at minimum, maximum, and default; reject invalid combinations. Verify exports match the rendered state, reset is complete, and keyboard users can reach every control. Apply the foundation contract and respect reduced motion.

## Example request

"Make an HTML playground to tune this checkout button's radius, padding, colors, and busy state."
