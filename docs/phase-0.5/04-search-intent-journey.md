# Search Intent & Conversion Journey Research

## Executive Summary

EnconeMed visitors do not arrive with a settled shopping list — they arrive mid-crisis or mid-planning, holding a symptom, a diagnosis, or a discharge instruction rather than a SKU. This document maps the full real-world journey from first search to post-purchase support for medical equipment rental/sale in India, and shows how classical search-intent theory (informational / navigational / commercial-investigation / transactional) compresses and reorders itself under medical urgency. The core finding: urgency collapses the funnel. A caregiver searching at 11pm because a parent's oxygen saturation just dropped does not move informational → commercial → transactional in three separate sessions over two weeks, as a typical retail buyer might; they attempt to compress the entire journey into under an hour, and every page must simultaneously teach, reassure, and convert. A planned/future need (e.g., preparing for a scheduled knee surgery next month) instead follows the classical, slower multi-session funnel. Designing one journey model for both populations will fail one of them.

## Research Scope

This research covers: (1) classical search-intent taxonomy from SEO/IR literature and how it is typically applied to e-commerce; (2) documented health-information-seeking behavior of caregivers and patients (Pew Research Center, PMC/NCBI peer-reviewed surveys on "Dr Google"); (3) Baymard Institute's usability research on B2B medical/pharma e-commerce and trust signals; (4) NN/g research on task-oriented content scanning behavior; (5) first-principles reasoning about how these combine specifically for a home medical equipment rental/sales business in India serving caregivers, elderly users, and some healthcare professionals. It explicitly excludes keyword-list SEO tactics and schema markup (covered in a prior phase) — the focus here is the human journey, not the search engine.

## Evidence

- **[Peer-Reviewed/Research-Backed]** Pew Research Center's "Profiles of Health Information Seekers" (pewresearch.org, 2011) found that among caregivers with internet access, 88% look online for health information, and caregivers researched every health topic surveyed at higher rates than non-caregivers, often by double-digit margins. Half of health-information seekers, on their most recent search, say they were searching on behalf of someone else — directly matching EnconeMed's core persona (adult child researching equipment for an elderly parent).
- **[Peer-Reviewed/Research-Backed]** The peer-reviewed survey "Consumer Use of 'Dr Google': A Survey on Health Information-Seeking Behaviors and Navigational Needs" (PMC/NCBI) documents that roughly two-thirds of people are not fully reassured by their online search and still seek confirmation elsewhere (a clinician, a call, a second source) — meaning trust-building content must lead to a human contact point, not stand alone as the final step.
- **[Peer-Reviewed/Research-Backed]** Classical information-retrieval literature (Broder's taxonomy, widely adopted in SEO practice) splits queries into informational, navigational, and transactional intent, with a later "commercial investigation" intent added for buy-related research (comparison/review queries). General web query distributions are estimated at roughly 80% informational and about 10% each navigational/transactional, though these ratios do not hold for a narrow, high-stakes vertical like home medical equipment, where the researched literature does not provide a vertical-specific breakdown — this is an acknowledged gap.
- **[Industry Best Practice]** Baymard Institute's B2B Medical & Pharma e-commerce research (baymard.com) is based on large-scale usability testing of sites like McKesson and Abcam and finds that trust signals — quality content, intuitive navigation, case studies, first-party reviews, expert endorsements — measurably affect conversion in medical-adjacent purchasing, and that improving trust/checkout design can lift conversion by double digits.
- **[Observation]** No India-specific published research on home medical equipment rental search journeys was found during this research pass. The synthesis below is a reasoned model built from the adjacent evidence above, not a directly-sourced India study — flagged as a gap for future primary research (e.g., interviews with EnconeMed's own callers).

## Official Sources (where available)

- Pew Research Center — "Profiles of Health Information Seekers" (2011) and "The social life of health information" (2014), pewresearch.org
- NCBI/PMC — "Consumer Use of 'Dr Google': A Survey on Health Information-Seeking Behaviors and Navigational Needs"; "The effect of Dr Google on doctor–patient encounters in primary care"
- Baymard Institute — "B2B Medical & Pharma Ecommerce UX Research," baymard.com/research/b2b-medical-pharma
- Nielsen Norman Group — general content-scanning and usability research corpus (nngroup.com); no single article was found specifically on medical-equipment purchase journeys, so NN/g is cited here for generic scanning-behavior findings, not a vertical-specific study.

## Industry Research

- **[Industry Best Practice]** SEO industry consensus (Yoast and multiple SEO practitioner sources) treats the funnel as informational → commercial investigation → transactional → navigational (repeat visits), used to structure content types: guides/how-to for informational, comparison/review pages for commercial investigation, product/booking pages for transactional, and branded search for navigational/returning intent.
- **[Industry Best Practice]** Baymard's trust-signal research generalizes across regulated/high-consideration verticals (medical, financial, B2B): buyers in these categories seek third-party credibility markers (accreditation, real reviews, clear company identity) before transacting, more than in low-stakes retail.
- **[Observation]** WhatsApp is not covered in the Western UX literature reviewed (Baymard, NN/g are US/EU-centric), but is a well-known dominant contact channel in Indian consumer services; this is an inference from general knowledge of the Indian market rather than a cited study, and should be validated with EnconeMed's own contact-channel analytics once available.

## Important Findings

1. **[Recommendation]** The journey is not linear-once; it is a loop that tightens under urgency. A full journey map for EnconeMed should have two parallel tracks: an **Emergency/Urgent track** (same-day or next-day need) and a **Planned track** (need known days-to-weeks in advance, e.g., pre-surgery, aging-in-place planning).
2. **Emergency track** (example seed: "my father's oxygen level is dropping" / "SpO2 88 what to do"):
   - *Trigger* (not a search, a life event) → *Informational search* ("why is oxygen level low," "oxygen concentrator vs cylinder emergency") → *Immediate commercial investigation* compressed to minutes ("oxygen concentrator rental near me," "oxygen concentrator price per day") → *Trust check* (is this a real, safe company — often just a glance at a phone number, reviews, "same day delivery" badge) → *Transactional* (call or WhatsApp immediately, not a form) → *Booking/fulfillment* (delivery + setup instructions) → *Support* (how to use, alarms, refill/replacement, return process).
   - **[Observation]** In this track, informational and commercial-investigation intent nearly merge into a single query and a single page view; the user does not tolerate a multi-page funnel. Design implication: emergency-relevant equipment pages must contain price/availability/contact information above the fold, not just education.
3. **Planned track** (example seed: "father needs oxygen support after COPD diagnosis," or "preparing home for mother after hip surgery"):
   - *Informational* (what is an oxygen concentrator, flow rate, continuous vs pulse dose, what is a hospital bed, what is a wheelchair type for X condition) → *Comparison* (rental vs buy — cost over time, brand differences, features) → *Trust-building* (About Us, certifications, Google reviews, testimonials, "how we deliver and support," legal entity name Encone Care Nurses Private Limited) → *Contact* (form or WhatsApp, often after 2–3 return visits across days) → *Negotiation/consultation* (phone call to clarify exact model, duration, price) → *Booking* → *Onboarding* (delivery, demo/instructions) → *Ongoing support* (consumables reorder, servicing, eventual return or renewal decision).
   - **[Recommendation]** This track tolerates — and benefits from — deeper educational content (buying guides, condition-specific equipment guides, rental-vs-buy calculators) because the user has time and is building confidence over multiple sessions.
4. **[Recommendation]** Both tracks converge on the same trust-and-contact layer; that layer (About/legitimacy, reviews, WhatsApp/call, response speed) is therefore the single highest-leverage investment across both personas.
5. **[Observation]** Intent shifts are asymmetric: a planned-track user can be pulled into the emergency track by a sudden health change (a common real-world event: scheduled equipment need becomes urgent when condition worsens), but an emergency-track user essentially never "relaxes" into planned-track behavior within the same episode. The site should let a user escalate urgency easily (a visible "need it today?" path) at any point.

## Design Implications

- **[Recommendation]** Every equipment category page should carry two simultaneous content layers: an urgent-decision layer (price, availability, "delivered today," phone/WhatsApp CTA) visible without scrolling, and an educational layer (what it is, who needs it, how to choose) below, serving the planned-track visitor without forcing the urgent visitor to scroll past it.
- **[Recommendation]** Comparison content (rental vs. buy, brand vs. brand, spec vs. spec) should exist as first-class pages, not buried in blog posts, since Baymard-style research shows comparison behavior is a distinct, trackable stage that this business must serve directly rather than ceding to third-party review sites.
- **[Recommendation]** Contact mechanisms must be tiered by urgency: an emergency visitor needs one-tap calling and WhatsApp; a planned visitor is comfortable with a form that asks clarifying questions (duration, city, budget) that also functions as a soft-qualification/lead-scoring tool.
- **[Observation]** Search boxes or navigation that assume users know the product taxonomy (e.g., "Respiratory > Concentrators > Continuous Flow") will strand symptom-language searchers; this is expanded further in the companion mental-models research (see 14-mental-models.md).

## Business Implications

- **[Recommendation]** Lead-response SLA should differ by detected urgency signal (e.g., a WhatsApp message with "urgent"/"today"/"emergency" language, or arrival via an emergency-coded landing page) — fast human response is a conversion lever documented indirectly through Baymard's trust/response-time findings and directly through the "two-thirds not reassured, seek further confirmation" caregiver research above; a slow reply loses the emergency-track visitor to a competitor entirely.
- **[Recommendation]** Planned-track visitors who don't convert immediately are a legitimate remarketing/nurture population (email/WhatsApp opt-in) since their journey is known to span multiple sessions/days — build a way to capture them without pressuring the emergency-track visitor with the same tactics.
- **[Observation]** Because half of health searchers are searching on someone else's behalf (Pew), the "buyer" and the "patient" are usually different people; commercial messaging, pricing, and consent/trust content should be written to the caregiver, not the patient.

## SEO Implications

(Covered in depth in a prior phase; noted here only where it intersects journey mapping.)
- **[Industry Best Practice]** Content should be organized so that informational, comparison, and transactional intents each have a dedicated page type (guide, comparison, product/service page) rather than one page trying to rank for and satisfy all three query types — a widely cited SEO practice for matching content type to intent.
- **[Observation]** Vertical-specific search volume/intent-ratio data for "home medical equipment India" was not found in this research pass; recommend a dedicated keyword-research exercise using tools like Google Keyword Planner or Ahrefs against the emergency/planned split identified here.

## AI Search Implications

- **[Observation]** AI answer engines (e.g., conversational search/AI Overviews) are increasingly likely to intercept broad informational queries ("what helps with low oxygen at home") before the user reaches any website, which raises the relative importance of being the definitive, quotable, well-structured source for those informational queries so that AI systems cite or surface the brand, and increases the importance of owning the commercial-investigation and transactional stages where AI answer engines are less likely to fully satisfy the user (they still need to act — call, book, compare local pricing).
- **[Recommendation]** Content answering "what is X equipment," "who needs X," and "rent vs buy X" should be written in clearly extractable, well-labeled Q&A-style prose, since this format is generally easier for both users and AI systems to parse and cite — this reinforces rather than conflicts with the SEO-phase schema recommendations already produced.

## Recommendations

1. Build two explicit journey-served experiences (urgent vs planned) sharing one trust/contact layer.
2. Put price + availability + one-tap contact above the fold on every equipment page.
3. Create standalone comparison pages (rental vs buy, brand vs brand) as first-class content.
4. Tier contact options by urgency (call/WhatsApp for urgent; qualifying form for planned).
5. Define differentiated response-time SLAs by detected urgency signal.
6. Write commercial content to the caregiver persona, not only the patient.
7. Validate the emergency/planned split and India-specific channel assumptions (WhatsApp dominance) against EnconeMed's own call/lead data once available.

## Things To Avoid

- **[Recommendation]** Do not force an urgent visitor through a multi-step educational funnel before revealing price or a contact method — the "Dr Google" research shows users seeking reassurance want to act, not read further, once they've reached a company's site.
- **[Recommendation]** Do not build a single generic "Contact Us" page as the only conversion path — Baymard's research indicates trust and conversion depend on contextual, low-friction contact points near the decision content itself.
- **[Recommendation]** Avoid assuming the SEO-standard 80/10/10 informational/navigational/transactional query ratio applies unmodified to this vertical; no vertical-specific data was found, and the emergency-track behavior likely skews the mix toward compressed, urgent, hybrid queries.

## Future Considerations

- Conduct primary research: review EnconeMed's own call logs and WhatsApp transcripts to empirically classify real incoming queries into emergency vs planned tracks and to measure actual response-time-to-conversion correlation.
- Consider a lightweight on-site "how soon do you need this?" branching question to explicitly route visitors into the correct experience rather than inferring urgency from behavior alone.
- Revisit this model as India-specific health-search behavioral research becomes available (most cited research here is US-based; cultural and channel differences, e.g., WhatsApp's dominance, are not directly evidenced in the literature reviewed).

## Checklist

- [ ] Urgent and planned journey tracks both mapped and reviewed by product/business stakeholders
- [ ] Above-the-fold price/availability/contact present on all equipment pages
- [ ] Standalone rental-vs-buy and brand comparison pages scoped
- [ ] Tiered contact mechanisms (call/WhatsApp vs form) specified per page type
- [ ] Response-time SLA policy defined per urgency signal
- [ ] Caregiver-vs-patient messaging distinction reviewed in copy guidelines
- [ ] Primary research plan drafted to validate assumptions against real EnconeMed lead data
