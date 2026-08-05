# 06 — AEO (Answer Engine Optimization): Featured Snippets, PAA, FAQ, HowTo, Voice

Scope: featured snippets, People Also Ask, voice search, question clusters, FAQ best practices per Google's FAQPage guidance (including its 2026 deprecation status, verified this session rather than assumed), and HowTo best practices including Google's 2023 deprecation of HowTo rich results. For EnconeMed's Phase 0 content architecture.

## Executive Summary

Two of the marquee "answer engine" rich-result formats this research was asked to verify are **both now deprecated by Google**: HowTo rich results were fully removed from Google Search in September 2023, and — more significantly, and only fully confirmed via direct fetch this session — **FAQ rich results were deprecated on May 7, 2026**, with documentation removal following in June 2026. **[Official Requirement]** In both cases Google is explicit that the underlying Schema.org markup (`FAQPage`, `HowTo`) remains valid to keep in place — unused structured data "does not cause problems for Search" — but it no longer produces any visible SERP feature. **[Official Requirement]** Featured snippets and People Also Ask remain live, Google-documented features governed by ordinary snippet/content-quality mechanics rather than a dedicated markup type. **[Official Requirement]** Given the FAQPage deprecation is very recent (within the last 3 months relative to the stated current date), this is a live-fire finding EnconeMed's Product Architect should weight heavily: do not build a content strategy around securing FAQ rich results. **[Recommendation]**

## Official References

- Mark Up FAQs with Structured Data / FAQPage documentation, including May 2026 deprecation notice — https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Changes to HowTo and FAQ rich results (Google Search Central Blog, Aug 2023 — the original HowTo deprecation and FAQ restriction announcement) — https://developers.google.com/search/blog/2023/08/howto-faq-changes
- Schema for Q&A Pages (QAPage) documentation (Google) — https://developers.google.com/search/docs/appearance/structured-data/qapage
- Speakable (BETA) Structured Data documentation (Google) — https://developers.google.com/search/docs/appearance/structured-data/speakable
- General Structured Data Guidelines (Google) — https://developers.google.com/search/docs/appearance/structured-data/sd-policies
- Latest Google Search Documentation Updates (changelog, confirms dated deprecation entries) — https://developers.google.com/search/updates
- Creating Helpful, Reliable, People-First Content (governs featured-snippet-eligible content quality generally) — https://developers.google.com/search/docs/fundamentals/creating-helpful-content

Featured snippets and "People Also Ask" do not have a single dedicated Search Central documentation page comparable to FAQPage/HowTo/QAPage found in this session — Google treats them as an automatic extraction from normally-indexed, well-structured content rather than a markup-driven feature, and this research did not locate an official "featured snippet requirements" page distinct from general snippet/content guidance. Flag as a research gap.

## Important Findings

- **[Official Requirement]** FAQPage rich results stopped appearing in Google Search on **May 7, 2026** (per Google's own documentation, updated May 8, 2026, confirmed via direct fetch this session). Between August 2023 and May 2026, FAQ rich-result eligibility had already been restricted by Google to "well-known, authoritative government and health websites" — meaning most commercial sites, including a medical-equipment rental site like EnconeMed, would likely not have qualified for the visual rich result even during that intermediate window.
- **[Official Requirement]** Google states FAQPage remains a valid Schema.org type that Google will "continue to parse... to understand pages," and that existing FAQ markup does not need to be removed — unused structured data causes no harm to Search. Full removal of the FAQPage documentation itself was scheduled for June 2026, with Search Console API support for the FAQ rich result removed by August 2026.
- **[Official Requirement]** HowTo rich results were deprecated earlier and more completely: desktop removal effective September 13, 2023, following an initial mobile-only reduction announced August 8, 2023. Google removed the HowTo rich-result documentation entirely since the feature is no longer shown on any device. As with FAQPage, site owners were told they do not need to proactively remove existing HowTo markup.
- **[Official Requirement]** QAPage (for community/forum-style Q&A with multiple user-submitted answers, e.g., a "Best mattress for a hospital bed?" forum thread) is a distinct Schema.org/Google-documented type from FAQPage (single official site-owner answer per question) and was not identified as deprecated in this research — it appears to remain a live, separate rich-result type. This distinction matters for EnconeMed only if it ever hosts genuine multi-answer community content (unlikely for a lead-gen equipment site) rather than official FAQ-style content.
- **[Official Requirement]** Speakable structured data (relevant to voice-search/smart-speaker read-aloud) remains explicitly in **BETA** per Google's own documentation, and is explicitly scoped to U.S. news publishers/services at present, with Google stating an aspiration — not a commitment — to expand beyond news content and beyond the U.S./English in the future. This means Speakable is **not** a generally applicable voice-search optimization tool for a commercial Indian medical-equipment site today.
- **[Official Requirement]** Google's structured-data policy (general, not FAQ/HowTo-specific) still requires that any markup used reflect real, visible page content, not be used to manipulate rankings, and not guarantee any particular rich-result appearance even when technically valid.
- **[Observation]** "People Also Ask" (PAA) boxes and featured snippets are widely documented in third-party SEO literature as being driven by Google's general passage-indexing/snippet-extraction systems applied to ordinary, well-structured page content (clear question-phrased headings followed by a direct, concise answer) rather than by any special markup — this is consistent with Google's general snippet-generation documentation (Section 02) but was not confirmed via a PAA-specific official Google page in this session; treat the underlying mechanic as officially plausible but the specific "PAA/featured snippet requirements" framing as industry-synthesized.
- **[Observation]** Voice search as a distinct, separately-optimizable channel has diminished in prominence in official documentation; Google's only living, explicitly-branded voice-related structured data (Speakable) is beta, narrow-scoped, and non-commercial-site-relevant, suggesting voice search should not be treated as a discrete workstream for EnconeMed's Phase 0, but rather as a secondary consequence of generally well-structured, question-answering content that could theoretically be read aloud by assistants without special markup.

## Implementation Notes

- **[Recommendation]** Do not build FAQ content primarily as a rich-result acquisition tactic — that channel closed in May 2026. Retain FAQ-style content (question headings + direct answers) for its user-experience, snippet-eligibility, and (per Section 05) general answer-extractability value, not for a dedicated Google SERP feature.
- **[Recommendation]** If existing or planned content includes `FAQPage`/`HowTo` JSON-LD, it is safe to leave in place per Google's explicit no-harm statement, but should not be prioritized as new engineering work given no visible benefit remains; effort is better spent on the underlying content clarity (Section 05) and on `Product`/`Service`/`MedicalBusiness`/`Organization`/`BreadcrumbList` structured data, which still carries live rich-result and entity-understanding value.
- **[Recommendation]** For step-by-step content (e.g., "how to set up a hospital bed at home," "how to use an oxygen concentrator"), retain clear numbered-step formatting for user experience and general answer-extractability even though `HowTo` markup itself no longer produces a rich result — the content-structure value is independent of the now-defunct SERP feature.
- **[Recommendation]** Treat featured-snippet/PAA opportunity as a content-writing discipline (question-phrased H2/H3 headings, immediate direct answer in the first sentence or two, supporting detail after) rather than a markup task, consistent with the absence of a dedicated official markup requirement for these features.

## Common Mistakes

- **[Observation]** Assuming FAQPage or HowTo markup will produce a rich result in current Google Search — both are deprecated (FAQ as of May 2026, HowTo as of Sept 2023); this is a common stale-blog-content trap given how many third-party SEO articles still describe these as active tactics.
- **[Observation]** Confusing QAPage (community/multi-answer) with FAQPage (single official answer) — using the wrong type for the content's actual structure.
- **[Observation]** Treating Speakable as a general voice-search solution when it is explicitly beta and scoped to U.S. news publishers.
- **[Observation]** Building a standalone "voice search strategy" as a distinct workstream when official documentation suggests it is not currently a separately-optimizable channel for a commercial, non-news site.

## Recommended Practices

- **[Industry Best Practice]** Structure genuine FAQ content (shipping/rental terms, equipment safety basics, insurance/reimbursement questions relevant to Indian medical-equipment rental) as clear question-headings with direct answers for user value and general snippet/answer-extractability, independent of the defunct rich-result feature.
- **[Industry Best Practice]** For any procedural/instructional content, use genuinely sequential, numbered steps with a clear starting context and end state, which supports both user comprehension and extraction by any system (search snippet or AI) regardless of markup.
- **[Industry Best Practice]** Periodically re-verify rich-result feature status before investing engineering time in any specific Schema.org type, given the demonstrated pace of deprecation (two major "answer" formats deprecated within roughly 3 years).

## Things to Avoid

- **[Official Requirement]** Do not fabricate or pad FAQ content solely to game a now-nonexistent rich-result feature — this both wastes effort and risks running afoul of the general structured-data content-guideline (Section 02) if the questions don't reflect genuine, visible on-page content.
- **[Recommendation]** Avoid over-indexing on "voice search optimization" as a Phase 0 priority given the narrow, beta, non-commercial scope of Google's only current voice-specific structured data.

## Future Considerations

- **[Observation]** Given HowTo and FAQPage were both deprecated within roughly a 3-year window of each other, assume any currently-live rich-result type (Product, Review/AggregateRating, BreadcrumbList, Organization, LocalBusiness) could similarly be deprecated or restricted in scope; architect structured-data generation so it can be added/removed per type without a content-model rewrite.
- **[Observation]** Revisit Speakable's status periodically — Google has stated an aspiration to broaden it beyond U.S. news; if that materializes, it could become relevant to a health/medical-equipment education content vertical.
- **[Observation]** This document's FAQPage deprecation finding (May 2026) is very recent relative to the stated project date; the Product Architect should independently reconfirm status closer to actual implementation given how fast this specific area has moved.

## Checklist

- [ ] Confirm current (implementation-time) status of FAQPage/HowTo/QAPage rich results directly against Search Central before writing any new structured-data code for them
- [ ] Content team writes FAQ-style content for user value and answer-extractability, not as a rich-result acquisition tactic
- [ ] Any legacy FAQPage/HowTo JSON-LD left in place is documented as "harmless but non-functional for rich results," not silently assumed to be delivering value
- [ ] Procedural/instructional content uses clear numbered steps regardless of HowTo markup's rich-result status
- [ ] Voice search / Speakable is treated as a non-priority for Phase 0 given its beta, U.S.-news-only scope
- [ ] Structured-data architecture is modular per type so deprecations of any single rich-result type don't require a content-model rewrite
- [ ] Distinguish FAQPage (official single answer) from QAPage (community multi-answer) usage correctly if either is implemented
