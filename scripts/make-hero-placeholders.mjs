/**
 * Generates the five hero placeholder photographs.
 *
 * CLAUDE.md §10: the real photography (office, staff, goods packed, equipment
 * handled) has not been supplied and must not be invented. Rather than hotlink
 * stock imagery — which §8 forbids anyway, since the audience includes mainland
 * China — the hero ships with plates that say plainly what is missing.
 *
 * To replace: drop the real photograph in as src/assets/hero/hero-0N.jpg at
 * 2400px wide or larger and delete this script's output from the repo. Nothing
 * else changes; Astro re-derives the AVIF and WebP renditions at build time.
 *
 *   node scripts/make-hero-placeholders.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src', 'assets', 'hero');

const W = 2400;
const H = 1500;

// Tokens, repeated here because a build script cannot read tokens.css.
const INK_3 = '#0F1215';
const INK_2 = '#1E2327';
const SIGNAL = '#F2A900';
const STEEL = '#6B7178';

const slides = [
  'SUBSTATION PIPEWORK AND VALVES',
  'PLANT CONTROL ROOM',
  'MACHINE CONTROL PANEL',
  'PROCESS PIPE RUN',
  'WORKSHOP LATHE',
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function plate(index, subject) {
  const n = String(index + 1).padStart(2, '0');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <pattern id="hatch" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <rect width="56" height="56" fill="${INK_3}"/>
      <rect width="28" height="56" fill="${INK_2}"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#hatch)"/>
  <rect x="70" y="70" width="${W - 140}" height="${H - 140}" fill="none" stroke="${STEEL}" stroke-width="3" stroke-dasharray="18 14"/>
  <text x="140" y="330" font-family="Arial, Helvetica, sans-serif" font-size="260" font-weight="700" fill="${SIGNAL}" letter-spacing="-12">${n}</text>
  <text x="140" y="${H - 300}" font-family="Arial, Helvetica, sans-serif" font-size="96" font-weight="700" fill="#FFFFFF" letter-spacing="-2">PHOTOGRAPH PENDING</text>
  <text x="140" y="${H - 200}" font-family="Consolas, monospace" font-size="52" fill="${SIGNAL}" letter-spacing="6">${esc(subject)}</text>
  <text x="140" y="${H - 120}" font-family="Consolas, monospace" font-size="40" fill="${STEEL}" letter-spacing="4">CLAUDE.md &#167;10 &#183; REAL PHOTOGRAPHY NOT YET SUPPLIED</text>
</svg>`;
}

await mkdir(outDir, { recursive: true });

for (const [i, subject] of slides.entries()) {
  const name = `hero-0${i + 1}.jpg`;
  const buf = await sharp(Buffer.from(plate(i, subject)))
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(join(outDir, name), buf);
  console.log(`${name}  ${(buf.length / 1024).toFixed(1)} KB`);
}
