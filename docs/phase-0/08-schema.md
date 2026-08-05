# Phase 0 Research — Structured Data / Schema.org for EnconeMed

Research date: 2026-08-03. Sources: schema.org (vocabulary authority) and Google Search Central / developers.google.com (rich-result eligibility authority). This document is research-only — no schema markup or code is included.

## Executive Summary

- **[Observation]** Schema.org defines the vocabulary; Google Search Central independently decides which of those types actually produce a visible rich result. A type can be 100% valid schema.org markup and still render nothing extra in Google Search. Every recommendation below separates these two facts.
- **[Official Requirement]** Google's canonical list of rich-result-eligible types is the "Structured Data Markup that Google Search Supports" gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery. Anything not on that list may still be valid schema.org, but should not be implemented with an expectation of a SERP visual change.
- **[Observation]** Two types that content teams commonly assume are still live are **not**: **HowTo** rich results were deprecated globally in 2023, and **FAQPage** rich results were restricted to "well-known, authoritative government and health websites" in August 2023 and then fully removed for all sites (including those) as of the May 2026 Google Search Central changelog. Neither should be prioritized for EnconeMed.
- **[Observation]** The **sitelinks searchbox** feature (WebSite + `SearchAction`/`potentialAction`) was also formally retired by Google (documentation archived, per the November 2024 changelog note surfaced during research). It is schema.org-valid but produces no Google feature.
- **[Recommendation]** For EnconeMed's actual page types, the highest-value, currently-supported combination is: **Organization** (knowledge panel/logo), **LocalBusiness**/**MedicalBusiness** subtype (service-area and clinic-style presence, where applicable), **Product** (rental/purchase equipment pages, with the self-review caveat below), **BreadcrumbList** (site hierarchy), **ImageObject** and **VideoObject** (media), **Article** (knowledge/support content), and **Review**/**AggregateRating** only where genuinely third-party and compliant with Google's non-self-serving policy.

## Official References

- Schema.org vocabulary home: https://schema.org
- Schema.org health/medical types index: https://schema.org/docs/meddocs.html
- Schema.org type pages (fetched/confirmed to exist): https://schema.org/Organization, https://schema.org/MedicalOrganization, https://schema.org/MedicalBusiness, https://schema.org/MedicalClinic, https://schema.org/MedicalEntity, https://schema.org/MedicalDevice, https://schema.org/Offer, https://schema.org/ContactPoint
- Google Search Central — full supported gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Google Search Central — intro to structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Search Central — general structured data guidelines/policies: https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Google Search Central — Product structured data (intro): https://developers.google.com/search/docs/appearance/structured-data/product
- Google Search Central — LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google Search Central — BreadcrumbList structured data: https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- Google Search Central — Organization logo / knowledge panel: https://developers.google.com/search/docs/appearance/structured-data/logo
- Google Search Central — Review snippet (Review, AggregateRating): https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Google Search Central — Video (VideoObject): https://developers.google.com/search/docs/appearance/structured-data/video
- Google Search Central — Image metadata (ImageObject/IPTC): https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata
- Google Search Central — Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Search Central — FAQPage documentation (now describing removal): https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Google Search Central blog — HowTo/FAQ changes announcement (2023): https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Google Search Central blog — Making Review rich results more helpful (self-serving review policy origin, 2019): https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful
- Secondary/industry sources used only to corroborate dates (not treated as authoritative on their own): Search Engine Journal "Google Drops FAQ Rich Results From Search" (https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/); Search Engine Land "The rise and fall of FAQ schema" (https://searchengineland.com/faq-schema-rise-fall-seo-today-463993). All dated claims from these were cross-checked against the official Google Search Central FAQPage doc and blog post above before being included.

## Important Findings

### Organization
- **What it is:** `schema.org/Organization` — represents the legal/business entity (Encone Care Nurses Private Limited, trading as EnconeMed).
- **Schema.org URL:** https://schema.org/Organization
- **Google rich-result support:** **[Official Requirement]** Confirmed supported — powers the knowledge-panel logo and Organization details per https://developers.google.com/search/docs/appearance/structured-data/logo. No properties are strictly required by Google, but the page states Google recommends `name`, `address`, `telephone`, `url`, and `logo`; `sameAs` links to authoritative profiles (social, review sites) help disambiguation; `logo` must be a crawlable image ≥112×112px that reads clearly on a white background.
- **Applicability to EnconeMed:** Place once, on the homepage or a dedicated About/Trust page — not on every page. Should carry the legal name, brand name, registered address, phone, and `sameAs` links to verified LinkedIn/Google Business Profile/etc.

### WebSite
- **What it is:** `schema.org/WebSite` — represents the site as a whole (not a physical business).
- **Schema.org URL:** https://schema.org/WebSite (existence confirmed via schema.org vocabulary; not independently re-fetched but standard core type)
- **Google rich-result support:** **[Observation]** The one Google feature historically tied to `WebSite` + `potentialAction`/`SearchAction` (the sitelinks searchbox) was retired — Google's documentation update explicitly states "The sitelinks search box feature is no longer available in Google Search results." No other current Google rich result depends on bare `WebSite` markup.
- **Applicability to EnconeMed:** **[Recommendation]** Schema.org-valid to include as a general good-practice identity marker (and it's low-cost / commonly bundled with Organization), but do not expect any Google SERP feature from it, and do not implement `SearchAction` expecting a searchbox.

### WebPage
- **What it is:** `schema.org/WebPage` — a generic page-level container type, often used as the `@type` for `mainEntityOfPage` or nested under more specific types like `AboutPage`, `ContactPage`, `CollectionPage`.
- **Schema.org URL:** https://schema.org/WebPage
- **Google rich-result support:** **[Observation]** `WebPage` itself is not a rich-result trigger; it functions as scaffolding/context (e.g., `mainEntityOfPage` inside Article markup, or as the type referenced by `isPartOf`).
- **Applicability to EnconeMed:** **[Recommendation]** Use the more specific subtypes where they map cleanly — e.g., `AboutPage` for the trust/about page, `ContactPage` for the lead form page, `CollectionPage` for category listing pages — purely for semantic precision, not for rich-result gain.

### Product
- **What it is:** `schema.org/Product` — a product or service offered for sale/rent.
- **Schema.org URL:** https://schema.org/Product
- **Google rich-result support:** **[Official Requirement]** Confirmed supported, with two distinct feature tracks per https://developers.google.com/search/docs/appearance/structured-data/product: **Product snippets** (for pages where users cannot transact directly — this fits EnconeMed's lead-gen model) and **Merchant listings** (for pages with direct checkout). Google states that providing full merchant-listing-level data also makes a page eligible for product snippets, so richness is additive. Nested `Offer`, `AggregateRating`, and `Review` are what actually drive the visible price/availability/star enhancements.
- **Applicability to EnconeMed:** Equipment detail pages (e.g., hospital bed, oxygen concentrator, wheelchair) are the direct fit — each has rental and purchase "offers" conceptually, described via nested `Offer` objects. Because EnconeMed is lead-generation (no cart checkout), this most closely matches the **product snippet** track rather than full merchant listings; note this distinction for the Product Architect since a lead-gen "Enquire"/"Get Quote" CTA is not equivalent to `Offer.availability` implying purchasability.

### MedicalDevice
- **What it is:** `schema.org/MedicalDevice` — "Any object used in a medical capacity, such as to diagnose or treat a patient," a subtype of `MedicalEntity`.
- **Schema.org URL:** https://schema.org/MedicalDevice
- **Google rich-result support:** **[Observation]** Not present in Google's structured-data gallery — no confirmed Google rich result for `MedicalDevice`. It is a legitimate, documented schema.org type but Google's medical-type support for rich results centers on content/entity types (e.g., `MedicalWebPage`-adjacent signals), not a `MedicalDevice` rich snippet.
- **Applicability to EnconeMed:** **[Recommendation]** Do not use `MedicalDevice` as the primary `@type` for equipment pages, since it forfeits `Product`'s confirmed rich-result eligibility. If desired, `MedicalDevice`-specific properties can be layered as *additional* type information via `@type: ["Product", "MedicalDevice"]` for semantic richness/future-proofing, but `Product` should remain the primary driver of rich results.

### MedicalBusiness / MedicalOrganization
- **What they are:** `schema.org/MedicalBusiness` — "a particular physical or virtual business of an organization for medical purposes," a subtype of both `LocalBusiness` and `MedicalOrganization`. `schema.org/MedicalOrganization` — "a medical organization (physical or not), such as hospital, institution or clinic," a subtype of `Organization`.
- **Schema.org URLs:** https://schema.org/MedicalBusiness, https://schema.org/MedicalOrganization (and sibling https://schema.org/MedicalClinic)
- **Google rich-result support:** **[Observation]** Google's LocalBusiness structured-data documentation (https://developers.google.com/search/docs/appearance/structured-data/local-business) instructs using "the most specific `LocalBusiness` sub-type possible." `MedicalBusiness` is a `LocalBusiness` subtype, so it inherits LocalBusiness rich-result eligibility (knowledge-panel business details: hours, ratings, directions, actions) — this is an **[Observation]**/reasonable inference from Google's own subtype guidance, not a line item Google enumerates by name for every subtype, so should be validated with Google's Rich Results Test before launch.
- **Applicability to EnconeMed:** Strong conceptual fit for EnconeMed's legal-entity-as-medical-services-provider identity — more specific than generic `LocalBusiness`, appropriate given the company provides nursing/medical-equipment services. Candidate `@type` for the Organization-level markup on the About/Trust page and/or location pages.

### LocalBusiness
- **What it is:** `schema.org/LocalBusiness` — a physical business/service location.
- **Schema.org URL:** https://schema.org/LocalBusiness
- **Google rich-result support:** **[Official Requirement]** Confirmed supported per https://developers.google.com/search/docs/appearance/structured-data/local-business. Required: `name`, `address` (PostalAddress with streetAddress/addressLocality/addressRegion/postalCode/addressCountry). Recommended: `telephone`, `url` (must be a working, specific-location URL), `priceRange` (<100 chars), `geo` (≥5 decimal places), `openingHoursSpecification`, `aggregateRating`/`review` (only for sites capturing genuine third-party business reviews — see Review section below), `department` for nested sub-locations.
- **Applicability to EnconeMed:** Direct fit for location/service-area pages (e.g., "EnconeMed in [City]"). Use `MedicalBusiness` as the more specific subtype where the page represents medical-equipment/nursing services, falling back to `LocalBusiness` only if a more specific type doesn't fit a given location page.

### BreadcrumbList
- **What it is:** `schema.org/BreadcrumbList` — an ordered list of `ListItem`s showing site hierarchy.
- **Schema.org URL:** https://schema.org/BreadcrumbList
- **Google rich-result support:** **[Official Requirement]** Confirmed supported per https://developers.google.com/search/docs/appearance/structured-data/breadcrumb. Required: `itemListElement` array of at least two `ListItem` objects, each with `position` (integer, 1-indexed), `name`, and `item` (URL; optional only on the final/current-page item). Google explicitly recommends breadcrumbs reflect "a typical user path," not the literal URL folder structure.
- **Applicability to EnconeMed:** High-value, low-risk win across category → equipment → detail page hierarchies, and knowledge/support articles. Should be implemented sitewide.

### FAQPage
- **What it is:** `schema.org/FAQPage` — a page of question/answer pairs (`mainEntity` array of `Question`/`Answer`).
- **Schema.org URL:** https://schema.org/FAQPage
- **Google rich-result support:** **[Official Requirement]** **Not currently supported for any site.** Per Google's own FAQPage documentation and the May 2026 changelog entry cited within it, the FAQ rich result feature "is no longer shown in Google Search results" for any category of site — this fully supersedes the August 2023 restriction that had limited it to "well-known, authoritative government and health websites." EnconeMed would not have qualified even under the 2023-2026 restricted policy (not a government/health-authority site), and now the feature doesn't exist for anyone.
- **Applicability to EnconeMed:** **[Recommendation]** Do not implement FAQPage markup expecting a SERP feature. FAQ content is still valuable for users and for informing Google's general understanding of a page (per Google's general "structured data doesn't hurt" stance) but should be prioritized as regular on-page content and internal-linking value, not a rich-result deliverable.

### ImageObject
- **What it is:** `schema.org/ImageObject` — describes an image, including licensing/creator metadata.
- **Schema.org URL:** https://schema.org/ImageObject
- **Google rich-result support:** **[Official Requirement]** Confirmed supported via Google's "Image metadata" structured-data feature (https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata), which affects Google Images display (Licensable badge, credit). Required: `contentUrl`, plus at least one of `creator`, `creditText`, `copyrightNotice`, or `license`. `license` specifically is required for Licensable badge eligibility.
- **Applicability to EnconeMed:** Relevant for equipment product photography and any branded imagery where EnconeMed wants creator/copyright attribution to show in Google Images — secondary priority relative to Product/LocalBusiness, but easy to add alongside Product image properties.

### VideoObject
- **What it is:** `schema.org/VideoObject` — describes a video (e.g., product demo, usage instructions).
- **Schema.org URL:** https://schema.org/VideoObject
- **Google rich-result support:** **[Official Requirement]** Confirmed supported per https://developers.google.com/search/docs/appearance/structured-data/video. Required: `name`, `thumbnailUrl`, `uploadDate`. Recommended: `description`, `duration` (ISO 8601), `contentUrl` and/or `embedUrl`, `expires`, `interactionStatistic`, `regionsAllowed`/`ineligibleRegion`.
- **Applicability to EnconeMed:** Relevant if/when equipment demo videos or nursing-care explainer videos are published (knowledge/support section, equipment pages). Should be planned for but is not a Phase 0 blocker if no video content exists yet.

### Review
- **What it is:** `schema.org/Review` — a review of an item, with an `author` and `reviewRating`.
- **Schema.org URL:** https://schema.org/Review
- **Google rich-result support:** **[Official Requirement]** Confirmed supported, but with a critical eligibility restriction per https://developers.google.com/search/docs/appearance/structured-data/review-snippet: **if the entity being reviewed controls the reviews about itself, pages using `LocalBusiness` or any `Organization` subtype are ineligible for the star-rating rich result.** This restriction does NOT apply to `Product` review markup. Required: `author` (valid Person/Organization name), the reviewed item's `name` (via `itemReviewed` or the parent object), and `reviewRating.ratingValue`. Recommended: `datePublished`, `bestRating`/`worstRating` for non-default scales. **[Official Requirement]** As of a July 2026 documentation update (per WebSearch findings, consistent with Google's long-standing 2019 policy), Google explicitly prohibits fake or undisclosed incentivized reviews in both on-page content and structured data; incentivized reviews are only usable with clear, prominent (not buried in fine print) disclosure.
- **Applicability to EnconeMed:** **[Recommendation]** Do NOT self-mark-up first-party testimonials on the About/Trust page or on `MedicalBusiness`/`Organization` markup with `AggregateRating`/`Review` — Google will not render stars for those regardless of how they're marked up, since EnconeMed controls that content. Genuine third-party product reviews (e.g., collected via a verified review platform) marked up on **Product** pages are the compliant path to star ratings, provided they meet Google's genuine-review and disclosure policies.

### AggregateRating
- **What it is:** `schema.org/AggregateRating` — the average of multiple ratings for an item.
- **Schema.org URL:** https://schema.org/AggregateRating
- **Google rich-result support:** **[Official Requirement]** Same feature and same restrictions as Review above (bundled in the same Google doc). Required: `ratingValue`, and at least one of `ratingCount` or `reviewCount`. Same self-review restriction: ineligible for star display on `LocalBusiness`/`Organization` pages that control their own reviews.
- **Applicability to EnconeMed:** Same guidance as Review — reserve for genuine third-party-sourced aggregate ratings on Product pages, not self-authored testimonials on the corporate/about pages.

### ContactPoint
- **What it is:** `schema.org/ContactPoint` — "a contact point, for example a Customer Complaints department," typically nested inside `Organization.contactPoint`.
- **Schema.org URL:** https://schema.org/ContactPoint
- **Google rich-result support:** **[Observation]** Not an independent Google rich-result trigger; it's a supporting property of `Organization` (contributes to the knowledge-panel Organization feature covered above, e.g., customer-service phone number/hours).
- **Applicability to EnconeMed:** Use nested under `Organization` to describe the sales/lead-enquiry contact channel (phone, `contactType: "sales"` or "customer service", `areaServed`, `availableLanguage`).

### SearchAction
- **What it is:** `schema.org/SearchAction` — an action indicating a site-search capability, normally attached to `WebSite.potentialAction`.
- **Schema.org URL:** https://schema.org/SearchAction
- **Google rich-result support:** **[Official Requirement]** **Not supported — retired.** Google's documentation update explicitly states the sitelinks searchbox feature "is no longer available in Google Search results" and the related documentation/rule (`nositelinkssearchbox`) was archived.
- **Applicability to EnconeMed:** **[Recommendation]** Do not implement for Google Search benefit. Schema.org-valid if the team wants it for other consumers, but this should not appear in any Phase 0+ structured-data implementation backlog tied to SEO KPIs.

### Offer
- **What it is:** `schema.org/Offer` — "an offer to transfer some rights to an item or to provide a service," e.g., to sell, rent, or repair.
- **Schema.org URL:** https://schema.org/Offer
- **Google rich-result support:** **[Official Requirement]** Not an independent rich result; it is the nested property inside `Product` that actually supplies price/availability data for the Product rich result (confirmed via the Product documentation above).
- **Applicability to EnconeMed:** Central to equipment pages — schema.org's `Offer` vocabulary supports a `businessFunction` property (`Sell`, `LeaseOut`/rent, etc.) which conceptually matches EnconeMed's dual rental/purchase model. This is the key nested object the Product Architect will need to plan carefully since EnconeMed likely needs **two conceptual Offers per equipment item** (one rental, one purchase) rather than one.

### Brand
- **What it is:** `schema.org/Brand` — "a brand is a name used by an organization or business person for labeling a good, service, or product."
- **Schema.org URL:** https://schema.org/Brand
- **Google rich-result support:** **[Observation]** Not an independent rich result; used as a nested property of `Product` (`Product.brand`) and contributes to Google's product understanding/Merchant Center-linked features rather than a standalone SERP feature.
- **Applicability to EnconeMed:** Relevant for equipment-brand pages (e.g., a specific medical device manufacturer). Each equipment `Product` should reference a `Brand` object; a dedicated brand landing page could itself carry `Organization`- or `Brand`-flavored markup, though `Brand` alone triggers no unique rich result.

### Person
- **What it is:** `schema.org/Person` — an individual, e.g., an author, founder, clinician, or reviewer.
- **Schema.org URL:** https://schema.org/Person
- **Google rich-result support:** **[Observation]** Not an independent rich result on its own for this business context; relevant as a nested property (`Review.author`, `Article.author`, `Organization.founder`/`employee`).
- **Applicability to EnconeMed:** Use for named authors of knowledge/support articles (supports E-E-A-T-style author attribution) and potentially for founder/leadership bios on the About/Trust page. Do not expect this to independently trigger a rich result — it is context, not a feature trigger.

### Article
- **What it is:** `schema.org/Article` (and subtypes `BlogPosting`, `NewsArticle`) — a written piece of content.
- **Schema.org URL:** https://schema.org/Article
- **Google rich-result support:** **[Official Requirement]** Confirmed supported per https://developers.google.com/search/docs/appearance/structured-data/article — helps Google show better title, image, and date information for articles in Search (primarily impacts Google's news/Discover-oriented surfaces and general search snippet enhancement rather than a distinct visual rich-result card for arbitrary blog content).
- **Applicability to EnconeMed:** Directly applicable to the knowledge/support content section (care guides, equipment-usage articles, condition-specific explainers). Use `Article` or `BlogPosting` with `headline`, `image`, `datePublished`, `dateModified`, `author`.

### HowTo
- **What it is:** `schema.org/HowTo` — step-by-step instructions.
- **Schema.org URL:** https://schema.org/HowTo
- **Google rich-result support:** **[Official Requirement]** **Not supported — deprecated.** Verified via WebSearch (not assumed from training data): HowTo rich results were removed from mobile in August 2023 and from desktop in September 2023; as of the current (2026) documentation state there is no HowTo rich result on any surface. HowTo remains valid schema.org markup but produces zero Google SERP effect.
- **Applicability to EnconeMed:** **[Recommendation]** Even though EnconeMed's knowledge/support section will likely contain how-to-style content (e.g., "how to set up an oxygen concentrator"), do not implement `HowTo` schema expecting a rich result. If used at all, it should be for other consumers (e.g., voice assistants, internal semantic tooling) — not as an SEO deliverable, and it should not consume implementation budget ahead of Product/LocalBusiness/BreadcrumbList work.

### Service
- **What it is:** `schema.org/Service` — a service offered by an organization (e.g., equipment delivery, installation, nursing care service, maintenance/AMC).
- **Schema.org URL:** https://schema.org/Service
- **Google rich-result support:** **[Observation]** Not present in Google's structured-data gallery as an independent rich-result trigger. No confirmed dedicated Google Search feature for bare `Service` markup at this time.
- **Applicability to EnconeMed:** **[Recommendation]** Conceptually useful for describing non-product offerings (nursing care services, equipment installation/AMC, rental logistics) with properties like `serviceType`, `areaServed`, `provider`. Because it isn't a rich-result driver, treat it as a semantic/organizational modeling tool for these pages rather than an SEO priority — pair with `LocalBusiness`/`MedicalBusiness`'s `areaServed` for the location-page angle instead where a rich-result payoff matters more.

## Implementation Notes

- **[Recommendation]** Prioritize implementation order by confirmed Google rich-result value: (1) Organization + logo, (2) BreadcrumbList sitewide, (3) Product with nested Offer (rental + purchase) on equipment pages, (4) LocalBusiness/MedicalBusiness on location pages, (5) Article on knowledge/support content, (6) ImageObject/VideoObject as media assets come online, (7) Review/AggregateRating only via a genuine third-party review mechanism.
- **[Official Requirement]** All markup should be validated with Google's Rich Results Test and monitored via Search Console's Rich Results report once live (both explicitly referenced in Google's own BreadcrumbList documentation as the verification workflow).
- **[Observation]** Because EnconeMed is lead-generation (no online checkout), the "Merchant listing" track of Product structured data is likely inapplicable; "Product snippet" is the relevant track, and messaging like "availability" needs conceptual translation (e.g., "in stock for rental" vs. e-commerce "InStock").
- **[Recommendation]** Model the rental/purchase duality explicitly at the architecture stage: each equipment item conceptually needs two `Offer`-like entries (rent vs. buy) rather than a single price field, per `schema.org/Offer`'s support for a `businessFunction` distinction (Sell vs. LeaseOut).

## Common Mistakes

- **[Observation]** Implementing FAQPage or HowTo markup and expecting a SERP visual — both are fully deprecated as of the researched 2026 documentation; neither is a mistake to avoid in the sense of "risk," but a wasted-effort mistake.
- **[Observation]** Marking up first-party testimonials on `Organization`/`LocalBusiness`/`MedicalBusiness` pages with `AggregateRating`/`Review` and expecting stars to appear — Google explicitly excludes self-controlled reviews on these types from the star feature.
- **[Observation]** Using generic `LocalBusiness` everywhere instead of the more specific `MedicalBusiness` subtype where it fits — Google's own guidance says to use the most specific subtype available.
- **[Observation]** Treating `MedicalDevice` as if it were a Google rich-result type — it is schema.org-valid but not in Google's supported gallery; using it as the *sole* `@type` on equipment pages would forfeit Product's confirmed benefits.
- **[Observation]** Implementing `WebSite` + `SearchAction` expecting a sitelinks searchbox — retired.
- **[Observation]** Burying incentivized-review disclosures in terms-and-conditions or footer fine print — Google's policy requires disclosure to be immediately obvious on the marked-up page itself.

## Recommended Practices

- **[Industry Best Practice]** Use the most specific applicable schema.org subtype (`MedicalBusiness` over `LocalBusiness`, `BlogPosting` over generic `Article` where relevant) per Google's own stated guidance.
- **[Industry Best Practice]** Keep Organization markup to one home/about page rather than duplicating across every page, per Google's placement guidance.
- **[Recommendation]** Layer secondary/no-rich-result types (`MedicalDevice`, `Service`, `Brand`, `Person`) as *additional* semantic context via multi-type arrays or nested properties, never as a replacement for the primary rich-result-eligible type (`Product`, `LocalBusiness`, `Article`).
- **[Recommendation]** Keep a running internal note of which markup is "SEO-functional" (drives a confirmed Google feature) vs. "semantic-only" (schema.org-valid, no current Google payoff) so future contributors don't over-invest in deprecated features.

## Things to Avoid

- **[Observation]** Do not present HowTo, FAQPage, or SearchAction/sitelinks-searchbox implementation as SEO wins in any later-phase plan — they have no current Google Search effect.
- **[Official Requirement]** Do not mark up fake, undisclosed-incentivized, or non-genuine reviews — this is an explicit Google policy violation that can affect eligibility.
- **[Observation]** Do not attempt to force star ratings onto the corporate/about/location pages via self-authored testimonials — structurally ineligible per Google policy regardless of markup correctness.
- **[Recommendation]** Avoid marking up `MedicalDevice`, `Recipe`, `JobPosting`, or other schema.org types that are either not rich-result-eligible or not applicable to this business — scope creep here adds maintenance cost with no SERP payoff (Recipe/JobPosting were explicitly excluded from this research as inapplicable to EnconeMed's business).

## Future Considerations

- **[Observation]** Google has been actively pruning structured-data features (seven types retired in June 2025 per WebSearch findings: Book Actions, Course Info, Claim Review, Estimated Salary, Learning Video, Special Announcement, Vehicle Listing; FAQ removed May 2026). This is an evolving landscape — re-verify the gallery page at each future phase before finalizing implementation, rather than relying on this document indefinitely.
- **[Recommendation]** If EnconeMed later adds genuine e-commerce checkout (direct online purchase), revisit the "Merchant listing" track of Product structured data, which has additional required properties (shipping, returns) beyond the "Product snippet" track assumed here.
- **[Recommendation]** If EnconeMed collects verified third-party reviews via a compliant platform in the future, revisit AggregateRating/Review implementation on Product pages specifically (not Organization/LocalBusiness) at that time.

## Checklist

- [ ] Organization schema on homepage/about page: name, address, telephone, url, logo (≥112×112px), sameAs — **[Official Requirement]**-backed
- [ ] BreadcrumbList on all category/product/article pages — **[Official Requirement]**-backed
- [ ] Product schema on every equipment page with nested Offer(s) modeling rent vs. buy — **[Official Requirement]**-backed, needs Product Architect design for dual-offer modeling
- [ ] LocalBusiness/MedicalBusiness schema on location/service-area pages — **[Official Requirement]**-backed
- [ ] Article/BlogPosting schema on knowledge/support content — **[Official Requirement]**-backed
- [ ] ImageObject metadata plan for equipment photography (creator/license) — **[Official Requirement]**-backed, lower priority
- [ ] VideoObject plan for future demo/explainer videos — **[Official Requirement]**-backed, contingent on video content existing
- [ ] ContactPoint nested under Organization for sales/enquiry contact — **[Recommendation]**
- [ ] Explicit decision NOT to implement FAQPage, HowTo, or SearchAction/sitelinks-searchbox for SEO purposes — **[Observation]**-backed, document this decision so it isn't re-litigated later
- [ ] Review/AggregateRating implementation deferred until a genuine, policy-compliant third-party review source exists, and scoped to Product pages only — **[Official Requirement]**-backed
- [ ] Open question for Product Architect: confirm whether equipment "Offer" should be modeled as two schema.org Offers per item (rent/buy) or one Offer with variable `businessFunction`, and how this maps to the CMS/data model
- [ ] Open question for Product Architect: confirm whether brand pages warrant their own `Brand`/`Organization`-flavored markup or remain purely a `Product.brand` reference

## Sources

- [Structured Data Markup that Google Search Supports](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Intro to How Structured Data Markup Works](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
- [General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Intro to Product Structured Data on Google](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Local Business Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Breadcrumb Structured Data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Organization / Logo Structured Data](https://developers.google.com/search/docs/appearance/structured-data/logo)
- [Review Snippet (Review, AggregateRating) Structured Data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Video (VideoObject) Structured Data](https://developers.google.com/search/docs/appearance/structured-data/video)
- [Image License Metadata Structured Data](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- [Article Structured Data](https://developers.google.com/search/docs/appearance/structured-data/article)
- [FAQPage Structured Data (documentation of removal)](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Changes to HowTo and FAQ rich results — Google Search Central Blog (2023)](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Making Review rich results more helpful — Google Search Central Blog (2019)](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful)
- [MedicalDevice - Schema.org Type](https://schema.org/MedicalDevice)
- [MedicalBusiness - Schema.org Type](https://schema.org/MedicalBusiness)
- [MedicalOrganization - Schema.org Type](https://schema.org/MedicalOrganization)
- [MedicalClinic - Schema.org Type](https://schema.org/MedicalClinic)
- [MedicalEntity - Schema.org Type](https://schema.org/MedicalEntity)
- [Health and medical types - Schema.org](https://schema.org/docs/meddocs.html)
- [Offer - Schema.org Type](https://schema.org/Offer)
- [ContactPoint - Schema.org Type](https://schema.org/ContactPoint)
- [Organization - Schema.org Type](https://schema.org/Organization)
