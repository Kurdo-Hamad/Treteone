/**
 * English copy — industries. Key authority for this module: the Chinese module
 * src/i18n/zh/industries.ts is typed against `typeof industries`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const industries = {
  'meta.industries.title': 'Industries — Treteone',
  'meta.industries.description':
    'Industrial supply and sourcing for oil and gas, refining, power, cement, manufacturing, steel, mining, water and facilities.',

  // ---- /industries page head (approved mockup, #v-industries) -------------
  'industries.page.kicker': (n: number) => `Industries · ${n} sectors`,
  'industries.page.title': 'Specified to the duty, not the catalogue.',
  'industries.page.lead':
    'The same nominal part behaves differently in slurry, in sour service and on a dusty kiln line. Below is what each sector tends to ask for, and the duty information that decides the answer.',
  /** The action at the end of every index row. */
  'industries.rows.enquire': 'Enquire',

  /** Accessible name of the industry list (IndexRows). */
  'industries.listLabel': 'Industries',
};

export type IndustriesStrings = typeof industries;
