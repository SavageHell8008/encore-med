# Performance Research — EnconeMed (Phase 0)

Research scope: Core Web Vitals, image optimization, font loading, caching (Cloudflare + Vercel + Next.js), prefetching, and the performance/accessibility overlap relevant to EnconeMed's target audience (India, lead-generation medical equipment platform, meaningful share of older/less technical users on low-end Android devices and variable network conditions).

## Executive Summary

EnconeMed's confirmed stack (Next.js 15 App Router, SSG-first, Server Actions, Cloudflare in front of Vercel) is well aligned with current Core Web Vitals guidance, provided a few documented interaction points are configured correctly rather than assumed. The current Core Web Vitals set is **LCP, INP, CLS** — INP formally replaced First Input Delay (FID) on **March 12, 2024**, and no further metric-set change has been announced as of this research (Aug 2026) **[Official Requirement]**. Next.js's built-in `next/image` and `next/font` components directly target LCP and CLS by default, but they only help if used with correct props (`priority`, explicit `width`/`height` or `fill`, `sizes`). The most consequential open risk for EnconeMed's specific architecture is **the Cloudflare-in-front-of-Vercel double-caching problem**: Cloudflare's edge cache does not automatically know when Vercel's ISR/on-demand revalidation has produced fresh content, so stale content can be served past its intended TTL unless cache rules are deliberately coordinated **[Official Requirement / Recommendation — see Important Findings]**. For a low-end-device, high-latency-tolerant audience, CLS avoidance and INP discipline (small JS bundles, few Client Components) matter more than marginal LCP shaving once LCP is already sub-2.5s.

## Official References

- web.dev — Interaction to Next Paint (INP): https://web.dev/articles/inp
- web.dev — Route prefetching in Next.js: https://web.dev/articles/route-prefetching-in-nextjs
- Next.js official docs — Image Component (App Router): https://nextjs.org/docs/app/api-reference/components/image
- Next.js official docs — Fonts (Getting Started): https://nextjs.org/docs/app/getting-started/fonts
- Next.js official docs — Fonts (Building Your Application, v14 archive, same mechanism carried into v15): https://nextjs.org/docs/14/app/building-your-application/optimizing/fonts
- Next.js official docs — Link Component (App Router): https://nextjs.org/docs/app/api-reference/components/link
- Next.js official docs — Prefetching Guide: https://nextjs.org/docs/app/guides/prefetching
- Next.js official docs — Linking and Navigating: https://nextjs.org/docs/app/getting-started/linking-and-navigating
- Vercel official docs — Vercel CDN overview: https://vercel.com/docs/cdn
- Vercel official docs — Edge Network FAQ: https://vercel.com/docs/concepts/edge-network/frequently-asked-questions
- Vercel official docs — Incremental Static Regeneration: https://vercel.com/docs/incremental-static-regeneration
- Vercel official docs — Cache-Control headers: https://vercel.com/docs/caching/cache-control-headers
- Cloudflare official docs — Cache Concepts, Origin Cache Control: https://developers.cloudflare.com/cache/concepts/cache-control/
- Cloudflare official docs — Cache Responses: https://developers.cloudflare.com/cache/concepts/cache-responses/
- Cloudflare Community thread (supporting color, not authoritative) — "Cache Always MISS When Reverse Proxied From Vercel": https://community.cloudflare.com/t/cloudflare-cache-always-miss-when-reverse-proxied-from-vercel/663061
- Third-party blog (supporting color only) — "The Cloudflare + Vercel Caching Trap": https://medium.com/@devanshug23/the-cloudflare-vercel-caching-trap-why-your-users-still-see-the-old-version-548bad07ecc8
- Third-party blog (supporting color only) — BlazingCDN, "Deploy Next.js on Vercel With Cloudflare: Edge Caching": https://blog.blazingcdn.com/en-us/cloudflare-vercel-workflow-deploying-nextjs-edge-caching

## Important Findings

1. **Core Web Vitals metric set confirmed current** — LCP (loading), INP (responsiveness), CLS (visual stability) **[Official Requirement]**. Thresholds per web.dev (75th percentile, mobile + desktop combined): LCP ≤ 2.5s good / 2.5–4s needs improvement / >4s poor; INP ≤ 200ms good / 201–500ms needs improvement / >500ms poor; CLS ≤ 0.1 good / 0.1–0.25 needs improvement / >0.25 poor **[Official Requirement]**. INP replaced FID on March 12, 2024; this research found no subsequent metric replacement as of August 2026 **[Official Requirement]**, but the Product Architect should re-verify at Phase 0 sign-off since this is a fast-moving area of Google's guidance.

2. **`next/image` default behavior** — Next.js detects the requesting device/browser via the Accept header and serves the most efficient supported format (WebP/AVIF) among those configured in `images.formats`, resizes to the required dimensions, and caches the optimized result **[Official Requirement]**. `width`/`height` (or `fill`) are effectively required — they let Next.js reserve layout space and prevent CLS **[Official Requirement]**. The `priority` prop should be set on the single image expected to be the LCP element (e.g., hero product image) — it disables lazy-loading and adds a preload hint for that image **[Official Requirement]**. The default loader's remote fetch limit is 50MB per source image **[Official Requirement]**.

3. **`next/font` default behavior** — `font-display` defaults to `swap`, and `preload` defaults to `true` **[Official Requirement]**. next/font self-hosts font files (including Google Fonts) at build time, removing the external network request to fonts.googleapis.com, and applies a CSS `size-adjust` fallback so that swapped-in fonts don't shift layout — Next.js's own docs describe this as enabling "zero layout shift" font loading **[Official Requirement]**. This directly protects CLS.

4. **Next.js Link prefetching** — In production, `<Link>` automatically prefetches the linked route's React Server Component payload when the link enters the viewport; prefetching is disabled in development **[Official Requirement]**. The `prefetch` prop can be `true` (full route, static and dynamic), `false` (disabled), `null`/default (static routes prefetched fully, dynamic routes prefetch only down to the nearest `loading.tsx` boundary), or `"unstable_forceStale"`. `router.prefetch()` allows manual prefetch on hover/analytics signals **[Official Requirement]**. On low-bandwidth mobile connections common across India, aggressive default prefetching of every visible link can itself consume meaningful data — this is a real tradeoff, not just a benefit **[Observation]**.

5. **Next.js internal caching layers** — the App Router documents (per multiple secondary sources cross-checked against Vercel's own caching docs) four cooperating caches: **Data Cache** (persisted fetch results, can survive across deploys unless explicitly revalidated), **Full Route Cache** (server-side static HTML/RSC payload, cleared on redeploy), **Router Cache** (client-side, in-memory, per-session — static segments ~5 min, dynamic ~30s in older versions; the Router Cache's exact duration has changed across Next.js minor versions), and **Request Memoization** (dedupes fetches within a single render pass) **[Industry Best Practice — corroborated by multiple sources; exact Router Cache TTLs should be re-verified against the installed Next.js 15.x version's changelog rather than assumed]**.

6. **ISR on Vercel** — Vercel's own CDN docs state ISR serves cached pages while regenerating content in the background; "Vercel manages caching, request collapsing, and purging automatically when you use ISR with Next.js" **[Official Requirement]**. This applies specifically to Vercel's first-party CDN layer — it is a separate question from what happens once Cloudflare sits in front of it (see next point).

7. **Cloudflare + Vercel double-caching caveat (flagged explicitly per task instructions)** — Vercel's Edge Network FAQ documents that Vercel's CDN is "framework-aware" and derives caching policy from the build; Cloudflare, sitting in front of it as a generic reverse proxy, is not framework-aware and by default only respects standard `Cache-Control` headers on the response **[Official Requirement, per Vercel CDN docs]**. Multiple independent sources (Cloudflare Community thread, third-party blog analyses) converge on the same practical failure mode: when Vercel regenerates a page via ISR (on-demand or time-based revalidation), Cloudflare's edge cache has no built-in signal of that event and will continue serving its own previously cached copy until its own TTL expires — a "double cache" desync **[Industry Best Practice / Observation — not itself sourced from an official joint Cloudflare-Vercel document, but the underlying mechanism (independent TTLs, no automatic cross-invalidation) is consistent with both vendors' own cache-control documentation]**. Mitigations described across sources: setting Cloudflare cache rules to respect/pass through Vercel's `Cache-Control`/`stale-while-revalidate` headers rather than overriding with a blanket edge TTL, using Cloudflare Cache Purge (API or dashboard) triggered from the same deploy/revalidation pipeline, or bypassing Cloudflare's cache for specific dynamic/ISR paths. **No single authoritative "Vercel + Cloudflare together" document was found from either vendor** — this is treated as an open question for Phase 1, not a solved pattern. See `16-technical-architecture.md` for the architecture-level treatment of this caveat.

## Implementation Notes

- Reserve `priority` for at most one or two above-the-fold images per page (typically the hero product image) — over-using `priority` defeats its purpose of prioritizing the true LCP candidate **[Official Requirement]**.
- Always supply `sizes` when an `<Image>` is rendered at different widths across breakpoints (responsive layouts), since Next.js uses `sizes` to decide which resolution to fetch **[Official Requirement]**.
- For content-driven MDX/JSON pages (product listings, spec sheets), plan explicit image dimensions in the content schema itself (width/height stored alongside the image reference) so every render site has the data needed to avoid CLS **[Recommendation]**.
- Treat `next/font`'s `swap` default as acceptable for EnconeMed's brand fonts unless a specific brand requirement demands `optional` (which avoids any visible swap but may show fallback font if the custom font loads slowly) **[Recommendation]**.
- Given prefetching happens automatically for on-screen links in production, audit page templates (e.g., long category listing pages with many product cards) for the *number* of simultaneously-viewport-visible links, since each is a prefetch candidate; consider `prefetch={false}` on low-priority links (footer, legal pages) to reduce mobile data usage **[Recommendation]**.
- Any Cloudflare cache rule for HTML routes should be built to respect Vercel's emitted `Cache-Control`/`CDN-Cache-Control` headers rather than impose an independent flat TTL, specifically for ISR-backed routes **[Recommendation, pending Phase 1 validation]**.

## Common Mistakes

- Using `<img>` instead of `next/image` for content-driven or CMS-like JSON/MDX images, losing automatic format negotiation and layout-shift protection **[Industry Best Practice — documented failure mode across guides, consistent with official docs' stated purpose for the component]**.
- Omitting `width`/`height` (or `fill` + a sized parent) on images, which is a primary documented cause of CLS regressions **[Official Requirement]**.
- Assuming Cloudflare "just works" as a transparent pass-through CDN in front of Vercel without configuring cache-control alignment — leads to users seeing stale content after a deploy or ISR revalidation **[Industry Best Practice / Observation, see finding 7]**.
- Marking components `"use client"` by default "to be safe," which unnecessarily grows the client JS bundle and can worsen INP on low-end Android devices **[Official Requirement, per Next.js Server/Client Components docs]**.
- Treating INP like the old FID (only judging the *first* interaction) — INP is evaluated across the entire page lifecycle, so a slow interaction anywhere (e.g., a laggy filter dropdown deep in a product listing) can fail the metric even if initial page load felt snappy **[Official Requirement]**.

## Recommended Practices

- Set Core Web Vitals budgets as team-visible targets (LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 at p75) and monitor via field data (Chrome UX Report / Vercel Analytics / Real User Monitoring), not lab data alone, per web.dev's stated p75 methodology **[Official Requirement in terms of Google's own ranking methodology; monitoring tooling choice is a Recommendation]**.
- Keep the vast majority of EnconeMed's pages as Server Components; scope `"use client"` narrowly to islands that need interactivity (lead forms, image galleries, filters) **[Industry Best Practice, consistent with official Next.js guidance on Client Component boundaries]**.
- For elderly and low-literacy users on older Android devices — a stated part of EnconeMed's likely user base — prioritize CLS elimination and low main-thread work over micro-optimizing LCP once it is already within budget, since layout jumps and unresponsive taps are disproportionately disorienting for this cohort **[Recommendation]**.
- Respect `prefers-reduced-motion` for any animation (page transitions, hover effects, loading skeletons) to serve users with vestibular sensitivity, a standard accessibility practice that also reduces unnecessary paint work **[Industry Best Practice]**.
- Coordinate any Cloudflare edge cache purge with the deployment/ISR revalidation pipeline (e.g., via Cloudflare's purge-by-tag or purge-by-URL API triggered from the same webhook that fires Next.js revalidation) rather than relying on TTL expiry alone **[Recommendation, pending Phase 1 validation against final Cloudflare plan/tier]**.

## Things to Avoid

- Do not apply `priority` broadly or to every image "to be safe" — this is explicitly against the documented purpose of the prop **[Official Requirement]**.
- Do not assume Cloudflare and Vercel caching layers self-synchronize; do not skip explicit cache-rule design for this pairing **[Industry Best Practice, see finding 7]**.
- Do not rely solely on lab tools (e.g., a single Lighthouse run) to validate Core Web Vitals compliance, since Google's own ranking signal is field-data based (p75, real users) **[Official Requirement]**.
- Do not disable `next/font`'s preload behavior without a specific measured reason — it is enabled by default because it materially helps LCP/CLS **[Official Requirement]**.

## Future Considerations

- Re-verify the Core Web Vitals metric set immediately before Phase 1 build starts, since Google has changed this set once already (FID → INP, March 2024) and could do so again **[Recommendation]**.
- Evaluate whether Vercel's own "Verified Proxy" style trust configuration (documented in community sources as a 2026-era requirement for proxied traffic being accepted rather than challenged) is still current, and confirm directly against Vercel's official security/proxy documentation before Phase 1, since this research could only corroborate it via secondary sources **[Observation — flagged as needing official verification]**.
- Revisit whether Vercel Image Optimization or Cloudflare Images/Polish should be the canonical image pipeline once Cloudflare sits in front of Vercel, since running both can double-process images; Vercel's FAQ references an "Origin Control: Off" style setting for this scenario that needs direct confirmation against current Vercel docs at implementation time **[Observation — needs Phase 1 verification]**.
- Monitor Next.js minor-version release notes for changes to Router Cache TTLs and Data Cache default behavior, both of which have shifted across Next.js versions **[Recommendation]**.

## Checklist

- [ ] Confirm Core Web Vitals metric set (LCP/INP/CLS) and thresholds against web.dev at Phase 1 kickoff
- [ ] Define per-page LCP candidate image and apply `priority` only there
- [ ] Ensure every `next/image` usage has explicit `width`/`height` or `fill` + sized container
- [ ] Confirm `sizes` prop set for all responsively-rendered images
- [ ] Confirm `next/font` usage for all custom/Google fonts with default `swap` + `preload`
- [ ] Design Cloudflare cache rules that pass through / respect Vercel's `Cache-Control` headers for ISR routes
- [ ] Establish a cache-purge trigger from deploy/revalidation pipeline to Cloudflare
- [ ] Set field-data monitoring (Vercel Analytics or equivalent RUM) for LCP/INP/CLS at p75
- [ ] Audit Client Component boundaries to keep JS bundle minimal, protecting INP on low-end devices
- [ ] Add `prefers-reduced-motion` handling to any animated/transition UI
- [ ] Verify Vercel's current official guidance on proxying through third-party CDNs (Cloudflare) before finalizing deployment architecture
