# Entity-Relationship Research: The Conceptual Domain Graph for Home Medical Equipment

## Executive Summary

Beneath any navigation or content decision for EnconeMed sits an implicit graph of concepts: conditions, symptoms, equipment, accessories, consumables, care contexts, and people. This document maps that conceptual graph in prose and structured lists — no schema, no code — so that future information-architecture and content-modeling work (and the mental-model and search-intent research in this same phase) has a shared, explicit map of how these entities relate. The central insight, consistent with both information-architecture theory (Rosenfeld & Morville's polyhierarchy) and clinical reality, is that this domain is **inherently many-to-many, not a clean tree**: one piece of equipment (e.g., an oxygen concentrator) relates to multiple unrelated conditions (COPD, post-COVID recovery, pneumonia recovery, congestive heart failure), and one condition (e.g., post-surgery recovery) relates to multiple unrelated equipment categories (hospital bed, wheelchair, walker, wound-care supplies). Any single-hierarchy taxonomy will therefore misrepresent the domain for some meaningful fraction of users; the graph must be explicitly cross-linked.

## Research Scope

This research draws on general information-architecture theory regarding polyhierarchical/faceted classification (Rosenfeld & Morville), general medical/clinical knowledge of conditions commonly requiring home equipment support (COPD, post-surgical recovery, paralysis/spinal cord injury, bedridden/immobile elderly care, palliative/end-of-life care), and reasoned domain modeling of how equipment, accessories, consumables, care contexts, and people-roles interrelate. It is explicitly conceptual/prose-based, not a technical schema, taxonomy file, or database design — those are out of scope for this research-only phase. Clinical claims are described at a general, non-diagnostic, layperson-appropriate level appropriate for a commercial site (not intended as, and should never substitute for, medical advice) and should be clinically reviewed before publication as authoritative site content.

## Evidence

- **[Peer-Reviewed/Research-Backed]** Rosenfeld & Morville's information architecture framework establishes that many real-world domains require **polyhierarchical** (cross-listed) classification rather than a single tree, specifically because items legitimately belong under more than one parent category — a foundational IA justification for why this domain cannot be forced into one clean hierarchy.
- **[Observation]** General clinical/domain knowledge (not sourced from a single peer-reviewed citation, but consistent across public health and home-care literature) establishes that home medical equipment needs cluster around a small number of recurring **care contexts** rather than diseases alone: respiratory support, mobility support, wound/pressure-injury prevention, post-surgical recovery, palliative/comfort care, and general elderly daily-living support. Diseases and conditions are the *cause*, but the *equipment need* is often organized clinically around the resulting functional impairment (can't breathe well, can't move safely, can't reposition themselves, needs monitoring) rather than the diagnosis name itself.
- **[Industry Best Practice]** Baymard Institute's B2B medical/pharma research (cited in the companion search-intent document) indirectly supports this by noting that medical/health-adjacent buyers navigate by task and use-case framing, not only by product-line browsing.

## Official Sources (where available)

- Louis Rosenfeld & Peter Morville, "Information Architecture for the World Wide Web" — polyhierarchy and faceted classification (book citation).
- No single official government or peer-reviewed source was found during this research pass that maps the specific condition-to-equipment-to-accessory graph as EnconeMed needs it; the structured lists below are original synthesis based on general medical/domain knowledge and should be clinically reviewed, not treated as sourced medical fact. This is an explicit and important limitation, flagged again in Future Considerations.

## Industry Research

- **[Observation]** Competitor and industry home-medical-equipment ("HME"/"DME" — Durable Medical Equipment, the standard US industry term) catalogs typically organize primarily by product category (Respiratory, Mobility, Beds, Bathroom Safety, Patient Care/Monitoring) with condition-based content, if present at all, added secondarily as blog/guide content rather than structural navigation — this is the "system vocabulary first" pattern the mental-models document (14-mental-models.md) argues against as a primary structure, though it remains useful as a secondary, precise classification layer.
- **[Observation]** Palliative/hospice and home-ICU care industry framing (general knowledge, not a single cited source) tends to bundle equipment into "setups" or "packages" (e.g., a "home ICU setup" bundling oxygen support, monitoring, a hospital bed, and suction) rather than selling single items in isolation — this bundling concept is a structurally different entity (a "kit"/"package" node) worth representing explicitly in the graph rather than treating equipment purely atomically.

## Important Findings

The conceptual graph below is organized as five entity types plus the people/role layer, described in prose with structured relationship lists. It is intentionally conceptual, not a data schema.

### 1. Conditions / Situations (the "why")
Examples: COPD and other chronic respiratory disease, post-COVID recovery, pneumonia recovery, congestive heart failure, post-surgical recovery (orthopedic, cardiac, abdominal), stroke and paralysis/hemiplegia, spinal cord injury, advanced age frailty/general elderly decline, bedridden/immobile status (from any cause), palliative/terminal illness, dementia/cognitive decline (affects supervision/safety equipment needs more than device needs directly).

- **[Observation]** Conditions are rarely singular in real households — a single elderly patient frequently has overlapping conditions (e.g., a COPD patient who is also frail and fall-risk), which is exactly why a single-condition-to-single-product mapping fails; the graph must support one patient linking to multiple condition nodes simultaneously.

### 2. Symptoms / Functional Problems (the bridge between condition and equipment)
Examples: low blood oxygen (low SpO2)/breathlessness, difficulty walking or standing, risk of falling, inability to reposition self in bed (pressure-injury risk), incontinence, difficulty transferring (bed to chair, chair to toilet), swallowing difficulty, need for continuous vital-signs monitoring, general weakness/fatigue requiring assistance with daily activities.

- **[Recommendation]** Symptoms are the layer closest to actual caregiver search language (see 14-mental-models.md) and should be the layer most explicitly represented in content and internal cross-linking, since they are the translation point between a condition (which the caregiver may or may not know the correct name for) and equipment (which they don't yet know exists).

### 3. Equipment (the "what")
Major categories and illustrative relationships:
- **Oxygen concentrator** — relates to: COPD, post-COVID recovery, pneumonia recovery, congestive heart failure, low SpO2 symptom, home-ICU context.
- **Oxygen cylinder** — relates to: emergency/backup oxygen need, transport/travel use, same conditions as concentrator but for portability or power-outage backup.
- **BiPAP/CPAP machine** — relates to: sleep apnea, some COPD cases, respiratory failure recovery.
- **Hospital bed (manual/semi-electric/fully electric)** — relates to: post-surgical recovery, bedridden/immobile status, palliative care, pressure-injury prevention (via head/foot elevation), paralysis.
- **Air/pressure mattress (alternating pressure mattress)** — relates to: bedridden status, pressure-injury/bedsore prevention, palliative care.
- **Wheelchair (manual/powered)** — relates to: paralysis, post-surgical mobility limits, general frailty, stroke recovery.
- **Walker / Rollator / Cane** — relates to: fall risk, general frailty, early-stage mobility limitation, post-surgical rehabilitation.
- **Patient lift / transfer board / transfer belt** — relates to: caregiver back-safety, paralysis, severe frailty, bed-to-chair transfer difficulty.
- **Commode chair / bathroom safety equipment (grab bars, shower chair)** — relates to: mobility limitation, fall risk, incontinence, dignity/independence needs.
- **Suction unit** — relates to: swallowing difficulty, tracheostomy care, palliative/home-ICU context.
- **Patient monitor (SpO2/pulse oximeter, BP monitor, ECG)** — relates to: virtually all conditions above as a cross-cutting monitoring need, home-ICU context.
- **Nebulizer** — relates to: COPD, asthma, respiratory infections/recovery.

### 4. Accessories & Consumables (the recurring-revenue and "you'll also need" layer)
Examples linked to equipment above: nasal cannula, oxygen mask, humidifier bottle (all accessory to concentrator/cylinder); mattress covers, bed rails, overbed table (accessory to hospital bed); wheelchair cushions, footrests (accessory to wheelchair); catheters, diapers/incontinence pads, wound dressings, gloves (general consumables cutting across bedridden and post-surgical contexts); oximeter probes, ECG electrodes (accessory to monitors).

- **[Recommendation]** Accessories/consumables should be modeled as attached to *equipment* nodes (their natural anchor) but discoverable also from *condition/symptom* nodes, since a caregiver thinking "what do I need for a bedridden parent" should surface the full bundle (bed + mattress + consumables), not just the anchor equipment.

### 5. Care Contexts (the setting/mode that bundles multiple equipment types)
Examples: **Home ICU / critical home care** (oxygen + monitoring + suction + bed, high-acuity), **Palliative/hospice/comfort care** (bed + mattress + pain/comfort-focused equipment, less curative-device-focused), **Post-surgical/rehabilitation care** (mobility aids + short-term bed rental + wound care), **General elderly daily-living support** (mobility + bathroom safety + monitoring, lower acuity, longer duration), **Post-stroke/paralysis long-term care** (wheelchair + bed + transfer aids + long-duration rental or purchase consideration).

- **[Observation]** Care context is effectively a bundling/packaging concept layered on top of the condition-symptom-equipment graph, matching the industry pattern noted above ("home ICU setup" as a sellable package) — this suggests care-context pages could function as curated bundles/landing pages that pull together multiple equipment nodes, complementing rather than replacing individual product pages.

### 6. People / Roles (who is on each side of the relationship)
- **Patient** — the end-user of the equipment; may be an active decision-maker (a healthcare professional, or a cognitively able elderly person) or entirely passive (severely ill, paralyzed, or cognitively impaired patient with no direct site interaction).
- **Family caregiver** — typically the actual website visitor and buyer/renter of record (per Pew Research data cited in the companion documents); often an adult child, sometimes a spouse.
- **Home-care nurse / attendant** — may be hired alongside equipment, may advise on equipment choice, is a related-but-distinct service EnconeMed may or may not offer directly; relevant as a cross-sell/adjacent-service node even if out of primary equipment scope.
- **Doctor / discharge planner** — often the origin point of the equipment need (a discharge instruction, a prescription, a recommendation), meaning the caregiver's initial vocabulary and equipment list frequently originates from this role, not from independent research — an important upstream relationship for content to account for (e.g., "your doctor said you need an oxygen concentrator — here's what that means").
- **Hospital / clinic** — an institutional entity that may itself be a customer (bulk/B2B equipment need) distinct from the individual home-care customer, a different relationship shape (organization-to-organization) than the primary caregiver-to-patient model.

## Design Implications

- **[Recommendation]** Content and future taxonomy work should explicitly support many-to-many linking: every condition/symptom page should list multiple relevant equipment types, and every equipment page should list multiple relevant conditions/symptoms it serves — a single-parent category tree will under-serve real users on both sides of this relationship.
- **[Recommendation]** Care-context "bundle" pages (e.g., "Setting Up a Home ICU," "Recovering After Hip Surgery at Home," "Caring for a Bedridden Parent") are a natural content type that sits above individual products and should cross-link down into the equipment/accessory graph — this also directly serves the situational/symptom-first navigation recommended in 14-mental-models.md.
- **[Recommendation]** Accessory/consumable cross-sell should be modeled explicitly (e.g., "customers who need this also typically need...") both for commercial reasons (recurring revenue on consumables) and for care-completeness (a caregiver may not realize a humidifier bottle or nasal cannula is a separate, needed item).

## Business Implications

- **[Recommendation]** Consumables and accessories represent a recurring-revenue opportunity distinct from the equipment rental/sale transaction itself; the entity graph makes clear these should be actively surfaced, not left for the customer to separately discover they need.
- **[Recommendation]** The B2B/institutional relationship (hospital/clinic as customer) is structurally different from the B2C caregiver relationship and may warrant separate content, pricing, and contact paths rather than being folded into consumer-facing pages.
- **[Observation]** The doctor/discharge-planner as an upstream origin of demand suggests a possible future business-development angle (referral relationships with hospitals/discharge planners), though this is a business-strategy consideration outside this document's IA/content scope and is flagged only as an observation.

## SEO Implications

- **[Industry Best Practice]** Cross-linking condition/symptom content to equipment content (and vice versa) is consistent with standard topic-cluster/pillar-content SEO practice, which tends to reward sites that demonstrate topical depth and clear internal relationships between related concepts.
- **[Observation]** Care-context "bundle" pages likely correspond to valuable long-tail informational/commercial-investigation queries (e.g., "home ICU setup cost," "what equipment needed after hip replacement at home") not well served by product-only competitor catalogs — a potential content-gap opportunity, though search-volume validation was not performed in this research pass.

## AI Search Implications

- **[Recommendation]** A well-labeled, explicitly cross-linked conceptual structure (condition ↔ symptom ↔ equipment ↔ accessory) is likely easier for AI systems to parse and correctly cite than a flat product catalog, since these systems generally benefit from clear, explicit relational context rather than needing to infer it — this is a reasoned inference consistent with general knowledge of how retrieval/synthesis systems use structured, well-connected content, not a directly cited AI-search study.
- **[Observation]** No direct research on AI search engines and medical-equipment entity graphs specifically was found; flagged as a gap.

## Recommendations

1. Model the domain explicitly as a many-to-many graph (condition ↔ symptom ↔ equipment ↔ accessory ↔ care context), not a single tree, in all future IA/taxonomy work.
2. Build care-context "bundle" pages that cross-link down into individual equipment and accessory pages.
3. Surface accessories/consumables proactively from both equipment pages and condition/symptom pages.
4. Treat B2B/institutional relationships (hospitals, clinics) as structurally distinct from B2C caregiver relationships in future content and commercial planning.
5. Have all condition/symptom/equipment relationship claims clinically reviewed before publishing as authoritative site content — this document is a conceptual synthesis, not a sourced medical reference.
6. Consider the doctor/discharge-planner as an important upstream vocabulary source when designing content that explains "what your doctor meant."

## Things To Avoid

- **[Recommendation]** Do not force the domain into a single strict hierarchy (one parent category per item) — the polyhierarchy justification from IA literature and the real clinical overlap of conditions both argue against it.
- **[Recommendation]** Do not publish condition-equipment relationship claims (e.g., "X condition requires Y equipment") without clinical review — this document's entity lists are conceptual synthesis intended to inform IA/content planning, not verified medical guidance, and must not be mistaken for one.
- **[Recommendation]** Do not treat accessories/consumables as an afterthought footnote on product pages — the graph shows they are functionally necessary companions to primary equipment, not optional add-ons, and hiding them creates both a business (missed revenue) and care-quality (customer under-equipped) problem.

## Future Considerations

- Commission a clinician or qualified medical reviewer to validate and refine the condition-symptom-equipment relationships in this document before they inform published content — this is flagged repeatedly because it is the most important limitation of this research.
- Consider formal card-sorting or tree-testing (as recommended in 14-mental-models.md) using this entity graph as raw material, to validate which cross-links matter most to real caregivers versus which are theoretically valid but rarely searched.
- As EnconeMed's own catalog and order data accumulate, mine actual co-purchase/co-rental patterns (which equipment and accessories are actually bought together) to refine or correct the reasoned relationships proposed here with real behavioral evidence.
- Explore whether a lightweight, non-technical "concept map" (still not a formal schema) would help internal content/product teams maintain consistency as the catalog grows — noted as a future internal tooling question, not a task for this research phase.

## Checklist

- [ ] Entity graph reviewed and validated by a clinical/medical reviewer before informing published content
- [ ] Care-context bundle page concepts scoped against this entity graph
- [ ] Accessory/consumable cross-sell relationships mapped from both equipment and condition/symptom sides
- [ ] B2B/institutional relationship path distinguished from B2C caregiver path in future planning
- [ ] Card-sort/tree-test research planned to validate which relationships matter most to real users
- [ ] Plan established to mine future EnconeMed order/rental data for real co-purchase patterns
- [ ] Explicit disclaimer maintained that this document is conceptual synthesis, not sourced medical fact
