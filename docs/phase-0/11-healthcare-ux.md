# 11 — Healthcare UX Research (Emergency Users, Caregivers, Elderly Users, Trust, Forms)

Research-only document for Phase 0 of EnconeMed. No code, UI, or copy decisions are made here. This synthesizes documented UX/psychology research relevant to a lead-generation medical equipment rental/sales platform whose primary users are stressed family caregivers (often under time pressure or in emergencies), elderly end-users, and some healthcare professionals.

## Executive Summary

Documented research converges on a consistent picture: users under stress or urgency (a caregiver whose relative needs an oxygen concentrator today) experience narrowed attention, reduced working memory, and lower tolerance for friction — meaning interfaces must foreground the single most important action and minimize decisions **[Industry Best Practice]**. Elderly users (NN/g's 19-year longitudinal research program) have well-documented, specific difficulties with small interactive elements, ambiguous navigation, and jargon, though their core web literacy has improved over the last two decades **[Industry Best Practice]**. Website credibility is judged largely on visual/design cues within milliseconds (Stanford Web Credibility Project; Google/Lindgaard et al. research on 50ms first impressions), meaning above-the-fold trust signals carry outsized weight for a healthcare brand **[Industry Best Practice]**. Lead-generation form research (NN/g, applied conversion studies) shows field reduction, vertical single-column layouts, and persistent visible labels materially improve completion rates **[Industry Best Practice]**, and health-literacy guidance (HHS/ODPHP "Health Literacy Online") provides specific, government-vetted writing and design guidance for health content aimed at people with limited health literacy or limited web experience **[Official Requirement — for US federal health communications; treated as best-practice guidance, not law, for EnconeMed]**.

## Official References

- Stanford Persuasive Technology Lab, "Stanford Web Credibility Project" (ongoing since 1998; Stanford-Makovsky Web Credibility Study 2002) — https://credibility.stanford.edu/pdf/Stanford-MakovskyWebCredStudy2002-prelim.pdf and https://en.wikipedia.org/wiki/Stanford_Web_Credibility_Project
- Fogg, B.J. et al., "How Do Users Evaluate the Credibility of Web Sites? A Study with Over 2,500 Participants" — cited via dejanmarketing.com hosted PDF: https://dejanmarketing.com/media/pdf/credibility-online.pdf
- Lindgaard, G. et al., "Attention web designers: You have 50 milliseconds to make a good first impression!" *Behaviour & Information Technology*, 25(2), 115–126 — https://www.researchgate.net/publication/220208334
- Robins, D. & Holmes, J., "Aesthetics and credibility in web site design," *Information Processing & Management* — https://www.sciencedirect.com/science/article/abs/pii/S0306457307000568
- Nielsen Norman Group, "UX Design for Seniors, 3rd Edition" (report, based on three rounds of usability research spanning 19 years with users 65-89) — https://www.nngroup.com/reports/senior-citizens-on-the-web/
- Nielsen Norman Group, "Usability for Older Adults: Challenges and Changes" — https://www.nngroup.com/articles/usability-for-senior-citizens/
- Nielsen Norman Group, "Changes in How Older Adults Use Computers" (video/article, 3 major shifts vs. 20-year-old research) — https://www.nngroup.com/videos/changes-seniors-computers/
- Nielsen Norman Group, form design/eye-tracking research on field layout and conversion (vertical single-column layouts outperforming horizontal/mixed) — https://www.nngroup.com/ (specific report referenced via secondary summaries; recommend Product Architect verify original NN/g report title directly on nngroup.com before citing in external-facing docs)
- US Department of Health and Human Services, Office of Disease Prevention and Health Promotion (ODPHP), "Health Literacy Online: A Guide to Writing and Designing Easy-to-Use Health Web Sites" — https://odphp.health.gov/healthliteracyonline/2010/Web_Guide_Health_Lit_Online.pdf and https://odphp.health.gov/healthliteracyonline
- CDC, "Guidance & Tools | Health Literacy" — https://www.cdc.gov/health-literacy/php/develop-materials/guidance-standards.html
- Usability.gov, "Research-Based Web Design & Usability Guidelines" — https://guidelines.usability.gov./
- PMC (NCBI), "Health Information–Seeking Behaviors, Confidence, and Challenges Among Family Caregivers of Persons With Dementia" — https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10737102/
- JMIR Aging, "Health Information–Seeking Behaviors of Family Caregivers: Analysis of the Health Information National Trends Survey" — https://aging.jmir.org/2019/1/e11237/ and https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6714999/
- Smashing Magazine, "Designing For Stress And Emergency" (2025) — https://www.smashingmagazine.com/2025/11/designing-for-stress-emergency/ (design-practitioner publication, not peer-reviewed; treated as industry best-practice source, not academic research)

## Important Findings

1. **Credibility is judged fast and mostly on visual/design cues, not content depth** **[Industry Best Practice, Stanford Web Credibility Project]**: The Stanford study of 2,684 participants across 100 sites (including a health category) found that people did not use rigorous criteria to judge trustworthiness — the average person paid far more attention to superficial visual design than to the actual substance of the content. Two components drive the overall credibility judgment: trustworthiness (perceived honesty/goodness of intent) and expertise (perceived competence). Roughly 46% of respondents cited design/look as the top credibility factor.

2. **First impressions form in tens of milliseconds** **[Industry Best Practice, Lindgaard et al. 2006 / Google Research]**: Users form aesthetic judgments about a webpage in as little as 17-50 milliseconds, well before conscious reading occurs. This "halo effect" biases subsequent judgments of credibility and purchase/conversion intent. Practically, this means the hero/above-the-fold area of EnconeMed carries disproportionate weight in a caregiver's snap trust judgment, before they read any copy about certifications or service quality.

3. **After the snap judgment, users give a homepage roughly 3-5 seconds to substantiate the first impression** **[Industry Best Practice, secondary synthesis of credibility research]**: This window needs to clearly communicate what the site does, that it is a real/legitimate operation, and that it is easy to act on (call, browse, inquire) — relevant given EnconeMed's specific tagline positioning around "care."

4. **Elderly users (65+) have specific, well-documented interaction difficulties** **[Industry Best Practice, NN/g "UX Design for Seniors" 3rd ed.]**: Based on three rounds of usability studies over 19 years, NN/g documents that dropdowns, sliders, and other fine-motor-dependent UI elements are disproportionately hard for older users, especially on touch interfaces, due to age-related decline in motor precision, vision, and short-term memory. NN/g frames this as a business opportunity too: modest design changes (larger targets, simpler navigation, clearer visual hierarchy) can measurably increase usable reach into this population, not just a compliance concern.

5. **Older users' web behavior has shifted over the last two decades** **[Industry Best Practice, NN/g "Changes in How Older Adults Use Computers"]**: NN/g's newer research (compared to their original ~2002 study) documents three major shifts in how seniors use computers today versus 20 years ago — implying that some historical "design for grandma" assumptions (e.g., near-total unfamiliarity with the web) are outdated, and that current elderly users are more web-literate but still disproportionately affected by small targets, jargon, and complex flows.

6. **Caregivers actively and frequently seek health information online, often under time pressure and stress** **[Industry Best Practice / Observation, peer-reviewed: JMIR Aging / PMC studies]**: Analysis of the Health Information National Trends Survey (HINTS) found caregivers use computers/smartphones to find health information and schedule appointments for others at higher rates than non-caregivers. A qualitative study of dementia family caregivers found many must make decisions in haste with little preparation, and substantial uncertainty persists about whether decisions were "right," even after the fact — implying design should reduce decision anxiety (clear next steps, responsive human contact options, transparent pricing/availability) rather than just reduce clicks.

7. **Health-literacy-specific design guidance exists and is government-vetted (US)** **[Official Requirement — for HHS-authored public health communications; Recommendation for EnconeMed]**: HHS/ODPHP's "Health Literacy Online" guide (now in a newer edition emphasizing people-first design, cross-device accessibility, and content governance) is written specifically for designing health websites usable by people with limited literacy and limited web experience — directly transferable to a caregiver/elderly-facing platform even though EnconeMed is India-based and not bound by US federal content standards.

8. **Stress produces "cognitive tunneling" that degrades interface comprehension** **[Industry Best Practice, UX-practitioner literature, e.g. Smashing Magazine 2025 and related crisis-UX writing]**: Under stress, peripheral vision narrows, reading comprehension drops, fine motor control deteriorates, and patience for extraneous information wanes. Design implication documented across multiple sources: in urgent scenarios, the single primary action (e.g., "Call now for same-day delivery") should visually dominate, with secondary information present but clearly subordinate, and multi-step tasks should be broken into single, sequential asks rather than presented all at once.

9. **Form length and layout materially affect completion rate** **[Industry Best Practice, NN/g eye-tracking / conversion research, cross-referenced with independent conversion studies]**: Removing non-essential fields improves completion rates in nearly all cases; single-column, one-field-per-row vertical layouts outperform horizontal or mixed layouts (one cited study found ~15% higher conversion for vertical layout in a B2B context); persistent visible labels (not placeholder-only) outperform placeholder-as-label patterns in usability testing. For a lead-gen medical equipment inquiry form, this suggests capturing only what's needed to make first contact (e.g., name, phone, equipment need, urgency/location) and deferring deeper qualification (insurance, medical history, duration of need) to a follow-up human conversation.

10. **Sensitive-data handling expectations are heightened in healthcare contexts** **[Observation, cross-referenced from health-literacy and general trust research]**: Because the inquiry involves a family member's medical condition, users are likely more sensitive about what data is requested and why, even for a simple lead form. No single peer-reviewed source in this research directly quantifies this for medical-equipment lead forms specifically — flagged as a research gap below — but it logically follows from general trust/credibility research plus the explicitly medical nature of the transaction.

## Implementation Notes

- **[Recommendation]** Because credibility judgments happen before content is read, the site's above-the-fold area should carry concrete, checkable trust signals (e.g., years in operation, service area, real contact channel, certifications/registrations if any) rather than only persuasive copy — this is a direct implication of the Stanford/Lindgaard findings, not a general design opinion.
- **[Recommendation]** Consider a distinct "urgent need" path (e.g., a prominent "Need it today? Call now" affordance) separate from the general browse/inquire flow, informed by the emergency-UX literature's finding that urgent users need the primary action to dominate rather than compete with general navigation.
- **[Recommendation]** Lead capture forms should minimize required fields for first contact and progressively collect more detail later (matches both the accessibility form-friction findings in 09-accessibility.md and the NN/g conversion research above).
- **[Observation]** No source reviewed here is specific to India's caregiver demographics, regional language needs, or trust signals particular to the Indian healthcare-adjacent market (e.g., trust in Ayushman Bharat-style government affiliation, WhatsApp as a primary contact channel rather than email/forms). This is a research gap the Product Architect should flag for either local user research or India-specific UX literature in a later phase.

## Common Mistakes

- **[Industry Best Practice]** Overloading the homepage with many competing calls-to-action, which contradicts both the stress/cognitive-tunneling research (single dominant action) and general conversion best practice.
- **[Industry Best Practice]** Using small UI controls (sliders, tiny dropdown carets, closely packed icon buttons) without considering elderly users' documented difficulty with fine motor precision.
- **[Industry Best Practice]** Requiring long, multi-field forms up front before any human contact is established — documented to reduce completion rates, and particularly costly for a caregiver acting under time pressure who may abandon and call a competitor instead.
- **[Observation]** Assuming visual polish alone builds trust without substantiating claims (certifications, real address/phone, reviews) within the 3-5 second post-first-impression window — polish creates the initial halo but unsubstantiated claims can undermine it once scrutinized.

## Recommended Practices

- **[Recommendation]** Surface a persistent, easy-to-find human contact channel (phone/WhatsApp) across all pages — this simultaneously satisfies the WCAG 2.2 "Consistent Help" criterion (see 09-accessibility.md) and directly answers the emergency-user and caregiver-decision-anxiety research above.
- **[Recommendation]** Use plain, jargon-free language for medical equipment descriptions, following the spirit of HHS "Health Literacy Online" guidance, even though EnconeMed is not bound by US federal health-literacy rules.
- **[Recommendation]** Provide clear, immediate next steps after any form submission (what happens next, how soon someone will call) to reduce the documented caregiver anxiety around uncertain outcomes.
- **[Recommendation]** Design for larger tap targets and simpler navigation patterns site-wide (not just on a "senior mode"), consistent with NN/g's finding that even moderate design accommodations meaningfully expand usable reach for older users without degrading the experience for others.

## Things to Avoid

- **[Industry Best Practice]** Avoid auto-advancing carousels, autoplay video/audio, or other unpredictable motion on trust-building pages — this intersects both the accessibility motion guidance and the general finding that stressed/elderly users have low tolerance for unpredictable interface behavior.
- **[Industry Best Practice]** Avoid burying the contact/call mechanism below the fold or inside secondary navigation — directly contradicted by both the "Consistent Help" accessibility criterion and the emergency-user research.
- **[Observation]** Avoid collecting sensitive medical details (specific diagnoses, insurance numbers) in the initial lead-capture form; defer to a follow-up conversation, both to reduce friction (documented) and because sensitive-data expectations in healthcare contexts are heightened (reasoned inference, not directly evidenced in sources reviewed).

## Future Considerations

- **[Observation]** Research gap: no India-specific or South-Asian caregiver UX study was found in this session; Product Architect should consider commissioning or searching for India-specific health-literacy/caregiver research (e.g., from Indian public health bodies, or studies on WhatsApp-first communication patterns) before finalizing contact/conversion flows.
- **[Observation]** Research gap: no source directly addressed medical-equipment-rental-specific UX (as distinct from general healthcare informational sites or hospital patient portals) — the equipment-rental/lead-gen angle is inferred by combining emergency-UX, caregiver, and form-design research rather than drawn from a single source that studied this exact vertical.
- **[Recommendation]** As the product matures, consider commissioning direct usability testing with actual caregivers and elderly users (per NN/g's own methodology) rather than relying solely on secondary literature, since NN/g's own findings emphasize that real usability testing with the target population reveals issues generic research cannot predict.

## Checklist

- [ ] Above-the-fold area includes concrete, verifiable trust signals (not just persuasive copy)
- [ ] A single dominant primary action is visually prioritized on high-urgency entry pages
- [ ] Persistent contact channel (phone/WhatsApp) visible in a consistent position on every page
- [ ] Lead-capture form limited to minimum-necessary fields for first contact; deeper qualification deferred to human follow-up
- [ ] Form uses single-column layout with persistent (non-placeholder-only) labels
- [ ] Copy reviewed against plain-language / health-literacy principles (short sentences, no unexplained medical jargon)
- [ ] Interactive elements sized and spaced for reduced motor precision (ties to WCAG 2.5.8 in 09-accessibility.md)
- [ ] No autoplay/auto-advancing motion on key trust-building pages
- [ ] Post-submission confirmation clearly states what happens next and expected response time
- [ ] Flag for later research: India/South-Asia-specific caregiver and elderly-user studies; medical-equipment-rental-specific UX studies
