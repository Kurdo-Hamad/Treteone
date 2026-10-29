/**
 * Builds the self-hosted Noto Sans SC subset.
 *
 * Runs automatically as npm's `prebuild`, so `npm run build` — including the
 * build Cloudflare runs — always has a font that matches the current copy.
 *
 *   npm run fonts:sc          rebuild if the glyph set changed
 *   npm run fonts:sc -- --force   rebuild unconditionally
 *
 * Why this exists (CLAUDE.md §2, approved addition to the locked stack):
 * Google serves Noto Sans SC as 101 unicode-range subsets. Self-hosting those
 * meant 4.6 MB in the repo, a 100 KB render-blocking stylesheet, and 691 KB of
 * font on the Chinese route for ~150 characters — 73% of the §8 budget with
 * three components built. This site's copy is static and known at build time,
 * so exactly one file holding exactly the glyphs the site uses is both smaller
 * and simpler.
 *
 * The glyph set is read from source, not from the built HTML, because the font
 * has to exist before Astro runs. `verify-noto-sans-sc.mjs` then checks the
 * rendered output against it as a postbuild step and fails the build if a glyph
 * is missing, so nothing can fall back to a system face silently.
 *
 * Source font: Noto Sans SC variable (wght 100-900), SIL Open Font License 1.1.
 * It is ~10 MB and is NOT committed — it is cached under node_modules/.cache
 * and re-fetched only when the glyph set actually changes.
 */
import { mkdir, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import subsetFont from 'subset-font';
import { needsCJKFace } from './cjk-ranges.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');
const outDir = join(root, 'public', 'fonts');
const cacheDir = join(root, 'node_modules', '.cache', 'treteone-fonts');

const WOFF2 = join(outDir, 'noto-sans-sc.woff2');
const CSS = join(outDir, 'noto-sans-sc.css');
const MANIFEST = join(outDir, 'noto-sans-sc.manifest.json');
const SOURCE_TTF = join(cacheDir, 'NotoSansSC-VariableFont_wght.ttf');

const SOURCE_URL =
  'https://fonts.gstatic.com/s/notosanssc/v40/k3kXo84MPvpLmixcA63oeALhKYiJ-Q7m8w.ttf';

/**
 * The site draws CJK at 400 (body), 500 (h1, h2, buttons) and 600 (h3, footer
 * headings); 700 is the wordmark, which is Latin. Narrowing the axis from
 * 100-900 drops variation data that would never be rendered.
 *
 * Keeping it variable rather than pinning is the cheaper option here, measured:
 * one 400-700 file is 105 KB, while three pinned instances are ~60 KB each and
 * the Chinese route draws all three. The @font-face declares the same range, so
 * a weight outside it clamps rather than quietly picking a wrong instance.
 */
const WEIGHT_RANGE = { min: 400, max: 700, default: 400 };

const force = process.argv.includes('--force');

/* ------------------------------------------------------------------ glyphs */

/**
 * Every character in every source file. Deliberately over-inclusive: an extra
 * Latin glyph costs bytes measured in the tens, while a missing one fails the
 * build. Scanning whole files rather than parsing out string literals means a
 * new copy string cannot be missed because it lived somewhere unexpected.
 */
async function collectSourceText() {
  const wanted = new Set(['.ts', '.astro', '.tsx', '.js', '.mjs']);
  const chunks = [];

  async function walk(dir) {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (wanted.has(extname(entry.name))) chunks.push(await readFile(path, 'utf8'));
    }
  }

  await walk(srcDir);
  return chunks.join('\n');
}

/** Compacts a sorted codepoint list into `U+xxxx` / `U+xxxx-yyyy` ranges. */
function toUnicodeRanges(codepoints) {
  const ranges = [];
  let start = null;
  let previous = null;

  for (const cp of codepoints) {
    if (start === null) {
      start = previous = cp;
      continue;
    }
    if (cp === previous + 1) {
      previous = cp;
      continue;
    }
    ranges.push([start, previous]);
    start = previous = cp;
  }
  if (start !== null) ranges.push([start, previous]);

  const hex = (n) => n.toString(16).toUpperCase().padStart(4, '0');
  return ranges.map(([lo, hi]) => (lo === hi ? `U+${hex(lo)}` : `U+${hex(lo)}-${hex(hi)}`));
}

/* ------------------------------------------------------------------- source */

async function loadSourceFont() {
  if (existsSync(SOURCE_TTF)) {
    const cached = await readFile(SOURCE_TTF);
    if (cached.length > 1_000_000) return cached;
  }

  console.log('  fetching Noto Sans SC variable (~10 MB, cached after this)…');
  const response = await fetch(SOURCE_URL);
  if (!response.ok) {
    throw new Error(
      `Could not fetch the source font (${response.status}). ` +
        'This step needs network access on a cold cache.',
    );
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(cacheDir, { recursive: true });
  await writeFile(SOURCE_TTF, buffer);
  return buffer;
}

/* --------------------------------------------------------------------- main */

const text = await collectSourceText();

/**
 * CJK only. Noto Sans SC is last in both stacks (§4), so Latin is drawn by
 * General Sans or Roboto and never by this face. Excluding Latin makes the
 * three things that must agree — what the file contains, what the unicode-range
 * declares, and what the postbuild check enforces — one and the same set, and
 * it means a page with no Chinese on it never fetches the font at all.
 */
const codepoints = [...new Set([...text].map((ch) => ch.codePointAt(0)))]
  .filter((cp) => cp !== undefined && needsCJKFace(cp))
  .sort((a, b) => a - b);

if (codepoints.length === 0) {
  throw new Error(
    'No CJK characters found under src/. That cannot be right while the site ' +
      'ships a Chinese route — check that the source scan is reading the right files.',
  );
}

const glyphString = codepoints.map((cp) => String.fromCodePoint(cp)).join('');
const hash = createHash('sha256').update(codepoints.join(',')).digest('hex').slice(0, 16);

if (!force && existsSync(MANIFEST) && existsSync(WOFF2) && existsSync(CSS)) {
  const previous = JSON.parse(await readFile(MANIFEST, 'utf8'));
  if (previous.hash === hash) {
    const bytes = (await stat(WOFF2)).size;
    console.log(
      `noto-sans-sc: up to date — ${codepoints.length} glyphs, ${(bytes / 1024).toFixed(1)} KB`,
    );
    process.exit(0);
  }
  console.log('noto-sans-sc: glyph set changed, rebuilding…');
}

await mkdir(outDir, { recursive: true });

const source = await loadSourceFont();
const subset = await subsetFont(source, glyphString, {
  targetFormat: 'woff2',
  variationAxes: { wght: WEIGHT_RANGE },
});

await writeFile(WOFF2, subset);

const unicodeRanges = toUnicodeRanges(codepoints);

const css = `/* Noto Sans SC — self-hosted subset (CLAUDE.md §8: no Google Fonts at runtime).
   GENERATED FILE — do not hand-edit. Rebuilt automatically by npm's prebuild;
   force with \`npm run fonts:sc -- --force\`.

   Contains exactly the ${codepoints.length} CJK glyphs this site's copy uses, read from
   src/. Variable weight axis narrowed to ${WEIGHT_RANGE.min}-${WEIGHT_RANGE.max}, covering the display
   and body weights §4 locks.

   The unicode-range is derived from that same glyph list, so it cannot drift
   from the file's real coverage. Latin is deliberately absent: this face is
   last in both stacks and only ever draws CJK, so a page with no Chinese on it
   never fetches it.

   Source: Noto Sans SC variable, SIL Open Font License 1.1 — see LICENSES.md. */
@font-face {
  font-family: "Noto Sans SC";
  src: url("/fonts/noto-sans-sc.woff2") format("woff2");
  font-weight: ${WEIGHT_RANGE.min} ${WEIGHT_RANGE.max};
  font-style: normal;
  font-display: swap;
  unicode-range: ${unicodeRanges.join(', ')};
}
`;

await writeFile(CSS, css);

await writeFile(
  MANIFEST,
  `${JSON.stringify(
    {
      hash,
      generated: new Date().toISOString(),
      glyphCount: codepoints.length,
      weightRange: [WEIGHT_RANGE.min, WEIGHT_RANGE.max],
      woff2Bytes: subset.length,
      cssBytes: Buffer.byteLength(css),
      // The authority verify-noto-sans-sc.mjs checks the built HTML against.
      codepoints,
    },
    null,
    2,
  )}\n`,
);

console.log(
  `noto-sans-sc: ${codepoints.length} glyphs → ${(subset.length / 1024).toFixed(1)} KB woff2, ` +
    `${(Buffer.byteLength(css) / 1024).toFixed(1)} KB css`,
);
