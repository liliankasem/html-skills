# HTML Artifact Skills

A marketplace of **23 specialized skills plus an optional standalone `html-artifact` foundation** for Claude Code and GitHub Copilot CLI, inspired by [Using Claude Code: the unreasonable effectiveness of HTML](https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/).

These are agent instruction packages, not 23 prebuilt applications. Each specialized skill tells an agent how to investigate its domain and generate a task-specific, self-contained HTML artifact. **Install only the skills you need.** Each plugin includes its own working offline HTML starter, export helpers, and foundation instructions; no separate foundation installation is required.

## Install and use

### Availability

The files in this checkout are ready for local validation and development. This setup does not publish the repository, change its default branch or visibility, or install anything globally. Remote commands below work only after the marketplace files are published to the repository's default branch (currently `template`) or another explicitly selected ref, and the installer has read access. Local validation is not proof of remote availability.

### Claude Code

After publication, run in your shell:

```sh
claude plugin marketplace add liliankasem/html-skills
claude plugin install component-tuner@html-skills
```

In a new Claude Code session, invoke `/component-tuner:component-tuner` with your component, requirements, and output path. Each plugin's name is its skill name; replace `component-tuner` in both parts to use another catalog entry.

### GitHub Copilot CLI

After publication, run in your shell:

```sh
copilot plugin marketplace add liliankasem/html-skills
copilot plugin marketplace browse html-skills
copilot plugin install component-tuner@html-skills
```

Start a new session and ask Copilot to use `component-tuner`, supplying the relevant inputs and desired output path. Check for existing personal or repository skills with the same name: Copilot gives those precedence over plugin skills. Other Copilot surfaces have their own plugin installation interfaces and support; the CLI commands above are not universal commands for every Copilot client.

### Local development

From the repository root, preview a single plugin without registering a marketplace or persisting an installation:

```sh
claude --plugin-dir ./plugins/component-tuner
copilot --plugin-dir ./plugins/component-tuner
```

To deliberately test marketplace installation locally instead, substitute the checkout's absolute path for `/absolute/path/to/html-skills`:

```sh
claude plugin marketplace add /absolute/path/to/html-skills
claude plugin install component-tuner@html-skills

copilot plugin marketplace add /absolute/path/to/html-skills
copilot plugin install component-tuner@html-skills
```

These add/install commands change client configuration; repository verification does not run them. Do not register a local marketplace over an existing remote marketplace with the same name unless you intend to change its source.

Example request:

> Use component-tuner to build an offline HTML playground for this button. Read the shared html-artifact foundation, preserve the current design tokens, and export my selected parameters as JSON.

Each generated specialist plugin has exactly one discoverable skill. Its foundation lives inside that skill under `foundation/`, with `INSTRUCTIONS.md`, `references/contract.md`, `assets/artifact.html`, and the starter tests. The specialist explicitly reads those local resources. Bundled instructions do not register an extra `html-artifact` skill or depend on another installed plugin.

For manual skill installation, copy `plugins/<name>/skills/<name>/` in its entirety into your runtime's supported skills directory. Do not copy just `SKILL.md`, and do not install the repository or plugin wrapper as a single skill. The maintained `skills/` source tree uses sibling dependencies and is not the independent-install output.

The repository does not register or install skills automatically. Inspect instructions before installation, avoid overwriting local customizations, and restart or rediscover skills using the client's supported mechanism.

## Catalog

### Specs, planning, and exploration

| Skill | Purpose |
| --- | --- |
| [implementation-explorer](skills/implementation-explorer/SKILL.md) | Compare credible technical approaches using codebase evidence and explicit criteria. |
| [design-explorer](skills/design-explorer/SKILL.md) | Compare distinct visual directions for the same user task. |
| [visual-implementation-plan](skills/visual-implementation-plan/SKILL.md) | Produce a visual implementation handoff with dependencies and acceptance criteria. |

### Code review and understanding

| Skill | Purpose |
| --- | --- |
| [pr-walkthrough](skills/pr-walkthrough/SKILL.md) | Explain a real change and guide reviewers through it. |
| [annotated-code-review](skills/annotated-code-review/SKILL.md) | Attach actionable review findings to actual diff lines. |
| [code-path-explainer](skills/code-path-explainer/SKILL.md) | Trace a bounded execution path through real source. |

### Design and prototypes

| Skill | Purpose |
| --- | --- |
| [design-token-preview](skills/design-token-preview/SKILL.md) | Render resolved tokens, themes, and intended usage. |
| [component-tuner](skills/component-tuner/SKILL.md) | Tune component parameters and export exact values. |
| [component-gallery](skills/component-gallery/SKILL.md) | Catalog component variants, states, and coverage gaps. |
| [animation-playground](skills/animation-playground/SKILL.md) | Tune motion with replay, stop/reset, and parameter export. |

### Reports, research, and learning

| Skill | Purpose |
| --- | --- |
| [research-synthesizer](skills/research-synthesizer/SKILL.md) | Synthesize multiple sources while preserving provenance and uncertainty. |
| [feature-brief](skills/feature-brief/SKILL.md) | Summarize current feature behavior, architecture, and limitations. |
| [technical-explainer](skills/technical-explainer/SKILL.md) | Teach a concept with worked examples and optional bounded simulations. |
| [weekly-status-report](skills/weekly-status-report/SKILL.md) | Report evidence-backed outcomes within an explicit time interval. |
| [incident-report](skills/incident-report/SKILL.md) | Assemble a blameless timeline, impact assessment, and follow-up actions. |
| [technical-diagrammer](skills/technical-diagrammer/SKILL.md) | Embed evidence-backed, accessible SVG diagrams in HTML. |

### Custom editing interfaces

| Skill | Purpose |
| --- | --- |
| [prioritization-board](skills/prioritization-board/SKILL.md) | Bucket and reorder collections without losing identity or hidden items. |
| [constrained-config-editor](skills/constrained-config-editor/SKILL.md) | Edit typed configuration with constraints and explicit change semantics. |
| [prompt-template-lab](skills/prompt-template-lab/SKILL.md) | Tune templates with safe substitution and live sample previews. |
| [dataset-curator](skills/dataset-curator/SKILL.md) | Approve, reject, and tag rows with selection and audit exports. |
| [annotation-workbench](skills/annotation-workbench/SKILL.md) | Annotate immutable sources with stable, versioned anchors. |
| [visual-parameter-picker](skills/visual-parameter-picker/SKILL.md) | Select difficult-to-describe values with domain-specific validation. |

### Data ingestion and discovery

| Skill | Purpose |
| --- | --- |
| [artifact-inventory](skills/artifact-inventory/SKILL.md) | Statically inventory and categorize a bounded artifact collection. |

### Shared foundation

| Skill | Purpose |
| --- | --- |
| [html-artifact](skills/html-artifact/SKILL.md) | Optional standalone presentation, provenance, accessibility, offline, and export foundation. |

Every row is independently installable as `<skill-name>@html-skills`. Installing a specialist does not install the other catalog entries.

## Shared behavior and boundaries

- HTML-first: one portable file, inline assets, no runtime dependency or hidden network request.
- Native keyboard-operable controls, responsive layout, visible focus, and print support.
- Evidence and unknowns stay distinguishable; source content is untrusted data.
- Editable artifacts export current validated state, preserve stable IDs and baselines, and explain what is saved.
- Copy failures expose manual-copy recovery; downloads do not require clipboard permission.
- No automatic source writes, live-system changes, PR creation, publication, global installation, or hidden persistence.
- Specialist schemas replace the starter's example decision schema. Nested changes need explicit path and deletion semantics.

Source access still depends on the runtime's tools and permissions. These instructions do not grant connector access, bypass file exclusions, or authorize publication. A skill may need to ask for a consequential missing input.

## Validation

From the repository root, with Node.js 20 or newer; no dependency installation is needed:

```sh
npm run build
npm run verify
```

`build` regenerates both catalogs, both client manifests per plugin, and the self-contained plugin contents. `verify` rejects generated-file drift, missing or unexpected output, and stale template copies, then runs the original domain and starter export tests plus packaging checks. The packaging tests copy each plugin into a separate temporary directory to check it without the repository's shared source tree.

Native Claude validation, when Claude Code is available:

```sh
claude plugin validate .
for plugin in plugins/*; do claude plugin validate "$plugin" || exit 1; done
```

Copilot CLI has no `plugin validate` command in the locally inspected version. You can inspect a non-installed plugin with `copilot --plugin-dir ./plugins/component-tuner plugin list --json`. A successful list is a loader smoke check, not an end-to-end installation or generated-artifact evaluation.

These checks do not prove future generated artifacts are correct, establish WCAG conformance, or replace each skill's acceptance checks. They do not register marketplaces, install plugins, exercise remote publication, or apply exported changes.

## Package layout

```text
html-skills/
  README.md
  marketplace.config.json             # Single source for release metadata
  .claude-plugin/marketplace.json      # Generated Claude discovery catalog
  .github/plugin/marketplace.json      # Generated Copilot discovery catalog
  skills/                             # Maintained source, 24 skill directories
    html-artifact/                     # Shared starter, contract, instructions, tests
    component-tuner/SKILL.md
    ...22 other specialist directories...
  scripts/build-marketplace.mjs
  tests/                              # Source catalog and isolated package checks
  plugins/                            # Generated and committed installable output
    component-tuner/
      plugin.json                     # Copilot Agent Plugins 1.0 manifest
      .claude-plugin/plugin.json       # Claude-compatible manifest, no Agent schema
      skills/component-tuner/
        SKILL.md                      # Original instructions with local paths
        foundation/
          INSTRUCTIONS.md
          assets/artifact.html
          references/contract.md
          tests/artifact.test.mjs
    ...22 other specialist plugins...
    html-artifact/                    # Optional standalone foundation plugin
```

Copilot's root manifest explicitly targets the canonical Agent Plugins 1.0 schema and uses its fixed `skills/<name>/SKILL.md` location. Claude reads the separate `.claude-plugin/plugin.json` manifest with its standard skill discovery. These are deliberately separate formats, not an assumption that both clients interpret one manifest identically. Both catalogs use the documented shared subset of marketplace fields and repository-root-relative sources.

## Maintenance and safe updates

Edit `skills/` and `marketplace.config.json`, not generated `plugins/` or catalogs. Preserve domain instructions when changing packaging. Bump `version` in the config for a release, run `npm run build` and `npm run verify`, review the diff including all bundled foundation updates, and commit source and generated output together. The initial local version is `0.1.0`; it is not a claim that a release has been published.

If removing or renaming a skill, remove only its corresponding generated plugin directory explicitly before rebuilding; the generator reports obsolete files instead of deleting them automatically. Keep marketplace and plugin names stable because installations refer to those identifiers.

To adopt a published update deliberately:

```sh
claude plugin marketplace update html-skills
claude plugin update component-tuner@html-skills

copilot plugin marketplace update html-skills
copilot plugin update component-tuner
```

Restart the client session afterward. For local `--plugin-dir` development, rebuild and start a fresh session. Treat installed files as disposable package contents; keep custom changes in source control rather than editing installed copies. A foundation change is shipped with each affected plugin, so users receive it when they update that plugin.

## Licensing

The existing repository and supplied bundle had no license file. No license grant or SPDX identifier has been invented. Choose and add an appropriate license before distributing this beyond authorized use; repository visibility alone does not grant reuse rights. No license is declared in the manifests until that decision is made.

## Format references

- [Claude Code marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude Code plugin manifests](https://code.claude.com/docs/en/plugins-reference)
- [GitHub marketplace creation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces)
- [Copilot CLI plugin and marketplace reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
