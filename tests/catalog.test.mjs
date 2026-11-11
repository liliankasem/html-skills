import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const repo = fileURLToPath(new URL("../", import.meta.url));
const root = resolve(repo, "skills");
const expected = [
  "implementation-explorer", "design-explorer", "visual-implementation-plan",
  "pr-walkthrough", "annotated-code-review", "code-path-explainer",
  "design-token-preview", "component-tuner", "component-gallery", "animation-playground",
  "research-synthesizer", "feature-brief", "technical-explainer", "weekly-status-report",
  "incident-report", "technical-diagrammer", "prioritization-board",
  "constrained-config-editor", "prompt-template-lab", "dataset-curator",
  "annotation-workbench", "visual-parameter-picker", "artifact-inventory"
];
const read = name => readFileSync(resolve(root, name, "SKILL.md"), "utf8");
const readme = readFileSync(resolve(repo, "README.md"), "utf8");
const discovered = readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && existsSync(resolve(root, entry.name, "SKILL.md")))
  .map(entry => entry.name);

test("bundle includes exactly the 23 proposed specialists and shared foundation", () => {
  assert.equal(expected.length, 23);
  assert.deepEqual(discovered.sort(), [...expected, "html-artifact"].sort());
});

for (const name of [...expected, "html-artifact"]) {
  test(`${name} has discoverable, bounded skill metadata`, () => {
    const text = read(name);
    const match = text.match(/^---\nname: ([a-z0-9-]+)\ndescription: ([^\n]+)\n---\n/);
    assert.ok(match, "Missing simple YAML frontmatter");
    assert.equal(match[1], name);
    assert.ok(name.length <= 64);
    assert.ok(match[2].length > 40 && match[2].length <= 1024);
    assert.doesNotMatch(match[2], /: /, "Quote descriptions if adding YAML mapping delimiters");
    assert.match(match[2], /HTML/);
    assert.ok(text.split("\n").length < 500);
  });
}

for (const name of expected) {
  test(`${name} composes the actual foundation and defines a complete workflow`, () => {
    const text = read(name);
    for (const path of [
      "../html-artifact/SKILL.md",
      "../html-artifact/references/contract.md",
      "../html-artifact/assets/artifact.html"
    ]) {
      assert.ok(text.includes(`\`${path}\``), `Missing dependency: ${path}`);
      assert.ok(existsSync(resolve(root, name, path)), `Unresolvable dependency: ${path}`);
    }
    for (const heading of ["Shared foundation", "Inputs", "Workflow", "HTML output", "Acceptance checks", "Example request"]) {
      assert.ok(text.includes(`## ${heading}\n`), `Missing section: ${heading}`);
    }
    assert.match(text, /artifact kind `(?:plan|review|explainer|report|prototype|editor|catalog)`/);
    assert.ok((text.match(/^\d\. /gm) || []).length >= 4);
    assert.ok(text.split(/\s+/).length >= 200, "Skill is only a placeholder");
  });
}

test("README catalogs every skill once and all local links resolve", () => {
  for (const name of [...expected, "html-artifact"]) {
    assert.equal(readme.split(`](skills/${name}/SKILL.md)`).length - 1, 1, `Catalog entry: ${name}`);
  }
  for (const match of readme.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https:\/\//.test(match[1])) continue;
    assert.ok(existsSync(resolve(repo, match[1])), `Broken link: ${match[1]}`);
  }
  assert.match(readme, /does not register or install skills automatically/);
  assert.match(readme, /not 23 prebuilt applications/);
});

test("editing skills require explicit export and acceptance checks", () => {
  for (const name of [
    "component-tuner", "animation-playground", "prioritization-board",
    "constrained-config-editor", "prompt-template-lab", "dataset-curator",
    "annotation-workbench", "visual-parameter-picker"
  ]) {
    const text = read(name);
    assert.match(text, /export/i);
    assert.match(text, /JSON/);
    assert.match(text, /baseline/i);
    assert.match(text, /keyboard|native/i);
  }
});

test("domain contracts cover high-risk semantic edge cases", () => {
  const contracts = {
    "annotated-code-review": [/actual escaped diff/, /revision side/, /failure path/],
    "weekly-status-report": [/start-inclusive\/end-exclusive/, /Deduplicate/, /open PR with a shipped feature/],
    "constrained-config-editor": [/absent, null, false, zero/, /prototype-pollution/, /add\/replace\/remove/],
    "prompt-template-lab": [/non-recursive substitution/, /token counts as estimates/, /never executable markup/],
    "dataset-curator": [/approve\/reject\/unreviewed/, /spreadsheet-formula injection/, /audit manifest/],
    "annotation-workbench": [/revision or content digest/, /offset units/, /stale-source detection/],
    "visual-parameter-picker": [/dialect, timezone/, /terminable worker/, /DST behavior/],
    "artifact-inventory": [/Do not run scripts/, /symlinks outside scope/, /content digests/]
  };
  for (const [name, patterns] of Object.entries(contracts)) {
    for (const pattern of patterns) assert.match(read(name), pattern, `${name}: ${pattern}`);
  }
});

test("foundation's documented local assets exist", () => {
  const base = resolve(root, "html-artifact", "SKILL.md");
  for (const path of ["assets/artifact.html", "references/contract.md", "tests/artifact.test.mjs"]) {
    assert.ok(existsSync(resolve(dirname(base), path)), `Missing foundation asset: ${path}`);
  }
});
