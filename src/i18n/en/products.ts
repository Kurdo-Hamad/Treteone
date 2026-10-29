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

  /** Accessible name of the category list (IndexRows). */
  'products.listLabel': 'Product categories',
};

export type ProductsStrings = typeof products;
