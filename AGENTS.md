# SEOGEO.dev

React 19 + Vite 8 + TypeScript + Tailwind CSS v4 educational site. Production is on Cloudflare Workers static assets; source is icemono/SEOGEO, main branch. This checkout is the canonical source, independent of Figma Make.

## Product

Teach SEO, ASO and GEO to developers with no prior search-marketing knowledge. Explain mechanisms, examples, actionable steps and limits in simple Chinese. Keep live search, local simulations, search indexing and AI citations distinct. Do not introduce ranking scores, guarantees, fabricated statistics, or imply that llms.txt is a universal requirement. Prefer primary sources for platform claims.

## Development and verification

- `npm ci`, then `npm run dev`. Read the actual Vite output for the current port; do not assume a server is running.
- `npm run check`: TypeScript, client/SSR build, static prerender and generated-output checks.
- `npm run preview` serves the static production build. Reload after a rebuild.
- `npm run deploy`: build and deploy using Wrangler's existing login. Never store login credentials in source.
- Git automatic deployment is not configured. Keep local publication checks available through `npm run check`.
- Keep generated QA screenshots and local design reference PNGs untracked. The sharing image is tracked directly and must not become an LFS pointer.

## Structure

- `src/content.ts`: lessons, terms, checklists, FAQ and source links.
- `src/pages.ts`: route titles/descriptions and page inventory.
- `src/Workbench.tsx`: shared accessible topic tabs for the checklist.
- `src/Checklist.tsx`: local checkbox state and export.
- `src/App.tsx`: route composition. `src/Home.tsx`, `src/Guide.tsx`, `src/demo/Demo.tsx`: page surfaces. `src/index.css`: shared design system.
- `src/entry-server.tsx`, `src/main.tsx`: SSR and client hydration. Initial render must match on both sides.
- `scripts/prerender.mjs`: full static HTML, route metadata/schema, CSP hashes and sitemap.
- `scripts/check-build.mjs`: verifies generated publication output.
- `public/_redirects`: redirects the duplicate `/demo/seo/` entry to canonical `/demo/`. Exclude that alias from the generated sitemap.
- `public/_headers`: security/cache template. Inline JSON-LD CSP hashes are injected during the build.
- `wrangler.jsonc`: Worker name, account, assets and custom domains.

## Visual baseline

The user explicitly rejected the white/green documentation-workbench redesign. Preserve the original GitHub pixel adventure style from commit `6453c00`: navy #151d38, blue skies, yellow #ffdc4c, brick blocks, clouds, hills, pipe and CSS pixel robot. Chinese display font ZCOOL KuaiLe; English pixel labels Press Start 2P, both hosted locally with OFL licenses. Do not substitute a generic documentation/dashboard layout. Homepage introduces concepts; `/demo/` is the dedicated interactive scene. Reading guides live at `/learn/*/` and share the pixel brand.

`src/demo/original.css` scopes the original scene to `.demo-page`; appended refinements handle mobile. `src/index.css` owns the site shell, home and guide styles. Avoid selector collisions between site chrome, checklist tabs and game HUD. Verify desktop and 390px mobile, with horizontal scrolling limited to the game map. Respect reduced motion.

## Operational boundaries

Canonical host: https://seogeo.dev/. Cloudflare zone redirect sends www to the canonical host while retaining path/query. The user will manually verify and submit Google Search. A TXT verification record exists. Prepare the site and SEO, but do not verify ownership, submit a Sitemap or request indexing through the user account without a new explicit instruction. A deployment or sitemap submission is not evidence of indexing. Git build validation is not automatic production deployment. See README and docs/validation.md for the current verified boundary.
