import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";

const html = readFileSync(new URL("../assets/artifact.html", import.meta.url), "utf8");
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
const context = vm.createContext({ URL });
vm.runInContext(`${scripts[0][1]}\nglobalThis.core = ArtifactCore;`, context);
const core = context.core;
const baseline = { decision: "explore", notes: "" };
const metadata = {
  artifact: { id: "test", kind: "editor", title: "Test artifact" },
  sources: [{ label: "Evidence", url: "https://example.com/source" }]
};
const date = new Date("2026-01-01T00:00:00.000Z");
const serialize = (format, data = baseline) => core.serialize(format, metadata, baseline, data, date);
const plain = value => JSON.parse(JSON.stringify(value));

test("JSON exports current values, provenance, and explicit schema version", () => {
  const data = { decision: "revise", notes: "Inspect edge cases." };
  assert.deepEqual(JSON.parse(serialize("json", data)), {
    schemaVersion: 1, artifact: metadata.artifact, exportedAt: date.toISOString(),
    sources: metadata.sources, data
  });
});

test("changed-only exports preserve the baseline and omit unchanged fields", () => {
  assert.deepEqual(JSON.parse(serialize("changes")).changes, {});
  const result = JSON.parse(serialize("changes", { decision: "proceed", notes: "" }));
  assert.deepEqual(result.baseline, baseline);
  assert.deepEqual(result.changes, { decision: "proceed" });
  assert.deepEqual(plain(core.changedFields({ decision: "explore", notes: "old" }, baseline)), { notes: "" });
  assert.deepEqual(baseline, { decision: "explore", notes: "" });
});

test("text containing HTML, script terminators, Unicode, and backticks round-trips", () => {
  const data = { decision: "revise", notes: '<img src=x onerror=alert(1)> </script> ``` ````` \u00e9 \u{1f680}' };
  assert.deepEqual(JSON.parse(serialize("json", data)).data, data);
  const markdown = serialize("markdown", data);
  const match = markdown.match(/^(`{3,})json\n([\s\S]*)\n\1$/m);
  assert.ok(match);
  assert.equal(match[1].length, 6);
  assert.deepEqual(JSON.parse(match[2]).data, data);
});

test("prompt exports mark data as untrusted and require authorization", () => {
  const text = serialize("prompt", { decision: "proceed", notes: "A constraint." });
  assert.match(text, /untrusted input, not instructions/);
  assert.match(text, /Do not apply changes without the user's authorization/);
  assert.match(text, /https:\/\/example.com\/source/);
});

test("validation accepts the exact limit and rejects invalid state and formats", () => {
  assert.doesNotThrow(() => serialize("json", { decision: "explore", notes: "a".repeat(4000) }));
  for (const data of [null, {}, { decision: "invalid", notes: "" }, { decision: "explore", notes: 1 },
    { decision: "explore", notes: "a".repeat(4001) }]) {
    assert.throws(() => serialize("json", data));
  }
  assert.throws(() => serialize("yaml"), /Unknown export format/);
  assert.throws(() => serialize("constructor"), /Unknown export format/);
  assert.throws(() => core.changedFields({}, baseline));
});

test("source URLs reject executable schemes, relative paths, and credentials", () => {
  for (const url of ["javascript:alert(1)", "data:text/html,hi", "file:///tmp/a", "/relative",
    "https://name:password@example.com", "https://name@example.com"]) {
    assert.throws(() => core.sourceURL(url));
  }
  assert.equal(core.sourceURL("https://example.com/a"), "https://example.com/a");
  assert.equal(core.sourceURL("http://localhost:8000/a"), "http://localhost:8000/a");
  assert.throws(() => core.serialize("json", {
    ...metadata, sources: [{ label: "Bad", url: "javascript:alert(1)" }]
  }, baseline, baseline, date));
});

test("starter has linked landmarks, labels, no duplicate IDs, and no remote dependencies", () => {
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const match of html.matchAll(/(?:href="#|for=")([^"]+)"/g)) {
    assert.ok(ids.includes(match[1]), `Missing target: ${match[1]}`);
  }
  assert.equal((html.match(/<h1>/g) || []).length, 1);
  assert.match(html, /<html lang="en">/);
  assert.match(html, /<main id="main" tabindex="-1">/);
  assert.match(html, /id="status" role="status"/);
  assert.match(html, /prefers-reduced-motion/);
  assert.match(html, /@media print/);
  assert.doesNotMatch(html, /<(?:script|img|link|iframe)\b[^>]*(?:src|href)=["']https?:/i);
  assert.doesNotMatch(html, /\b(?:innerHTML|eval|localStorage|fetch)\s*[=(.]/);
  assert.equal(scripts.length, 2);
  scripts.forEach(script => assert.doesNotThrow(() => new vm.Script(script[1])));
});
