# Phase 0 — Consolidated References

This file aggregates every source cited across the Phase 0 research documents (`01`–`16`). It is organized by document. Where a source is a primary/official reference (standards body, vendor documentation, government source), it is listed as such. Secondary sources (industry commentary, blogs, community threads) are explicitly marked **[secondary — supporting color only]** and must not be treated as authoritative on their own; any compliance-grade or SEO-implementation claim they support should be re-verified against the primary source before being relied upon in later phases.

---

## 01 — Business Understanding
- Ministry of Corporate Affairs (MCA), Companies Act 2013 / Section 12(3)(c) — https://www.mca.gov.in/
- Central Drugs Standard Control Organisation (CDSCO), Medical Devices Rules 2017 — https://cdsco.gov.in/
- Legal Metrology (Packaged Commodities) Amendment Rules, 2025 — **[secondary]** https://www.taxtmi.com/article/detailed?id=15488
- Consumer Protection (E-Commerce) Rules, 2020 — https://consumeraffairs.nic.in/ ; **[secondary]** https://trilegal.com/knowledge_repository/consumer-protection-e-commerce-rules-2020/
- GST Council notifications, medical equipment HSN (Ch. 90 / 9018) — **[secondary, primary not yet pulled]** https://www.indiafilings.com/learn/gst-rate-for-medical-equipments-cameras-and-spectacles ; https://busy.in/gst-rates/medical-equipment/ — verify against https://www.cbic.gov.in/ before tax filings
- Association of Indian Medical Device Industry (AiMeD) — https://www.aimedindia.com/
- Quality Council of India (QCI) / ICMED certification — https://www.intertek.com/assurance/icmed/

## 02 — Google Search
- Creating Helpful, Reliable, People-First Content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Google Search Essentials — https://developers.google.com/search/docs/essentials
- Content policies for Google Search — https://support.google.com/websearch/answer/10622781
- General Structured Data Guidelines — https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Intro to Structured Data Markup — https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- URL Canonicalization overview / consolidating duplicate URLs / troubleshooting — https://developers.google.com/search/docs/crawling-indexing/canonicalization , https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls , https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
- Consolidating website traffic on canonical URLs (2019) — https://developers.google.com/search/blog/2019/02/consolidating-your-website-traffic-on
- Titles and snippets guidance — https://developers.google.com/search/docs/appearance/snippet
- Image SEO Best Practices — https://developers.google.com/search/docs/appearance/google-images
- Core Web Vitals (web.dev) — https://web.dev/articles/vitals *(name-verified, not independently WebFetched this session — re-confirm before external citation)*
- Google Search documentation changelog — https://developers.google.com/search/updates
- Changes to HowTo and FAQ rich results (2023) — https://developers.google.com/search/blog/2023/08/howto-faq-changes

## 03 — AI Search
- AI Features and Your Website (Google) — https://developers.google.com/search/docs/appearance/ai-features
- AI Overviews in Google Search (Google Search Help) — https://support.google.com/websearch/answer/14901683
- Creating Helpful, Reliable, People-First Content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Knowledge Graph Search API reference — https://developers.google.com/knowledge-graph/reference/rest/v1
- Google Cloud Enterprise Knowledge Graph docs — https://docs.cloud.google.com/enterprise-knowledge-graph/docs/search-api
- ChatGPT Search (OpenAI Help Center) — https://help.openai.com/en/articles/9237897-chatgpt-search
- ChatGPT Search for Enterprise and Edu — https://help.openai.com/en/articles/10093903-chatgpt-search-for-enterprise-and-edu
- Web search tool (OpenAI developer docs) — https://developers.openai.com/api/docs/guides/tools-web-search
- How does Perplexity work? — https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work
- What is Internal Knowledge Search (Perplexity) — https://www.perplexity.ai/help-center/en/articles/10352914-what-is-internal-knowledge-search
- Bing Webmaster Guidelines — https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- Introducing AI Performance in Bing Webmaster Tools (Feb 2026) — https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- **Research gap**: No official technical documentation found for Gemini's or Claude's web-retrieval/citation ranking mechanics — treat related statements as **[Observation]** only.

## 04 — SEO
- Creating Helpful, Reliable, People-First Content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Spam Policies for Google Web Search (incl. Scaled Content Abuse) — https://developers.google.com/search/docs/essentials/spam-policies
- August 2022 helpful content update — https://developers.google.com/search/blog/2022/08/helpful-content-update
- Managing crawling of faceted navigation URLs — https://developers.google.com/crawling/docs/faceted-navigation
- Faceted navigation best/worst practices (2014) — https://developers.google.com/search/blog/2014/02/faceted-navigation-best-and-5-of-worst
- Crawling December: Faceted navigation (2024) — https://developers.google.com/search/blog/2024/12/crawling-december-faceted-nav
- Canonicalization / consolidating duplicate URLs — (see 02)
- Pagination with rel=next/prev (2011, historical) — https://developers.google.com/search/blog/2011/09/pagination-with-relnext-and-relprev
- Sitemaps overview / build & submit / large sitemaps / image sitemaps — https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview , .../build-sitemap , .../large-sitemaps , .../image-sitemaps
- Robots.txt Introduction and Guide — https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Robots Refresher blog (2025) — https://developers.google.com/search/blog/2025/03/robotstxt-flexible-way-to-control
- Schema.org health/medical types index — https://schema.org/docs/meddocs.html
- web.dev (general) — https://web.dev/

## 05 — GEO
- Schema.org — https://schema.org
- General Structured Data Guidelines / Intro to Structured Data — (see 02)
- AI Features and Your Website — (see 03)
- Bing Webmaster Guidelines (defines GEO by name; disclaims guaranteed grounding/citations) — (see 03)
- Knowledge Graph Search API reference — (see 03)
- Creating Helpful, Reliable, People-First Content — (see 02)
- **Research gap**: No official spec found for "content chunking for LLM retrieval" applied to public websites — related claims are **[Industry Best Practice]** or **[Observation]**, extrapolated from general RAG/retrieval engineering docs.

## 06 — AEO
- FAQPage structured data (incl. May 2026 deprecation notice) — https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Changes to HowTo and FAQ rich results (2023) — (see 02)
- QAPage structured data — https://developers.google.com/search/docs/appearance/structured-data/qapage
- Speakable (BETA) structured data — https://developers.google.com/search/docs/appearance/structured-data/speakable
- General Structured Data Guidelines — (see 02)
- Google Search documentation changelog — (see 02)
- Creating Helpful, Reliable, People-First Content — (see 02)
- **Research gap**: No dedicated Search Central page found for "featured snippet requirements" or People Also Ask mechanics — treated as automatic extraction from well-structured, indexed content rather than a markup-driven feature.

## 07 — E-E-A-T
- "E-A-T gets an extra E for Experience" (Google, 2022) — https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t
- Creating Helpful, Reliable, People-First Content — (see 02)
- Spam Policies for Google Web Search — (see 04)
- Review Snippet structured data guidelines — https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- **Research gap**: Google's full Search Quality Rater Guidelines PDF was not directly fetched this session — YMYL classification claims for medical-equipment commerce should be re-verified against the primary PDF before Phase 1.

## 08 — Schema
- Schema.org vocabulary home — https://schema.org
- Schema.org health/medical types index — https://schema.org/docs/meddocs.html
- Schema.org type pages confirmed to exist: Organization, MedicalOrganization, MedicalBusiness, MedicalClinic, MedicalEntity, MedicalDevice, Offer, ContactPoint (all under https://schema.org/)
- Google Search Central — full supported rich-result gallery — https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Intro to structured data / general guidelines — (see 02)
- Product, LocalBusiness, BreadcrumbList, Organization logo, Review snippet, Video, Image metadata, Article structured data — all under https://developers.google.com/search/docs/appearance/structured-data/
- FAQPage documentation (now describing removal) — (see 06)
- HowTo/FAQ changes blog (2023) — (see 02)
- Making Review rich results more helpful (2019, self-serving review policy origin) — https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful
- **[secondary, dates cross-checked against primary]**: Search Engine Journal, "Google Drops FAQ Rich Results From Search"; Search Engine Land, "The rise and fall of FAQ schema"

## 09 — Accessibility
- W3C, WCAG 2.2 (normative spec) — https://www.w3.org/TR/WCAG22/
- W3C, Requirements for WCAG 2.2 — https://w3c.github.io/wcag/requirements/22/
- US DOJ, ADA Title II Final Rule (WCAG 2.1 AA for US state/local govt; not applicable to India or private companies, cited for pattern only) — https://www.ada.gov/resources/2024-03-08-web-rule/ ; compliance-date extension — https://www.federalregister.gov/documents/2026/04/20/2026-07663/
- **[secondary]**: Deque Systems, "India's Accessibility Laws" — https://www.deque.com/apac-digital-accessibility-laws/india/
- **[secondary]**: DigitalA11y, "India's Digital Accessibility Laws and Overview" — https://www.digitala11y.com/indias-digital-accessibility-laws-and-overview/
- **[secondary]**: Pivotal Accessibility, "RPWD Act and IS 17802" — https://www.pivotalaccessibility.com/2025/06/rpwd-act-and-is-17802-indias-digital-accessibility-standards-2025-guide/
- **[secondary]**: Siteimprove, "Core Web Vitals and WCAG" — https://www.siteimprove.com/blog/core-web-vitals-wcag/

## 10 — Performance
- web.dev — Interaction to Next Paint (INP) — https://web.dev/articles/inp
- web.dev — Route prefetching in Next.js — https://web.dev/articles/route-prefetching-in-nextjs
- Next.js docs — Image component, Fonts, Link component, Prefetching guide, Linking and Navigating — https://nextjs.org/docs/app/api-reference/components/image , .../getting-started/fonts , .../api-reference/components/link , .../app/guides/prefetching , .../getting-started/linking-and-navigating
- Vercel docs — CDN overview, Edge Network FAQ, ISR, Cache-Control headers — https://vercel.com/docs/cdn , .../concepts/edge-network/frequently-asked-questions , .../incremental-static-regeneration , .../caching/cache-control-headers
- Cloudflare docs — Cache Concepts / Origin Cache Control, Cache Responses — https://developers.cloudflare.com/cache/concepts/cache-control/ , .../cache/concepts/cache-responses/
- **[secondary, supporting color only]**: Cloudflare Community thread on cache-MISS-when-proxied-from-Vercel; Medium, "The Cloudflare + Vercel Caching Trap"; BlazingCDN blog on edge caching

## 11 — Healthcare UX
- Stanford Web Credibility Project / Stanford-Makovsky Study (2002) — https://credibility.stanford.edu/pdf/Stanford-MakovskyWebCredStudy2002-prelim.pdf
- Fogg et al., "How Do Users Evaluate the Credibility of Web Sites?" — https://dejanmarketing.com/media/pdf/credibility-online.pdf
- Lindgaard et al., "50 milliseconds to make a good first impression" — https://www.researchgate.net/publication/220208334
- Robins & Holmes, "Aesthetics and credibility in web site design" — https://www.sciencedirect.com/science/article/abs/pii/S0306457307000568
- Nielsen Norman Group — "UX Design for Seniors" report, "Usability for Older Adults", "Changes in How Older Adults Use Computers" — https://www.nngroup.com/reports/senior-citizens-on-the-web/ , https://www.nngroup.com/articles/usability-for-senior-citizens/ , https://www.nngroup.com/videos/changes-seniors-computers/
- US HHS/ODPHP, "Health Literacy Online" — https://odphp.health.gov/healthliteracyonline
- CDC, Health Literacy guidance — https://www.cdc.gov/health-literacy/php/develop-materials/guidance-standards.html
- Usability.gov, Research-Based Web Design & Usability Guidelines — https://guidelines.usability.gov./
- PMC/NCBI, family caregiver health information-seeking study — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10737102/
- JMIR Aging, caregiver health information-seeking behaviors — https://aging.jmir.org/2019/1/e11237/
- **[secondary, practitioner not peer-reviewed]**: Smashing Magazine, "Designing For Stress And Emergency" (2025)

## 12 — Medical Equipment Industry
- CDSCO Medical Devices Rules 2017 (Class A/B/C/D risk classification) — https://cdsco.gov.in/
- AiMeD — https://www.aimedindia.com/
- QCI / ICMED — https://www.intertek.com/assurance/icmed/
- ISO 13485 (QMS for medical devices) — https://www.iso.org/iso-13485-medical-devices.html
- ISO 17664:2021 (reprocessing instructions) — **[secondary]** https://safetyculture.com/topics/iso/iso-17664
- **Competitor observation (structural pattern only, not authoritative)**: Healthy Jeena Sikho, Unosupply, HyperLocals, Medirent Services, Rentacure, Medical Device on Rent (Delhi NCR), IndiaMART rental category directory, Anvayaa

## 13 — Medical Supplies Industry
- BIS IS 9473:2002 (N95-type filtering half masks) — https://bis.gov.in/wp-content/uploads/2019/08/PM-9473-final.pdf
- BIS IS 16289 (3-ply surgical mask) — **[secondary]** https://www.services.bis.gov.in/php/BIS_2.0/BISBlog/ppe-kit-ensures-your-safety-bis-standards-ensure-its-quality/
- ASTM glove standards D6319, D3578, D5250, D3577 — primary body https://www.astm.org/ ; **[secondary summaries]** https://business.medtecs.com/understanding-glove-standards-astm-en-fda-and-ansi/ , https://www.nelsonlabs.com/testing/glove-testing/
- EN 455 (European medical glove standard) — cited via same secondary sources
- Cleveland Clinic, urinary catheter patient education — https://my.clevelandclinic.org/health/treatments/catheter
- **[secondary, clinically-oriented retailer content]**: 180 Medical, Shield HealthCare, Vitality Medical catheter education pages
- **Retailer taxonomy observation (pattern only)**: Premier Ostomy, Binson's, Health Products For You, Get Complete Care
- Legal Metrology (Packaged Commodities) Rules 2011 + 2025 Amendment — (see 01)

## 14 — Trust Signals
- Review Snippet structured data — (see 08)
- Making Review Rich Results more helpful (2019) — (see 08)
- Guidelines for representing your business on Google — https://support.google.com/business/answer/3038177
- Creating Helpful, Reliable, People-First Content — (see 02)
- Schema.org health/medical types — (see 04)
- **[secondary, supporting color only]**: general trust-signal overview blogs (hostpapa.com, webstacks.com, engageweb.co.uk); 2019 Anti-Phishing Working Group HTTPS-on-phishing-sites finding (cited via secondary aggregation, not the original APWG report)

## 15 — Local SEO
- Guidelines for representing your business on Google — (see 14)
- Manage your service areas for service-area & hybrid businesses — https://support.google.com/business/answer/9157481
- Schema.org health/medical types — (see 04)
- **[secondary, unverified against primary GBP policy pages]**: birdeye.com and launchcodex.com commentary on 2026 Google review-policy enforcement update

## 16 — Technical Architecture
- Next.js docs — Server and Client Components, `use client` directive, Project Structure, Route Groups, Colocation, `generateMetadata`, Metadata and OG images, MDX guide, Image component, App Router glossary — all under https://nextjs.org/docs/app/
- Vercel docs — CDN overview, Edge Network FAQ, ISR, Image Optimization — (see 10, plus) https://vercel.com/docs/image-optimization
- Cloudflare docs — Cache Concepts, Cache Responses — (see 10)
- **[secondary, supporting color only]**: same Cloudflare/Vercel caching-trap community and blog sources as file 10

---

## Cross-Cutting Research Gaps (flagged for Product Architect review)

1. **Legal/tax**: Rental-vs-sale GST (SAC vs HSN) treatment and CDSCO rental-licensing intersection has no clear regulatory precedent — needs CA/legal review before Phase 1 pricing and Terms pages.
2. **Labeling regime split**: The 2025 Legal Metrology amendment separates "medical device" SKUs (governed by Medical Devices Rules 2017) from ordinary consumables (still under standard LMPC MRP/labeling) — requires per-SKU classification before any label copy is written.
3. **Competitor IA**: File 12's equipment taxonomy is based on search-result summaries of Indian competitors, not full-site crawls — recommend a direct audit of 2–3 competitor nav structures before locking Phase 1 information architecture.
4. **India-specific supply terminology**: File 13 leans on US clinical/retailer sources for catheter/glove/mask terminology — recommend an India-specific naming/availability check before content lock.
5. **India-specific UX research**: No India/South-Asia-specific caregiver or elderly-user UX studies were found (e.g., WhatsApp-first behavior patterns) — synthesis in file 11 is adapted from US/global research.
6. **IS 17802 binding status**: Whether IS 17802 (India's digital accessibility standard) has any binding force on private entities remains unconfirmed — recommend periodic re-check.
7. **Quality Rater Guidelines primary source**: File 07's YMYL/rater-mechanics claims are drawn from Google's blog post and secondary summaries, not the primary Search Quality Rater Guidelines PDF — verify directly before treating as final.
8. **GBP review-policy 2026 update**: File 15's claims about a 2026 Google Business Profile review-policy enforcement update come from secondary blogs, not a primary support.google.com page — needs direct verification.
9. **Healthcare-specific GBP rules**: Whether Google has category-specific GBP rules for healthcare (paralleling the alcohol/cannabis service-area-business exception) was not found — needs follow-up.
10. **Cloudflare + Vercel caching**: No official joint vendor integration guide exists for the "double-cache" risk (stale HTML served post-ISR-revalidation until Cloudflare's own TTL/purge) — needs staging-environment validation in a later phase, not just documentation research.
11. **Gemini/Claude retrieval mechanics**: No official technical documentation found for how Gemini or Claude select/rank web sources for citation — all related statements in file 03 are labeled [Observation].
12. **Featured snippets / PAA**: No dedicated official Google documentation page found describing featured-snippet or People-Also-Ask mechanics as a standalone spec — treated as automatic extraction from well-structured content, not a discrete markup target.
13. **Vercel image-optimization + Cloudflare setting**: The exact current Vercel setting for disabling origin image optimization when Cloudflare handles images could not be fully confirmed against live docs — needs direct re-check.
14. **AI-search space volatility**: This is a fast-moving area (Bing's AI Performance report ~6 months old, FAQ deprecation ~3 months old relative to project date) — recommend a re-verification pass closer to implementation, not reliance on this Phase 0 snapshot alone.
