/**
 * English copy — sourcing. Key authority for this module: the Chinese module
 * src/i18n/zh/sourcing.ts is typed against `typeof sourcing`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const sourcing = {
  'meta.sourcing.title': 'Hard-to-find and obsolete parts — Treteone',
  'meta.sourcing.description':
    'Obsolete, discontinued and unmarked industrial parts. Send a part number, a nameplate photo or a BOQ and we investigate it. How an enquiry is handled, in five steps.',

  // ---- sourcing (/sourcing) -----------------------------------------------
  'sourcing.eyebrow': 'Sourcing',
  'sourcing.heading': 'Can’t find the part? Give us the number.',
  'sourcing.lede':
    'Obsolete, discontinued, legacy automation, unmarked castings, or just a photo of a nameplate — send whatever you have and we will investigate it.',
  'sourcing.cta': 'Upload your requirement',
  'sourcing.checklistLabel': 'What to send',
  'sourcing.checklistLede': 'Any one of these is enough to start an enquiry.',
  'sourcing.send.partNumber': 'Part number or manufacturer reference',
  'sourcing.send.nameplate': 'Equipment model and nameplate photo',
  'sourcing.send.datasheet': 'Datasheet, drawing or PDF',
  'sourcing.send.boq': 'Excel BOQ or multi-line request',
  'sourcing.send.description': 'A description, if that is all you have',

  // ---- process (/sourcing) ------------------------------------------------
  'process.heading': 'From requirement to delivery.',
  'process.lede': 'What happens to an enquiry, first to last.',
  'process.stepCount': (n: number, total: number) => `Step ${n} of ${total}`,
};

export type SourcingStrings = typeof sourcing;
