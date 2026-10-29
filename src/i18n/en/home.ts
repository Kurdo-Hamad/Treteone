/**
 * English copy — home. Key authority for this module: the Chinese module
 * src/i18n/zh/home.ts is typed against `typeof home`, so a key added here and
 * missing there fails `astro check`.
 *
 * Every string below is the approved mockup's copy (reference/mockup.html,
 * #v-home), verbatim. Arrows (→) are drawn by the components, not stored here.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const home = {
  // ---- 1. rolling hero (CLAUDE.md §6) -------------------------------------
  // Uppercase on the eyebrow is applied in CSS.
  'home.hero.eyebrow': 'Industrial supply & sourcing',
  'home.hero.tablist': 'What we supply',
  'home.hero.pause': 'Pause the slideshow',
  'home.hero.play': 'Play the slideshow',

  'home.hero.spares.title': 'Spare parts & MRO',
  'home.hero.spares.line':
    'The consumables a maintenance team runs through every week — quoted against the reference you already have.',
  'home.hero.spares.link': 'Explore spare parts',
  'home.hero.spares.subject': 'Bearings, seals and gaskets on the workbench',

  'home.hero.equipment.title': 'Equipment & machinery',
  'home.hero.equipment.line':
    'Pumps, motors, compressors and complete production lines, sized to the duty rather than to whatever sits in stock.',
  'home.hero.equipment.link': 'Explore equipment',
  'home.hero.equipment.subject': 'Process pump and motor on a baseplate',

  'home.hero.automation.title': 'Automation & instrumentation',
  'home.hero.automation.line':
    'PLC and drive hardware, transmitters and analysers — specified from your loop sheets or the failed module itself.',
  'home.hero.automation.link': 'Explore automation',
  'home.hero.automation.subject': 'Control cabinet with the door open',

  'home.hero.obsolete.title': 'Hard-to-find & obsolete',
  'home.hero.obsolete.line':
    'Discontinued components and legacy automation. Send a nameplate photograph and we work back to something that still exists.',
  'home.hero.obsolete.link': 'How we trace a part',
  'home.hero.obsolete.subject': 'Worn nameplate on an ageing gearbox',

  // ---- 2. intro -----------------------------------------------------------
  'home.intro.h1': 'We find the part. Then we supply it.',
  'home.intro.lead1':
    'A plant stops for one component. Finding that component means reading a nameplate, tracing a reference that may have been superseded twice, and knowing which manufacturer still builds something that satisfies the same duty.',
  'home.intro.lead2':
    'Treteone is an industrial supply and sourcing company in Guangzhou. We work from the part number, the drawing, or the photograph — and quote with price, lead time and the alternatives worth considering.',
  'home.intro.ctaQuote': 'Send a part number',
  'home.intro.ctaProducts': 'See what we supply',

  // ---- 3. three ways an enquiry arrives -----------------------------------
  'home.enquiries.heading': 'Three ways an enquiry arrives',
  // Keep: these are illustrative, not case studies (CLAUDE.md §7, §13).
  'home.enquiries.note':
    'Illustrative of the work, not case studies — no client is named and nothing here is a performance claim.',
  'home.enquiries.module.subject': 'Control cabinet, module removed from the rack',
  'home.enquiries.module.heading': 'A control module that is no longer listed',
  'home.enquiries.module.body':
    'The reference returns nothing. The build code on the module and the rack it sits in are usually enough to establish what replaced it, and whether the replacement is a drop-in.',
  'home.enquiries.module.more': 'How we trace a part',
  'home.enquiries.pump.subject': 'Pump end stripped — impeller and wear rings',
  'home.enquiries.pump.heading': 'Wear parts for a pump still in service',
  'home.enquiries.pump.body':
    'Impeller, wear rings, mechanical seal and the gaskets that go with them — quoted as an OEM set and as verified equivalents, side by side, with the trade-off stated.',
  'home.enquiries.pump.more': 'See the categories',
  'home.enquiries.boq.subject': 'Priced bill of quantities on a desk',
  'home.enquiries.boq.heading': 'A bill of quantities to be priced',
  'home.enquiries.boq.body':
    'A multi-line spreadsheet across several disciplines, often with gaps in the descriptions. It comes back priced, with the ambiguous lines flagged rather than guessed.',
  'home.enquiries.boq.more': 'Send your list',

  // ---- 4. at a glance -----------------------------------------------------
  // The two figures are counted from src/data at build time, never typed in.
  'home.glance.heading': 'Treteone at a glance',
  'home.glance.categories': 'Product categories, from automation to consumables',
  'home.glance.industries': 'Industries, each with its own duty questions',
  'home.glance.base': 'Supplying maintenance and procurement teams worldwide',
  'home.glance.account.value': 'No account',
  'home.glance.account': 'Send an enquiry without registering for anything',

  // ---- 5. positioning split -----------------------------------------------
  'home.position.subject': 'Bearings and seals, packed for shipment',
  'home.position.kicker': 'Our position',
  'home.position.heading': 'We hold no stock. That is the point.',
  'home.position.lead1':
    'A distributor sells what is on its shelf. A sourcing company starts from the duty and finds whoever satisfies it — which is a different job, and the right one when the item is obsolete, when the original manufacturer has been acquired, or when the specification matters more than the brand on the box.',
  'home.position.lead2':
    'So we are not tied to a franchise, and nothing on this site is a stock listing. Every line is quoted against the specification you send.',
  'home.position.more': 'More about how we work',

  // ---- 6. capability grid -------------------------------------------------
  'home.caps.heading': 'From a single component to a complete line.',
  'home.caps.lead':
    'Eight of the twelve categories buyers ask for most. Each is a scope statement, not a catalogue.',
  'home.caps.all': (n: number) => `All ${n} categories`,
  'home.caps.automation.subject': 'Control panel interior',
  'home.caps.automation.heading': 'Automation & control — the logic layer',
  'home.caps.automation.body':
    'PLC, DCS and SCADA hardware, HMIs, remote I/O, drives and servo systems, specified against your control platform.',
  'home.caps.instruments.subject': 'Pressure transmitter in situ',
  'home.caps.instruments.heading': 'Instrumentation — what the plant knows',
  'home.caps.instruments.body':
    'Pressure, flow, level and temperature measurement, transmitters and analysers, matched to medium and range.',
  'home.caps.valves.subject': 'Control valve with actuator',
  'home.caps.valves.heading': 'Valves & flow control — isolate and modulate',
  'home.caps.valves.body':
    'Ball, gate, globe, butterfly, control and safety valves with actuators and positioners, by pressure class and trim.',
  'home.caps.pumps.subject': 'Centrifugal pump on its baseplate',
  'home.caps.pumps.heading': 'Pumps — moving the process',
  'home.caps.pumps.body':
    'Centrifugal, dosing and submersible units, plus the seals, impellers and wear parts that keep them running.',
  'home.caps.motors.subject': 'Motor and gearbox assembly',
  'home.caps.motors.heading': 'Motors & transmission — power to the shaft',
  'home.caps.motors.body':
    'Electric motors, gearboxes, couplings, bearings and belts, selected on frame size, rating and duty cycle.',
  'home.caps.fluid.subject': 'Hydraulic power unit',
  'home.caps.fluid.heading': 'Hydraulic & pneumatic — force on demand',
  'home.caps.fluid.body':
    'Cylinders, valves, power units, fittings and air preparation, from a circuit diagram or a failed component.',
  'home.caps.mro.subject': 'Bearings and seals on the bench',
  'home.caps.mro.heading': 'Mechanical & MRO — the consumable layer',
  'home.caps.mro.body':
    'Bearings, seals, gaskets, fasteners, hoses and filtration — the lines that make up most of a maintenance spend.',
  'home.caps.consumables.subject': 'Filter elements, boxed',
  'home.caps.consumables.heading': 'Consumables — what runs out',
  'home.caps.consumables.body':
    'Filter elements, lubricants, abrasives, cutting tools and safety supplies, in the quantities a site actually uses.',

  // ---- 7. hard-to-find navy band ------------------------------------------
  'home.htf.kicker': 'Hard-to-find & obsolete',
  'home.htf.heading': 'If it has a nameplate, there is something to work from.',
  'home.htf.lead':
    'Most enquiries that reach us have already failed somewhere else — a reference that returns nothing, a manufacturer that no longer lists the item, a casting with the numbers worn off. That is the normal starting point here, not the exception.',
  'home.htf.cta': 'How we trace a part',
  /** Accessible name of the numbered list; not shown. */
  'home.htf.listLabel': 'What to send',
  'home.htf.send1': 'The reference as printed, superseded or partly illegible',
  'home.htf.send2': 'Equipment model, serial number and a nameplate photograph',
  'home.htf.send3': 'Datasheet, general arrangement drawing or P&ID extract',
  'home.htf.send4': 'Quantity, required date, and the destination',

  // ---- 8. brand marquee ---------------------------------------------------
  // §9, §13 — the wording is "Brands we source". Never authorised, agent or
  // partner.
  'home.brands.heading': 'Brands we source',
  'home.brands.note':
    'The manufacturers requested most often. If yours is not shown, ask — the list reflects demand, not the limit of what can be sourced.',
  'home.brands.logo': 'Logo',
  'home.brands.listLabel': 'Manufacturers we source',
  'home.brands.more': 'Read more about brands',
  'home.brands.disclaimer':
    'Brand names and trademarks are the property of their respective owners. Unless stated otherwise, references to manufacturers do not imply authorisation, distributorship, agency or affiliation.',

  // ---- 9. about our work --------------------------------------------------
  'home.work.heading': 'About our work',
  'home.work.quote.subject': 'Goods being checked before despatch',
  'home.work.quote.heading': 'How a quote is put together',
  'home.work.quote.body':
    'Identify, source, verify, quote, deliver. Five steps, one point of contact, and any equivalent clearly marked as an equivalent.',
  'home.work.who.subject': 'Treteone office, Liwan District',
  'home.work.who.heading': 'Who you are dealing with',
  'home.work.who.body':
    'A registered company in Liwan District, Guangzhou, working with maintenance and procurement teams in plants that cannot stand still.',
  'home.work.more': 'Read more',

  // ---- legacy -------------------------------------------------------------
  // Read only by components the new homepage no longer renders (Positioning,
  // ProductEcosystem, IndustriesPreview, BrandStrip). Kept so those files still
  // type-check until integration removes them; delete with them.
  'home.position.label': 'About Treteone',
  'home.position.statement':
    'An industrial supply and sourcing company in Guangzhou, finding the parts, equipment and systems that plants run on — from a single component to a complete line.',
  'home.position.base': 'Guangzhou, China',
  'home.position.categories': (n: number) => `${n} product categories`,
  'home.position.industries': (n: number) => `${n} industries`,
  'home.position.link': 'How we work',

  'home.eco.eyebrow': 'Product ecosystem',
  'home.eco.heading': 'From control systems to consumables.',
  'home.eco.explore': 'Explore',
  'home.eco.linkLabel': (name: string) => `Explore ${name}`,
  'home.eco.all': 'All product categories',

  'home.industries.eyebrow': 'Industries',
  'home.industries.also': 'Also',
  'home.industries.all': (n: number) => `All ${n} industries`,

  'home.brands.all': 'All brands',
};

export type HomeStrings = typeof home;
