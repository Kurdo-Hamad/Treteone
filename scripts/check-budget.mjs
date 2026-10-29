/**
 * First-load payload budget — CLAUDE.md §8: "under 1.5 MB total on first mobile
 * load. Check it, don't assume it."
 *
 *   npm run budget
 *
 * Walks the built dist/ and adds up what a phone actually pulls for a route:
 * the document, its stylesheets and scripts, the Latin faces, and — for each
 * <picture> — the exact AVIF candidate the browser would pick at the given
 * viewport and device pixel ratio.
 *
 * The CJK face is counted only when the page actually contains a character that
 * would be drawn with it — its unicode-range is CJK-only, so a page without one
 * never fetches it.
 *
 * Sizes are raw bytes on disk. Text assets compress heavily over the wire, so
 * the real transfer is smaller than what this prints — which is the direction
 * a budget check should err in.
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { needsCJKFace } from './cjk-ranges.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

const BUDGET = 1.5 * 1024 * 1024;

/** A mid-range Android phone, which is what a plant engineer is holding (§11). */
const VIEWPORT = 412;
const DPR = 2;

if (!existsSync(dist)) {
  console.error('No dist/. Run `npm run build` first.');
  process.exit(1);
}

const size = (urlPath) => {
  const file = join(dist, urlPath.replace(/^\//, ''));
  return existsSync(file) ? statSync(file).size : 0;
};

const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

/**
 * Resolves a `sizes` attribute to the CSS pixel width the image will occupy.
 * Handles what this site actually uses: a list of `(min-width: Npx) <length>`
 * conditions with a bare fallback, where a length is px or vw.
 *
 * Without this, images get costed at a wider rendition than a phone fetches —
 * a 25% overstatement on the pass-2 product rail.
 */
function resolveSizes(sizes) {
  if (!sizes) return VIEWPORT;

  const toPx = (length) => {
    const value = parseFloat(length);
    if (!Number.isFinite(value)) return VIEWPORT;
    return length.trim().endsWith('vw') ? (value / 100) * VIEWPORT : value;
  };

  for (const entry of sizes.split(',')) {
    const part = entry.trim();
    const condition = part.match(/^\((min|max)-width:\s*([\d.]+)px\)\s+(.+)$/);

    if (!condition) return toPx(part); // bare fallback length
    const [, direction, threshold, length] = condition;
    const matches =
      direction === 'min' ? VIEWPORT >= parseFloat(threshold) : VIEWPORT <= parseFloat(threshold);
    if (matches) return toPx(length);
  }

  return VIEWPORT;
}

/** Picks the candidate a browser would choose from a `srcset` at this viewport. */
function pickCandidate(srcset, sizes) {
  const target = resolveSizes(sizes) * DPR;
  const candidates = srcset
    .split(',')
    .map((entry) => entry.trim().split(/\s+/))
    .map(([url, descriptor]) => ({ url, width: parseInt(descriptor ?? '0', 10) }))
    .filter((c) => c.url && c.width)
    .sort((a, b) => a.width - b.width);

  return candidates.find((c) => c.width >= target) ?? candidates.at(-1);
}

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ');
}

function measure(route, htmlPath) {
  const html = readFileSync(join(dist, htmlPath), 'utf8');
  const items = [];

  items.push({ label: `${htmlPath}`, bytes: Buffer.byteLength(html) });

  for (const href of html.match(/<link[^>]+rel="stylesheet"[^>]*>/g) ?? []) {
    const url = href.match(/href="([^"]+)"/)?.[1];
    // The CJK stylesheet is counted below, alongside the font file it pulls.
    if (url && !url.includes('noto-sans-sc')) items.push({ label: url, bytes: size(url) });
  }

  for (const tag of html.match(/<script[^>]+src="([^"]+)"/g) ?? []) {
    const url = tag.match(/src="([^"]+)"/)?.[1];
    if (url) items.push({ label: url, bytes: size(url) });
  }

  items.push({ label: '/favicon.svg', bytes: size('/favicon.svg') });

  // Latin faces. Worst case: every General Sans weight plus both Roboto
  // subsets. In practice a page that uses no latin-ext character skips one.
  for (const font of [
    '/fonts/GeneralSans-Regular.woff2',
    '/fonts/GeneralSans-Medium.woff2',
    '/fonts/GeneralSans-Semibold.woff2',
    '/fonts/GeneralSans-Bold.woff2',
    '/fonts/roboto/Roboto-latin.woff2',
    '/fonts/roboto/Roboto-latin-ext.woff2',
  ]) {
    items.push({ label: `${font} (worst case)`, bytes: size(font) });
  }

  // The CJK face. One subset file holding exactly the glyphs the site's copy
  // uses, with a CJK-only unicode-range — so it is fetched only by a page that
  // actually has Chinese on it, which both routes do (the footer address).
  if (html.includes('/fonts/noto-sans-sc.css')) {
    const cjk = [...visibleText(html)].some((ch) => needsCJKFace(ch.codePointAt(0) ?? 0));
    items.push({ label: '/fonts/noto-sans-sc.css', bytes: size('/fonts/noto-sans-sc.css') });
    if (cjk) {
      items.push({ label: '/fonts/noto-sans-sc.woff2', bytes: size('/fonts/noto-sans-sc.woff2') });
    } else {
      items.push({ label: '  ↳ no CJK on this page, font not fetched', bytes: 0 });
    }
  }

  // Images, split by whether they load on arrival or only once the visitor
  // gets there. Classified by what the browser actually does:
  //
  //   hero            every frame sits at inset:0 in the opening viewport, so
  //                   the browser counts all five as visible and fetches them
  //                   whatever their opacity or loading attribute. Arrival.
  //   eco__media      the homepage ecosystem's desktop photograph panel. It is
  //                   display:none below 1040px and every image in it is lazy,
  //                   and a lazy image with no layout box is never fetched. At
  //                   a 412px viewport it costs nothing, and is listed as such.
  //   everything else loading="lazy" is deferred until scrolled near;
  //                   anything eager is counted as arriving.
  //
  // Everything that can load is still counted against the budget: a visitor
  // who reads the whole page pays for all of it, and this check is meant to be
  // pessimistic.
  const MARKERS = [
    ['hero__slide', 'hero', 'arrival'],
    ['eco__figure', 'ecosystem panel', 'desktop-only'],
  ];

  let deferred = 0;
  let skipped = 0;

  for (const picture of html.match(/<picture[\s\S]*?<\/picture>/g) ?? []) {
    const index = html.indexOf(picture);
    const preceding = html.slice(Math.max(0, index - 300), index);
    const marker = MARKERS.find(([cls]) => preceding.includes(cls));
    const lazy = /<img[^>]+loading="lazy"/.test(picture);
    const [, name, mode] = marker ?? [null, lazy ? 'lazy image' : 'eager image', lazy ? 'deferred' : 'arrival'];

    const avif = picture.match(/<source[^>]+type="image\/avif"[^>]*>/)?.[0]
      ?? picture.match(/<source[^>]+srcset="([^"]+)"[^>]*>/)?.[0];
    const srcset = avif?.match(/srcset="([^"]+)"/)?.[1];
    if (!srcset) continue;

    const picked = pickCandidate(srcset, avif?.match(/\ssizes="([^"]+)"/)?.[1]);
    if (!picked) continue;

    if (mode === 'desktop-only') {
      skipped += 1;
      continue;
    }

    const bytes = size(picked.url);
    if (mode === 'deferred') deferred += bytes;
    items.push({
      label: `${picked.url} (${picked.width}w) — ${name}${mode === 'deferred' ? ', deferred' : ''}`,
      bytes,
    });
  }

  if (skipped > 0) {
    items.push({
      label: `  ↳ ${skipped} desktop-only image(s) not fetched at ${VIEWPORT}px (display:none + lazy)`,
      bytes: 0,
    });
  }

  const total = items.reduce((sum, item) => sum + item.bytes, 0);

  console.log(`\n${route}   ${VIEWPORT}px viewport @ ${DPR}x DPR`);
  console.log('─'.repeat(78));
  for (const item of items) {
    if (item.bytes === 0 && item.label.startsWith('  ')) console.log(item.label);
    else console.log(`  ${kb(item.bytes).padStart(10)}  ${item.label}`);
  }
  console.log('─'.repeat(78));
  const pct = ((total / BUDGET) * 100).toFixed(0);
  console.log(`  ${kb(total - deferred).padStart(10)}  on arrival — this is what decides LCP`);
  console.log(`  ${kb(deferred).padStart(10)}  deferred until scrolled to or opened`);
  console.log(`  ${kb(total).padStart(10)}  TOTAL — ${pct}% of the 1.5 MB budget (§10)`);

  return { total, deferred };
}

const PAGES = ['', 'products/', 'industries/', 'sourcing/', 'brands/', 'about/', 'quote/'];

// All fourteen routes (§3): seven pages, each in both languages.
const routes = ['', 'zh/'].flatMap((prefix) =>
  PAGES.map((page) => [`/${prefix}${page}`, `${prefix}${page}index.html`]),
);

let worst = 0;
const summary = [];
for (const [label, path] of routes) {
  // A route that did not build is a failure, not something to skip quietly.
  if (!existsSync(join(dist, path))) {
    console.error(`FAIL — ${label} was not built (expected dist/${path}).`);
    process.exit(1);
  }
  const { total, deferred } = measure(label, path);
  summary.push([label, total, deferred]);
  worst = Math.max(worst, total);
}

console.log('\nSummary');
console.log('─'.repeat(78));
console.log(`  ${"route".padEnd(16)}${"arrival".padStart(12)}${"deferred".padStart(12)}${"total".padStart(12)}  budget`);
for (const [label, total, deferred] of summary) {
  console.log(
    `  ${label.padEnd(16)}${kb(total - deferred).padStart(12)}${kb(deferred).padStart(12)}${kb(total).padStart(12)}  ${((total / BUDGET) * 100).toFixed(0)}%`,
  );
}

console.log('');
if (worst > BUDGET) {
  console.error(`FAIL — worst route is ${kb(worst)}, over the 1.5 MB budget.`);
  process.exit(1);
}
console.log(`PASS — worst route is ${kb(worst)}, within the 1.5 MB budget.\n`);
