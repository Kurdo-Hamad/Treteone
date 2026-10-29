// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// NOTE: there is deliberately no postcss.config.mjs in this repo. See CLAUDE.md §2.
// Tailwind is registered as a Vite plugin and nothing else.

export default defineConfig({
  // TODO(§10): confirm the production domain before launch.
  site: 'https://treteone.com',
  output: 'static',
  trailingSlash: 'ignore',

  // §2 — real localised routes, not a client-side text swap.
  i18n: {
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },

  build: {
    format: 'directory',

    // §8 — the CSP in public/_headers is `default-src 'self'` with no
    // 'unsafe-inline'. Astro inlines small stylesheets into the document by
    // default, which would need a hash or a nonce that a static _headers file
    // cannot compute. Do not relax this without changing the header to match.
    // (The matching setting for scripts is vite.build.assetsInlineLimit below.)
    inlineStylesheets: 'never',
  },

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // §8 — measured, not guessed. Astro passes no quality, so sharp's AVIF
        // default of 50 applied. Against five real industrial photographs the
        // busiest of them put the 31-image page at 1771 KB, 115% of the 1.5 MB
        // budget. At 40 the same worst case lands at 1329 KB (87%), leaving
        // room for the last two sections.
        //
        // Checked visually at 1:1 on the busiest photograph, behind the
        // grayscale(.35) the design applies: slight softening in fine overhead
        // detail, no blocking, no banding. See the README for the full table.
        //
        // WebP and JPEG are deliberately left at sharp's defaults: they are
        // fallbacks for browsers without AVIF and never counted in the budget.
        avif: { quality: 40 },
      },
    },
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', zh: 'zh-CN' },
      },
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    build: {
      // Astro decides whether to inline a hoisted <script> by reading Vite's
      // resolved assetsInlineLimit, not Astro's — see
      // astro/dist/core/build/plugins/plugin-scripts.js. Anything under the
      // limit is written straight into the document, which cannot satisfy
      // `script-src 'self'` (§8). 0 forces every script out to its own file.
      assetsInlineLimit: 0,
    },
  },
});
