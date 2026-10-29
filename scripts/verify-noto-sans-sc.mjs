/**
 * Fails the build if the rendered site asks for a CJK glyph the subset does not
 * contain (CLAUDE.md §2, approved: "fail the build if a glyph is requested that
 * isn't in the subset, rather than falling back silently").
 *
 * Runs automatically as npm's `postbuild`.
 *
 * subset-noto-sans-sc.mjs derives the glyph set from source, which is the only
 * order that works — the font must exist before Astro renders. This closes the
 * loop from the other end: it reads what actually came out in dist/ and checks
 * every character that would be drawn by the CJK face. A glyph that slipped
 * past the source scan stops the deploy here instead of quietly rendering in
 * whatever the visitor's system happens to have.
 */
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { needsCJKFace } from './cjk-ranges.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const manifestPath = join(root, 'public', 'fonts', 'noto-sans-sc.manifest.json');


if (!existsSync(manifestPath)) {
  console.error('verify-noto-sans-sc: no manifest. Run `npm run fonts:sc` first.');
  process.exit(1);
}

if (!existsSync(dist)) {
  console.error('verify-noto-sans-sc: no dist/. This runs after `astro build`.');
  process.exit(1);
}

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const covered = new Set(manifest.codepoints);

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };

function renderedText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    // Attribute values are content too: aria-label, alt, title, meta.
    .replace(/<[^>]+>/g, (tag) => ` ${[...tag.matchAll(/="([^"]*)"/g)].map((m) => m[1]).join(' ')} `)
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (whole, name) => ENTITIES[name.toLowerCase()] ?? whole);
}

async function htmlFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await htmlFiles(path)));
    else if (extname(entry.name) === '.html') found.push(path);
  }
  return found;
}

const missing = new Map();
let checkedFiles = 0;
let cjkGlyphs = new Set();

for (const file of await htmlFiles(dist)) {
  checkedFiles += 1;
  const text = renderedText(await readFile(file, 'utf8'));
  for (const ch of text) {
    const cp = ch.codePointAt(0);
    if (cp === undefined || !needsCJKFace(cp)) continue;
    cjkGlyphs.add(cp);
    if (covered.has(cp)) continue;
    if (!missing.has(cp)) missing.set(cp, new Set());
    missing.get(cp).add(file.slice(dist.length + 1).replaceAll('\\', '/'));
  }
}

if (missing.size > 0) {
  console.error(
    `\nverify-noto-sans-sc: FAIL — ${missing.size} glyph(s) rendered that the ` +
      'subset does not contain.\n',
  );
  for (const [cp, files] of missing) {
    const hex = cp.toString(16).toUpperCase().padStart(4, '0');
    console.error(`  ${String.fromCodePoint(cp)}  U+${hex}  in ${[...files].join(', ')}`);
  }
  console.error(
    '\nThese would fall back to whatever CJK face the visitor happens to have.\n' +
      'The subset is built from src/, so this means copy reached the page from\n' +
      'somewhere the scan does not read. Fix the source, or run:\n\n' +
      '  npm run fonts:sc -- --force\n',
  );
  process.exit(1);
}

console.log(
  `verify-noto-sans-sc: OK — ${cjkGlyphs.size} CJK glyphs across ${checkedFiles} ` +
    `page(s), all covered by the ${manifest.glyphCount}-glyph subset.`,
);
