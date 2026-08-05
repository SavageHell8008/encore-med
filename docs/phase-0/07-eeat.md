# 07 — E-E-A-T for a Healthcare-Adjacent Site

Research scope: Experience, Expertise, Authoritativeness, Trustworthiness per Google's Search Quality Rater Guidelines; precise labeling of E-E-A-T as a rater-guideline construct, not a direct ranking algorithm; YMYL expectations for medical/health-adjacent sites; healthcare trust-signal patterns (author credentials, medical review disclaimers, certifications, licensing display). Phase 0 research only — no code, UI, or copy.

## Executive Summary

E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) is Google's framework for how **human quality raters** evaluate search result quality as part of the Search Quality Rater Guidelines — it is not, per Google's own public statements, a directly-measurable ranking factor or a scoring formula applied to pages. Google has stated that rater guidelines inform and validate ranking systems but raters do not directly control rankings for individual sites. That said, Google's helpful-content documentation independently instructs creators to demonstrate the same qualities, and a medical-equipment platform sits inside "Your Money or Your Life" (YMYL) territory, where Google's guidelines describe a materially higher bar for authoritative sourcing, identifiable authorship, and transparency. Of the four E-E-A-T components, Google states trust is the most important and the one the other three ultimately serve. For EnconeMed, this means the practical work is less about literal "E-E-A-T optimization" (a term Google does not use as a ranking lever) and more about building genuine, verifiable credibility signals — real company registration, real credentials where health claims are made, transparent authorship — that satisfy both human raters' evaluation criteria and ordinary user trust.

## Official References

- Our latest update to the quality rater guidelines: E-A-T gets an extra E for Experience — https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t
- Creating Helpful, Reliable, People-First Content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Spam Policies for Google Web Search — https://developers.google.com/search/docs/essentials/spam-policies
- Review Snippet (Review, AggregateRating) Structured Data guidelines (relevant to authenticity/trust markup) — https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Google's full "Search Quality Rater Guidelines" document itself is published by Google (historically via a linked PDF from Search Central) but was not directly fetched in this research pass; findings about YMYL and rater mechanics below are drawn from Google's blog post above plus secondary summaries and should be verified against the current primary PDF before being treated as final in Phase 1. **[Observation — research gap]**

## Important Findings

- **[Official Requirement]** Google's blog post explicitly introduced "Experience" as a new, distinct component in December 2022: "Experience means you've done it" (first-hand, lived use of a product/service), separate from Expertise ("you know it," i.e., depth of knowledge).
- **[Official Requirement]** Google states, in its own words (as reflected in the rater guidelines update), that of the four E-E-A-T qualities, **trustworthiness is the most important**, and that "the other members of the family [Experience, Expertise, Authoritativeness] contribute to trustworthiness" rather than standing as independent, equally-weighted signals.
- **[Official Requirement]** E-E-A-T is explicitly a **rater guideline construct** — used to train and evaluate the quality of Google's automated ranking systems — and Google has repeatedly clarified it is *not* itself a ranking signal or algorithm component that can be directly targeted the way a technical signal (e.g., page speed) can be. Any claim that "improving E-E-A-T" mechanically improves rankings should be treated as an inference/industry shorthand, not an official statement. **[Industry Best Practice]** framing is more accurate than **[Official Requirement]** framing for most "how to improve E-E-A-T" advice found in SEO blogs.
- **[Official Requirement]** Google's helpful-content guidance operationalizes E-E-A-T-adjacent expectations independent of the rater guidelines: content should demonstrate "clear authorship," disclose "who created the content and why," and show "first-hand expertise and depth of knowledge" — these are stated as part of the helpful-content self-assessment, which Google says does feed into automated ranking systems (integrated into core ranking as of March 2024).
- **[Observation]** "YMYL" (Your Money or Your Life) is the rater-guideline category for content that can impact health, financial stability, safety, or well-being; medical equipment (rental/purchase decisions affecting patient care, e.g., oxygen concentrators, hospital beds, ICU equipment) plausibly falls within this category. **[Observation — research gap]**: this research pass did not directly fetch Google's primary Quality Rater Guidelines PDF to confirm medical-equipment-rental specifically (as distinct from medical *advice* content) is explicitly named as YMYL; secondary sources describe YMYL health examples as "medical conditions, treatments, drugs, mental health, addiction, nutrition, fitness, hospital or provider information" — equipment commerce/rental is adjacent but not explicitly enumerated in what was found. Treat EnconeMed as YMYL-adjacent by prudent assumption, not confirmed official classification, pending direct primary-source review.
- **[Official Requirement]** For YMYL-type pages, raters are guided to apply "particular care," where correctness alone is insufficient — authoritative sourcing, identifiable authorship, and maximal transparency are expected (per secondary synthesis of rater guidelines; primary-source line-by-line not directly fetched this pass).
- **[Official Requirement]** Google's structured-data guidelines prohibit "self-serving" `Review`/`AggregateRating` rich results on `LocalBusiness`/`Organization` schema when the reviewed entity controls the reviews (including via embedded third-party widgets) — directly relevant to how EnconeMed can and cannot technically markup its own testimonials, and a concrete, checkable trust/authenticity rule rather than a soft heuristic.

## Implementation Notes

- **[Recommendation]** Author attribution: any page containing health-adjacent guidance (e.g., "how to choose an oxygen concentrator flow rate," "post-surgical bed positioning") should carry a named author or reviewer with stated relevant background (clinical, biomedical engineering, or equivalent), consistent with the "Who" transparency expectation in Google's helpful-content guidance — this is a content-operations decision for Phase 1+, not something this research doc can specify further.
- **[Recommendation]** Separate clearly, in site architecture, between (a) commerce/product pages (specs, pricing, rental terms) and (b) any educational/advisory content about medical conditions or equipment usage — the latter carries a heavier YMYL-adjacent transparency expectation than the former.
- **[Recommendation]** Company-level trustworthiness signals (legal entity name "Encone Care Nurses Private Limited," registration details, verifiable contact information) function as Authoritativeness/Trustworthiness inputs independent of any individual author bio — both layers (company-level and author-level) matter per Google's stated framework.

## Common Mistakes

- **[Observation]** Treating "E-E-A-T" as a checklist ranking factor to "optimize," when Google has stated it is a rater-evaluation construct that informs, but is not identical to, ranking systems.
- **[Observation]** Publishing health-adjacent guidance content with no visible authorship or credentials, which directly contradicts the "Who" transparency expectation Google states explicitly in its helpful-content documentation.
- **[Observation]** Marking up self-collected testimonials as `Review`/`AggregateRating` structured data on `Organization`/`LocalBusiness` schema — an explicit Google guideline violation (see 15-local-seo.md and 14-trust-signals.md for the same rule applied to review UI/markup).
- **[Observation]** Assuming correctness of information is sufficient for YMYL content; Google's rater framework (per secondary synthesis) treats source authority and transparency as necessary in addition to factual accuracy.

## Recommended Practices

- **[Industry Best Practice]** Maintain an "About"/company page that states the legal entity, registration status, years operating, and physical/service presence — addresses Trustworthiness and Authoritativeness simultaneously.
- **[Industry Best Practice]** For any content describing medical equipment usage/suitability (as opposed to pure product specs), attribute review/authorship to a named person with relevant credentials, and disclose the review date — mirrors patterns seen on major health publishers, though this is industry convention rather than a literal Google requirement.
- **[Recommendation]** Keep experience-based content (e.g., delivery/installation walkthroughs, real customer situations) visibly distinct from marketing copy, since "Experience" in Google's framework specifically rewards demonstrable first-hand use, not just claims of it.

## Things to Avoid

- **[Official Requirement]** Do not mark up self-serving reviews (reviews of your own business, embedded via your own widget or native testimonials) as `Review`/`AggregateRating` rich-result structured data on `Organization`/`LocalBusiness` schema types.
- **[Recommendation]** Avoid publishing medical-adjacent advisory content with anonymous or unverifiable authorship, given the YMYL-adjacent risk profile.
- **[Recommendation]** Avoid describing this document's guidance to any future contributor as "Google's E-E-A-T ranking algorithm" — precise language matters; it is a rater-guideline framework that informs automated systems, per Google's own clarification.

## Future Considerations

- **[Recommendation]** Before Phase 1 content strategy is finalized, directly source and review Google's current Search Quality Rater Guidelines primary document (PDF, linked from Search Central) to confirm exact YMYL health-category language and any explicit mention of medical-equipment commerce, rather than relying on the secondary synthesis used in this pass.
- **[Recommendation]** Track whether Google publishes further rater-guideline updates (it has updated the E-E-A-T framing at least once, in Dec 2022) since this is an actively evolving document.
- **[Recommendation]** Decide, in Phase 1, which roles at Encone Care Nurses Private Limited (clinical staff, biomedical technicians, founders) will be publicly named as content authors/reviewers, since this research doc can identify the requirement but not populate it.

## Checklist

- [ ] Confirm precise YMYL classification boundary (product commerce vs. health advisory content) via primary Quality Rater Guidelines source
- [ ] Define authorship/reviewer attribution policy for any health-adjacent advisory content
- [ ] Build a company/About page covering legal entity, registration, and operating history
- [ ] Audit any existing or planned review UI/schema for "self-serving review" structured-data violations
- [ ] Distinguish site sections by YMYL sensitivity (commerce vs. advisory) for differentiated trust-signal treatment
- [ ] Avoid internal/external communication that frames E-E-A-T as a direct ranking algorithm
- [ ] Schedule a Phase 1 direct read of Google's current Quality Rater Guidelines PDF (research gap from this pass)
