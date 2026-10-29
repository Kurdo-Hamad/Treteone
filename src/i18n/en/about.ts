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

  // ---- about (/about) -----------------------------------------------------
  'about.eyebrow': 'About',
  'about.title': 'Industrial supply and sourcing, from Guangzhou.',
  'about.heading': 'Why buyers work with us',
  'about.lede':
    'Treteone is an industrial supply and sourcing company based in Guangzhou, China, working with maintenance and procurement teams in demanding plants.',
  'about.details.heading': 'Company details',
  'about.details.lede': 'The details a buyer should be able to check before placing an order.',
};

export type AboutStrings = typeof about;
