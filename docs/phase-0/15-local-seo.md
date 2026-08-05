# 15 — Local SEO: Google Business Profile & Multi-City Presence

Research scope: Google Business Profile setup/guidelines, location-page best practices for multi-city service areas (India context), NAP consistency, review acquisition/display per Google policy, Maps embedding, service-area vs storefront business documentation. Phase 0 research only — no code, UI, or copy.

## Executive Summary

EnconeMed is best modeled, per Google's own Business Profile documentation, as either a **service-area business (SAB)** or a **hybrid business** — not a pure storefront — because the core proposition is equipment delivered to the customer across multiple Indian cities, even if there is a base/warehouse address. This classification has concrete, official consequences: address visibility rules, how "service area" must be defined (by city/postal code, not radius, capped at roughly two hours' driving time from the base location, up to 20 areas per profile), and review-solicitation constraints. Separately, Google has been tightening enforcement against fake/incentivized reviews through 2026, which is directly relevant to a lead-generation healthcare brand that will lean heavily on testimonials and star ratings for trust. If EnconeMed intends to represent multiple cities as more than a single SAB profile (e.g., separate profiles or location pages per city), that requires deliberate architecture decisions flagged below as open questions for Phase 1.

## Official References

- Guidelines for representing your business on Google — https://support.google.com/business/answer/3038177
- Manage your service areas for service-area & hybrid businesses — https://support.google.com/business/answer/9157481
- (Reviews policy pages exist under Google Business Profile Help; specific policy URLs were not directly fetched in this pass — see gap noted below. Secondary sources summarizing Google's 2026 review-policy enforcement update were consulted and are labeled as blog commentary, not primary source: birdeye.com/blog/google-review-policy, launchcodex.com/blog/seo-geo-ai/google-business-profile-review-policy-update — **third-party commentary, minor supporting color only**.)
- Schema.org health/medical types (relevant for location-page structured data pairing with GBP) — https://schema.org/docs/meddocs.html

## Important Findings

- **[Official Requirement]** A storefront business is one customers visit at a physical, signed location; it is eligible to display a public address and map pin. A service-area business (SAB) "visits or delivers to customers directly but doesn't serve customers at their business address" and **must hide its address** on the public profile. A hybrid business (serves customers at its address *and* travels to them) may keep its address visible while also declaring a service area.
- **[Official Requirement]** Service areas must be defined by **city, postal code, or a similarly named area** — not by a radius/distance around a point. A profile supports **up to 20 service areas**.
- **[Official Requirement]** The overall service area "shouldn't be more than about 2 hours of driving time" from the business's base location. This directly constrains how many Indian cities a single GBP listing can plausibly claim if operating from one base city/warehouse — cities beyond ~2 hours' drive are not appropriate to declare on that same profile.
- **[Official Requirement]** Business name on the profile must reflect the business's "real-world name, as used consistently on your storefront, website, stationery" — no taglines, keyword-stuffed descriptors, phone numbers, URLs, or marketing text appended to the name field.
- **[Official Requirement]** The address field requires a precise, real, staffed/operating location; P.O. boxes and address-less virtual offices are not eligible. For an SAB without customer-facing signage, this address must still exist internally (for verification) but is not displayed publicly.
- **[Official Requirement]** Category selection should use "as few categories as possible" to describe the core business, choosing the most specific applicable category (completing "This business IS a ___," not "HAS a ___"); Google automatically associates broader parent categories.
- **[Official Requirement]** Google enforces eligibility rules requiring the business to "reflect your business accurately," avoid prohibited content, maintain one profile per business location/model, and comply with content policies — violations can lead to profile suspension, which removes the business from Search and Maps entirely (name, hours, phone, reviews all become unfindable).
- **[Official Requirement]** Google has documented and continues to enforce policy against fake, incentivized, or compensation-linked reviews; automated filters scan for patterns indicating rewards (discounts, coupons, gift cards) tied to reviews, and detected manipulation can result in temporary loss of new-review capability, unpublishing of existing reviews, and a public warning banner on the profile. **[Observation]** The specific 2026 enforcement details (e.g., staff-name solicitation restrictions) were sourced from third-party SEO blog commentary during this research pass, not directly confirmed against a primary support.google.com policy page — **flagged as a research gap requiring direct primary-source verification before Phase 1 policy documents are finalized.**
- **[Official Requirement]** Age-restricted-product businesses (alcohol, cannabis, weapons) are barred from operating as pure SABs and must register as storefronts — not directly applicable to medical equipment, but establishes that GBP applies category-specific exceptions to the SAB model, a pattern worth checking for medical/healthcare-specific exceptions in Phase 1 (not found in this research pass).
- **[Official Requirement]** Changes to declared service areas may take up to 48 hours to propagate on the live profile.

## Implementation Notes

- **[Recommendation]** Model EnconeMed's primary GBP profile as a **hybrid business** if there is a real staffed office/warehouse address that can be publicly shown (adds trust signal and map pin eligibility), or as a pure **SAB** if the base location is not customer-facing.
- **[Recommendation]** For multi-city coverage, treat "one GBP profile with a declared service area" and "one GBP profile per city with local address/signage" as two distinct architectural options with different trust and ranking tradeoffs (a single profile spanning far-apart cities is constrained by the ~2-hour driving-time norm and by the requirement that the business genuinely operate/deliver there) — this decision belongs to Phase 1 business/ops planning, not to this research doc.
- **[Recommendation]** NAP (Name, Address, Phone) consistency across the GBP profile, website footer/contact page, and any third-party directories should be enforced as an operational discipline (exact string match, not just "close enough") because Google's own guidance ties business identity verification to real-world consistency, and inconsistency is a well-documented (though not "official-doc-cited" in this pass) local-ranking friction point. **[Industry Best Practice]**, not confirmed as an explicit ranking factor in the primary sources fetched.
- **[Recommendation]** Embed Google Maps on location/contact pages using the address(es) actually eligible for public display per the storefront/hybrid/SAB classification above — do not display a map pin for a pure SAB profile, since that contradicts the address-hiding requirement.

## Common Mistakes

- **[Observation]** Declaring a service area as a mileage/radius value — Google's interface and guidance require city/postal-code-based area definitions instead.
- **[Observation]** Publicly displaying an address on a profile that should be classified (and configured) as a pure service-area business.
- **[Observation]** Appending marketing language ("Best Medical Equipment Rental in India") to the GBP business name field — a direct guideline violation that risks suspension.
- **[Observation]** Incentivizing or soliciting reviews in exchange for discounts/gifts, or systematically prompting customers to name specific staff — both are flagged as enforcement targets in Google's review-policy tightening.
- **[Observation]** Selecting an overly broad or excessive number of GBP categories instead of the single most specific core category.
- **[Observation]** Treating GBP suspension risk as low — Google's own documentation frames suspension as a real, total-visibility-loss consequence of policy violations, not a minor penalty.

## Recommended Practices

- **[Industry Best Practice]** Maintain a documented NAP source-of-truth (one canonical name/address/phone per legal entity/location) that the website, GBP, and any directory listings all pull from, to avoid drift as the business expands cities.
- **[Recommendation]** Where EnconeMed operates multiple real service hubs across India, evaluate (in Phase 1) whether separate legal/operational sub-entities or clearly delineated service-area profiles per hub are warranted, rather than stretching one profile across the whole country in tension with the ~2-hour driving-time norm.
- **[Recommendation]** Build review acquisition into normal post-delivery/post-rental workflows (e.g., a standard follow-up asking for honest feedback) rather than incentivized campaigns, to stay clear of Google's fake/incentivized review enforcement.

## Things to Avoid

- **[Official Requirement]** Do not create multiple GBP profiles for the same legal business/location beyond what Google's one-profile-per-business rule allows.
- **[Official Requirement]** Do not display a public address/map pin for a profile configured as a pure service-area business.
- **[Recommendation]** Do not embed third-party review widgets or self-collected testimonials in `Review`/`AggregateRating` structured data on Organization/LocalBusiness schema on EnconeMed's own site — Google's structured-data guidelines (documented separately in 04-seo.md context and cross-referenced in 07-eeat.md/14-trust-signals.md) restrict "self-serving" review rich results for these schema types; this is a structured-data rule, but the underlying review-authenticity principle is directly relevant to local review strategy too.

## Future Considerations

- **[Recommendation]** Directly verify (primary source, not blog commentary) the exact current text of Google's Business Profile review policy and any healthcare-category-specific GBP restrictions before Phase 1 finalizes review-acquisition workflows — flagged explicitly as unresolved in this research pass.
- **[Recommendation]** Investigate whether Google has category-specific GBP guidance for healthcare/medical equipment providers (parallel to the alcohol/cannabis/weapons SAB exception found) — not located in this research pass.
- **[Recommendation]** Revisit multi-city GBP architecture once the actual number and geographic spread of service cities is finalized by the business team, since the 2-hour-driving-time norm may force a multi-profile or hub-based model.

## Checklist

- [ ] Classify EnconeMed's GBP presence as storefront, hybrid, or pure service-area business, per actual operating model
- [ ] If SAB or hybrid, define service areas by city/postal code (not radius), respecting the ~2-hour driving-time norm
- [ ] Confirm whether multi-city coverage requires multiple GBP profiles/hubs vs. one profile with a wide service area
- [ ] Set GBP business name to exact real-world legal/brand name with no marketing text appended
- [ ] Select the single most specific GBP category, avoiding category over-tagging
- [ ] Establish a canonical NAP source-of-truth and audit consistency across site, GBP, and directories
- [ ] Design a non-incentivized review acquisition workflow tied to real delivery/rental milestones
- [ ] Verify primary-source Google review policy details before finalizing review workflows (open research gap)
- [ ] Ensure Maps embeds/address displays match the SAB/hybrid/storefront classification (no address for pure SAB)
- [ ] Investigate healthcare-specific GBP category rules in Phase 1 (open research gap)
