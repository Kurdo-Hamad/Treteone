/**
 * English copy — about. Key authority for this module: the Chinese module
 * src/i18n/zh/about.ts is typed against `typeof about`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const about = {
  'meta.about.title': 'About — Treteone',
  'meta.about.description':
    'Treteone is an industrial supply and sourcing company in Guangzhou, China. How we work, what we supply and our company details.',

  // ---- /about page head (approved mockup, #v-about) -----------------------
  'about.page.kicker': 'About',
  'about.page.title': 'An industrial supply company that reads specifications.',
  /** name is company.registeredName — never typed here. */
  'about.page.lead': (name: string) =>
    `${name} is a registered trading company in Liwan District, Guangzhou, working with maintenance and procurement teams in plants that cannot afford to stand still. Enquiries are handled by people who can read a datasheet, not routed through a catalogue search.`,

  // ---- the six definition blocks ------------------------------------------
  'about.def.specification.title': 'We work from the specification',
  'about.def.specification.body':
    'Part numbers, equipment models and datasheets — not product names typed into a search box.',
  'about.def.brandNeutral.title': 'Not tied to one brand',
  'about.def.brandNeutral.body':
    'We quote the manufacturer that fits the duty, rather than the one we happen to represent.',
  'about.def.hardToFind.title': 'Hard-to-find is routine',
  'about.def.hardToFind.body':
    'Obsolete and discontinued components are ordinary work here, not a special request.',
  'about.def.oneChannel.title': 'One channel, whole scope',
  'about.def.oneChannel.body':
    'A single item and a full bill of quantities go through the same team and the same contact.',
  'about.def.documentation.title': 'Documentation where it exists',
  'about.def.documentation.body':
    'Certificates and datasheets are supplied when the manufacturer issues them, and their absence is stated upfront.',
  'about.def.registered.title': 'A registered company',
  // The mockup adds "licence number" to this list. The licence number has not
  // been supplied and is shown nowhere (CLAUDE.md §12), so it is not claimed.
  'about.def.registered.body': (name: string) =>
    `${name} — registered name and address published in the footer of every page.`,

  // ---- registered-details band on pale ------------------------------------
  'about.registered.title': 'Registered details',
  'about.registered.name': 'Registered name',
  'about.registered.enquiries': 'Enquiries',
  'about.registered.address': 'Registered address',

};

export type AboutStrings = typeof about;
