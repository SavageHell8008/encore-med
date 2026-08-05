# Mental Models Research: Caregiver Cognition vs. Clinical/Industry Categorization

## Executive Summary

Don Norman's distinction between a designer's "conceptual model," the "system image" a product presents, and the "mental model" a user actually carries in their head is directly applicable to EnconeMed. The medical equipment industry (manufacturers, distributors, hospitals) organizes its world by clinical/product taxonomy — "respiratory devices," "mobility aids," "patient handling equipment." Caregivers, who are the dominant searchers and often the actual site visitors (per Pew Research, 88% of caregivers with internet access search for health information, frequently on someone else's behalf), think in terms of symptoms, situations, and fear ("she can't breathe properly," "he can't get out of bed anymore," "we're bringing him home after the operation, what do we need"). This is a textbook gap between the designer's model and the user's model, and it is the single largest risk to EnconeMe­d's information architecture: a taxonomy that is internally correct (clinically) can be externally invisible (cognitively) to the exact people who need to find it under stress.

## Research Scope

This research draws on Don Norman's mental-model / conceptual-model framework from "The Design of Everyday Things," Rosenfeld & Morville's "Information Architecture" concept of user vocabulary vs. system vocabulary (and card sorting as a method for discovering it), and documented patterns of consumer health-information-seeking behavior (Pew Research, peer-reviewed "Dr Google" survey literature). It applies these concepts specifically to home medical equipment rental/sales navigation and labeling for the EnconeMed persona set: family caregivers (often adult children), elderly end-users themselves, and a smaller segment of healthcare professionals. It does not cover SEO keyword mechanics (prior phase) or actual wireframes/navigation design (out of scope for this research-only phase).

## Evidence

- **[Peer-Reviewed/Research-Backed]** Don Norman's framework (as documented across multiple summaries of "The Design of Everyday Things," including NN/g's own foreword-level engagement with related IA literature) distinguishes: the **Design Model** (what the designer intends), the **System Image** (what the actual product/interface communicates), and the **User's Mental Model** (what the user believes based on interacting with the system image). Confusion and errors occur specifically when the system image fails to adequately communicate the design model, forcing users to guess — and users' guesses are built from prior experience, not from the designer's logic.
- **[Peer-Reviewed/Research-Backed]** Norman's "Gulf of Execution" (the gap between what a user wants to do and what the system lets them specify) and "Gulf of Evaluation" (the gap between what the system did and whether the user can tell) map onto site navigation: a caregiver who wants "something to help my mother breathe easier" faces a Gulf of Execution if the only entry points are clinical product names, because they cannot translate their intention into the system's required input (a category label they don't know).
- **[Peer-Reviewed/Research-Backed]** Rosenfeld & Morville explicitly advise designers to build IA around the user's own vocabulary rather than the host organization's internal vocabulary, and identify card sorting as the standard method to empirically surface that vocabulary rather than assume it.
- **[Peer-Reviewed/Research-Backed]** Pew Research Center data shows caregivers are much more likely than average internet users to research health topics online, and are frequently searching on behalf of someone else — meaning the searcher's own knowledge of clinical terms is typically secondhand, filtered through what a discharge nurse or doctor said, not native clinical fluency.
- **[Peer-Reviewed/Research-Backed]** The peer-reviewed "Dr Google" consumer survey found a majority of health searchers are not fully reassured by what they find online and continue seeking confirmation — consistent with users operating on an incomplete or shifting mental model of their situation, actively trying to firm it up through search.

## Official Sources (where available)

- Don Norman, "The Design of Everyday Things" — concepts of conceptual models, system image, gulfs of execution/evaluation (widely summarized; no single official web URL, book citation only).
- Louis Rosenfeld & Peter Morville, "Information Architecture for the World Wide Web" / later "Information Architecture: For the Web and Beyond" — user vocabulary vs. system vocabulary, card sorting (book citation; overview available via nngroup.com/articles/foreword-ia-2nd/).
- Pew Research Center, "Profiles of Health Information Seekers" (pewresearch.org/internet/2011/02/01/profiles-of-health-information-seekers/).
- NCBI/PMC, "Consumer Use of 'Dr Google': A Survey on Health Information-Seeking Behaviors and Navigational Needs."

## Industry Research

- **[Industry Best Practice]** Health-literacy plain-language guidance (odphp.health.gov "Health Literacy Online," cited widely in UX/content-design circles) recommends: put the essential information first, minimize jargon, keep sentences under ~20 words and paragraphs to about 3 lines, and choose words the audience already uses rather than teaching them new vocabulary before they can act.
- **[Industry Best Practice]** NN/g's general content-usability research finds that the large majority of users scan rather than read web pages in full, meaning label wording carries disproportionate weight — a mislabeled category is not "read past," it is invisible.
- **[Industry Best Practice]** Card sorting (open and closed) is the standard IA research method for surfacing real user groupings and labels; a "closed" sort against the industry's existing clinical taxonomy would only confirm the existing model, so an "open" sort (letting caregivers group and name equipment themselves) is the method actually capable of exposing the gap described in this document.

## Important Findings

1. **[Recommendation]** Caregivers' native mental model is **situational/symptom-based**, not product-taxonomic. Likely real-world framing includes: "she can't breathe properly," "he can't walk anymore," "we need to move him without hurting our backs," "he's bedridden and getting sores," "she just had surgery and needs help at home," "his oxygen is low," "we need someone reliable, not just equipment."
2. **[Recommendation]** The clinical/industry model — the one manufacturers, hospitals, and most competitor websites already use — is **category/spec-based**: "oxygen concentrator 5L continuous flow," "semi-electric hospital bed," "manual wheelchair vs. powered wheelchair," "patient lift/hoyer lift," "suction unit." This is the model site search and navigation typically default to, precisely because it is easy for the organization to maintain (it matches supplier catalogs and internal SKU logic), not because it matches how users think.
3. **[Observation]** A caregiver's mental model is often incomplete or evolving mid-journey: they may not yet know the word "concentrator" exists, may confuse a concentrator with an oxygen cylinder, or may not know flow-rate matters at all — their model is being actively constructed by whatever the site (or a doctor, or a forum) tells them, which places real responsibility on the site's content to shape that model correctly and simply, not just to serve it.
4. **[Recommendation]** Two failure modes are both real risks: (a) pure clinical taxonomy navigation, which strands the symptom-thinking caregiver entirely (Gulf of Execution — they cannot even begin), and (b) pure symptom-based navigation with no clinical anchoring, which fails the smaller but real healthcare-professional segment who *do* think in clinical terms and want fast, precise, spec-driven access.
5. **[Recommendation]** The resolution suggested by IA literature (Rosenfeld & Morville) is not "pick one," but **dual/parallel labeling**: a symptom-or-situation-oriented entry layer ("What are you dealing with?" → breathing difficulty, mobility loss, post-surgery recovery, bedridden care, elderly daily living) that routes into the same underlying clinical product catalog, with clinical names retained as secondary labels/synonyms for search, SEO, and professional users — this is consistent with Norman's principle that a good conceptual model can be presented at the interface even when the underlying system representation differs.
6. **[Observation]** Trust and mental-model alignment are intertwined: when a caregiver's uncertain situational framing ("help my mother breathe") is met with matching, plain language on the site, it signals the company understands people in their situation, not just products — this is itself a trust signal, distinct from but reinforcing the trust-signal research in the companion search-intent-journey document.

## Design Implications

- **[Recommendation]** Primary navigation and landing-page entry points should be organized around situations/conditions/symptoms first ("Breathing Support," "Mobility & Fall Prevention," "Post-Surgery Recovery," "Bedridden & Home Nursing Care," "Daily Living for the Elderly"), with clinical product names appearing as sub-labels or synonyms once the user drills in, not as the top-level navigation itself.
- **[Recommendation]** Every clinical term that must appear (for accuracy, professional users, or SEO) should be immediately paired with a plain-language gloss in the same breath (e.g., "Oxygen Concentrator — a machine that pulls oxygen from room air for people with breathing difficulty, low SpO2, or COPD"), rather than assuming the term is self-explanatory.
- **[Recommendation]** Search functionality (if present) must tolerate symptom/situation-language queries and map them internally to product results — an open card-sort or query-log analysis (once the site has traffic) should validate the actual phrases caregivers use, rather than relying on assumption.
- **[Observation]** Because the mental model is often under active construction during the visit (per the "Dr Google" reassurance-seeking pattern), pages should be structured to build the model progressively: situation → plain explanation → relevant equipment → how to choose between options → next step — mirroring how a knowledgeable, patient human would explain it, not how a catalog lists it.

## Business Implications

- **[Recommendation]** Content investment (guides, category pages) should be prioritized by situation/condition first, product-spec second — this also naturally produces content matched to the informational stage of the search-intent journey (see 04-search-intent-journey.md), doubling the value of the same content investment.
- **[Recommendation]** Sales/support call scripts and WhatsApp response templates should mirror the same situational language the website uses, so the caregiver experiences one consistent mental model across channels rather than being asked to "translate" between casual web copy and clinical phone/staff language.
- **[Observation]** Mislabeling risk is a conversion risk: a caregiver who cannot find the right product because the label used clinical rather than plain language does not necessarily complain — they simply leave and try a competitor or a generic marketplace, an invisible drop-off that generic analytics may not clearly explain without qualitative research (e.g., session recordings, on-site search log analysis).

## SEO Implications

(Full SEO treatment is in a prior phase; noted here only where it intersects mental models.)
- **[Industry Best Practice]** Aligning on-page headings and body copy with actual user vocabulary (situational phrases) rather than only clinical terminology tends to also align with how non-expert users phrase search queries, reinforcing rather than conflicting with prior SEO-phase keyword guidance.
- **[Observation]** Clinical terms should not be removed for SEO purposes — they remain necessary for precision, professional users, and matching more specific/lower-funnel searches; the recommendation is additive (plain language first, clinical term retained alongside), not a replacement.

## AI Search Implications

- **[Recommendation]** AI answer engines synthesizing an answer to a situational query ("what can help someone who can't breathe well at home") are more likely to surface content that itself uses plain, situational phrasing matched to the query, rather than content written purely in clinical taxonomy — this is a reasoned inference from how retrieval-and-synthesis systems generally match query language to source language, not a directly cited study on AI search specifically.
- **[Observation]** No research specific to AI search behavior for medical-equipment mental models was found in this pass; this is flagged as a research gap.

## Recommendations

1. Structure primary navigation around symptoms/situations/conditions, with clinical taxonomy as a secondary layer.
2. Pair every clinical term with an immediate plain-language explanation on first use per page.
3. Conduct an open card sort with representative caregivers (not clinicians) before finalizing IA/navigation labels.
4. Analyze on-site search query logs (once available) to continually tune symptom-to-product mapping.
5. Align call-center/WhatsApp language with on-site situational language for a consistent cross-channel model.
6. Preserve a clinical/spec-first path (e.g., an "advanced/professional" filter or search shortcut) for the healthcare-professional segment.
7. Treat mislabeling as a silent-dropout risk requiring qualitative research (session recordings, user interviews), not just funnel analytics.

## Things To Avoid

- **[Recommendation]** Do not make clinical/manufacturer taxonomy the only or top-level navigation — it directly serves the organization's internal model, not the dominant caregiver user's model, per Norman's gulf-of-execution framing.
- **[Recommendation]** Do not assume a single card sort or one team's intuition defines "the" user vocabulary — Rosenfeld & Morville's method is empirical and iterative; treat initial labeling decisions as hypotheses to validate, not final answers.
- **[Recommendation]** Do not strip clinical terminology entirely in an overcorrection — professional users and precise SEO/AI-search matching still require it; the goal is layering, not replacement.

## Future Considerations

- Commission a proper open card sort and/or tree-test with caregiver participants (ideally including some in the EnconeMed target cities) once resourcing allows — this is qualitative primary research this document cannot substitute for.
- Revisit navigation labels periodically against real on-site search query logs and support call transcripts as EnconeMed accumulates its own data — the caregiver vocabulary described here is a reasoned hypothesis from general research, not an India-specific empirical study.
- Consider whether elderly end-users (a distinct persona from adult-child caregivers) have a meaningfully different mental model (e.g., framed around independence/dignity rather than a loved one's condition) — this document treats caregivers as primary and does not fully separate the elderly-self-user mental model, which is a gap for future research.

## Checklist

- [ ] Primary navigation drafted around situations/conditions, not just clinical categories
- [ ] Plain-language glosses paired with clinical terms across category/product pages
- [ ] Card-sort or tree-test research planned with real caregiver participants
- [ ] Call center / WhatsApp scripts reviewed for language consistency with site
- [ ] Professional/clinical-language path preserved for healthcare-professional segment
- [ ] On-site search log analysis plan defined for post-launch vocabulary tuning
- [ ] Elderly end-user mental model flagged as a distinct future research question
