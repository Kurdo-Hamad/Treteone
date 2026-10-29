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

  // ---- /sourcing page head (approved mockup, #v-sourcing) -----------------
  'sourcing.page.kicker': 'Sourcing · hard-to-find & obsolete',
  'sourcing.page.title': 'How a part with no working reference gets traced.',
  'sourcing.page.lead':
    'An enquiry usually reaches us after the obvious routes have failed. The work is methodical rather than mysterious: establish what the item actually is, then establish who still makes something that satisfies the same duty.',

  // ---- the four definition blocks -----------------------------------------
  'sourcing.def.superseded.title': 'Superseded references',
  'sourcing.def.superseded.body':
    'Manufacturers renumber, and ranges move between brands after an acquisition. A reference that returns nothing today was often valid two or three revisions ago, and the current equivalent is usually reachable from the original.',
  'sourcing.def.nameplate.title': 'Nameplate data',
  'sourcing.def.nameplate.body':
    'Frame size, rating, serial and build code carry more information than the part number alone. A legible photograph of the plate is frequently enough to rebuild a specification from scratch.',
  'sourcing.def.equivalents.title': 'Form, fit and function',
  'sourcing.def.equivalents.body':
    'Where the original is genuinely gone, the question becomes which current product matches the mounting, the duty and the materials. Those are quoted as equivalents and labelled as such — never as the original.',
  'sourcing.def.documentation.title': 'Documentation',
  'sourcing.def.documentation.body':
    'Datasheets, test certificates and material certificates are supplied where the manufacturer issues them. Where they cannot be obtained, we say so before you order rather than after.',

  // ---- navy "what to send" band -------------------------------------------
  'sourcing.what.kicker': 'What to send',
  'sourcing.what.title': 'Send whatever you have. A photograph counts.',
  'sourcing.what.lead':
    'There is no minimum. Enquiries have started from a single blurred nameplate and from a four-hundred-line bill of quantities, and both go to the same team.',
  'sourcing.what.cta': 'Start an enquiry',
  'sourcing.what.reference': 'Part number or manufacturer reference, superseded or not',
  'sourcing.what.nameplate': 'Equipment model, serial number and nameplate photograph',
  'sourcing.what.drawing': 'Datasheet, drawing, P&ID extract or PDF',
  'sourcing.what.boq': 'Excel bill of quantities or a multi-line list',
  'sourcing.what.description': 'A written description, if that is genuinely all there is',

  // ---- five-step process (ProcessSteps) -----------------------------------
  'process.kicker': 'From requirement to delivery',
  'process.title': 'What happens after you press send.',
  /** n is already zero-padded ("01"). Shown in capitals by CSS. */
  'process.stepLabel': (n: string) => `Step ${n}`,

  // ---- legacy -------------------------------------------------------------
  // Read by components the homepage stream is replacing (HardToFind,
  // SourcingChecklist, ProcessTimeline). Kept so the build stays green;
  // integration removes them with those components.
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
  'process.heading': 'From requirement to delivery.',
  'process.lede': 'What happens to an enquiry, first to last.',
  'process.stepCount': (n: number, total: number) => `Step ${n} of ${total}`,
};

export type SourcingStrings = typeof sourcing;
