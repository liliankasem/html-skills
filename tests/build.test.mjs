import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));

test("generation detects and repairs drift without silently removing obsolete packages", () => {
  const temporary = mkdtempSync(join(tmpdir(), "html-skills-build-"));
  try {
    for (const path of ["skills", "scripts", "marketplace.config.json"]) {
      cpSync(join(root, path), join(temporary, path), { recursive: true });
    }
    const run = (...args) => {
      const result = spawnSync(process.execPath, ["scripts/build-marketplace.mjs", ...args], {
        cwd: temporary, encoding: "utf8"
      });
      if (result.error) throw result.error;
      return result;
    };
    const build = run();
    assert.equal(build.status, 0, build.stderr);
    assert.equal(run("--check").status, 0);

    const changed = [
      ".github/plugin/marketplace.json",
      "plugins/repository-guide/.claude-plugin/plugin.json",
      "plugins/html-artifact/skills/html-artifact/assets/artifact.html"
    ];
    const originals = changed.map(path => readFileSync(join(temporary, path)));
    for (const path of changed) writeFileSync(join(temporary, path), "stale");
    const check = run("--check");
    assert.notEqual(check.status, 0);
    for (const path of changed) {
      assert.ok(check.stderr.includes(path), `Missing drift diagnostic: ${path}`);
      assert.equal(readFileSync(join(temporary, path), "utf8"), "stale", "--check must not write");
    }
    assert.equal(run().status, 0);
    assert.equal(run("--check").status, 0);
    changed.forEach((path, index) => assert.deepEqual(readFileSync(join(temporary, path)), originals[index]));

    const obsolete = "plugins/repository-guide/obsolete.txt";
    writeFileSync(join(temporary, obsolete), "keep until explicitly removed");
    const rebuild = run();
    assert.notEqual(rebuild.status, 0);
    assert.ok(rebuild.stderr.includes(obsolete));
    assert.equal(readFileSync(join(temporary, obsolete), "utf8"), "keep until explicitly removed");

    rmSync(join(temporary, "skills/html-artifact"), { recursive: true });
    const missing = run();
    assert.notEqual(missing.status, 0);
    assert.match(missing.stderr, /Missing shared html-artifact foundation/);
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
