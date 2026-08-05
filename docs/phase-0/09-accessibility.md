# 09 — Accessibility Research (WCAG 2.2, Legal Context, SEO Overlap)

Research-only document for Phase 0 of EnconeMed. No code, UI, or copy decisions are made here. This is source material for the Product Architect to translate into design/engineering requirements for a content-heavy, form-heavy, medical-equipment lead-gen platform whose real users skew toward stressed caregivers, elderly people, and healthcare professionals.

## Executive Summary

WCAG 2.2 is the current W3C recommendation (published as a W3C Recommendation) organized around four principles — Perceivable, Operable, Understandable, Robust (POUR) — with 86 success criteria split across three conformance levels: A (minimum), AA (the level virtually all legal/regulatory regimes reference), and AAA (aspirational, rarely targeted site-wide). **[Official Requirement]** WCAG 2.2 Level AA is the de facto global benchmark cited by regulators (US DOJ Title II rule, EU EN 301 549, etc.), though **[Observation]** India has no binding WCAG-equivalent law for *private* commercial websites as of this research (August 2026) — WCAG 2.1 AA is mandatory only for Indian government websites, while the RPWD Act 2016 imposes a general, non-technical "accessible services" obligation on private establishments without naming WCAG. For a premium healthcare brand serving elderly/disabled end-users, voluntarily targeting WCAG 2.2 AA is a **[Recommendation]**, not a legal mandate in India. Accessibility and Core Web Vitals/SEO overlap substantially: semantic HTML, stable layouts, and optimized media serve both assistive technology and Google's ranking signals **[Industry Best Practice]**.

## Official References

- W3C, "Web Content Accessibility Guidelines (WCAG) 2.2" — https://www.w3.org/TR/WCAG22/ (official normative spec, W3C Recommendation)
- W3C, "Understanding WCAG 2.2" and "WAI Quick Reference" — via w3.org/WAI (referenced by search results; not individually fetched this session)
- W3C WCAG Working Group, "Requirements for WCAG 2.2" — https://w3c.github.io/wcag/requirements/22/
- US Department of Justice, ADA Title II Final Rule (Federal Register, April 24, 2024) adopting WCAG 2.1 Level AA for state/local government sites — https://www.ada.gov/resources/2024-03-08-web-rule/ ; compliance-date extension published April 2026 — https://www.federalregister.gov/documents/2026/04/20/2026-07663/ (Note: this rule governs US state/local government entities, not India, and not private companies — cited here only to illustrate the "WCAG 2.1 AA as legal baseline" pattern referenced globally.)
- Deque Systems, "India's Accessibility Laws" — https://www.deque.com/apac-digital-accessibility-laws/india/
- DigitalA11y, "India's Digital Accessibility Laws and Overview" — https://www.digitala11y.com/indias-digital-accessibility-laws-and-overview/
- Pivotal Accessibility, "RPWD Act and IS 17802: India's Digital Accessibility Standards" — https://www.pivotalaccessibility.com/2025/06/rpwd-act-and-is-17802-indias-digital-accessibility-standards-2025-guide/
- web.dev / Google, Core Web Vitals and accessibility overlap discussion (secondary sources summarizing web.dev guidance): Siteimprove, "Core Web Vitals and WCAG: One Operating System for Enterprise UX, SEO, and Risk" — https://www.siteimprove.com/blog/core-web-vitals-wcag/

## Important Findings

1. **Conformance structure** **[Official Requirement]**: WCAG 2.2 has 86 success criteria — 31 at Level A, 24 at Level AA (cumulative with A, so 55 total for "AA conformance"), and 31 at Level AAA. Levels are cumulative: claiming AA conformance requires meeting all A *and* AA criteria. AAA is explicitly stated by W3C as not recommended as a general policy for entire sites, because some AAA criteria cannot be satisfied for all content types.

2. **WCAG 2.2 new criteria (vs 2.1)** **[Official Requirement]**: Six new Level A/AA criteria were added, most relevant to EnconeMed:
   - **2.4.11 Focus Not Obscured (Minimum)** (AA) — a focused component must not be entirely hidden by author-created content (sticky headers, cookie banners, chat widgets). Directly relevant since EnconeMed will likely have a sticky "Call Now / WhatsApp" CTA bar.
   - **2.5.7 Dragging Movements** (AA) — any drag interaction needs a single-pointer alternative (not expected to be heavily used on a lead-gen site, but relevant if image comparison sliders or draggable UI appear).
   - **2.5.8 Target Size (Minimum)** (AA) — pointer targets must be at least 24×24 CSS px, or have equivalent spacing. Directly relevant to elderly users with reduced motor precision and tremors.
   - **3.2.6 Consistent Help** (A) — if a help mechanism (contact/help link, chat, phone number) appears on multiple pages, it must appear in the same relative order each time. Highly relevant: caregivers navigating under stress benefit from a predictable, always-in-the-same-place "Call / WhatsApp" contact point.
   - **3.3.7 Redundant Entry** (A) — information already entered by the user in a multi-step flow (e.g., a multi-step rental inquiry form) must not need to be re-entered.
   - **3.3.8 Accessible Authentication (Minimum)** (AA) — cognitive function tests (e.g., puzzle CAPTCHAs) can't be the only way to authenticate; relevant if OTP/login flows are added later.
   - 4.1.1 Parsing was *removed* in 2.2 as obsolete (modern browsers handle malformed HTML robustly) — this is a criterion removal, not a new requirement.

3. **Color contrast** **[Official Requirement]**: SC 1.4.3 Contrast (Minimum) is Level AA and requires 4.5:1 for normal text, 3:1 for large text (≥18pt or ≥14pt bold). SC 1.4.6 Contrast (Enhanced), 7:1/4.5:1, is Level AAA. For an elderly-skewing user base, **[Recommendation]** exceeding AA toward AAA contrast ratios on body copy and form labels is worth considering even though AAA site-wide is not the official target.

4. **Text alternatives** **[Official Requirement]**: SC 1.1.1 Non-text Content (Level A) requires text alternatives for all meaningful images (product photos of oxygen concentrators, hospital beds, etc.) — this is baseline, not optional, regardless of India's legal ambiguity, because it is also foundational for SEO image indexing.

5. **Forms** **[Official Requirement]**: SC 3.3.1 Error Identification (A), 3.3.2 Labels or Instructions (A), 3.3.3 Error Suggestion (AA), 1.3.1 Info and Relationships (A) — labels must be programmatically associated with inputs, errors must be identified in text (not color alone), and suggestions for fixing errors should be provided where feasible. Given the platform is lead-generation (rental/purchase inquiry forms are the core conversion action), these criteria are business-critical, not just compliance items.

6. **Keyboard operability** **[Official Requirement]**: SC 2.1.1 Keyboard (A) and 2.4.7 Focus Visible (AA) require all functionality operable via keyboard with a visible focus indicator. Relevant for older adults and motor-impaired users who may rely on keyboard/switch devices rather than precise pointer control.

7. **Reflow and zoom** **[Official Requirement]**: SC 1.4.10 Reflow (AA) requires content to reflow to a single column at 320 CSS px width / 400% zoom without loss of information or horizontal scrolling; SC 1.4.4 Resize Text (AA) requires text to be resizable to 200% without loss of content or function. Both are highly relevant since elderly users commonly increase browser zoom/OS text size rather than rely on a site's own font-size toggle.

8. **Motion and animation** **[Official Requirement]**: SC 2.3.1 Three Flashes or Below (A) and SC 2.2.2 Pause, Stop, Hide (A) govern flashing/moving content; SC 2.3.3 Animation from Interactions (AAA) allows users to disable non-essential motion triggered by interaction. **[Recommendation]** Respect the `prefers-reduced-motion` media query site-wide, which is an industry best practice beyond the letter of AA.

9. **Legal context — India** **[Observation, verified via WebSearch August 2026]**: India's Rights of Persons with Disabilities (RPWD) Act, 2016 requires public and private establishments to provide accessible services but does not name WCAG or any specific technical standard in the law itself. The "Guidelines for Indian Government Websites" (GIGW) make WCAG 2.1 AA compulsory for government sites only. IS 17802 is an emerging Indian standard referenced by some accessibility vendors but is not confirmed as legally binding on private entities in the sources reviewed. Net effect: EnconeMed has no current statutory obligation to meet WCAG on its public marketing/lead-gen site, but conformance meaningfully reduces RPWD "reasonable accommodation" risk and is standard due-diligence practice for any company touching healthcare/elderly populations.

10. **Legal context — US as reference pattern** **[Official Requirement, but not applicable to India]**: The US DOJ's 2024 Title II ADA rule mandates WCAG 2.1 AA for state/local government web content, with compliance deadlines extended in 2026 (April 2027 for larger entities, April 2028 for smaller). This is cited only as an illustration of how WCAG 2.1/2.2 AA functions as the default legal reference point internationally — it does not bind EnconeMed directly.

11. **Accessibility ↔ Core Web Vitals/SEO overlap** **[Industry Best Practice]**: Alt text and optimized images improve both SC 1.1.1 compliance and Largest Contentful Paint (LCP); stable, non-shifting layouts improve both cognitive accessibility (SC 3.2.x, avoiding unexpected context changes) and Cumulative Layout Shift (CLS); semantic HTML benefits both screen readers and search-engine crawlability. Google has stated Core Web Vitals are a ranking signal, and accessibility remediation frequently improves these metrics as a side effect, though accessibility conformance itself is not a direct Google ranking factor.

## Implementation Notes

- Given Next.js 15 + HeroUI + Tailwind stack, **[Recommendation]** bake contrast tokens (meeting 4.5:1 minimum) directly into the Tailwind/HeroUI theme config rather than relying on component-by-component checks, since color decisions made once in a design system propagate everywhere.
- **[Recommendation]** Treat 2.5.8 Target Size and 2.4.11 Focus Not Obscured as hard requirements for the sticky call/WhatsApp CTA component specifically, since that pattern is called out by name in this research as a likely EnconeMed pattern.
- **[Recommendation]** Any inquiry/lead form should implement 3.3.1–3.3.3 (label association, inline error text with icon+text not color-only, and constructive error suggestions) as baseline QA gates before launch, since forms are the core conversion mechanism.
- **[Observation]** Because India has no binding technical standard, WCAG AA should be treated internally as a self-imposed quality bar tied to brand promise ("Delivered with Care") rather than a legal compliance checkbox — this affects how the Product Architect scopes it (product requirement vs. legal requirement).

## Common Mistakes

- **[Industry Best Practice]** Treating color alone as an error/status indicator (e.g., a red border with no text) — fails SC 1.4.1 Use of Color and 3.3.1.
- **[Industry Best Practice]** Building custom dropdowns/sliders/date-pickers without keyboard support — a known failure mode for SC 2.1.1, and simultaneously a documented NN/g finding that such widgets specifically frustrate older users with reduced motor precision.
- **[Industry Best Practice]** Fixed/sticky headers or chat widgets that cover focused elements when tabbing through the page — the exact failure SC 2.4.11 was introduced to address in WCAG 2.2.
- **[Industry Best Practice]** Assuming AAA-level conformance is achievable or desirable site-wide; W3C explicitly advises against mandating AAA broadly since some AAA criteria are content-type-specific and cannot be met universally.
- **[Observation]** Confusing "WCAG is not legally mandated in India" with "accessibility doesn't matter" — given the user base (elderly, caregivers, disabled patients), this would be a product/brand risk independent of legal exposure.

## Recommended Practices

- **[Recommendation]** Target WCAG 2.2 Level AA as the internal quality bar for the full site, prioritizing the six new 2.2 criteria (2.4.11, 2.5.7, 2.5.8, 3.2.6, 3.3.7, 3.3.8) since these represent the most current thinking on real-world barriers.
- **[Recommendation]** Support `prefers-reduced-motion` and avoid autoplay/auto-advancing carousels, which intersect both AAA-level motion guidance and general elderly-user usability findings.
- **[Recommendation]** Design forms with visible, persistent labels (not placeholder-only), inline text+icon error messages, and minimal required fields — this is simultaneously an accessibility requirement (3.3.2) and a documented conversion-rate lever (see 11-healthcare-ux.md).
- **[Recommendation]** Provide a visible, consistent contact/help affordance (phone/WhatsApp) in the same page position across all pages, satisfying 3.2.6 Consistent Help while also serving the emergency-user need for a fast escape hatch to a human.

## Things to Avoid

- **[Industry Best Practice]** Do not rely on font-size in pixels without ensuring text reflows properly at 200-400% zoom (SC 1.4.4, 1.4.10).
- **[Industry Best Practice]** Do not use touch targets smaller than 24×24 CSS px for primary actions (call button, add-to-inquiry, form submit) without adequate spacing compensation.
- **[Industry Best Practice]** Do not gate essential information behind hover-only tooltips, which fail keyboard/touch accessibility and disproportionately hurt elderly/touchscreen users.
- **[Observation]** Do not present WCAG AAA conformance claims publicly unless genuinely verified — overclaiming accessibility conformance carries reputational and (in some jurisdictions) legal risk.

## Future Considerations

- **[Observation]** Monitor whether India's Ministry of Electronics and IT (MeitY) or a future amendment to RPWD Rules formally adopts WCAG or IS 17802 as binding for private-sector digital services; this research found no confirmed binding status as of August 2026, but the regulatory direction (per GIGW's WCAG 2.1 AA mandate for government sites) suggests movement toward private-sector expectations over time.
- **[Observation]** WCAG 2.2 is stable, but a WCAG 3.0 draft exists at the W3C Working Draft stage with a substantially different scoring model; it is not yet a Recommendation and should not be adopted as an official target, only monitored.
- **[Recommendation]** Re-verify India's regulatory status and any EnconeMed-specific sector regulation (e.g., healthcare-adjacent consumer protection rules) at each major product phase, since this area is evolving faster than general web accessibility law.

## Checklist

- [ ] Confirm color tokens meet 4.5:1 (normal text) / 3:1 (large text) contrast — SC 1.4.3 (AA)
- [ ] Confirm all interactive targets ≥24×24 CSS px or equivalent spacing — SC 2.5.8 (AA)
- [ ] Confirm no sticky/fixed element obscures keyboard focus — SC 2.4.11 (AA)
- [ ] Confirm all form inputs have programmatically associated, persistent labels — SC 3.3.2 / 1.3.1 (A)
- [ ] Confirm form errors are identified in text (not color-only) with correction guidance — SC 3.3.1 / 3.3.3 (A/AA)
- [ ] Confirm help/contact mechanism appears in consistent relative position across pages — SC 3.2.6 (A)
- [ ] Confirm all images/icons have appropriate alt text or are marked decorative — SC 1.1.1 (A)
- [ ] Confirm full keyboard operability and visible focus indicators across all flows — SC 2.1.1 / 2.4.7 (A/AA)
- [ ] Confirm content reflows at 320px width / 400% zoom without horizontal scroll — SC 1.4.10 (AA)
- [ ] Confirm `prefers-reduced-motion` is respected and no unexplained auto-playing motion exists
- [ ] Note internally that WCAG AA is a voluntary brand/quality commitment, not (currently) an Indian legal mandate for private sites — flag for legal review if EnconeMed later operates in jurisdictions with binding requirements (e.g., serving US/EU customers)
