# Technical Architecture Research — EnconeMed (Phase 0)

Research scope: Next.js 15 App Router architectural conventions (Server/Client Components, rendering modes, Metadata API, route groups, project structure), content architecture patterns for a JSON/MDX-driven site with no CMS/backend, image optimization architecture, and the real-world Cloudflare + Vercel deployment combination.

## Executive Summary

Next.js 15's App Router is explicitly designed around a Server-Components-by-default model, with Client Components as an opt-in boundary declared via `"use client"` **[Official Requirement]**. For EnconeMed — a largely static, lead-generation site with no traditional backend — this maps naturally to a mostly-SSG architecture: content-heavy pages (equipment catalog, category pages, informational content) rendered as Server Components with build-time or ISR-based data fetching, and a small number of Client Component "islands" for interactive elements (lead capture forms, image galleries, filters, Telegram-bot-triggering Server Actions). Next.js provides first-party, documented conventions for exactly this: `generateMetadata`/static `metadata` exports for SEO, route groups for organizing routes without affecting URLs, and colocation rules for keeping non-route files safely inside `app/`. The MDX/JSON-without-CMS pattern is a documented (if lightly documented) approach: Next.js officially supports both local MDX-as-component imports and dynamically-fetched MDX/content from any source, with community and framework guidance converging on a JSON manifest for ordering/navigation alongside folder-per-content MDX files. The one area where official documentation is thin and real-world caveats are significant is combining Cloudflare with Vercel: both vendors document their own caching models well, but neither publishes a definitive joint integration guide, and the well-documented failure mode (double-caching / stale-content-after-revalidation) needs to be designed for explicitly rather than assumed away.

## Official References

- Next.js official docs — Getting Started: Server and Client Components: https://nextjs.org/docs/app/getting-started/server-and-client-components
- Next.js official docs — Directives: `use client`: https://nextjs.org/docs/app/api-reference/directives/use-client
- Next.js official docs — Getting Started: Project Structure: https://nextjs.org/docs/app/getting-started/project-structure
- Next.js official docs — File-system conventions: Route Groups: https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
- Next.js official docs — Routing: Project Organization / Colocation (v14 archive, conventions carried into v15): https://nextjs.org/docs/14/app/building-your-application/routing/colocation
- Next.js official docs — Functions: `generateMetadata`: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next.js official docs — Getting Started: Metadata and OG images: https://nextjs.org/docs/app/getting-started/metadata-and-og-images
- Next.js official docs — Guides: MDX: https://nextjs.org/docs/pages/guides/mdx
- Next.js official docs — Components: Image (App Router): https://nextjs.org/docs/app/api-reference/components/image
- Next.js official docs — App Router Glossary (SSG/SSR/ISR terminology): https://nextjs.org/docs/app/glossary
- Vercel official docs — Vercel CDN overview: https://vercel.com/docs/cdn
- Vercel official docs — Edge Network FAQ: https://vercel.com/docs/concepts/edge-network/frequently-asked-questions
- Vercel official docs — Incremental Static Regeneration: https://vercel.com/docs/incremental-static-regeneration
- Vercel official docs — Image Optimization: https://vercel.com/docs/image-optimization
- Cloudflare official docs — Cache Concepts, Origin Cache Control: https://developers.cloudflare.com/cache/concepts/cache-control/
- Cloudflare official docs — Cache Responses: https://developers.cloudflare.com/cache/concepts/cache-responses/
- Third-party / community (supporting color only, not authoritative) — Cloudflare Community: "Cache Always MISS When Reverse Proxied From Vercel": https://community.cloudflare.com/t/cloudflare-cache-always-miss-when-reverse-proxied-from-vercel/663061
- Third-party blog (supporting color only) — "The Cloudflare + Vercel Caching Trap": https://medium.com/@devanshug23/the-cloudflare-vercel-caching-trap-why-your-users-still-see-the-old-version-548bad07ecc8
- Third-party blog (supporting color only) — BlazingCDN, "Deploy Next.js on Vercel With Cloudflare": https://blog.blazingcdn.com/en-us/cloudflare-vercel-workflow-deploying-nextjs-edge-caching

## Important Findings

1. **Server vs. Client Components is the foundational architectural decision in App Router** — Server Components are the default; `"use client"` marks a module boundary, and everything imported into that module (including child components) becomes part of the client JS bundle **[Official Requirement]**. Official guidance is explicit about *when* `"use client"` is needed: use of `useState`/`useEffect`/`useRef`/`useContext`/`useReducer`/`useMemo`/`useCallback`, client-side routing hooks (`useRouter`, `usePathname`, `useSearchParams`, `useParams`), DOM event handlers (`onClick`, `onChange`, etc.), or browser APIs (`window`, `document`, `localStorage`, `IntersectionObserver`, Geolocation) **[Official Requirement]**. Server Components passed as children/props into a Client Component are *not* pulled into the client bundle — they render server-side and are passed through as already-rendered output, a documented pattern for keeping "islands" small **[Official Requirement]**.

2. **SSG is the default rendering mode when nothing forces dynamic behavior**; ISR is documented as "still SSG, with intelligent cache invalidation layered on top," controlled via `export const revalidate = <seconds>` at the route/segment level or `fetch(url, { next: { revalidate } })` at the request level **[Official Requirement, terminology per Next.js Glossary and Vercel ISR docs]**. `export const dynamic = 'force-static'` can force static rendering even where Next.js might otherwise infer dynamic behavior **[Official Requirement]**. For EnconeMed's catalog-style content (rental/sale listings that change infrequently, not per-user), SSG with ISR revalidation is the documented fit — full dynamic (SSR) rendering is warranted only for genuinely per-request content, which a lead-gen site with no user accounts/backend is unlikely to need broadly **[Recommendation, applying official rendering-mode guidance to EnconeMed's stated context]**.

3. **Metadata API** — `metadata` (static object) or `generateMetadata` (async function) exported from `layout.js`/`page.js`, Server Components only **[Official Requirement]**. `generateMetadata` is the documented choice whenever title/description/canonical/OG data depends on route params or fetched content (i.e., per-product or per-category metadata driven from the JSON/MDX content source) **[Official Requirement]**. The API auto-generates `<title>`, `<meta>`, `<link>`, and JSON-LD `<script>` tags in `<head>` **[Official Requirement]** — relevant for EnconeMed's SEO needs around structured data for medical equipment listings.

4. **Route Groups** (`(folderName)`) are a documented, URL-invisible organizational convention, with stated official use cases: organizing routes by team/concern/feature, defining multiple root layouts, and opting specific segments in/out of a shared layout **[Official Requirement]**. Private folders (`_folderName`) and general colocation are also documented: a route only becomes publicly accessible once a `page.js`/`route.js` file exists in that segment, so non-route files (components, content helpers, JSON loaders) can be safely colocated inside `app/` without becoming routable **[Official Requirement]**. This is directly usable for EnconeMed's likely structure (e.g., grouping marketing pages, product pages, and legal/informational pages under separate route groups sharing different layouts).

5. **MDX + JSON without a CMS is an officially supported, if lightly prescribed, pattern.** Next.js's own MDX guide documents two supported modes: importing local `.mdx` files as components (with exported metadata alongside content), and fetching MDX/content dynamically at request or build time from "a separate local folder, CMS, database, or anywhere else" — explicitly including plain local folders as a first-class source, not just CMS/DB **[Official Requirement]**. The specific pattern of "a folder of MDX files plus a separate JSON object for ordering/navigation" is a documented community/ecosystem convention rather than something Next.js's core docs mandate outright **[Industry Best Practice, not an Official Requirement — flagged because the task specifies distinguishing the two]**. For EnconeMed this means: content-as-code (MDX/JSON checked into the repo) is a legitimate, officially-supported architecture, but the specific manifest/ordering scheme is a design choice EnconeMed's team should document explicitly in Phase 1, not something "the framework requires."

6. **Image optimization architecture spans two possible pipelines that can conflict.** Next.js's `next/image` handles resizing/format-negotiation/caching at the framework level; Vercel's platform-level Image Optimization (documented at vercel.com/docs/image-optimization) also transforms and caches images at the CDN when deployed on Vercel **[Official Requirement, per Vercel CDN docs: "You can resize, crop, and convert images to modern formats... Vercel transforms and caches the results on the CDN"]**. When Cloudflare is placed in front of Vercel, a third potential image-processing layer (Cloudflare Images/Polish, if enabled) can be introduced. Community sources report needing specific Cloudflare configuration (referenced as "Origin Control: Off" style settings) when combining Cloudflare with Vercel's own image optimization, per Vercel's FAQ **[Official Requirement per Vercel FAQ existence — but exact current setting name/steps should be re-verified directly against Vercel's live FAQ page at implementation time, as this research could not fully confirm the precise UI labels]**.

7. **Cloudflare + Vercel combination — no single authoritative joint document, but the caching risk is real and documented independently by both vendors' own concepts pages.** Vercel's CDN is described in its own docs as "framework-aware," deriving cache policy from the build and framework configuration "eliminating the need to define manual cache-control headers" in the common case **[Official Requirement]**. Cloudflare's cache, per its own concepts documentation, operates on standard `Cache-Control`/origin header semantics and is not natively aware of Next.js's ISR revalidation events **[Official Requirement, per Cloudflare cache-control docs' general model]**. The combination of these two independently-correct behaviors produces the documented failure mode: Cloudflare can continue serving a stale page after Vercel has revalidated it, until Cloudflare's own TTL lapses or a purge is issued **[Industry Best Practice / Observation, corroborated by multiple independent third-party and community sources rather than a single joint vendor document]**. This is the single most important open architectural question for EnconeMed's deployment and should be explicitly designed for in Phase 1 (see Future Considerations).

## Implementation Notes

- Default new components to Server Components; add `"use client"` only at the smallest possible leaf (e.g., a form's submit button/state, not the whole page shell) **[Official Requirement, applying documented boundary guidance]**.
- Use `generateMetadata` for all content-driven routes (product/category pages sourced from JSON/MDX) and static `metadata` exports only for genuinely static pages (About, Contact) **[Official Requirement / Recommendation]**.
- Establish route groups early (e.g., `(marketing)`, `(catalog)`, `(legal)`) so layout boundaries are set before the page count grows, since retrofitting route groups later means moving files without changing URLs — low risk, but easier to do once **[Recommendation]**.
- Store per-item image dimensions in the JSON content schema itself (not just a path), so `next/image` always has `width`/`height` available without a build-time image-probing step **[Recommendation, connects to 10-performance.md CLS guidance]**.
- Document the JSON-manifest-plus-MDX-folder convention explicitly as an EnconeMed-specific architectural decision in Phase 1 deliverables, since it is not something Next.js enforces — future contributors need it written down **[Recommendation]**.

## Common Mistakes

- Treating the entire app as Client Components "because it's simpler," which discards the primary architectural benefit of the App Router (small client bundles, server-rendered-by-default) **[Official Requirement, per Server/Client Components docs]**.
- Assuming `generateStaticParams`/SSG alone is sufficient for content that actually needs periodic refresh (e.g., stock/availability-like fields on rental listings) without adding `revalidate` — this produces stale content indefinitely until the next full redeploy, since Full Route Cache persists until redeploy **[Official Requirement, connects to 10-performance.md caching findings]**.
- Deploying Cloudflare in front of Vercel with default "cache everything" style rules that don't account for ISR revalidation, silently reintroducing stale content bugs **[Industry Best Practice / Observation, see finding 7]**.
- Conflating "no CMS" with "no content architecture" — an unstructured pile of MDX files without a documented ordering/manifest convention becomes unmaintainable as the catalog grows **[Recommendation]**.
- Running both Vercel Image Optimization and a Cloudflare image-processing layer unknowingly, doubling transform cost/latency for no benefit **[Observation, needs Phase 1 verification against final Cloudflare plan]**.

## Recommended Practices

- Adopt route groups to separate layout concerns (marketing chrome vs. catalog chrome vs. legal/plain pages) from day one **[Industry Best Practice]**.
- Keep a single source-of-truth JSON schema per content type (e.g., `product.schema` fields including image dimensions, spec fields, MDX body reference) so MDX/JSON content is validated consistently across the catalog **[Recommendation]**.
- Use Server Actions (already confirmed in the stack) as the mechanism for lead-capture form submission and Telegram bot notification triggering, keeping that logic server-side and out of the client bundle **[Recommendation, consistent with confirmed stack and Server/Client Component boundary guidance]**.
- For the Cloudflare/Vercel pairing, explicitly design (in Phase 1, not left implicit): which layer owns image optimization, which cache-control headers Cloudflare is instructed to respect vs. override, and how a purge is triggered on deploy/revalidation **[Recommendation]**.
- Treat the MDX+JSON pattern as a formally documented internal convention (folder layout, manifest schema, naming rules) rather than an emergent, ad hoc structure **[Recommendation]**.

## Things to Avoid

- Do not default to Client Components; do not add `"use client"` speculatively "just in case" **[Official Requirement]**.
- Do not assume Cloudflare sitting in front of Vercel is a drop-in, zero-configuration combination — official docs from each vendor describe their own caching model well, but do not jointly document the combination, and independent sources consistently report a stale-content failure mode **[Industry Best Practice / Observation]**.
- Do not skip explicit `revalidate` configuration on content that changes (even infrequently) under the assumption that SSG alone will "just update" — Full Route Cache persists until redeploy **[Official Requirement]**.
- Do not let the "no CMS" decision become "no documented content structure" — this creates long-term maintainability risk for a growing product catalog **[Recommendation]**.

## Future Considerations

- Before Phase 1 implementation, obtain and record the exact current Cloudflare cache-rule configuration recommended for a Vercel origin, ideally validated in a Cloudflare support/docs conversation or a controlled staging test, since no single official joint guide exists **[Recommendation — explicitly flagged as an open question for the Product Architect]**.
- Confirm current, exact steps/labels for the Vercel-side "Origin Control" or equivalent setting referenced when Cloudflare handles image optimization instead of (or alongside) Vercel's own, directly against Vercel's live FAQ/docs at implementation time **[Recommendation — flagged as needing direct verification, not confirmed with full confidence in this research pass]**.
- Decide and document, as an EnconeMed-specific architectural decision record, the JSON manifest/ordering convention for MDX content, since Next.js does not prescribe one **[Recommendation]**.
- Track Next.js release notes across 15.x for any changes to default caching behavior (Data Cache, Full Route Cache defaults have changed between major versions historically) before locking Phase 1 caching configuration **[Recommendation]**.

## Checklist

- [ ] Confirm Server Component default / Client Component boundary conventions for the team (component-level code review rule)
- [ ] Define route groups for marketing / catalog / legal sections before scaffolding pages
- [ ] Establish `generateMetadata` usage convention for all content-driven routes
- [ ] Decide and document the SSG vs. ISR revalidate interval per content type (catalog pages, informational pages)
- [ ] Document the MDX + JSON manifest convention as an internal architecture decision record
- [ ] Decide which layer (Next.js / Vercel / Cloudflare) owns image optimization and document why
- [ ] Design explicit Cloudflare cache rules for ISR-backed routes (respect Vercel Cache-Control, avoid blanket TTL overrides)
- [ ] Define a cache-purge mechanism triggered from the deploy/revalidation pipeline to Cloudflare
- [ ] Verify current Vercel official guidance on proxying through third-party CDNs before finalizing deployment topology
- [ ] Re-check Next.js 15.x release notes for caching-default changes relevant to this architecture
