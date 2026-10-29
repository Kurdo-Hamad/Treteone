/**
 * The brand list (CLAUDE.md §3, §9), driving the homepage marquee and the
 * /brands directory (BrandDirectory.astro, filterable by `group`).
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

/* ---------------------------------------------------------------------------
   /brands directory (approved mockup, #v-brands). One filterable list, not
   three fixed blocks: each brand carries a discipline group, and the page
   renders every tile in HTML so it works with JavaScript off. The script only
   hides tiles (src/scripts/brand-filter.ts).

   `brands` above keeps its order and type for the homepage marquee; the
   directory below is in the mockup's reading order, grouped by discipline.
   The two lists must hold the same names — checked at build, below.
   ------------------------------------------------------------------------- */

/** The directory's discipline groups, in chip order after "All". */
export const brandGroups = ['auto', 'rotating', 'fluid'] as const;
export type BrandGroup = (typeof brandGroups)[number];

export interface Brand {
  readonly name: string;
  /** brandSlug(name) — the logo filename in public/logos/. */
  readonly slug: string;
  readonly group: BrandGroup;
}

const entry = (name: string, group: BrandGroup): Brand => ({ name, slug: brandSlug(name), group });

export const brandDirectory: readonly Brand[] = [
  // Automation & instrumentation
  entry('Siemens', 'auto'),
  entry('ABB', 'auto'),
  entry('Rockwell / Allen-Bradley', 'auto'),
  entry('Schneider Electric', 'auto'),
  entry('Omron', 'auto'),
  entry('Mitsubishi Electric', 'auto'),
  entry('Emerson', 'auto'),
  entry('Honeywell', 'auto'),
  entry('Yokogawa', 'auto'),
  entry('Endress+Hauser', 'auto'),
  entry('WIKA', 'auto'),
  entry('SICK', 'auto'),
  entry('Pepperl+Fuchs', 'auto'),
  // Rotating & mechanical
  entry('SKF', 'rotating'),
  entry('Schaeffler / FAG', 'rotating'),
  entry('NSK', 'rotating'),
  entry('Timken', 'rotating'),
  entry('SEW-Eurodrive', 'rotating'),
  entry('WEG', 'rotating'),
  entry('Grundfos', 'rotating'),
  entry('KSB', 'rotating'),
  entry('Flowserve', 'rotating'),
  entry('John Crane', 'rotating'),
  entry('Alfa Laval', 'rotating'),
  entry('Danfoss', 'rotating'),
  // Pneumatics & hydraulics
  entry('Festo', 'fluid'),
  entry('SMC', 'fluid'),
  entry('Parker', 'fluid'),
  entry('Bosch Rexroth', 'fluid'),
  entry('Atlas Copco', 'fluid'),
  entry('Ingersoll Rand', 'fluid'),
  entry('Eaton', 'fluid'),
];

/** Group of a brand by name, for any consumer that only holds the name. */
export const brandGroupOf = (name: string): BrandGroup | undefined =>
  brandDirectory.find((brand) => brand.name === name)?.group;

/** Live counts for the filter chips: every group, plus the total. */
export const brandGroupCounts: Readonly<Record<BrandGroup, number>> = Object.fromEntries(
  brandGroups.map((group) => [group, brandDirectory.filter((b) => b.group === group).length]),
) as Record<BrandGroup, number>;

// The marquee list and the directory must never disagree about who is listed.
// Fail the build rather than let one page show a brand the other omits.
{
  const inList = new Set(brands);
  const inDirectory = new Set(brandDirectory.map((b) => b.name));
  const missing = [...inList].filter((name) => !inDirectory.has(name));
  const extra = [...inDirectory].filter((name) => !inList.has(name));
  if (missing.length || extra.length || inDirectory.size !== brandDirectory.length) {
    throw new Error(
      'src/data/brands.ts: `brands` and `brandDirectory` disagree.' +
        (missing.length ? ` Missing from the directory: ${missing.join(', ')}.` : '') +
        (extra.length ? ` Not in \`brands\`: ${extra.join(', ')}.` : '') +
        (inDirectory.size !== brandDirectory.length ? ' The directory lists a brand twice.' : ''),
    );
  }
}
