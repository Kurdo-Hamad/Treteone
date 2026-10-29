import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { brandSlug, brands } from '~/data/brands';

/**
 * Build-time logo resolution (CLAUDE.md §9). Read once, shared by the homepage
 * brand strip and the /brands grid so the two cannot disagree.
 *
 * This runs at build, never in the browser: no <img onerror>, no error handler
 * for the CSP to trip, no broken-image flash. Dropping siemens.svg into
 * public/logos/ replaces that tile; nothing else changes.
 *
 * §10 — every .svg must be real vector paths. A raster wrapped in an SVG fails
 * the build and names the file: the MesoAxis 462 KB header logo, made
 * unrepeatable. It checks the whole directory, so it also catches a logo added
 * for a brand that is not in the list.
 */

// process.cwd(), not import.meta.url: this module is compiled into the build
// output, so a URL relative to it resolves inside dist/. Astro builds from the
// project root, which is also how Cloudflare runs it.
const logoDir = join(process.cwd(), 'public', 'logos');

const available = new Set<string>();

// An empty directory is not tracked by git, so public/logos/ may not exist on a
// fresh checkout. That is the current state (§12), not an error.
for (const file of existsSync(logoDir) ? readdirSync(logoDir) : []) {
  if (!file.endsWith('.svg')) continue;

  const svg = readFileSync(join(logoDir, file), 'utf8');
  if (/;base64,/i.test(svg) || /<image[\s>]/i.test(svg)) {
    throw new Error(
      `public/logos/${file} is a raster wrapped in an SVG, not a vector (CLAUDE.md §10).\n` +
        'It embeds a bitmap via <image> or a base64 data URI. Export real paths, ' +
        'or ship it as an AVIF/WebP through astro:assets instead.',
    );
  }

  available.add(file.replace(/\.svg$/, ''));
}

export interface BrandTile {
  readonly name: string;
  readonly slug: string;
  /** Site-root path to the logo, or null for the dashed name placeholder. */
  readonly logo: string | null;
}

export const brandTile = (name: string): BrandTile => {
  const slug = brandSlug(name);
  return { name, slug, logo: available.has(slug) ? `/logos/${slug}.svg` : null };
};

export const brandTiles: readonly BrandTile[] = brands.map(brandTile);
