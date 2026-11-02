# 2026-11-02 validation

## Scope

Official site for developers starting with SEO, ASO and GEO. Retains the original three-topic interactive learning scope and adds actionable examples, complete text lessons, comparison, checklists, FAQ and primary sources.

## Automated evidence

- `npm run build`: TypeScript, Vite client build, server build and prerender passed.
- Four static documents contain the lesson text, exactly one H1, correct canonical URLs, and no indexing-blocking robots meta.
- `wrangler deploy --dry-run` passed for assets-only deployment.
- Client JavaScript ~85 KB gzip, CSS ~6.6 KB gzip. No external font, analytics or model service dependency.

## Browser evidence

Codex in-app browser / cua_repl was used (no external Playwright fallback). Checked ~1200×1312 desktop, ~389×843 mobile; DOM confirmed mobile scrollWidth equals viewport width. IAB screenshot output included blank overscan outside the actual CSS viewport; screenshot review trimmed only that blank overscan. The desktop concept is 1199×1312; native size was matched to within 1 CSS pixel. All 24 learning steps rendered their expected headings. Custom GEO query propagated through retrieval, generation and citation states. ASO code copy, checklist Markdown copy, checkbox persistence after reload, topic isolation, reset, and native FAQ expansion were checked. Console had no errors or warnings during checked flows. Online HTTPS page loaded in IAB.

## Visual comparison ledger

The concept references are retained locally at `docs/design/learning-concept.png` and `docs/design/continuation-concept.png`. They are design evidence, not site runtime assets.

| Comparison | Review and disposition |
| --- | --- |
| Hero copy and navigation | Exact hero heading, description, CTA and primary navigation retained. Pipeline wording intentionally changed to publish / discover / connect for semantic accuracy. |
| Palette | White, forest green #24694f, pale sage and quiet borders implemented. No tinted hero overlay or raster UI. |
| Container and rhythm | Fixed Tailwind container max-width collision; aligned header, hero, workbench and downstream content to 1120px grid. |
| Typography | Deliberate system Chinese sans and monospace technical text. Desktop hero enlarged to 52px to match reference hierarchy; mobile scales down independently. |
| Workbench | Tabs, numbered rail, code panel and bottom actions follow reference. Extra caveats, terminology and phase labels intentionally support beginner accuracy. Full HTML example expands the first lesson beyond the compressed concept. |
| Continuation | Table, checklist rows, FAQ and primary source links follow shared design system. Explicit definitions and source section added for educational clarity. |
| Icons and mobile | Consistent 1.7px outline SVG icons. Mobile uses horizontal step rail and scrollable comparison table without page overflow. |

Above-the-fold copy review: primary headline, description, navigation and CTA match the concept; diagram captions are intentional explanatory additions. No unplanned promotional claims. The concept and implementation were both inspected using view_image; known adaptations above are intentional. Screenshot evidence remains local and untracked.

## Content sources

Verified Google SEO Starter Guide, AI features and AI optimization guidance; Apple product page guidance; OpenAI crawler documentation; original GEO paper. No universal ranking formula or citation guarantee is presented. Check platform originals before future edits.

## Release boundary

Deployed to Cloudflare Workers and custom domains. Deployment, browser verification, search indexing and real user acceptance are distinct. Search Console verification/submission, index inclusion and third-party AI citations remain unverified. Automatic Git deployment is not configured because the Pages Git installation API returned an installation error; manual Wrangler deployment is documented.
