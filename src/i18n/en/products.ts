/**
 * English copy — products. Key authority for this module: the Chinese module
 * src/i18n/zh/products.ts is typed against `typeof products`, so a key added here and
 * missing there fails `astro check`.
 *
 * Deliberately NOT `as const`: values must widen to `string` so the Chinese
 * module can hold different text and still satisfy the same type.
 */
export const products = {
  // One title and description per route (§3).
  'meta.products.title': 'Products — Treteone',
  'meta.products.description':
    'Twelve industrial product categories sourced from Guangzhou: automation, instrumentation, electrical, motors and drives, pumps, compressors, valves, MRO spares and more.',

  // ---- /products page head (approved mockup, #v-products) -----------------
  'products.page.kicker': (n: number) => `Products · ${n} categories`,
  'products.page.title': 'Everything behind the plant, in one enquiry.',
  'products.page.lead':
    'Categories tell you whether your item is within scope. Nothing is held in stock, and every line is quoted against the specification you send.',
  /** The action at the end of every index row. */
  'products.rows.enquire': 'Enquire',

  // ---- navy scope band on /products (ScopeSteps) --------------------------
  'scope.band.kicker': 'Scope',
  'scope.band.title': 'From one component to a complete line.',

  // ---- legacy -------------------------------------------------------------
  // Read by components the homepage stream is replacing (CategoryIndex,
  // ScopeScroller) and by nothing on the new /products. Kept so the build
  // stays green; integration removes them with those components.
  'products.eyebrow': 'Products',
  'products.heading': 'Everything behind the plant.',
  'products.lede':
    'Twelve categories covering mechanical, electrical, automation, instrumentation and rotating equipment.',
  'products.count': (n: number) => `${n} categories`,
  /** Also the accessible name of the /products index list. */
  'products.listLabel': 'Product categories',
  'products.enquire': 'Request a quote',
  'products.cardLabel': (name: string) => `Request a quote for ${name}`,
  'products.notListed.heading': 'Not on the list?',
  'products.notListed.body':
    'These are the categories most often requested, not the limit of what we look for. Send the part number and we will investigate it.',
  'products.notListed.cta': 'Hard-to-find parts',
  'scope.heading': 'From the smallest component to a complete system.',
  'scope.lede': 'Scroll through the scope. The same team handles all five.',
  'scope.stepCount': (n: number, total: number) => `Stage ${n} of ${total}`,
};

export type ProductsStrings = typeof products;
