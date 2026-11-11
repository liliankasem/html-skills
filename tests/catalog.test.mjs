import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const repo = fileURLToPath(new URL("../", import.meta.url));
const root = resolve(repo, "skills");
const expected = [
  "implementation-explorer", "visual-implementation-plan",
  "pr-walkthrough", "annotated-code-review", "code-path-explainer",
  "research-synthesizer", "feature-brief", "technical-explainer", "weekly-status-report",
  "technical-diagrammer", "handoff-guide"
];
const deferred = ["design-explorer", "design-token-preview", "component-tuner", "component-gallery", "animation-playground", "visual-parameter-picker"];
const removed = ["incident-report", "prioritization-board", "constrained-config-editor", "prompt-template-lab", "dataset-curator", "annotation-workbench", "artifact-inventory"];
const directory = name => resolve(repo, deferred.includes(name) ? "ux-html-skills" : "skills", name);
const read = name => readFileSync(resolve(directory(name), "SKILL.md"), "utf8");
const readme = readFileSync(resolve(repo, "README.md"), "utf8");
const discovered = readdirSync(root, { withFileTypes: true })
  .filter(entry => entry.isDirectory() && existsSync(resolve(root, entry.name, "SKILL.md")))
  .map(entry => entry.name);

test("catalog includes 11 active specialists, shared foundation, and six deferred UX skills", () => {
  assert.equal(expected.length, 11);
  assert.equal(deferred.length, 6);
  assert.deepEqual(discovered.sort(), [...expected, "html-artifact"].sort());
  assert.deepEqual(readdirSync(resolve(repo, "ux-html-skills")).sort(), [...deferred].sort());
  assert.ok(!existsSync(resolve(repo, "ui")), "Old deferred directory must be removed");
});

for (const name of [...expected, ...deferred, "html-artifact"]) {
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

for (const name of [...expected, ...deferred]) {
  test(`${name} composes the actual foundation and defines a complete workflow`, () => {
    const text = read(name);
    assert.match(text, /Load the shared `html-artifact` skill/);
    assert.match(text, /`html-artifact:html-artifact` for Claude plugin installs, otherwise `html-artifact`/);
    assert.match(text, /relative to that loaded skill's actual directory/);
    assert.match(text, /If unavailable, stop and request installation\/enabling/);
    assert.match(text, /do not invent a fallback or install anything automatically/);
    assert.doesNotMatch(text, /\.\.\/html-artifact\/|\.\/foundation\/|\.\.\/skills\/html-artifact\//);
    assert.ok(text.includes("`references/contract.md`"));
    assert.ok(text.includes("`assets/artifact.html`"));
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
  for (const name of deferred) {
    assert.equal(readme.split(`](ux-html-skills/${name}/SKILL.md)`).length - 1, 1, `Deferred entry: ${name}`);
  }
  for (const match of readme.matchAll(/\]\(([^)]+)\)/g)) {
    if (/^https:\/\//.test(match[1])) continue;
    assert.ok(existsSync(resolve(repo, match[1])), `Broken link: ${match[1]}`);
  }
  assert.match(readme, /does not register or install skills automatically/);
  assert.match(readme, /not 11 prebuilt applications/);
});

test("deferred skills are preserved outside both active catalogs and generated plugins", () => {
  for (const catalog of [".claude-plugin/marketplace.json", ".github/plugin/marketplace.json"]) {
    const names = JSON.parse(readFileSync(resolve(repo, catalog), "utf8")).plugins.map(plugin => plugin.name);
    for (const name of [...deferred, ...removed]) {
      assert.ok(!names.includes(name), `Inactive skill still cataloged: ${name}`);
      assert.ok(!existsSync(resolve(repo, "plugins", name)), `Inactive plugin still generated: ${name}`);
      assert.ok(!existsSync(resolve(root, name)), `Inactive skill still in active source: ${name}`);
    }
    for (const name of removed) {
      assert.ok(!existsSync(resolve(repo, "ux-html-skills", name)), `Deleted skill preserved unexpectedly: ${name}`);
    }
  }
});

test("editing skills require explicit export and acceptance checks", () => {
  for (const name of [
    "component-tuner", "animation-playground", "visual-parameter-picker"
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
    "visual-parameter-picker": [/dialect, timezone/, /terminable worker/, /DST behavior/],
    "handoff-guide": [/authority matrix/, /Docs vs code discrepancies/, /fake data only/, /Remove the starter's editor/, /no JavaScript is needed/i]
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
