import assert from "node:assert/strict";
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = path => readFileSync(resolve(root, path), "utf8");
const json = path => JSON.parse(read(path));
const config = json("marketplace.config.json");
const catalogs = [".claude-plugin/marketplace.json", ".github/plugin/marketplace.json"];
const sourceNames = readdirSync(resolve(root, "skills")).sort();

function contained(root, path) {
  const rel = relative(realpathSync(root), realpathSync(path));
  assert.ok(!isAbsolute(rel) && rel !== ".." && !rel.startsWith("../"), `Path escapes package: ${path}`);
}

test("both clients discover the same complete, versioned marketplace", () => {
  const claude = json(catalogs[0]);
  assert.deepEqual(claude, json(catalogs[1]));
  assert.equal(claude.name, config.name);
  assert.deepEqual(claude.owner, config.owner);
  assert.equal(claude.metadata.version, config.version);
  assert.deepEqual(claude.plugins.map(entry => entry.name).sort(), sourceNames);
  assert.deepEqual(readdirSync(resolve(root, "plugins")).sort(), sourceNames);
  for (const entry of claude.plugins) {
    assert.match(entry.source, /^\.\/plugins\/[a-z0-9-]+$/);
    assert.equal(entry.source, `./plugins/${entry.name}`);
    contained(root, resolve(root, entry.source));
    const manifest = json(`${entry.source}/plugin.json`);
    assert.equal(entry.name, manifest.name);
    assert.equal(entry.version, manifest.version);
    assert.equal(entry.description, manifest.description);
  }
});

for (const name of sourceNames) {
  test(`${name} has separate compatible manifests without component-path overrides`, () => {
    const plugin = `plugins/${name}`;
    const { $schema, ...portable } = json(`${plugin}/plugin.json`);
    assert.equal($schema, "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json");
    assert.deepEqual(portable, json(`${plugin}/.claude-plugin/plugin.json`));
    assert.deepEqual(Object.keys(portable).sort(), ["author", "description", "name", "repository", "version"]);
    assert.match(portable.name, /^(?!.*(?:--|\.\.))[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/);
    assert.ok(portable.name.length <= 64);
    assert.equal(portable.name, name);
    assert.match(portable.version, /^\d+\.\d+\.\d+$/);
    assert.equal(portable.version, config.version);
    assert.deepEqual(portable.author, config.owner);
    assert.equal(portable.repository, config.repository);
    assert.ok(portable.description.length > 40 && portable.description.length <= 1024);
    assert.deepEqual(readdirSync(resolve(root, plugin, "skills")), [name]);
  });

  test(`${name} works when copied alone, with original instructions and local resources`, () => {
    const temporary = mkdtempSync(join(tmpdir(), "html-skills-package-"));
    try {
      const installed = join(temporary, name);
      cpSync(resolve(root, "plugins", name), installed, { recursive: true });
      const skill = join(installed, "skills", name);
      const instructions = readFileSync(join(skill, "SKILL.md"), "utf8");
      const source = read(`skills/${name}/SKILL.md`);
      assert.equal(instructions, name === "html-artifact" ? source : source
        .replaceAll("../html-artifact/SKILL.md", "./foundation/INSTRUCTIONS.md")
        .replaceAll("../html-artifact/", "./foundation/"));
      assert.doesNotMatch(instructions, /\.\.\/html-artifact\//);
      const foundation = name === "html-artifact" ? skill : join(skill, "foundation");
      for (const path of ["SKILL.md", "assets/artifact.html", "references/contract.md", "tests/artifact.test.mjs"]) {
        const installedPath = join(foundation, path === "SKILL.md" && name !== "html-artifact" ? "INSTRUCTIONS.md" : path);
        assert.deepEqual(readFileSync(installedPath), readFileSync(resolve(root, "skills/html-artifact", path)));
        contained(installed, installedPath);
      }
      if (name !== "html-artifact") {
        assert.ok(!existsSync(join(foundation, "SKILL.md")), "Bundled foundation must not register another skill");
        for (const match of instructions.matchAll(/`(\.\/foundation\/[^`]+)`/g)) {
          contained(installed, resolve(skill, match[1]));
        }
      }
      for (const match of readFileSync(join(foundation, name === "html-artifact" ? "SKILL.md" : "INSTRUCTIONS.md"), "utf8")
        .matchAll(/`((?:assets|references|tests)\/[^`]+)`/g)) {
        const target = resolve(foundation, match[1]);
        assert.ok(existsSync(target));
        contained(installed, target);
      }
    } finally {
      rmSync(temporary, { recursive: true, force: true });
    }
  });
}
