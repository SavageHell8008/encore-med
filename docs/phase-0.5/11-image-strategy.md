# 11 — Image Strategy Research

**Phase:** 0.5 — Research (no code, no UI, no components)
**Scope:** EnconeMed (Encone Care Nurses Private Limited) — premium medical equipment rental/sales, lead-generation model, India. Audience includes elderly users, stressed caregivers, and low-vision/low-literacy users.

---

## Executive Summary

Image strategy on EnconeMed carries more weight than on a typical e-commerce site because (a) the category is YMYL-adjacent (health/safety-impacting purchases), (b) the buyer is frequently not the end user (a caregiver buying/renting for an elderly parent), and (c) trust must be established without the reassurance of a marketplace's peer reviews at scale, since EnconeMed is a lead-gen brand, not a marketplace. Research across Google's official Image SEO documentation, WCAG, web.dev, Baymard product-page studies, and healthcare-marketing trust research converges on a consistent set of findings: **real, human-inclusive photography outperforms stock imagery for trust**; **multi-image galleries (5–8 images) meaningfully lift engagement and conversion**; **alt text must serve accessibility first, SEO second**; and **image performance (format, compression, lazy-loading) is now a ranking and Core Web Vitals factor, not just a UX nicety**. For EnconeMed specifically, this implies a hybrid image strategy: clinical/product-accurate isolated shots as the primary/hero image (for scannability and comparison), paired with authentic in-context and human-inclusive lifestyle images later in the gallery (for trust and reassurance), never fully stock-photo-styled given the credibility stakes of medical equipment.

## Research Scope

This document covers: (1) clinical vs. lifestyle medical imagery and documented trust effects; (2) real/authentic imagery vs. stock imagery trust research; (3) equipment/product photography standards (multi-angle, in-context vs. isolated, gallery structure) per Baymard; (4) alt text best practice per WCAG and Google; (5) image hierarchy on category/product pages; (6) product gallery UX patterns (thumbnails, zoom); (7) image metadata/entity considerations, referenced only at a high level (structured data itself is out of scope — see Phase 0 schema documentation).

## Evidence

### Clinical vs. lifestyle imagery / trust
- **[Industry Best Practice]** Healthcare marketing research indicates patients are markedly more likely to trust a practice/brand when shown real people and real settings rather than generic stock scenarios; one commonly cited figure is that patients are "two to three times more likely to trust" a provider shown with real photos versus stock imagery (source: healthcare marketing industry analyses, e.g. Sprypt, PhotoShelter "Stock vs Real Patient Photos" — commercial marketing sources, not peer-reviewed, cited here as industry consensus rather than fact).
- **[Industry Best Practice]** The same body of marketing literature reports authentic imagery converting meaningfully higher than stock photography in A/B tests (commonly cited: ~35% higher conversion for authentic vs. stock images; ~42% credibility lift for real staff/facility photos vs. generic stock, attributed to HubSpot data in secondary sources). These specific percentages come from marketing blogs, not an original, independently verifiable primary study — treat as **[Observation]** of an industry direction rather than a hard, citable statistic.
- **[Industry Best Practice]** Google explicitly classifies health-related content as YMYL ("Your Money or Your Life") in its Search Quality Rater Guidelines, meaning trust/authoritativeness signals (including imagery authenticity) matter more for ranking and for user decision-making than in low-stakes categories. This is well documented across SEO industry sources referencing Google's Search Quality Rater Guidelines, though the guidelines themselves are for raters, not a direct ranking algorithm document.

### Real human images vs. stock-looking imagery
- **[Industry Best Practice]** Multiple healthcare-marketing sources report a shift "beyond stock imagery" as a trend, with patients explicitly citing authenticity as a top trust factor (one source cites 88% of patients valuing authenticity/honesty in healthcare visual branding — again, a marketing-industry-sourced statistic, not peer-reviewed).
- **[Recommendation]** For EnconeMed, this argues for real photography of actual equipment (not manufacturer stock renders where avoidable), and, where feasible, real caregiver/patient-adjacent lifestyle imagery rather than generic stock-agency "smiling elderly person" imagery that caregivers may subconsciously recognize as stock and discount.

### Equipment photography standards (Baymard-style product-page research)
- **[Industry Best Practice]** Baymard Institute's Product Page research (baymard.com/research/product-page) finds that a large share of users' first action on a product page is to explore the image gallery immediately — reported as roughly 56% of users' first action — underscoring that the gallery, not the description, is often the first real "evaluation" moment.
- **[Industry Best Practice]** Baymard research also finds that roughly 40% of e-commerce sites have gallery interfaces that cause users to overlook additional available images, i.e., poor affordance for "there are more photos here" is a common, costly failure mode.
- **[Industry Best Practice]** Baymard's zoom-interaction research recommends supporting **both** pinch-to-zoom and double-tap-to-zoom, explicitly noting that the word "pinch" is not universally understood, especially by non-native English speakers/less tech-literate users — highly relevant to EnconeMed's elderly/low-literacy audience.
- **[Industry Best Practice]** Broader e-commerce photography research (aggregated conversion-rate-optimization industry data, not a single controlled academic study) suggests: products with 5–8 images convert meaningfully better than single-image listings (one aggregated study of ~2.3M listings cited a ~50% conversion lift for 5+ images vs. one image); white/isolated backgrounds tend to win as the primary/hero and grid image because they support fast visual comparison; lifestyle/in-context images tend to perform better later in the gallery and in marketing contexts where "how is this used" needs answering. This is **[Observation]**-level aggregated industry data, not a single authoritative study, and should be treated as directional.
- **[Recommendation]** For medical equipment specifically (wheelchairs, hospital beds, oxygen concentrators, etc.), a practical structure supported by the above is: (1) hero image — clean, isolated/neutral-background shot showing the full unit, mirroring how buyers compare across products; (2) 2–4 alternate-angle isolated shots (folded/unfolded, control panel close-up, dimensions callout); (3) at least one authentic in-context/in-use image showing the equipment being used safely in a home/care setting (ideally with a real person, not obviously staged/stock); (4) any relevant close-up of critical functional details (wheel locks, battery ports, mattress material) since these often drive purchase-readiness questions for caregivers.

### Alt text best practice (WCAG + Google)
- **[Official Requirement]** WCAG 2.1 Success Criterion 1.1.1 (Non-text Content, Level A) requires that all non-text content have a text alternative serving an equivalent purpose. Per the W3C's own "Understanding SC 1.1.1" guidance (w3.org/WAI/WCAG21/Understanding/text-alternatives), the correct alternative text depends on the image's *function*: decorative images should use empty `alt=""` (so screen readers skip them); informative images need a description of the information conveyed, not a literal visual description; functional images (e.g., an image acting as a button/link) need alt text describing the *function*, not the appearance.
- **[Official Requirement]** Google's official Image SEO Best Practices documentation (developers.google.com/search/docs/appearance/google-images) instructs site owners to write descriptive, contextually relevant alt text, use descriptive file names, and place images near relevant textual content so Google can associate the image with the surrounding topic — alt text exists for both accessibility and topical relevance, and Google explicitly frames these as complementary, not competing, goals.
- **[Industry Best Practice]** SEO-industry guidance (secondary sources, not Google-official) commonly recommends alt text in the ~80–140 character range: long enough to be genuinely descriptive, short enough that a screen reader doesn't produce an unwieldy listen experience. This range is an industry rule of thumb, not a documented Google or W3C requirement.
- **[Recommendation]** For EnconeMed, alt text for product images should name the equipment type, key distinguishing attribute, and, where relevant, the use context (e.g., "Foldable manual wheelchair with padded armrests, shown folded for transport" rather than "wheelchair image 3" or a keyword-stuffed string). Purely decorative background/hero imagery on marketing pages should use `alt=""`.

### Image hierarchy on category/product pages
- **[Industry Best Practice]** Baymard's category-page research (referenced at a high level; not independently re-verified line-by-line here) generally supports large, consistent, comparably-framed thumbnail images on category/listing grids so users can scan and compare quickly — inconsistent framing/backgrounds across a grid is a documented friction point in e-commerce UX research broadly.
- **[Recommendation]** Category/listing pages should prioritize the isolated/neutral-background hero shot (fast scanning, comparability) at grid scale; product detail pages should lead with the same hero image for continuity, then reveal the fuller narrative (angles, in-use, close-ups) as the user scrolls or interacts with the gallery.

### Product gallery UX patterns (thumbnails, zoom)
- **[Industry Best Practice]** Per Baymard's Product Page findings on gallery UI (secondary summary sources reviewed, e.g. Medium "Baymard Cliff Notes: Image Gallery UI"): thumbnails should be clearly visible (not hidden behind a hover/swipe-only affordance) so users register that more images exist; the "current" image/selection state in a thumbnail strip should be visually unambiguous; zoom should support multiple input methods (click/tap, hover, pinch) because user familiarity with any single gesture cannot be assumed.
- **[Recommendation]** Given EnconeMed's elderly/low-literacy audience, gallery interactions should favor larger tap targets and an explicit, visible zoom affordance (e.g., a visible magnifying-glass icon or "Tap to zoom" label) rather than relying on an undiscoverable pinch gesture alone, directly following Baymard's finding that "pinch" is not a universally understood term/gesture.

### Image metadata / entity considerations
- **[Official Requirement]** Google's Image SEO documentation confirms that structured data (e.g., Product schema with associated `image` properties) and descriptive file naming both contribute to how Google indexes and displays images (including in Google Images and rich results). The specific schema.org implementation is intentionally out of scope here — see the Phase 0 structured-data/schema documentation for implementation detail; this document only flags that image file naming, alt text, and schema `image` fields should be kept consistent as a single content-entity strategy, not designed independently by different teams.

## Official Sources (where available)
- Google Search Central — Image SEO Best Practices: https://developers.google.com/search/docs/appearance/google-images
- W3C WAI — Understanding Guideline 1.1: Text Alternatives (WCAG 2.1): https://www.w3.org/WAI/WCAG21/Understanding/text-alternatives
- web.dev — Image performance (Learn Performance module): https://web.dev/learn/performance/image-performance
- Baymard Institute — Product Page UX Research Studies (overview/landing page; full findings are paywalled under Baymard Premium): https://baymard.com/research/product-page
- Baymard Institute — "Inspirational Images Should Link to All Depicted Products" (public blog post): https://baymard.com/blog/inspirational-product-images

## Industry Research
- Secondary summaries of Baymard gallery/zoom findings (Medium, "Baymard Cliff Notes: Image Gallery UI" and "Baymard Cliff Notes: Product Images") — useful directional summaries but not primary Baymard text; full detail requires a Baymard Premium subscription.
- Healthcare marketing industry sources on stock-vs-authentic imagery (Sprypt, PhotoShelter, SocialFly, ExciteMedia, EmpathyFirstMedia) — commercial marketing blogs; statistics cited (e.g., "35% higher conversion," "42% credibility lift," "88% value authenticity") could not be traced to an original peer-reviewed study and should be treated as industry-consensus directional claims, not verified research facts.
- E-commerce conversion-rate-optimization industry sources on lifestyle vs. white-background photography (Pixc, Nightjar, HoopStudios, Photta, Prodofoto) — aggregated commercial/agency data, useful for directional strategy, not academically peer-reviewed.

## Important Findings
- **[Industry Best Practice]** The gallery is often the *first* interaction on a product page (Baymard: ~56% of first actions), which elevates image strategy from "supporting content" to primary UX surface.
- **[Industry Best Practice]** A meaningful minority of sites (Baymard: ~40%) fail to signal that additional images exist — a specific, avoidable failure mode.
- **[Official Requirement]** Alt text correctness is function-dependent (decorative vs. informative vs. functional), not a blanket "always describe the image" rule — a common real-world implementation error.
- **[Industry Best Practice]** Trust research consistently favors authenticity over polish in healthcare imagery — this cuts against a "premium = glossy stock photography" instinct and instead argues for premium-but-real photography (professional lighting/composition of real equipment and real people, not stock-agency imagery).
- **[Industry Best Practice]** Zoom interactions should not assume gesture literacy; explicit affordances matter more for this audience than for a general e-commerce audience.

## Design Implications
- **[Recommendation]** Adopt a consistent hero-image framing standard (isolated, neutral background, consistent angle/lighting) across all product categories so category/listing grids remain scannable.
- **[Recommendation]** Reserve at least one gallery slot per product for an authentic in-context/in-use image; avoid stock-agency-styled imagery for anything depicting patients/caregivers.
- **[Recommendation]** Make gallery affordances (thumbnail strip, zoom icon, image count indicator such as "1/6") visually explicit rather than discoverable-only-by-gesture, given the audience's likely lower comfort with implicit mobile gestures.
- **[Recommendation]** Ensure zoom supports tap/click in addition to pinch, per Baymard's finding on gesture-term comprehension gaps.

## Business Implications
- **[Recommendation]** Because EnconeMed is lead-generation (not a marketplace with review-driven trust), image authenticity substitutes in part for the trust signal that reviews-at-scale would normally provide — this raises the ROI case for commissioning real product/lifestyle photography over relying on manufacturer/distributor stock images.
- **[Observation]** Photography investment (real equipment shoots, real-context lifestyle images) is a cost line item Phase 0.5 should flag to the Product Architect / business stakeholders as a pre-launch operational dependency, not a "fill in later" content task.
- **[Recommendation]** A consistent photography style guide (background, lighting, framing rules) reduces long-term cost by making future product photography commissions repeatable rather than bespoke each time.

## SEO Implications
- **[Official Requirement]** Google's Image SEO documentation ties alt text, descriptive file names, and image placement/context to how images are indexed and surfaced in Google Images and rich results — these are documented, not speculative, ranking-adjacent factors.
- **[Industry Best Practice]** Image compression/format choice and lazy-loading affect Core Web Vitals (notably LCP and CLS), which are documented Google ranking signals; per web.dev, images are frequently the single heaviest resource on a page (industry estimates commonly cite roughly half of page bandwidth going to images).
- **[Recommendation]** Treat image alt text as a topical-relevance signal reinforcing on-page text content, not as a keyword-stuffing opportunity — Google's own guidance explicitly frames alt text quality in terms of usefulness to a user who cannot see the image.

## AI Search Implications
- **[Observation]** AI-driven search/answer engines (e.g., AI Overviews and other LLM-based search surfaces) rely heavily on well-structured, well-labeled content — including descriptive alt text and image-adjacent copy — to understand and cite what an image depicts, since these systems generally cannot deeply "see" nuanced product detail the way a human shopper can. This is a reasonable extrapolation from how these systems consume structured/textual signals, not a documented AI-search-specific guideline; no official "AI Search Image Guidelines" document was found to exist as of this research and none should be assumed.
- **[Recommendation]** Because AI answer engines tend to prefer content that is self-descriptive without requiring the image itself to be viewed, product copy near images (captions, alt text, surrounding descriptive text) should be written so the *text alone* conveys what a sighted user would learn from the photo — this simultaneously serves accessibility, traditional SEO, and AI-search extractability.

## Recommendations
- **[Recommendation]** Standardize a 5–8 image gallery structure per product: hero (isolated), 2–3 alternate angles, 1+ authentic in-use/lifestyle shot, 1+ functional close-up.
- **[Recommendation]** Write function-aware alt text per WCAG (decorative = empty, informative = descriptive, functional = action-based), keeping length roughly in the 80–140 character range where a fuller description is warranted, without treating that range as a hard rule.
- **[Recommendation]** Prioritize modern image formats (WebP/AVIF) with responsive `srcset` and lazy-loading below the fold, per web.dev performance guidance, to protect Core Web Vitals.
- **[Recommendation]** Commission real photography of actual rental/sale equipment units rather than relying solely on manufacturer stock imagery, particularly for hero and in-use shots.
- **[Recommendation]** Provide explicit, visible zoom and "more images" affordances rather than gesture-only discovery.

## Things To Avoid
- **[Recommendation]** Avoid generic, obviously-stock lifestyle imagery (unrelated smiling models, non-Indian/non-representative settings) for a caregiver audience that healthcare-marketing research suggests will discount such imagery as inauthentic.
- **[Recommendation]** Avoid alt text that is either empty for genuinely informative product images, or keyword-stuffed strings that violate Google's own guidance on alt text usefulness.
- **[Recommendation]** Avoid gallery UIs where additional images are only discoverable via an unlabeled swipe/hover gesture, per Baymard's ~40% "overlooked images" failure-mode finding.
- **[Recommendation]** Avoid relying on pinch-to-zoom as the sole zoom mechanism, given documented gesture-comprehension gaps in less tech-literate/non-native-English audiences.
- **[Recommendation]** Avoid inconsistent background/framing across a category grid, which undermines fast visual comparison.

## Future Considerations
- **[Observation]** As AI-generated product imagery becomes more common industry-wide, EnconeMed should track whether disclosure norms or regulations emerge for health-adjacent product imagery (none identified as existing today in this research pass).
- **[Observation]** Video (short in-use demonstration clips) was flagged repeatedly in adjacent industry research as a growing complement to static galleries for complex equipment, but was out of scope for this research pass and warrants a dedicated look in a later phase.
- **[Observation]** If EnconeMed later pursues AI Overviews / AI-search optimization more formally, a dedicated research pass on emerging "AI Search / GEO (Generative Engine Optimization)" guidance would be warranted, since this field is new and best practices are still forming — nothing found in this pass should be treated as authoritative or exhaustive on that topic.

## Checklist
- [ ] Hero image standard defined (isolated, neutral background, consistent angle/lighting) and applied across all product categories.
- [ ] Each product has 5–8 gallery images including at least one authentic in-use/lifestyle shot and one functional close-up.
- [ ] Alt text written per-image based on function (decorative/informative/functional), not a blanket template.
- [ ] Gallery UI has a visible thumbnail strip and explicit "more images" affordance.
- [ ] Zoom supports both tap/click and pinch, with a visible zoom affordance.
- [ ] Images served in modern formats (WebP/AVIF) with responsive `srcset` and lazy-loading below the fold.
- [ ] File names are descriptive, not auto-generated camera filenames.
- [ ] Product schema `image` fields are consistent with actual on-page images (cross-check against Phase 0 structured-data doc).
- [ ] No stock-agency-styled imagery used for patient/caregiver-depicting lifestyle shots.
- [ ] Category/listing grid uses consistent framing across all thumbnails.
