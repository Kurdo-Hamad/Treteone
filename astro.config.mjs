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
