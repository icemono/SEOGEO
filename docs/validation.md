# 2026-11-02 — pixel style restoration and dedicated demo

## Current scope and baseline

The user rejected the white/green documentation workbench and selected the original GitHub pixel adventure look. The visual baseline is `6453c00`, not the rejected generated concepts.

Homepage `/` introduces three concepts and provides entry points. `/demo/` is the dedicated interactive page, with `/demo/seo/`, `/demo/aso/`, `/demo/geo/` for topic entry. Existing `/learn/*/` routes provide the longer explanations, code, terms and developer checklists in the same brand system.

## Implementation

- Restored original three themed skies, CSS robot, cloud, coins, brick stages, hills, pipe, ground and game HUD. Isolated original CSS under `.demo-page`.
- Moved homepage explanation and long reading material outside the demo playfield.
- Added mobile scene layout; only the stage map scrolls horizontally. Active stages are centered as the user advances.
- Kept local simulated query/results. Added empty-input guidance and keyboard arrow switching for topic tabs. No real search/model requests.
- Retained concept corrections, including platform-dependent ASO mechanisms and GEO's retrieval premise and citation limits.
- Hosted original display fonts locally: Press Start 2P (~7 KB WOFF2), ZCOOL KuaiLe (~73 KB WOFF2), with their OFL license files. No external font runtime dependency.
- Eight pre-rendered documents have per-route titles, descriptions, canonical, JSON-LD and matching CSP hashes. Sitemap is generated from the page inventory.

## Verification

`npm run check` passed: TypeScript, Vite client/SSR builds, eight prerendered pages, one H1 per page, internal links and assets, metadata/canonical/schema URLs, eight stages or eight guide lessons, sitemap entries, CSP hashes, real local WOFF2 files and JPEG sharing image. `git diff --check` is also required before pushing.

Browser checks use Codex IAB and Chrome through cua_repl. Desktop and 389px mobile were checked. All 24 demo stages rendered the expected title. Mobile custom GEO question propagated through the flow to the result; expanding the result clearly states no real references were generated. Empty query showed its guidance. DOM confirmed no whole-page horizontal overflow on mobile; the stage map is intentionally wider than the viewport.

The original palette, robot geometry, sky/background objects, three-dimensional brick edges, display fonts and bottom controls were visually compared against the original code. Intentional differences: shared site navigation, dedicated demo route, legible body text, phase-label positioning, bounded desktop height, and responsive mobile layout. Homepage extends the same scene into a landing page and three topic cartridges. No generic workbench panels remain in the main experience.

## Production and search boundary

Cloudflare Workers static hosting remains the deployment target. The canonical www → apex redirect is configured in zone ruleset `94ee685fa9a5469cb2cbe0b38b85d25a` and retains path/query; root and nested query cases returned 301.

**Google Search submission is paused at the user's request.** One TXT ownership-verification record was added before that instruction. The Verify button was not pressed, Sitemap was not submitted, and no indexing request was made. Do not treat that DNS record as verified ownership or indexing evidence.

Git automatic production deployment is not configured. Publish with the documented Wrangler command using the existing login. No API tokens or additional GitHub permissions were created for CI.

Final browser checks also confirmed automatic playback pauses at stage 5 for user input, mobile active-stage visibility, keyboard topic switching, guide navigation and checklist persistence after reload. Production `/demo/` loaded over HTTPS; a custom GEO question reached the result panel, with no console errors or warnings in the checked flow. Final desktop scene was checked at 1280×900; mobile page widths of 389px and 358px showed no page-wide overflow.
