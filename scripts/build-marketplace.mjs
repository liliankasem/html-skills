import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const args = process.argv.slice(2);
if (args.length > 1 || args.some(arg => arg !== "--check")) {
  throw new Error("Usage: node scripts/build-marketplace.mjs [--check]");
}
const check = args.includes("--check");
const config = JSON.parse(readFileSync(join(root, "marketplace.config.json"), "utf8"));
const skillsRoot = join(root, "skills");
const generated = new Map();
const json = value => `${JSON.stringify(value, null, 2)}\n`;

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))
    .flatMap(entry => {
      const path = join(directory, entry.name);
      if (entry.isSymbolicLink()) throw new Error(`Symlinks are not allowed in packages: ${path}`);
      if (entry.isDirectory()) return files(path);
      if (!entry.isFile()) throw new Error(`Unsupported package entry: ${path}`);
      return [path];
    });
}

const names = readdirSync(skillsRoot, { withFileTypes: true }).map(entry => {
  if (!entry.isDirectory() || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name)) {
    throw new Error(`Expected a skill directory: ${entry.name}`);
  }
  return entry.name;
}).sort();

if (!names.includes("html-artifact")) throw new Error("Missing shared html-artifact foundation");

for (const name of names) {
  const skillRoot = join(skillsRoot, name);
  const instructions = readFileSync(join(skillRoot, "SKILL.md"), "utf8");
  const metadata = instructions.match(/^---\nname: ([a-z0-9-]+)\ndescription: ([^\n]+)\n---\n/);
  if (!metadata || metadata[1] !== name) throw new Error(`Invalid skill frontmatter: ${name}`);
  const pluginRoot = `plugins/${name}`;
  const manifest = {
    name,
    version: config.version,
    description: metadata[2],
    author: config.owner,
    repository: config.repository
  };
  generated.set(`${pluginRoot}/plugin.json`, json({
    $schema: "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json",
    ...manifest
  }));
  generated.set(`${pluginRoot}/.claude-plugin/plugin.json`, json({
    ...manifest,
    ...(name === "html-artifact" ? {} : { dependencies: ["html-artifact"] })
  }));

  for (const path of files(skillRoot)) {
    const destination = `${pluginRoot}/skills/${name}/${relative(skillRoot, path)}`;
    generated.set(destination, readFileSync(path));
  }
}

const catalog = {
  name: config.name,
  owner: config.owner,
  metadata: { description: config.description, version: config.version },
  plugins: names.map(name => ({
    name,
    source: `./plugins/${name}`,
    description: JSON.parse(generated.get(`plugins/${name}/plugin.json`)).description,
    version: config.version
  }))
};
for (const path of [".claude-plugin/marketplace.json", ".github/plugin/marketplace.json"]) {
  generated.set(path, json(catalog));
}

const stale = [];
for (const [path, content] of generated) {
  const target = join(root, path);
  if (check) {
    let actual;
    try {
      actual = readFileSync(target);
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
    if (!actual?.equals(Buffer.from(content))) stale.push(path);
  } else {
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
  }
}
let existing = [];
try {
  existing = files(join(root, "plugins"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
for (const path of existing) {
  if (!generated.has(relative(root, path))) stale.push(relative(root, path));
}
if (stale.length) {
  throw new Error(`Generated files differ (run npm run build; remove obsolete generated files explicitly):\n${stale.join("\n")}`);
}
console.log(`${check ? "Verified" : "Built"} ${names.length} plugins with one shared foundation and both marketplace catalogs.`);
