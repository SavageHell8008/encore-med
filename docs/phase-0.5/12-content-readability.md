# 12 — Content Readability Research

**Phase:** 0.5 — Research (no code, no UI, no components)
**Scope:** EnconeMed (Encone Care Nurses Private Limited) — premium medical equipment rental/sales, lead-generation model, India. Audience includes elderly users, stressed caregivers (frequently the actual site user, not the patient), and users with low vision or lower literacy in some segments.

---

## Executive Summary

Content readability for EnconeMed sits at the intersection of three well-documented but distinct bodies of research: (1) U.S. federal/CDC plain-language and health-literacy guidance, (2) HHS's "Health Literacy Online" web-specific writing and design guidance, and (3) UX scanning-behavior research (Nielsen Norman Group's F-pattern work and its more recent reframing). All three converge on the same practical target for EnconeMed: **write at roughly a 6th–8th grade reading level, front-load the most important information in the first two lines of any block, use short sentences and chunked content with clear headings, and treat scanning behavior as something good design should reduce dependence on, not something to passively accommodate.** For a caregiver-facing, India-based, non-clinician audience, this is more consequential than for a general e-commerce site: caregivers are often making time-pressured, emotionally loaded decisions (a parent is sick or has just been discharged), and label/instruction comprehension failures in this population have real safety implications, not just conversion implications. Readability work also intersects meaningfully with elderly/low-vision accessibility (font size, line length, contrast) — that intersection is covered here only insofar as it affects content/writing decisions; deeper WCAG accessibility implementation belongs to the Phase 0 accessibility documentation.

## Research Scope

This document covers: (1) CDC Clear Communication Index and plain-language/health-literacy writing guidance; (2) HHS Health Literacy Online guidance for writing and designing web content, with current-URL verification; (3) appropriate reading-level targets for a general caregiver (non-clinician) audience; (4) how users actually read on the web, including NN/g's F-pattern research and its documented 2024–2025 reframing; (5) content chunking and scannability techniques; (6) the intersection of readability with elderly/low-vision users (font size, line length, contrast), referencing but not duplicating WCAG accessibility depth.

## Evidence

### CDC Clear Communication Index / plain language
- **[Official Requirement]** The CDC Clear Communication Index (cdc.gov/ccindex/tool/index.html) is a live, current CDC tool (User Guide URL verified as still active) providing 20 research-based, scored criteria for developing/assessing public health communication materials, built to support compliance with the U.S. Plain Writing Act of 2010 and the National Action Plan to Improve Health Literacy.
- **[Official Requirement]** The Index is designed as a ~15-minute self-assessment scored 0–100, applicable by "anyone who develops public health communication materials," not just CDC staff — meaning it is directly usable as an internal content-QA checklist for EnconeMed's own writers, despite being a U.S. government tool.

### HHS Health Literacy Online
- **[Official Requirement]** HHS's Health Literacy Online guide is live at odphp.health.gov/healthliteracyonline (verified current as of this research pass; note the site has moved to the ODPHP/health.gov domain rather than the older HHS.gov path — cite the odphp.health.gov URL, not older cached HHS.gov links, going forward). It is explicitly a guide to *writing and designing* usable, easy-to-use health websites, evidence-based rather than opinion-based.
- **[Peer-Reviewed/Research-Backed]** Per the guide's "Write in plain language" section, complex sentence structures (especially sentences where a second clause changes the meaning of the first) impose a disproportionate cognitive load on lower-literacy readers; the guide recommends leading with context before new information/action steps ("if/then" framing) so readers can quickly judge relevance before committing working memory to the sentence.
- **[Peer-Reviewed/Research-Backed]** The guide states usability research shows many users prefer "just the basics" on a health topic rather than comprehensive detail — directly relevant to EnconeMed product/condition-education pages, where the temptation is to over-explain clinical detail.
- **[Official Requirement]** The guide's display/design section (Section 5.3, "Use a readable font that's at least 16 pixels") sets a specific, sourced minimum: body text should be at least 16px, explicitly because smaller sizes measurably reduce comprehension and completion rates for general web health content.
- **[Peer-Reviewed/Research-Backed]** The guide also emphasizes white space (between lines, paragraphs, around images, in margins) as a functional readability tool, not decoration — it separates content into cognitively manageable chunks.

### Reading-level targets for a general caregiver audience
- **[Peer-Reviewed/Research-Backed]** The American Medical Association (AMA) and NIH recommend patient education materials not exceed a 6th-grade reading level; the CDC's own recommendation is somewhat more permissive at an 8th-grade level. This is a documented, recurring finding across multiple peer-reviewed readability studies (e.g., PMC articles on readability of trauma-surgery, cardiology, physical-therapy, and anesthesiology patient materials).
- **[Peer-Reviewed/Research-Backed]** The average U.S. adult reads at roughly an 8th–9th grade level, with ~20% of adults reading at 5th-grade level or below — the commonly cited implication in the literature is that materials should target the 5th–6th grade level to reach the widest possible audience, not the "average" reading level.
- **[Peer-Reviewed/Research-Backed]** Multiple peer-reviewed audits (cited across PMC sources reviewed) repeatedly find real-world patient education materials fail these targets badly — one cited figure: only ~2.1% of materials audited met the AMA's 6th-grade target, and ~8.2% met the more lenient NIH 8th-grade target. This is a well-established, recurring finding pattern across specialties, strongly suggesting the failure mode is systemic (writers default to a much higher register than intended) rather than an isolated problem.
- **[Recommendation]** For EnconeMed, this argues for actively testing draft copy (product descriptions, condition/use-case education content, rental/purchase process explanations) against a readability formula (Flesch-Kincaid Grade Level, SMOG, or similar) with an explicit target of 6th–8th grade, and treating "sounds too simple" instinct from clinically-trained reviewers as a known bias to override, not a valid design signal.
- **[Observation]** No India-specific health-literacy reading-level research was located in this pass; the 6th–8th grade U.S. targets are a reasonable proxy given English-language content for an English-reading, internet-using Indian audience, but this should be flagged as an assumption, not a verified transfer, particularly if/when EnconeMed produces Hindi or other regional-language content, where readability formulas built for English do not directly apply.

### How users read on the web (F-pattern and its reframing)
- **[Peer-Reviewed/Research-Backed]** Nielsen Norman Group's original 2006 eye-tracking research documented an "F-shaped" scanning pattern: users read across the top, scan down the left edge, and make a second, shorter horizontal sweep, with attention dropping off sharply as they move down and right. NN/g's own more recent commentary states users allocate only around 20% of attention to below-the-fold content even when they do scroll — this specific NN/g figure remains part of current NN/g guidance, not retracted.
- **[Industry Best Practice]** More recent (2024) industry analysis (e.g., Smashing Magazine) has reframed the F-pattern: rather than a fixed law of how humans read, it is increasingly understood as a *fallback scanning behavior triggered by poor content structure* — i.e., F-shaped scanning is what users do when a page fails to visually guide them, not an immutable behavior designers should passively design around. This is a meaningful nuance: the actionable takeaway shifts from "put content in an F-shape" to "structure content (headings, front-loaded key info, visual hierarchy) so users don't need to fall back on undirected F-scanning at all."
- **[Recommendation]** The practical synthesis for EnconeMed: put the single most important piece of information (price/availability, key safety fact, primary call-to-action) in the first one to two lines of any content block, since that is both where F-pattern scanning concentrates *and* where well-structured content naturally draws attention regardless of scanning pattern — this recommendation is robust to either interpretation of the underlying research.

### Content chunking and scannability
- **[Peer-Reviewed/Research-Backed]** HHS Health Literacy Online guidance (as above) explicitly recommends white space and short chunks as tools for both readability and reduced cognitive load for lower-literacy readers, not merely visual style.
- **[Industry Best Practice]** General UX-writing/content-design practice (consistent across NN/g's broader body of work beyond the single F-pattern study) recommends: descriptive, front-loaded headings and subheadings; bulleted lists over dense paragraphs for multi-item information (e.g., "what's included in this rental," "eligibility for this equipment"); one idea per sentence; avoidance of nested/conditional sentence structures.
- **[Recommendation]** For EnconeMed specifically, product and process pages (e.g., "How rental works," "Documents needed for oxygen concentrator rental") are strong candidates for numbered-step chunking rather than prose, directly serving both scanability and the lower-literacy-friendly "if/then, one step at a time" structure HHS recommends.

### Intersection with elderly/low-vision users
- **[Peer-Reviewed/Research-Backed]** HHS Health Literacy Online's Section 5.3 sets 16px as a documented minimum body font size, citing measurable comprehension/completion effects at smaller sizes.
- **[Industry Best Practice]** Broader accessibility/typography industry sources reviewed (e.g., ReciteMe, TRKKN, Human Standards) commonly recommend going further for older-adult audiences specifically — body text around 18–19px (roughly 14pt) — though this is industry-practitioner guidance rather than a single controlled study, and should be read as a reasonable design target rather than a hard compliance number. WCAG's own contrast/size requirements are the binding compliance layer and are covered in the Phase 0 accessibility documentation, not duplicated here.
- **[Peer-Reviewed/Research-Backed]** WCAG's documented minimum contrast ratio (4.5:1 for normal text, 3:1 for large text) is supported by cited research showing users with moderately low vision (around 20/40) can read text reliably at the 4.5:1 threshold — i.e., the WCAG number is not an arbitrary compliance figure but tied to a specific visual-acuity research basis.
- **[Peer-Reviewed/Research-Backed]** Independent research on text spacing for low-vision/macular-disease readers found that increased line and word spacing produced substantial reading-speed gains (one cited study: roughly 26% faster with high-contrast text and 46% faster with low-contrast text when spacing was increased) — a strong, specific, peer-reviewed finding directly relevant to EnconeMed's elderly/low-vision user segment.
- **[Industry Best Practice]** General typographic guidance reviewed suggests eyes fixate 7–9 times per text line, and that lines which are too long cause fatigue/re-reading while lines that are too short disrupt reading rhythm — commonly operationalized as roughly 50–75 characters per line for body text (this specific character count is a long-standing typographic industry convention, not a source-verified research figure in this pass, and is flagged accordingly).
- **[Recommendation]** For EnconeMed, content readability decisions (sentence length, chunking, heading structure) should be made in tandem with — not independently of — the typographic/contrast decisions in the Phase 0 accessibility documentation, since the research shows these compound: dense, jargon-heavy prose at borderline-compliant font size and contrast is a worse failure than either problem alone.

## Official Sources (where available)
- CDC — Clear Communication Index User Guide: https://www.cdc.gov/ccindex/tool/index.html
- CDC — Clear Communication Index User Guide (PDF): https://www.cdc.gov/ccindex/pdf/clear-communication-user-guide.pdf
- HHS/ODPHP — Health Literacy Online, "Write in plain language": https://odphp.health.gov/healthliteracyonline/create-actionable-content/write-plain-language
- HHS/ODPHP — Health Literacy Online, "Use a readable font that's at least 16 pixels": https://odphp.health.gov/healthliteracyonline/design-easy-scanning/use-readable-font-thats-least-16-pixels
- Nielsen Norman Group — "F-Pattern in Reading Digital Content" (video/summary): https://www.nngroup.com/videos/f-pattern-reading-digital-content/
- W3C WAI — WCAG contrast and text-alternative guidance (referenced for the contrast-ratio research basis; full accessibility depth is in the Phase 0 accessibility doc): https://www.w3.org/WAI/WCAG21/Understanding/text-alternatives

## Industry Research
- PMC (PubMed Central) peer-reviewed readability audits of patient education materials across multiple specialties (trauma surgery, cardiology, physical therapy, anesthesiology) — consistently find real-world materials exceed recommended reading levels; used here as corroborating peer-reviewed evidence for the 6th–8th grade target, not individually re-verified article-by-article in this pass.
- Smashing Magazine (2024) reframing of F-pattern scanning as a fallback/failure-state behavior rather than a design target — an industry-practitioner reinterpretation of NN/g's original data, not a new controlled study.
- Typography/accessibility industry sources (ReciteMe, TRKKN, Human Standards, Marketing Partners "Vision Changes: Typography for Aging Audiences") on font size and line-length conventions for older/low-vision audiences — practitioner guidance, directionally useful, not independently peer-reviewed in this pass.

## Important Findings
- **[Peer-Reviewed/Research-Backed]** There is a large, well-documented, and apparently systemic gap between recommended reading levels (6th–8th grade) and actual patient-material reading levels in practice — this is not a hypothetical risk but a repeatedly measured failure across many healthcare content domains.
- **[Industry Best Practice]** The F-pattern is real as an observed behavior but is increasingly understood by practitioners as evidence of poor content structure rather than a pattern to design *for* — the actionable guidance (front-load key info, strong heading hierarchy) is the same either way, so EnconeMed doesn't need to resolve this debate to act on it.
- **[Peer-Reviewed/Research-Backed]** Font size, contrast, and line/word spacing have specific, cited, measurable effects on reading speed and comprehension for low-vision readers — these are not soft "nice to have" preferences.
- **[Observation]** No India-specific or Hindi/regional-language health-literacy research was found; this is a real gap if EnconeMed expands beyond English content.
- **[Official Requirement]** Both the CDC Clear Communication Index and HHS Health Literacy Online guide are still live, current, and usable directly as internal QA tools for EnconeMed's content team, not just as background reading.

## Design Implications
- **[Recommendation]** Set body copy at minimum 16px, with 18–19px as a preferred target for primary content given the elderly-heavy audience.
- **[Recommendation]** Constrain body-text line length to a comfortable reading measure (commonly recommended in the 50–75 character range) rather than letting text stretch full-width on wide viewports.
- **[Recommendation]** Use generous line-height/spacing (at least 1.5x font size) as a readability lever, not purely an aesthetic one, given the cited reading-speed research for low-vision users.
- **[Recommendation]** Structure process/instructional content (rental steps, document checklists, eligibility criteria) as numbered lists or short chunked steps rather than prose paragraphs.

## Business Implications
- **[Recommendation]** Given the documented, repeated failure of health content generally to hit recommended reading levels, EnconeMed should build a readability check (e.g., Flesch-Kincaid or SMOG scoring) into its content QA workflow as a standing practice, not a one-time audit — this is a process/tooling recommendation, not a one-off content edit.
- **[Observation]** Because the buyer is frequently a caregiver acting under stress/time pressure (not a leisurely researcher), readability failures here plausibly translate directly into lead-generation drop-off (confused or overwhelmed users abandoning a form or call) — this is a reasonable business inference from the research, not itself independently measured for EnconeMed.
- **[Recommendation]** Clinically-trained content reviewers (if any are involved, e.g., nursing staff reviewing copy for accuracy) should be paired with a plain-language reviewer/process, since the cited literature suggests expert reviewers systematically underestimate how simple patient-facing copy needs to be.

## SEO Implications
- **[Industry Best Practice]** Content structured with clear, descriptive headings and front-loaded key information tends to align well with how search engines extract featured snippets and answer-box content, though this document does not treat SEO mechanics as its focus (see other Phase 0.5 documents for SEO-specific research).
- **[Observation]** Plain-language, well-chunked content is generally easier for search engines' natural-language processing to parse into distinct topical segments, which is a plausible secondary SEO benefit of readability work, though not something independently verified in this research pass.

## AI Search Implications
- **[Observation]** AI answer engines generally favor content with clear, direct, self-contained statements (a fact stated plainly in one sentence is easier to extract and cite than the same fact buried in a complex, multi-clause sentence) — this aligns naturally with the plain-language, "context-first" sentence structure HHS's Health Literacy Online guide already recommends for human readers, meaning good health-literacy writing and good AI-search extractability point in the same direction rather than in tension.
- **[Recommendation]** Numbered-step and short-chunk content structures (already recommended above for human scannability) are also more readily extractable by AI summarization/answer systems, giving EnconeMed's plain-language investment a plausible dual benefit; this is a reasonable extrapolation, not a documented AI-search-specific guideline, since no official "AI Search content guidelines" document was found in this pass.

## Recommendations
- **[Recommendation]** Target 6th–8th grade reading level for all consumer-facing copy, verified with a readability formula (Flesch-Kincaid Grade Level or SMOG) as part of content QA.
- **[Recommendation]** Write "if/then," context-first sentences; avoid clauses that retroactively change the meaning of an earlier clause.
- **[Recommendation]** Front-load the single most important fact or action in the first one to two lines of every content block (product summary, process step, safety note).
- **[Recommendation]** Use numbered steps/short chunks for process and eligibility content rather than prose paragraphs.
- **[Recommendation]** Set body font size at minimum 16px (prefer 18–19px), line length in a comfortable reading measure, and line-height of at least 1.5x, in coordination with the Phase 0 accessibility documentation.

## Things To Avoid
- **[Recommendation]** Avoid clinical/jargon-heavy phrasing by default; reserve precise clinical terminology for where it's genuinely necessary, paired with a plain-language explanation.
- **[Recommendation]** Avoid dense, unchunked paragraphs for any instructional or eligibility content — this is one of the most consistently cited failure modes in the peer-reviewed readability literature reviewed.
- **[Recommendation]** Avoid relying on "how users read" assumptions (F-pattern) as a justification for weak content structure — treat F-shaped scanning as a signal of a structural problem to fix, per the 2024 reframing, not a pattern to lean into.
- **[Recommendation]** Avoid trusting internal clinically-trained reviewers as the sole judge of whether copy is "simple enough" — the literature suggests this population systematically miscalibrates.
- **[Recommendation]** Avoid assuming English-language readability targets (6th–8th grade, Flesch-Kincaid, etc.) transfer directly to any future Hindi/regional-language content without separate validation.

## Future Considerations
- **[Observation]** If EnconeMed produces Hindi or other Indian regional-language content, a dedicated research pass on non-English health-literacy and readability-formula equivalents is needed; none was attempted here and none should be assumed from the English-language findings above.
- **[Observation]** User testing with actual target users (elderly patients, caregivers with varying literacy/tech comfort) would validate or challenge the reading-level and chunking recommendations far more reliably than secondary literature review; this document is a research foundation, not a substitute for usability testing.
- **[Observation]** As AI-search/GEO practices mature, a dedicated look at whether "AI-optimized" content structures diverge from plain-language, human-readability-optimized structures would be worth revisiting — in this pass, no divergence was found, but the field is new and guidance is still forming.

## Checklist
- [ ] All consumer-facing copy scored against a readability formula (Flesch-Kincaid or SMOG) with a 6th–8th grade target.
- [ ] Sentences reviewed for context-first ("if/then") structure; multi-clause sentences that change meaning mid-sentence flagged for rewrite.
- [ ] Process/eligibility/instructional content converted to numbered steps or short chunks, not prose paragraphs.
- [ ] Headings are descriptive and front-load the key point of the section below them.
- [ ] Body font size is at minimum 16px (18–19px preferred), with line-height at least 1.5x and a comfortable line length.
- [ ] Contrast ratios meet or exceed WCAG minimums (4.5:1 normal text / 3:1 large text) — cross-checked against Phase 0 accessibility doc.
- [ ] Clinically-reviewed copy has also passed a plain-language review pass.
- [ ] No English-only readability assumption applied to any non-English content without separate validation.
