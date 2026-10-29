/**
 * Generates every placeholder photograph the site ships with.
 *
 * CLAUDE.md §10: the real photography (office, staff, goods packed, equipment
 * handled) has not been supplied and must not be invented. Rather than hotlink
 * stock imagery — which §8 forbids anyway, since the audience includes mainland
 * China — each image slot ships with a plate that says plainly what is missing.
 *
 *   npm run placeholders            fill any slot that has no image
 *   npm run placeholders -- --force rewrite every slot as a plate
 *
 * It will NOT overwrite an image that already exists unless forced. That guard
 * exists because the slots are currently filled with temporary stand-in
 * photographs, and one day they will hold the real ones — and an accidental
 * `npm run placeholders` that wiped real photography would be a bad afternoon.
 *
 * Writes:
 *   src/assets/hero/hero-0N.jpg          5 hero frames,     2400x1500
 *   src/assets/products/<slug>.jpg      12 product cards,   1200x900
 *   src/assets/scope/<slug>.jpg          5 scope stages,    1600x2000
 *   src/assets/industries/<slug>.jpg     9 industry panels, 1600x1000
 *   src/assets/sourcing/plate.jpg        1 sourcing plate,   1600x1000
 *   src/assets/about/portrait.jpg        1 about portrait,   1500x2000
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
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

// §4 locked tokens, repeated here because a build script cannot read tokens.css.
const NAVY = '#051b38';
const INK = '#0a0816';
const CYAN = '#06b6d4';
const MUTED_BLUE = '#88acda';
const WHITE = '#ffffff';

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

/** Keyed by the slug in src/data/scope.ts. Tall — the media column is sticky
    and full height, so these are portrait. */
const scopeStages = {
  component: 'BEARING, SEAL AND SENSOR IN HAND',
  'spare-part': 'OEM PART BESIDE ITS EQUIVALENT',
  assembly: 'VALVE AND ACTUATOR SET',
  machine: 'PUMP SKID ON THE FLOOR',
  'complete-system': 'PRODUCTION LINE INSTALLED',
};

/** Keyed by the slug in src/data/industries.ts. */
const industryPanels = {
  'oil-gas': 'OFFSHORE PLATFORM DECK',
  'refining-petrochemical': 'REFINERY COLUMNS AT DUSK',
  'power-generation': 'TURBINE HALL',
  cement: 'CEMENT KILN AND SILOS',
  manufacturing: 'ASSEMBLY LINE IN OPERATION',
  'steel-metals': 'CASTING FLOOR',
  mining: 'CRUSHER AND CONVEYOR',
  'water-wastewater': 'TREATMENT BASINS',
  'facilities-institutions': 'PLANT ROOM AND SWITCHBOARD',
};

/** The single plate beside the /sourcing checklist. */
const sourcingPlate = 'GOODS PACKED AND LABELLED FOR DESPATCH';

/** The sticky portrait in the About section (§6.11). §10 lists office and staff
    photography as outstanding, and this is the slot it goes in. */
const aboutPortrait = 'THE TEAM AT WORK, GUANGZHOU OFFICE';

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
      <rect width="56" height="56" fill="${NAVY}"/>
      <rect width="28" height="56" fill="${INK}"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#hatch)"/>
  <rect x="${s(70)}" y="${s(70)}" width="${width - s(140)}" height="${height - s(140)}" fill="none" stroke="${MUTED_BLUE}" stroke-width="${s(3)}" stroke-dasharray="${s(18)} ${s(14)}"/>
  ${
    badge
      ? `<text x="${pad}" y="${s(330)}" font-family="Arial, Helvetica, sans-serif" font-size="${s(260)}" font-weight="700" fill="${CYAN}" letter-spacing="${s(-12)}">${badge}</text>`
      : ''
  }
  <text x="${pad}" y="${height - s(300)}" font-family="Arial, Helvetica, sans-serif" font-size="${s(96)}" font-weight="700" fill="${WHITE}" letter-spacing="${s(-2)}">PHOTOGRAPH PENDING</text>
  <text x="${pad}" y="${height - s(200)}" font-family="Consolas, monospace" font-size="${s(52)}" fill="${CYAN}" letter-spacing="${s(6)}">${esc(subject)}</text>
  <text x="${pad}" y="${height - s(120)}" font-family="Consolas, monospace" font-size="${s(40)}" fill="${MUTED_BLUE}" letter-spacing="${s(4)}">CLAUDE.md &#167;10 &#183; NOT YET SUPPLIED</text>
</svg>`;
}

const force = process.argv.includes('--force');
let skipped = 0;

async function write(dir, name, svg) {
  const target = join(dir, name);
  if (!force && existsSync(target)) {
    skipped += 1;
    return 0;
  }
  const buffer = await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  await writeFile(target, buffer);
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
/* ------------------------------------------------------------------ scope */

const scopeDir = join(root, 'src', 'assets', 'scope');
await mkdir(scopeDir, { recursive: true });

for (const [i, [slug, subject]] of Object.entries(scopeStages).entries()) {
  const svg = plate({
    width: 1600,
    height: 2000,
    badge: String(i + 1).padStart(2, '0'),
    subject,
    scale: 0.7,
  });
  total += await write(scopeDir, `${slug}.jpg`, svg);
}
console.log(`scope:    ${Object.keys(scopeStages).length} plates at 1600x2000`);

/* ------------------------------------------------------------- industries */

const industryDir = join(root, 'src', 'assets', 'industries');
await mkdir(industryDir, { recursive: true });

for (const [slug, subject] of Object.entries(industryPanels)) {
  // The panel overlays the industry name itself, so no badge.
  const svg = plate({ width: 1600, height: 1000, badge: null, subject, scale: 0.7 });
  total += await write(industryDir, `${slug}.jpg`, svg);
}
console.log(`industry: ${Object.keys(industryPanels).length} plates at 1600x1000`);

/* --------------------------------------------------------------- sourcing */

const sourcingDir = join(root, 'src', 'assets', 'sourcing');
await mkdir(sourcingDir, { recursive: true });
total += await write(
  sourcingDir,
  'plate.jpg',
  plate({ width: 1600, height: 1000, badge: null, subject: sourcingPlate, scale: 0.7 }),
);
console.log('sourcing: 1 plate at 1600x1000');

/* ------------------------------------------------------------------ about */

const aboutDir = join(root, 'src', 'assets', 'about');
await mkdir(aboutDir, { recursive: true });
total += await write(
  aboutDir,
  'portrait.jpg',
  plate({ width: 1500, height: 2000, badge: null, subject: aboutPortrait, scale: 0.66 }),
);
console.log('about:    1 portrait at 1500x2000');

if (skipped > 0) {
  console.log(
    `
skipped:  ${skipped} slot(s) that already have an image. ` +
      'Use --force to replace them with plates.',
  );
}
console.log(`written:  ${(total / 1024 / 1024).toFixed(1)} MB of source art (not shipped as-is)`);
