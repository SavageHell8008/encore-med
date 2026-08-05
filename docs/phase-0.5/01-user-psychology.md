# User Psychology for EnconeMed

## Executive Summary

EnconeMed's core audience — caregivers of elderly/ill family members, elderly users themselves, and a smaller segment of healthcare professionals — rarely arrives in a calm, exploratory frame of mind. They arrive stressed, time-pressured, sometimes grieving, sometimes in genuine medical emergency (a parent just discharged and needs an oxygen concentrator "today"). Human cognition under stress and under advancing age both narrow: attention tunnels, working memory shrinks, risk-aversion rises, and appetite for comparing many options collapses. Meanwhile trust is formed in seconds through visual/heuristic cues long before any deliberate evaluation of credentials happens. This document synthesizes peer-reviewed and industry research on (1) elderly browsing behavior, (2) stress/anxiety effects on cognition and choice, (3) choice overload in product catalogs, and (4) fast vs. slow trust formation — and translates each into concrete implications for EnconeMed's design, business model, and content strategy.

## Research Scope

This file covers cognitive and emotional psychology of the *individual user* at the moment of interacting with a screen: age-related perceptual/motor decline, acute-stress cognitive narrowing, decision fatigue from excess choice, and the two-speed (fast heuristic vs. slow deliberate) nature of trust formation. It does not cover the multi-stage caregiver journey (see `02-caregiver-journey.md`) or group/family decision dynamics and pricing framing (see `03-medical-decision-making.md`), though all three documents overlap and should be read together.

## Evidence

**Elderly users are measurably slower and more error-prone online.** Nielsen Norman Group's multi-decade research program (three rounds of usability studies spanning 19 years, participants aged 65–89) found that users aged 65+ are 43% slower at completing web tasks than users aged 21–55 **[Peer-Reviewed/Research-Backed]**. The same research line found web-use proficiency declines roughly 0.8% per year between ages 25 and 60, then drops off in a "hockey-stick" curve after 60, and especially after 70, as cognitive, perceptual, and motor-skill decline accelerate **[Peer-Reviewed/Research-Backed]** (Nielsen Norman Group, "Usability for Older Adults: Challenges and Changes"; "UX Design for Seniors, 3rd Edition").

**Stress physically degrades the brain systems needed to compare options.** Acute stress elevates cortisol and other stress hormones that interfere with prefrontal cortex function — the region responsible for weighing options, planning, and holding multiple items in working memory simultaneously **[Peer-Reviewed/Research-Backed]**. Under stress, attentional focus narrows around whatever is perceived as the primary threat or goal (a phenomenon commonly termed "cognitive tunneling"), and the number of environmental cues a person can register drops **[Peer-Reviewed/Research-Backed]** (Dirkin, "Cognitive Tunneling: Use of Visual Information under Stress," *Perceptual and Motor Skills*, 1983; subsequent stress-cognition literature). Stress does not invent new cognitive biases — it amplifies the biases a person already has, because the deliberate, bias-correcting System 2 process is exactly what gets suppressed **[Peer-Reviewed/Research-Backed]**.

**Choice overload is real and measurable, not just a metaphor.** Iyengar and Lepper's landmark "jam study" (Columbia/Stanford, published 2000 in *Journal of Personality and Social Psychology*) found that shoppers presented with 24 jam varieties were far more likely to stop and sample than those shown 6, yet only 3% of the 24-jam group purchased versus 40% of the 6-jam group **[Peer-Reviewed/Research-Backed]**. Participants also reported *greater* satisfaction with choices made from the smaller set. This "paradox of choice" finding has been replicated with mixed results in later meta-analyses (choice overload is moderated by decision difficulty, expertise, and time pressure — all factors that push toward overload for EnconeMed's stressed, non-expert users) **[Peer-Reviewed/Research-Backed]**.

**E-commerce catalogs fail non-expert users at scale even on well-funded sites.** Baymard Institute's large-scale usability study (25 rounds of testing, 4,400+ participant sessions, 334 benchmarked sites) found more than 700 distinct usability issues in how real users scan, filter, and evaluate product listing pages, and that 75% of tested sites get basic product-type categorization wrong in ways that measurably hurt navigation success **[Industry Best Practice]** (Baymard Institute, "E-Commerce Product List Usability: Report & Benchmark").

**Trust is formed in two speeds, and the fast speed comes first.** Kahneman's dual-process framework (System 1: fast, automatic, heuristic; System 2: slow, deliberate, effortful) is well established in cognitive psychology and widely applied to consumer behavior; time pressure, distraction, cognitive load, and emotional arousal all push people toward System 1 processing **[Peer-Reviewed/Research-Backed]**. NN/g's applied research on web trust signals ("Trust or Bust: Communicating Trustworthiness in Web Design," 59 design guidelines) documents that visual polish, professional design, and specific credibility markers (real people, certifications, clear contact information) are evaluated almost instantly and gate whether a user ever engages System 2 deliberate evaluation (reading About pages, checking certifications, comparing prices) at all **[Industry Best Practice]**.

**Loss aversion changes how risk is perceived in health-adjacent decisions.** Prospect theory (Kahneman & Tversky, 1979; Kahneman awarded the Nobel Prize in Economics in 2002 partly for this work) establishes that losses are weighted roughly twice as heavily as equivalent gains, and that people are risk-averse for gains but risk-seeking to avoid a certain loss **[Peer-Reviewed/Research-Backed]**. Applied to medical equipment: the "loss" being avoided is usually a health/safety loss (a fall, a breathing crisis, a bedsore) rather than a financial one, which is why users will pay a premium for perceived reliability even under financial strain **[Peer-Reviewed/Research-Backed]**, and why the same logic extends into `03-medical-decision-making.md`.

**Numeracy and health literacy shape how risk information lands.** Numeracy is one of the strongest predictors of the quality of medical decision-making; people with lower numeracy tend to overestimate risk, are less able to use risk-reduction information to recalibrate, and are more easily swayed by how numbers are framed (e.g., "95% safe" vs. "5% failure rate") **[Peer-Reviewed/Research-Backed]** (Cambridge, "Numeracy and Risk Literacy: What Have We Learned So Far?"; multiple PubMed-indexed studies on framing and graphical risk communication).

## Official Sources (where available)

- Nielsen Norman Group, "Usability for Older Adults: Challenges and Changes" — https://www.nngroup.com/articles/usability-for-senior-citizens/
- Nielsen Norman Group, "UX Design for Seniors, 3rd Edition" (report) — https://www.nngroup.com/reports/senior-citizens-on-the-web/
- Nielsen Norman Group, "Middle-Aged Users' Declining Web Performance" — https://www.nngroup.com/articles/middle-aged-web-users/
- Nielsen Norman Group, "Trust or Bust: Communicating Trustworthiness in Web Design" — https://www.nngroup.com/articles/communicating-trustworthiness/
- Iyengar, S. S., & Lepper, M. R. (2000). "When Choice Is Demotivating: Can One Desire Too Much of a Good Thing?" *Journal of Personality and Social Psychology* — indexed at https://pubmed.ncbi.nlm.nih.gov/11138768/
- Baymard Institute, "E-Commerce Product List Usability: Report & Benchmark" — https://baymard.com/research/ecommerce-product-lists
- Dirkin, G. R. (1983). "Cognitive Tunneling: Use of Visual Information under Stress." *Perceptual and Motor Skills* — https://journals.sagepub.com/doi/abs/10.2466/pms.1983.56.1.191
- Kahneman, D., & Tversky, A. (1979). Prospect Theory (foundational paper) — summarized at NN/g: https://www.nngroup.com/articles/prospect-theory/

## Industry Research

- CXL, "Dual Process Theory: Analyzing Our Thought Process for Decision-Making" **[Industry Best Practice]**
- Baymard Institute LinkedIn summary on catalog overcategorization and abandonment **[Industry Best Practice]**
- UXmatters, "Designing Calm: UX Principles for Reducing Users' Anxiety" (2025) **[Industry Best Practice]**
- UX Content Collective, "A Guide to Trauma-Informed Content Design" **[Industry Best Practice]**

## Important Findings

1. **[Peer-Reviewed/Research-Backed]** Elderly users are not just "less tech-savvy" — they are physiologically 43% slower and make more targeting/motor errors; this is a design constraint, not a training gap.
2. **[Peer-Reviewed/Research-Backed]** Stress and grief produce the same cognitive narrowing (tunnel vision, reduced working memory) regardless of the user's baseline intelligence or tech literacy — a highly educated son researching a ventilator for his mother at 11pm is cognitively closer to an anxious novice than to his calm daytime self.
3. **[Peer-Reviewed/Research-Backed]** More product choice does not equal more conversions or more satisfaction — it can produce the opposite (3% vs 40% purchase rate in the jam study) — directly relevant to how many SKUs/variants EnconeMed surfaces per category page.
4. **[Industry Best Practice]** Even sophisticated, well-funded e-commerce catalogs get basic categorization wrong 75% of the time; a smaller, more curated catalog is not a limitation to apologize for — it is a usability advantage if done deliberately.
5. **[Peer-Reviewed/Research-Backed]** Trust is gated by fast, pre-rational System 1 judgments before a user ever reads a certification or price — visual and structural credibility cues must be right in the first 1-3 seconds, or System 2 evaluation (which is where EnconeMed's actual quality story lives) never gets a chance to run.
6. **[Peer-Reviewed/Research-Backed]** Loss aversion means users will pay more for perceived reliability in a health/safety context even when price-sensitive, because the "loss" they fear is not financial — this reframes "premium positioning" from a risk to an alignment with how the brain actually weighs medical-equipment risk.

## Design Implications

- **[Recommendation]** Default to large touch targets (44px+), high-contrast text, and generous line spacing across the whole site, not just an "accessibility mode" — this serves both elderly primary users and stressed users with narrowed attention, not a separate edge case.
- **[Recommendation]** Cap the number of visible options on any single screen for a first-time or urgent visitor (e.g., 3-5 "commonly needed" equipment categories on the homepage rather than a full 20+ item mega-menu) and let deeper catalog browsing be an opt-in second step for calmer, research-mode visitors.
- **[Recommendation]** Put trust signals (real photos of staff/vehicles, certifications, "X years serving [city]", visible phone number) above the fold and in the first visual pass of every key page — this is a System 1 gate, not decorative content.
- **[Recommendation]** Use progressive disclosure for technical specs (flow rate, battery backup hours, weight capacity) — show a plain-language summary first, let users drill into numbers only if they choose to, since numeracy varies widely and framing effects are strong.
- **[Recommendation]** Avoid dense side-by-side comparison tables with many attributes for urgent/emergency equipment categories (oxygen concentrators, hospital beds); a curated "recommended for you" style single default reduces choice overload for panicked users, with an escape hatch to "see all options" for calmer researchers.
- **[Recommendation]** Reserve high information density and full comparison tools for categories that are typically browsed calmly and in advance (e.g., wheelchairs for planned mobility needs) versus categories typically bought in crisis (oxygen, hospital beds).

## Business Implications

- **[Recommendation]** A curated catalog (fewer, well-chosen SKUs with clear guidance) likely outperforms an exhaustive catalog for conversion, consistent with jam-study-style choice-overload findings — resist the instinct to list every available product variant as a growth strategy.
- **[Observation]** Because trust is formed fast and pre-rationally, brand/visual investment (real photography, consistent design system, professional presentation) has outsized business value relative to its cost, compared to a marketplace-style commodity presentation.
- **[Recommendation]** Premium/quality positioning is defensible even to price-sensitive Indian households specifically *because* the underlying decision is loss-averse and health-framed, not because Indian consumers are indifferent to price — the pitch must connect price to loss-avoidance ("no risk of malfunction at 2am") rather than to features alone.

## SEO Implications

- **[Recommendation]** Plain-language, symptom/need-based page titles and headings (e.g., "Oxygen Concentrator for Home Use") outperform spec-first or brand-first phrasing for both search intent matching and the low-numeracy, stressed reader who lands on the page from a search result.
- **[Observation]** Reduced choice-overload design (fewer, clearer category pages) also tends to consolidate topical authority per page rather than fragmenting it across many thin variant pages — a secondary SEO benefit of the same UX decision.

## AI Search Implications

- **[Recommendation]** AI answer engines (e.g., conversational search, shopping assistants) are likely to summarize product pages into short recommendations; pages should state the "who this is for" and "why trust this" signals in clear, extractable prose near the top, since an AI summarizer will otherwise flatten a page's fast-trust visual cues into nothing.
- **[Observation]** Because stressed users increasingly delegate the "narrow down options" step to AI chat interfaces before ever visiting a website, EnconeMed's content should be structured to answer the underlying decision questions (rent vs buy, which device for which condition) explicitly enough to be quoted accurately by such tools, rather than assuming a human will always read the full page.

## Recommendations

- **[Recommendation]** Conduct a lightweight card-sort or tree-test with 5-8 representative users (including at least 2 aged 60+ and 2 who self-report being "very busy/stressed caregivers") before finalizing the information architecture in the next phase.
- **[Recommendation]** Build a "calm mode" content pattern for emergency categories: single strong default recommendation, phone/WhatsApp CTA above the fold, minimal required reading before a human contact path is available.
- **[Recommendation]** Establish a small, explicit set of trust signals (certifications, years in business, service area, real staff photo, response-time promise) to be used consistently sitewide, validated against NN/g's trust-signal guidance rather than invented ad hoc.

## Things To Avoid

- **[Recommendation]** Do not present large filterable grids of 15+ equipment options as the primary path for first-time or emergency visitors — this reproduces exactly the demotivating-choice condition from the jam study.
- **[Recommendation]** Do not rely on dense clinical/spec-only language as the first layer of content; it will be misread or skipped by low-numeracy, high-stress readers and erodes rather than builds trust.
- **[Recommendation]** Do not hide the phone number or delay showing a human-contact path behind multiple clicks — for a meaningful share of visits, digital self-service is not the goal, fast human reassurance is.
- **[Observation]** Avoid small touch targets, low-contrast gray-on-white text, and auto-advancing carousels — well-documented failure patterns for elderly users specifically, per NN/g's senior-usability research.

## Future Considerations

- **[Recommendation]** As EnconeMed scales, consider periodic moderated usability testing segmented by age band and self-reported stress/urgency level, since standard usability testing recruiting tends to under-sample both the 65+ cohort and acutely stressed users.
- **[Observation]** Voice interfaces and larger-text/read-aloud modes may become more relevant as a growing share of traffic comes from elderly users browsing independently rather than through a caregiver intermediary — worth monitoring analytics for this shift.
- **[Recommendation]** If EnconeMed later introduces personalization or AI-assisted product recommendation, design it to reduce visible choice count for the user rather than to surface more options — the mechanism should serve the choice-overload finding, not work against it.

## Checklist

- [ ] Homepage and category pages tested for touch-target size and contrast against WCAG AA at minimum
- [ ] Emergency-relevant categories (oxygen, hospital beds) have a single clear default recommendation path, not just a full grid
- [ ] Trust signals (certifications, real photos, contact info) appear above the fold on every key landing page
- [ ] No page requires more than ~3 clicks to reach a phone/WhatsApp contact option
- [ ] Product comparison tools are reserved for planned-purchase categories, not crisis categories
- [ ] Content reviewed for plain-language framing of risk/spec information, with progressive disclosure for technical detail
- [ ] At least one round of usability testing includes participants aged 60+ and self-identified high-stress caregivers
