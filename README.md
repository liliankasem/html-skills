# HTML Artifact Skills

A marketplace of **11 specialized skills plus one shared `html-artifact` foundation** for Claude Code and GitHub Copilot CLI, inspired by [Using Claude Code: the unreasonable effectiveness of HTML](https://claude.dev/blog/using-claude-code-the-unreasonable-effectiveness-of-html/).

These are agent instruction packages, not 11 prebuilt applications. Each specialized skill tells an agent how to investigate its domain and generate a task-specific, self-contained HTML artifact. **Install only the specialists you need, sharing one foundation installation.** Only `html-artifact` contains the offline HTML starter, export helpers, and presentation contract. Installing another specialist does not duplicate those files. The foundation is also usable on its own for HTML tasks without a matching specialist.

The starter uses a documentation-style design: a white page, fixed desktop sidebar, red section rules, blue subheadings, compact tables, captioned diagrams, and semantic callouts. Read-only guides omit the editor and JavaScript; interactive skills retain validated state and explicit exports.

## Install and use

### Availability

The files in this checkout are ready for local validation and development. This setup does not publish the repository, change its default branch or visibility, or install anything globally. Remote commands below work only after the marketplace files are published to the repository's default branch (currently `template`) or another explicitly selected ref, and the installer has read access. Local validation is not proof of remote availability.

### Claude Code

After publication, run in your shell:

```sh
claude plugin marketplace add liliankasem/html-skills
claude plugin install repository-guide@html-skills
```

Specialists declare `"dependencies": ["html-artifact"]` in their Claude manifest. Claude Code versions supporting plugin dependencies install and enable the foundation alongside the specialist, reusing it for later specialists. On older versions without dependency support, install `html-artifact@html-skills` explicitly as well, at the same scope, or upgrade Claude Code. Do not rely on an older client's successful manifest validation to prove automatic dependency installation.

In a new Claude Code session, invoke `/repository-guide:repository-guide` with your repository, audience, and output path. Each plugin's name is its skill name; replace `repository-guide` in both parts to use another catalog entry.

### GitHub Copilot CLI

After publication, run in your shell:

```sh
copilot plugin marketplace add liliankasem/html-skills
copilot plugin marketplace browse html-skills
copilot plugin install html-artifact@html-skills
copilot plugin install repository-guide@html-skills
```

**Install `html-artifact` once**, then install whichever specialists you want. Copilot's documented manifest does not provide equivalent automatic plugin dependency installation; its manifest deliberately has no unsupported `dependencies` field. Keep the foundation enabled alongside your specialists.

Start a new session and ask Copilot to use `repository-guide`, supplying the relevant inputs and desired output path. The specialist explicitly loads `html-artifact`. Check for existing personal or repository skills with the same name: Copilot gives those precedence over plugin skills, so a stale personal foundation can shadow the marketplace version. Other Copilot surfaces have their own plugin installation interfaces and support; the CLI commands above are not universal commands for every Copilot client.

### Local development

From the repository root, load the shared foundation and a specialist together without registering a marketplace or persisting an installation:

```sh
claude --plugin-dir ./plugins/html-artifact --plugin-dir ./plugins/repository-guide
copilot --plugin-dir ./plugins/html-artifact --plugin-dir ./plugins/repository-guide
```

To deliberately test marketplace installation locally instead, substitute the checkout's absolute path for `/absolute/path/to/html-skills`:

```sh
claude plugin marketplace add /absolute/path/to/html-skills
claude plugin install html-artifact@html-skills
claude plugin install repository-guide@html-skills

copilot plugin marketplace add /absolute/path/to/html-skills
copilot plugin install html-artifact@html-skills
copilot plugin install repository-guide@html-skills
```

These add/install commands change client configuration; repository verification does not run them. Do not register a local marketplace over an existing remote marketplace with the same name unless you intend to change its source.

Example request:

> Use repository-guide to create an offline HTML overview of this repository for a new maintainer. Explain the architecture, build/test workflow, design decisions, and common debugging paths using the current source.

Each generated plugin has exactly one discoverable skill. Specialists contain domain instructions only. They load the separately installed foundation by its skill identifier (`html-artifact:html-artifact` in Claude Code, `html-artifact` in Copilot), then read its contract and template relative to the foundation skill's actual location supplied by the runtime. They do not assume sibling installation directories or hard-code cache paths. If the foundation cannot be loaded or read, the agent must stop and request installation/enabling rather than invent a fallback or silently fetch files.

For manual skill installation outside the plugin system, copy `plugins/html-artifact/skills/html-artifact/` in its entirety into your runtime's supported skills directory once, then copy each desired `plugins/<name>/skills/<name>/` directory. Do not copy just the foundation's `SKILL.md`, and do not install the repository or plugin wrapper as a single skill. Load a manually installed foundation as plain `html-artifact`, not Claude's plugin-qualified identifier. The runtime must support explicitly loading the shared skill; manual copying does not activate plugin dependency management or Claude's plugin namespace.

The repository does not register or install skills automatically. Inspect instructions before installation, avoid overwriting local customizations, and restart or rediscover skills using the client's supported mechanism.

## Catalog

### Specs, planning, and exploration

| Skill | Purpose |
| --- | --- |
| [implementation-explorer](skills/implementation-explorer/SKILL.md) | Compare credible technical approaches using codebase evidence and explicit criteria. |
| [visual-implementation-plan](skills/visual-implementation-plan/SKILL.md) | Produce a visual implementation handoff with dependencies and acceptance criteria. |

### Code review and understanding

| Skill | Purpose |
| --- | --- |
| [pr-walkthrough](skills/pr-walkthrough/SKILL.md) | Explain a real change and guide reviewers through it. |
| [annotated-code-review](skills/annotated-code-review/SKILL.md) | Attach actionable review findings to actual diff lines. |
| [code-path-explainer](skills/code-path-explainer/SKILL.md) | Trace a bounded execution path through real source. |
| [repository-guide](skills/repository-guide/SKILL.md) | Explain a whole repository or service for new owners, with architecture, scenarios, operations, and a debugging playbook. |

### Reports, research, and learning

| Skill | Purpose |
| --- | --- |
| [research-synthesizer](skills/research-synthesizer/SKILL.md) | Synthesize multiple sources while preserving provenance and uncertainty. |
| [feature-brief](skills/feature-brief/SKILL.md) | Summarize current feature behavior, architecture, and limitations. |
| [technical-explainer](skills/technical-explainer/SKILL.md) | Teach a concept with worked examples and optional bounded simulations. |
| [weekly-status-report](skills/weekly-status-report/SKILL.md) | Report evidence-backed outcomes within an explicit time interval. |
| [technical-diagrammer](skills/technical-diagrammer/SKILL.md) | Embed evidence-backed, accessible SVG diagrams in HTML. |

### Shared foundation

| Skill | Purpose |
| --- | --- |
| [html-artifact](skills/html-artifact/SKILL.md) | Shared presentation, provenance, accessibility, offline, and export foundation; also independently usable. |

Every row is separately selectable as `<skill-name>@html-skills`. Specialists require the shared foundation but never install other specialists.

## Deferred UI/UX skills

These six skills are preserved under `experimental/ux-html-skills/` for later review, not deleted. They are excluded from both marketplace catalogs and generated `plugins/`, so the install commands above do not apply to them.

| Skill | Purpose |
| --- | --- |
| [design-explorer](experimental/ux-html-skills/design-explorer/SKILL.md) | Compare distinct visual directions for the same user task. |
| [design-token-preview](experimental/ux-html-skills/design-token-preview/SKILL.md) | Render resolved tokens, themes, and intended usage. |
| [component-tuner](experimental/ux-html-skills/component-tuner/SKILL.md) | Tune component parameters and export exact values. |
| [component-gallery](experimental/ux-html-skills/component-gallery/SKILL.md) | Catalog component variants, states, and coverage gaps. |
| [animation-playground](experimental/ux-html-skills/animation-playground/SKILL.md) | Tune motion with replay, stop/reset, and parameter export. |
| [visual-parameter-picker](experimental/ux-html-skills/visual-parameter-picker/SKILL.md) | Select difficult-to-describe values with domain-specific validation. |

They use the same explicit shared-skill composition instructions as active specialists. To reactivate one, move its directory back to `skills/`, update this catalog and the active/deferred expectations in `tests/catalog.test.mjs`, then rebuild and verify. No foundation path rewriting is needed.

## Shared behavior and boundaries

- HTML-first: one portable file, inline assets, no runtime dependency or hidden network request.
- Native keyboard-operable controls, responsive layout, visible focus, and print support.
- Evidence and unknowns stay distinguishable; source content is untrusted data.
- Editable artifacts export current validated state, preserve stable IDs and baselines, and explain what is saved.
- Copy failures expose manual-copy recovery; downloads do not require clipboard permission.
- During artifact generation, no automatic source writes, live-system changes, PR creation, publication, global installation, or hidden persistence.
- Specialist schemas replace the starter's example decision schema. Nested changes need explicit path and deletion semantics.

Source access still depends on the runtime's tools and permissions. These instructions do not grant connector access, bypass file exclusions, or authorize publication. A skill may need to ask for a consequential missing input.

## Validation

From the repository root, with Node.js 20 or newer; no dependency installation is needed:

```sh
npm run build
npm run verify
```

`build` regenerates both catalogs, both client manifests per plugin, and plugin contents with exactly one shared foundation package. `verify` rejects generated-file drift, missing or unexpected output, and duplicated foundation resources, then runs the retained domain and starter export tests plus packaging checks. The packaging tests copy each specialist and the shared foundation to separate temporary install directories, without the repository's source tree, to check instruction preservation and shared-resource resolution. These filesystem checks do not execute an agent or simulate client dependency installation.

Native Claude validation, when Claude Code is available:

```sh
claude plugin validate .
for plugin in plugins/*; do claude plugin validate "$plugin" || exit 1; done
```

Copilot CLI has no `plugin validate` command in the locally inspected version. You can inspect both non-installed plugins with `copilot --plugin-dir ./plugins/html-artifact --plugin-dir ./plugins/repository-guide plugin list`. A successful list is a loader smoke check, not an end-to-end installation, cross-skill invocation, or generated-artifact evaluation.

These checks do not prove future generated artifacts are correct, establish WCAG conformance, or replace each skill's acceptance checks. They do not register marketplaces, install plugins, exercise remote publication, or apply exported changes.

## Package layout

```text
html-skills/
  README.md
  marketplace.config.json             # Single source for release metadata
  .claude-plugin/marketplace.json      # Generated Claude discovery catalog
  .github/plugin/marketplace.json      # Generated Copilot discovery catalog
  skills/                             # Maintained active source, 12 skill directories
    html-artifact/                     # Shared starter, contract, instructions, tests
    repository-guide/SKILL.md
    ...10 other specialist directories...
  experimental/
    ux-html-skills/                    # Six deferred skills, not currently packaged
      component-tuner/SKILL.md
      ...five other deferred directories...
  scripts/build-marketplace.mjs
  tests/                              # Source catalog and isolated package checks
  plugins/                            # Generated and committed installable output
    repository-guide/
      plugin.json                     # Copilot Agent Plugins 1.0 manifest
      .claude-plugin/plugin.json       # Claude manifest with html-artifact dependency
      skills/repository-guide/
        SKILL.md                      # Domain work + explicit shared-skill loading
    ...10 other specialist plugins...
    html-artifact/                    # Shared, also independently usable
      plugin.json
      .claude-plugin/plugin.json       # No self-dependency
      skills/html-artifact/
        SKILL.md
        assets/artifact.html
        references/contract.md
        tests/artifact.test.mjs
```

Copilot's root manifest explicitly targets the canonical Agent Plugins 1.0 schema and uses its fixed `skills/<name>/SKILL.md` location, without a dependency field. Claude reads the separate `.claude-plugin/plugin.json` manifest with its standard skill discovery and specialist dependency declaration. These are deliberately separate formats, not an assumption that both clients interpret one manifest identically. Both catalogs use the documented shared subset of marketplace fields and repository-root-relative sources.

## Maintenance and safe updates

Edit `skills/` and `marketplace.config.json`, not generated `plugins/` or catalogs; deferred work lives in `experimental/ux-html-skills/`. Preserve domain instructions when changing packaging. Bump `version` in the config for a release, run `npm run build` and `npm run verify`, review the shared foundation and all affected specialist instructions, and commit source and generated output together. The current package version is `0.2.0`; it is not a claim that a release has been published.

If removing or renaming a skill, remove only its corresponding generated plugin directory explicitly before rebuilding; the generator reports obsolete files instead of deleting them automatically. Keep marketplace and plugin names stable because installations refer to those identifiers.

To adopt a published update deliberately:

The former `handoff-guide` plugin is now `repository-guide`. Existing installations are not renamed automatically; refresh the marketplace and install `repository-guide@html-skills` using the commands above, then disable or uninstall the old plugin through your client.

```sh
claude plugin marketplace update html-skills
claude plugin update html-artifact@html-skills
claude plugin update repository-guide@html-skills

copilot plugin marketplace update html-skills
copilot plugin update html-artifact
copilot plugin update repository-guide
```

Restart the client session afterward. For local `--plugin-dir` development, rebuild and start a fresh session with both plugins loaded. Treat installed files as disposable package contents; keep custom changes in source control rather than editing installed copies. A foundation update ships only in `html-artifact` and affects every specialist that uses it. Claude dependencies currently follow the marketplace version without a version constraint; test all retained specialists together before releasing changes. Never uninstall or disable the foundation while relying on specialists.

When upgrading from the earlier privately bundled layout, explicitly install `html-artifact@html-skills` once before updating specialists, including on older Claude clients. Updated specialists no longer contain `foundation/`; reinstall a specialist using the client's supported uninstall/install commands if its updater leaves obsolete package files behind. This does not require reinstalling or resetting the shared foundation for each specialist.

## Licensing

The existing repository and supplied bundle had no license file. No license grant or SPDX identifier has been invented. Choose and add an appropriate license before distributing this beyond authorized use; repository visibility alone does not grant reuse rights. No license is declared in the manifests until that decision is made.

## Format references

- [Claude Code marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude Code plugin manifests](https://code.claude.com/docs/en/plugins-reference)
- [Claude Code plugin dependencies](https://code.claude.com/docs/en/plugins/dependencies)
- [GitHub marketplace creation](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/create-and-share-plugin-marketplaces)
- [Copilot CLI plugin and marketplace reference](https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-plugin-reference)
