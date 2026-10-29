/**
 * The brand list (CLAUDE.md §3, §9), driving the homepage BrandStrip and the /brands BrandGrid.
 *
 * ⚠ §11 — "Never claim authorised distributor, agent or partner status. Wording
 * stays 'Brands we source'." Nothing in this module or the component that reads
 * it may imply authorisation, and the trademark disclaimer below the marquee is
 * not optional. Brand names are not translated: they are proper nouns.
 *
 * ⚠ §10 — no logo files have been supplied, and it is still an open question
 * which of these may be shown as a logo at all. public/logos/ is empty, so every
 * tile currently renders as the dashed name fallback. That is the expected
 * state, not a bug.
 *
 * A logo appears the moment public/logos/<slug>.svg exists — src/data/brand-logos.ts reads
 * that directory at build time. It also refuses to build if such a file turns
 * out to be a raster in an SVG wrapper (§8).
 */

/** Lowercased, punctuation collapsed to hyphens — the logo filename. */
export function brandSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const brands: readonly string[] = [
  'Siemens',
  'ABB',
  'Schneider Electric',
  'Rockwell / Allen-Bradley',
  'Omron',
  'Mitsubishi Electric',
  'Emerson',
  'Honeywell',
  'Yokogawa',
  'Endress+Hauser',
  'WIKA',
  'SICK',
  'Pepperl+Fuchs',
  'Festo',
  'SMC',
  'Parker',
  'Bosch Rexroth',
  'Danfoss',
  'Eaton',
  'WEG',
  'SEW-Eurodrive',
  'SKF',
  'Schaeffler / FAG',
  'NSK',
  'Timken',
  'John Crane',
  'Grundfos',
  'KSB',
  'Flowserve',
  'Atlas Copco',
  'Ingersoll Rand',
  'Alfa Laval',
];

/** Split into the two rows the marquee scrolls in opposite directions. */
export const brandRows: readonly (readonly string[])[] = [
  brands.slice(0, Math.ceil(brands.length / 2)),
  brands.slice(Math.ceil(brands.length / 2)),
];
