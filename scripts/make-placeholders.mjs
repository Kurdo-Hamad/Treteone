/**
 * Generates every placeholder photograph the site ships with.
 *
 * CLAUDE.md §10: the real photography (office, staff, goods packed, equipment
 * handled) has not been supplied and must not be invented. Rather than hotlink
 * stock imagery — which §8 forbids anyway, since the audience includes mainland
 * China — each image slot ships with a plate that says plainly what is missing.
 *
 *   npm run placeholders
 *
 * Writes:
 *   src/assets/hero/hero-0N.jpg          5 hero frames,  2400x1500
 *   src/assets/products/<slug>.jpg      12 product cards, 1200x900
 *
 * To replace one: drop the real photograph in at the same path and size or
 * larger, and delete its entry here. Nothing else changes — Astro re-derives
 * the AVIF and WebP renditions from whatever file is there.
 *
 * The subject lines below are what each photograph should show. They are not
 * copy: nothing in this file reaches the page as text, so it is deliberately
 * outside src/ and outside the i18n system.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// Tokens, repeated here because a build script cannot read tokens.css.
const INK_3 = '#0F1215';
const INK_2 = '#1E2327';
const SIGNAL = '#F2A900';
const STEEL = '#6B7178';
const PAPER = '#F7F7F5';

const heroFrames = [
  'SUBSTATION PIPEWORK AND VALVES',
  'PLANT CONTROL ROOM',
  'MACHINE CONTROL PANEL',
  'PROCESS PIPE RUN',
  'WORKSHOP LATHE',
];

/** Keyed by the slug in src/data/categories.ts. */
const productCards = {
  'automation-control': 'PLC AND HMI CABINET',
  'instrumentation-measurement': 'PRESSURE AND FLOW TRANSMITTERS',
  'electrical-power': 'SWITCHGEAR AND BREAKERS',
  'motors-drives-transmission': 'MOTOR AND GEARBOX ASSEMBLY',
  pumps: 'CENTRIFUGAL PUMP AND SEALS',
  'compressors-compressed-air': 'SCREW COMPRESSOR PACKAGE',
  'valves-flow-control': 'CONTROL VALVES AND ACTUATORS',
  'mechanical-mro': 'BEARINGS AND SEALS ON THE SHELF',
  'hydraulic-pneumatic': 'HYDRAULIC POWER UNIT',
  'process-equipment': 'HEAT EXCHANGER AND FILTRATION',
  'industrial-machinery': 'GENERATOR SET ON SKID',
  'industrial-consumables': 'FILTERS, LUBRICANTS AND TOOLING',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * One plate. `scale` keeps the type legible at both sizes: the product cards
 * render at roughly a quarter of the hero's width, so their text has to be
 * proportionally larger, not just smaller in absolute terms.
 */
function plate({ width, height, badge, subject, scale }) {
  const s = (n) => Math.round(n * scale);
  const pad = s(140);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="hatch" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <rect width="56" height="56" fill="${INK_3}"/>
      <rect width="28" height="56" fill="${INK_2}"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#hatch)"/>
  <rect x="${s(70)}" y="${s(70)}" width="${width - s(140)}" height="${height - s(140)}" fill="none" stroke="${STEEL}" stroke-width="${s(3)}" stroke-dasharray="${s(18)} ${s(14)}"/>
  ${
    badge
      ? `<text x="${pad}" y="${s(330)}" font-family="Arial, Helvetica, sans-serif" font-size="${s(260)}" font-weight="700" fill="${SIGNAL}" letter-spacing="${s(-12)}">${badge}</text>`
      : ''
  }
  <text x="${pad}" y="${height - s(300)}" font-family="Arial, Helvetica, sans-serif" font-size="${s(96)}" font-weight="700" fill="${PAPER}" letter-spacing="${s(-2)}">PHOTOGRAPH PENDING</text>
  <text x="${pad}" y="${height - s(200)}" font-family="Consolas, monospace" font-size="${s(52)}" fill="${SIGNAL}" letter-spacing="${s(6)}">${esc(subject)}</text>
  <text x="${pad}" y="${height - s(120)}" font-family="Consolas, monospace" font-size="${s(40)}" fill="${STEEL}" letter-spacing="${s(4)}">CLAUDE.md &#167;10 &#183; NOT YET SUPPLIED</text>
</svg>`;
}

async function write(dir, name, svg) {
  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(join(dir, name), buffer);
  return buffer.length;
}

/* ------------------------------------------------------------------- hero */

const heroDir = join(root, 'src', 'assets', 'hero');
await mkdir(heroDir, { recursive: true });

let total = 0;
for (const [i, subject] of heroFrames.entries()) {
  const svg = plate({
    width: 2400,
    height: 1500,
    badge: String(i + 1).padStart(2, '0'),
    subject,
    scale: 1,
  });
  total += await write(heroDir, `hero-0${i + 1}.jpg`, svg);
}
console.log(`hero:     ${heroFrames.length} plates at 2400x1500`);

/* --------------------------------------------------------------- products */

const productDir = join(root, 'src', 'assets', 'products');
await mkdir(productDir, { recursive: true });

for (const [slug, subject] of Object.entries(productCards)) {
  // The card already overlays its own number, so the plate carries none.
  const svg = plate({ width: 1200, height: 900, badge: null, subject, scale: 0.62 });
  total += await write(productDir, `${slug}.jpg`, svg);
}
console.log(`products: ${Object.keys(productCards).length} plates at 1200x900`);
console.log(`total:    ${(total / 1024 / 1024).toFixed(1)} MB of source art (not shipped as-is)`);
