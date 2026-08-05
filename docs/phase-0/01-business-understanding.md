# 01 — Business Understanding: EnconeMed

**Scope:** This document synthesizes the business model foundations for EnconeMed (legal entity: Encone Care Nurses Private Limited), a medical equipment rental and sales platform in India, operating on a lead-generation model rather than a transactional e-commerce model. It exists to give downstream architecture, content, and UX decisions a shared, sourced factual basis.

**Labeling key:** **[Official Requirement]** = sourced from a government/regulatory body or binding law. **[Industry Best Practice]** = sourced from a recognized industry body, standards organization, or widely-documented professional convention. **[Recommendation]** = this document's own synthesis/advice for EnconeMed, not an external mandate. **[Observation]** = a factual pattern noted from research (e.g., what competitor sites do) without claiming it is a standard.

---

## Executive Summary

EnconeMed operates in a niche that sits between three regulatory/commercial worlds: (1) medical device regulation (CDSCO/Medical Devices Rules), (2) general consumer commerce law (Consumer Protection Act, E-Commerce Rules), and (3) company law disclosure norms (MCA/Companies Act). None of these bodies has published rules specific to "medical equipment rental" as a business category — the research found no dedicated rental-sector regulation, which is itself an important finding: EnconeMed must responsibly self-derive compliant practice by combining adjacent, applicable frameworks rather than pointing to a single rulebook.

The core strategic distinction — "lead-generation trust platform" vs. "transactional marketplace" — is not just a UX preference. **[Recommendation]** It changes what the site must prove to a visitor (medical credibility, hygiene/sanitization assurance, real company identity, human responsiveness) before asking for a commitment, because the transaction itself (equipment delivery, installation, servicing, pickup) happens off-platform through human coordination, not a cart/checkout. This has direct implications for site architecture (content-heavy, trust-signal-heavy, contact-funnel-heavy) that later phases will build on.

GST treatment, Legal Metrology labeling, and medical device classification all have real, current, sourced answers below — but the specific intersection with *rental* (as opposed to sale) of equipment is under-documented in public sources and is flagged as an open compliance question for qualified legal/tax counsel, not something this document can resolve definitively.

---

## Official References

- Ministry of Corporate Affairs (MCA), Companies Act 2013 / Section 12(3)(c) — official business communication disclosure requirements (company name, registered office, CIN, phone, email). Source discussed via secondary summaries (see Important Findings); the primary source is the Companies Act 2013 and MCA circulars, available at https://www.mca.gov.in/
- Central Drugs Standard Control Organisation (CDSCO), Medical Devices Rules, 2017, under the Drugs and Cosmetics Act, 1940 — effective 1 January 2018, amended 2020. Primary source: CDSCO official site https://cdsco.gov.in/
- Legal Metrology (Packaged Commodities) Amendment Rules, 2025 — excludes medical devices from LMPC labeling jurisdiction, placing device labeling under the Drugs & Cosmetics Act / Medical Devices Rules 2017 instead. Referenced via secondary legal-analysis source: https://www.taxtmi.com/article/detailed?id=15488 (TaxTMI legal commentary; treat as secondary interpretation of the amendment, not the primary gazette text).
- Consumer Protection (E-Commerce) Rules, 2020, under the Consumer Protection Act, 2019 — defines "marketplace e-commerce entity" vs. "inventory e-commerce entity." Primary source: Ministry of Consumer Affairs, https://consumeraffairs.nic.in/ ; secondary summary consulted: https://trilegal.com/knowledge_repository/consumer-protection-e-commerce-rules-2020/
- GST Council notifications on medical equipment HSN classification (Chapter 90, HSN 9018 and related headings) and the September 2025 GST rate rationalization reducing rates on many medical devices to 5%. Secondary summaries consulted: https://www.indiafilings.com/learn/gst-rate-for-medical-equipments-cameras-and-spectacles and https://busy.in/gst-rates/medical-equipment/ — **[Observation]** neither source is the primary CBIC notification; primary source would be a specific CBIC/GST Council notification, which should be pulled directly (https://www.cbic.gov.in/) before being relied on for tax filings.
- Association of Indian Medical Device Industry (AiMeD) — umbrella industry body representing manufacturers of medical devices including consumables, disposables, equipment, instruments, and diagnostics. https://www.aimedindia.com/ and https://aimedindia.com/about-us
- Quality Council of India (QCI) — ICMED voluntary certification scheme for medical devices, developed jointly with AiMeD (MoU dated 30 October 2014). Referenced via https://www.intertek.com/assurance/icmed/

---

## Important Findings

1. **[Official Requirement]** Medical devices in India are regulated under the Medical Devices Rules, 2017 (Drugs and Cosmetics Act, 1940 framework), enforced from 1 January 2018, with a risk-based classification system: Class A (low risk) through Class D (high risk). Wheelchairs are documented as Class A. This classification governs *manufacture, import, and sale* licensing — it does not, per the research available, explicitly address rental/leasing as a distinct regulated activity.

2. **[Official Requirement]** As of the 2025 Legal Metrology (Packaged Commodities) Amendment Rules, medical devices were carved OUT of general LMPC packaging/labeling jurisdiction (MRP, net quantity, manufacture date declarations on the package) and placed instead under the Drugs & Cosmetics Act / Medical Devices Rules labeling regime (which instead requires things like Unique Device Identification, sterility markers, usage warnings, shelf-life). **[Recommendation]** This means EnconeMed's product/spec-sheet content for devices should not assume standard LMPC-style MRP-panel formatting applies uniformly — device labeling requirements should be treated as device-classification-dependent, and consumables (gloves, masks, diapers, etc., which are not "devices" in the CDSCO risk-classification sense in all cases) may still fall under ordinary LMPC MRP rules. This distinction should be confirmed per product category with a compliance professional before publishing legal/label copy.

3. **[Official Requirement]** GST treatment: medical equipment/instruments are historically spread across 0%, 5%, 12%, 18%, and 28% slabs by HSN code; a September 2025 rate rationalization moved many commonly used medical devices to 5%, while some device-adjacent items (e.g., hospital furniture/beds) reportedly remained at 18%. **[Observation]** Public sources found do not clearly state the GST treatment of *rental* (as a service) versus *sale* (as a good) of the same equipment — rental is typically treated as a "supply of service" under GST law rather than a "supply of goods," which can carry a different applicable rate/classification (SAC code, not HSN code) than an outright sale of the same item. This is flagged as an open question requiring direct confirmation from a GST practitioner or the CBIC's SAC schedule before EnconeMed publishes any pricing/tax-inclusive claims.

4. **[Official Requirement]** The Consumer Protection (E-Commerce) Rules, 2020 distinguish "marketplace e-commerce entities" (IT platform facilitating third-party transactions, cannot own inventory or influence pricing) from "inventory e-commerce entities" (own and sell/rent their own inventory directly). **[Recommendation]** Because EnconeMed's business model is to own/coordinate its own rental fleet and sales inventory (not host third-party sellers), it is structurally an *inventory-model* business, not a marketplace — this is a foundational fact for the "not a marketplace" positioning and should be stated as a factual/structural distinction, not just a brand tagline, in About/Trust content.

5. **[Industry Best Practice]** AiMeD (Association of Indian Medical Device Industry) is the primary national industry body covering consumables, disposables, equipment, instruments, electronics, diagnostics, and implants. QCI's ICMED is a voluntary certification scheme co-developed with AiMeD for demonstrating adherence to international quality standards. **[Recommendation]** EnconeMed's supplier/partner vetting criteria (referenced in About/Trust pages) can credibly reference AiMeD membership or ICMED/ISO certification of equipment brands as a trust signal, but EnconeMed itself should not claim AiMeD membership or ICMED certification unless it actually holds them.

6. **[Official Requirement]** Company law: as a private limited company, Encone Care Nurses Private Limited is subject to Companies Act 2013 disclosure norms for official communications, including electronic communications (interpreted from Section 12(3)(c) to extend to email/website, per secondary legal commentary). Required disclosures typically include: full legal company name, registered office address with PIN code, Corporate Identification Number (CIN), telephone number, and official email. **[Observation]** Secondary sources note many companies inconsistently apply this to website footers/email signatures (a documented compliance gap in industry practice), and that MCA introduced (per 2025 reporting) a requirement for geo-tagged registered-office photos during annual filing — this does not directly affect the website but underscores that "registered office" is an actively verified fact, not decorative copy.

7. **[Industry Best Practice]** Medical device reprocessing/refurbishment (relevant to rental equipment that is cleaned and re-rented) is addressed by general international standards: ISO 13485 (quality management systems for medical device organizations) and ISO 17664 (manufacturer instructions for cleaning/disinfection/sterilization of reusable devices). **[Observation]** These are manufacturer/QMS-facing standards, not consumer-facing certifications a rental company would typically "hold," but their existence gives EnconeMed a legitimate vocabulary (e.g., "manufacturer-specified sanitization protocol") for describing its between-rental hygiene process without overclaiming formal certification it does not have.

8. **[Industry Best Practice]** Healthcare lead-generation funnels (per marketing-industry sources, not regulatory sources) generally follow: awareness → trust-building content (testimonials, case studies, clear explanations) → contact/inquiry → human qualification → conversion. Sources cite general marketing statistics (e.g., trust as a stated purchase-decision factor per Edelman Trust Barometer surveys, nurtured-lead performance figures) that should be treated as **[Industry Best Practice]**-level directional guidance, not medical-sector-specific or India-specific hard data.

---

## Implementation Notes

- **[Recommendation]** Treat "rental vs. sale" as two distinct commercial flows in content architecture from day one (distinct SAC/HSN tax treatment is likely, per Finding 3), even though the front-end UX may present them as a single toggle on a product page.
- **[Recommendation]** Because no dedicated "medical equipment rental" regulatory category exists, compliance copy (Terms, disclaimers) should avoid asserting a specific regulatory license or approval that doesn't apply (e.g., do not claim "CDSCO-licensed rental provider" — CDSCO licenses manufacturers/importers/sellers of certain classes, not generically all rental operators). Any claim of licensure must be verified against what license the business actually holds.
- **[Recommendation]** Footer and About/Contact pages should include the legal entity name, CIN (once allotted/available), registered office address, and a valid contact channel — treat this as baseline trust hygiene consistent with Companies Act disclosure norms (Finding 6), independent of whether it is strictly legally mandated for a website specifically.
- **[Recommendation]** Do not architect the platform as, or describe it in copy as, a "marketplace." The inventory-model distinction (Finding 4) is both a legal-category fact and a brand-trust argument — conflating it with "marketplace" language undermines both.

---

## Common Mistakes

- **[Observation]** Assuming GST/HSN rules for medical equipment *sale* automatically apply identically to *rental* — rental is generally a service (SAC) not a goods supply (HSN), and rates/rules can differ. This is a common conflation this research explicitly could not resolve with authoritative rental-specific sourcing.
- **[Observation]** Overclaiming regulatory status (e.g., implying CDSCO "approval" of the *platform* itself, when CDSCO approves/classifies *devices* and licenses *manufacturers/importers*, not rental intermediaries).
- **[Recommendation — anti-pattern to avoid]** Presenting the site with marketplace-style UX patterns (multi-seller cart, instant online payment checkout as the primary path) when the underlying business and applicable consumer-protection category is inventory-model and lead-gen, not marketplace-transactional.
- **[Observation]** Using generic MRP/label-panel formatting for medical devices without checking whether the specific product falls under CDSCO device labeling (post-2025 LMPC carve-out) vs. standard LMPC labeling — the two regimes now diverge for devices vs. non-device consumables.

---

## Recommended Practices

- **[Recommendation]** Build the Trust layer (About, Company Info, Terms, Privacy) as first-class information architecture, not an afterthought — given the absence of a single unifying "rental license" a visitor could look up, the burden of proving legitimacy falls more heavily on transparent, verifiable company facts (CIN, address, real phone number, real team info).
- **[Industry Best Practice]** Follow the general lead-gen funnel structure documented across healthcare marketing sources: informational/trust content first, low-friction contact mechanisms throughout, human follow-up to qualify and convert — rather than a single hard "Buy Now" CTA typical of transactional e-commerce.
- **[Recommendation]** Keep a running compliance question log (starting with the GST rental-vs-sale ambiguity and device-vs-consumable labeling divergence identified above) to hand to qualified legal/tax counsel before Phase 1 content or Terms are finalized.
- **[Industry Best Practice]** Where citing industry affiliation or quality signals, reference real, checkable bodies (AiMeD, ICMED/QCI, ISO 13485/17664 vocabulary) only to the extent EnconeMed or its suppliers actually hold them — do not manufacture the impression of certifications not held.

---

## Things to Avoid

- Do not describe EnconeMed as a "marketplace" in any legal, marketing, or architectural document — it is factually and legally an inventory-model business per the Consumer Protection E-Commerce Rules distinction.
- Do not state a specific GST rate for "medical equipment rental" as settled fact anywhere in the codebase, content, or pricing UI until confirmed with a tax professional against the applicable SAC code — the sale-side HSN rates found in research are not proven to transfer directly to the service-side rental rate.
- Do not fabricate or imply regulatory certifications (CDSCO license, ISO 13485, ICMED, AiMeD membership) that the company does not hold.
- Do not treat this document, or any AI-researched summary, as a substitute for qualified Indian legal and tax counsel before publishing binding Terms, Privacy Policy, or tax-inclusive pricing claims.

---

## Future Considerations

- **[Observation]** The Medical Devices (Amendment) Rules, 2026 were reported as a proposed draft published in the Gazette (April 2026) at the time of this research — future phases should re-check for finalized text before Phase 1 content lock, since device classification/labeling details may shift.
- **[Recommendation]** As the business scales, consider whether formal industry association membership (AiMeD) or a voluntary certification (ICMED) is worth pursuing for genuine trust-signal value, rather than only referencing these bodies descriptively.
- **[Recommendation]** Revisit the rental-vs-sale GST/SAC question with a CA/GST practitioner before Phase 1 pricing architecture is finalized — this is the single most consequential unresolved compliance question from this research pass.

---

## Checklist

- [ ] Confirm legal entity's CIN and registered office address for footer/About page use — **[Official Requirement]**-driven, pending real company data.
- [ ] Confirm with a GST practitioner whether equipment rental is taxed as SAC-classified service vs. HSN-classified goods, and the applicable rate — **[Official Requirement]**, currently unresolved.
- [ ] Confirm whether any specific product categories (e.g., oxygen concentrators, CPAP) require CDSCO Class-specific handling disclosures distinct from general consumables — **[Official Requirement]**.
- [ ] Verify Companies Act Section 12(3)(c)-derived disclosure norms with company secretary/legal counsel before finalizing footer/legal page copy — **[Official Requirement]**.
- [ ] Ensure no page or asset uses "marketplace" framing or marketplace-style UX patterns — **[Recommendation]**.
- [ ] Draft About/Trust content around verifiable facts (legal name, CIN, address, real contact) rather than unverifiable certification claims — **[Recommendation]**.
- [ ] Log open compliance questions (GST rental treatment, device vs. consumable labeling divergence) for legal/tax review before Phase 1 — **[Recommendation]**.
