# 03 — AI Search Systems: Retrieval, Entities, and Citation Behavior

Research scope: Google AI Overviews/AI Mode, ChatGPT Search, Gemini, Perplexity, Bing Copilot, and Claude — how each publicly describes retrieving and citing web sources, entity understanding, the Google Knowledge Graph, and documented (vs. inferred) factors affecting which sources get cited. Written for EnconeMed's Phase 0 planning; the goal is to separate what is officially documented from what is publicly observed or third-party-inferred, since most of these systems do not publish full retrieval/ranking mechanics.

## Executive Summary

Google is the only vendor in this set with an explicit, documented statement that **no special optimization is required or possible** to appear in its AI features (AI Overviews / AI Mode) beyond standard Search Essentials compliance. **[Official Requirement]** Google's AI features use a "query fan-out" technique — issuing multiple related sub-queries — and existing content controls (`nosnippet`, `noindex`, robots.txt, `Google-Extended`) govern participation. **[Official Requirement]** OpenAI (ChatGPT Search) and Perplexity both publicly describe citation as a core, visible product feature but do not publish ranking/selection algorithms; what's known about "why" a source gets picked is drawn largely from third-party analysis and should be labeled as observation, not official requirement. **[Observation]** Bing has begun formalizing this with a public "AI Performance" reporting surface in Bing Webmaster Tools and describes IndexNow as a mechanism to help AI systems see fresh content faster. **[Official Requirement, narrow scope]** No vendor in this set (including Anthropic/Claude) publishes a complete technical description of its retrieval-ranking algorithm; anything more specific than "it retrieves and cites web pages, favoring relevant, extractable, trustworthy content" is inference from public behavior, not documentation. **[Observation]**

## Official References

- AI Features and Your Website (Google Search Central) — https://developers.google.com/search/docs/appearance/ai-features
- AI Overviews in Google Search (Google Search Help) — https://support.google.com/websearch/answer/14901683
- Creating Helpful, Reliable, People-First Content (applies to AI features per Google's own cross-reference) — https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Knowledge Graph Search API reference (Google for Developers) — https://developers.google.com/knowledge-graph/reference/rest/v1
- ChatGPT Search (OpenAI Help Center) — https://help.openai.com/en/articles/9237897-chatgpt-search
- ChatGPT Search for Enterprise and Edu (OpenAI Help Center) — https://help.openai.com/en/articles/10093903-chatgpt-search-for-enterprise-and-edu
- Web search tool (OpenAI API/Developer docs) — https://developers.openai.com/api/docs/guides/tools-web-search
- How does Perplexity work? (Perplexity Help Center) — https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work
- What is Internal Knowledge Search (Perplexity Help Center) — https://www.perplexity.ai/help-center/en/articles/10352914-what-is-internal-knowledge-search
- Bing Webmaster Guidelines — https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a
- Introducing AI Performance in Bing Webmaster Tools (Bing Webmaster Blog, Feb 2026) — https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview
- Google Cloud Knowledge Graph / Enterprise Knowledge Graph docs — https://docs.cloud.google.com/enterprise-knowledge-graph/docs/search-api

No official, publicly documented technical page describing Gemini's or Claude's web-retrieval/citation ranking mechanics (beyond general product help pages) was located this session — treat statements about Gemini and Claude retrieval behavior below as **[Observation]** unless otherwise marked.

## Important Findings

- **[Official Requirement]** Google states directly for AI Overviews/AI Mode: *"There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."* Eligibility flows from a page already meeting standard Search technical requirements and being indexed with snippet eligibility (i.e., not blocked by `nosnippet`/`noindex`).
- **[Official Requirement]** Google's AI features use "query fan-out": the system issues multiple related sub-queries across subtopics and surfaces "a wider and more diverse set of helpful links" than a classic ten-blue-links result, which Google frames as an opportunity for a broader range of sites (not just historically top-ranked ones) to be surfaced for some subtopic of a query.
- **[Official Requirement]** Existing content-control mechanisms govern AI feature participation: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`, standard robots.txt directives for Googlebot, and the separate `Google-Extended` token which controls use of content for training Gemini/AI features specifically (distinct from standard crawling/indexing controls).
- **[Official Requirement]** Google explicitly says no new machine-readable file or AI-specific markup format is required to appear in AI features — i.e., there is no official "AI Overviews schema."
- **[Official Requirement]** An AI Overview is composed of an AI-generated summary, "key points" each linked to a source website, and a list of cited source links; Google states responses "may include mistakes," an explicit accuracy caveat published in user-facing help documentation.
- **[Observation]** Third-party analysis (not Google documentation) suggests AI Overviews draw disproportionately from pages that already rank well organically and/or have strong topical/entity clarity, but Google has not published a citation-selection algorithm; treat any "how to get cited in AI Overviews" claim beyond the official statements above as unverified industry inference.
- **[Official Requirement, product-documented]** OpenAI states ChatGPT's web-search-enabled responses include inline citations users can hover/click, plus a "Sources" list at the end of a response; a globe icon indicates web search was used; image results can carry their own citation/link. This describes user-facing behavior, not the retrieval-ranking algorithm.
- **[Observation]** Third-party analyses of ChatGPT Search citation behavior (relevance to query, page structure/extractability, freshness, authority signals) are widely discussed but are not confirmed by OpenAI's own documentation as ranking factors — flag as industry inference only.
- **[Official Requirement, product-documented]** Perplexity states it gathers information from "authoritative sources like articles, websites, and journals" and that every answer includes citations back to original sources for verification; Perplexity's help center does not publish a numeric or algorithmic source-selection formula. Claims about Perplexity selecting "3-4 sources" based on "direct relevance" and "extraction quality" originate from third-party analysis, not Perplexity's own help documentation — **[Observation]**, not official.
- **[Official Requirement, product-documented]** Bing's Webmaster Guidelines explicitly state they describe how Bing "discovers, crawls, indexes, evaluates, and surfaces content across Bing search experiences, Copilot, and grounding API results," i.e., Microsoft explicitly frames the same technical guidelines as governing both classic Bing search and Copilot/AI grounding.
- **[Official Requirement]** Microsoft explicitly states: *"SEO does not guarantee rankings or traffic, and GEO does not guarantee grounding or citations in AI experiences."* This is a notable, direct vendor statement that "Generative Engine Optimization" work is not a guarantee — useful to temper stakeholder expectations.
- **[Official Requirement]** Microsoft recommends pinging IndexNow when content is added/updated/deleted so that "AI systems reference the most current version of a page when generating answers" — an explicit, documented link between a technical freshness mechanism and AI-citation currency.
- **[Official Requirement]** Bing Webmaster Tools has a public "AI Performance" report (introduced Feb 2026, public preview) showing how a site's content appears/is cited across Microsoft Copilot and Bing's AI-generated summaries — the most concrete, officially-documented AI-citation analytics surface found across all vendors researched.
- **[Official Requirement]** Google's Knowledge Graph Search API documentation confirms entities are returned as structured JSON-LD following Schema.org conventions plus Google extensions, with fields like name, description, image, URL, and a relevance score — confirming schema.org markup is a legitimate input pathway toward entity recognition, though Google does not publish the exact weighting of on-site schema vs. other entity signals (link graphs, third-party citations, Wikipedia/Wikidata, etc.).
- **[Observation]** Google Cloud materials describe the Knowledge Graph as underpinning Gemini's entity recognition, relationship mapping, and intent understanding — this is Google Cloud enterprise-product documentation, not a Search-specific technical disclosure, so treat it as directionally informative rather than a guarantee about consumer Gemini/AI Overview behavior.
- **[Observation]** No official documentation was found describing Claude's (Anthropic's) or consumer Gemini's web-citation selection mechanics in the way Bing/OpenAI/Perplexity partially do; both companies publish user-facing product help but not retrieval-ranking technical detail as of this research.

## Implementation Notes

- **[Recommendation]** Because Google explicitly states no AI-specific markup is required, EnconeMed's structured-data investment should be justified primarily by the *general* Search/entity-clarity case (Section 02) rather than a belief that specific schema unlocks AI Overview citation — the causal link is not officially documented.
- **[Recommendation]** Configure IndexNow-style prompt-submission (where applicable to the hosting/CDN setup) so that content updates propagate quickly to any AI system that honors it, per Microsoft's explicit freshness-to-citation link.
- **[Recommendation]** Decide deliberately on `Google-Extended` and equivalent AI-training tokens (`GPTBot`, etc.) versus AI-search-citation bots (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`) — these are documented as separable controls, so EnconeMed can, in principle, opt out of model-training use while remaining eligible for citation in AI answers, or vice versa. Confirm current bot-token names directly against each vendor's published robots list before implementing, since these change.
- **[Recommendation]** Track Bing Webmaster Tools' AI Performance report post-launch as one of the only vendor-provided, first-party visibility tools into AI-citation behavior; there is no equivalent first-party reporting surface confirmed for Google AI Overviews, ChatGPT Search, or Perplexity in this research.

## Common Mistakes

- **[Observation]** Assuming a published "AI Overview algorithm" exists to optimize against — none of the vendors researched publish one; strategies claiming to "reverse-engineer" AI Overview citation logic are third-party inference, not documented mechanics.
- **[Observation]** Conflating AI-training opt-out controls (e.g., `Google-Extended`, `GPTBot`) with AI-search-citation opt-out — these are different bots/tokens with different effects, and treating them as interchangeable can accidentally block citation eligibility while trying only to block training, or vice versa.
- **[Observation]** Treating "Generative Engine Optimization" vendor claims as guaranteed outcomes — Microsoft's own guidelines explicitly disclaim that GEO work guarantees grounding or citation.

## Recommended Practices

- **[Industry Best Practice]** Maintain the same fundamentals that satisfy Google's Helpful Content guidance (Section 02) as the baseline strategy for AI-citation eligibility across all engines, since none of the researched vendors document a separate, distinct optimization path.
- **[Industry Best Practice]** Keep entity signals (consistent business name, address, structured Organization/MedicalBusiness data, consistent NAP details) coherent across the site and any third-party profiles, since Knowledge-Graph-style entity resolution is documented (at the API level) to consume structured, consistent identity data.
- **[Industry Best Practice]** Where feasible, submit sitemap/IndexNow pings on content updates to support the documented freshness-to-AI-citation link Microsoft describes.

## Things to Avoid

- **[Official Requirement]** Do not attempt cloaking or serving different content to AI crawlers vs. users — this falls under the same spam policies AI features explicitly say they rely on (Search Essentials apply).
- **[Recommendation]** Avoid committing engineering budget to speculative "AI Overview schema" or unverified third-party "GEO ranking factor" checklists as if they were confirmed technical requirements; budget them, if at all, as low-confidence bets clearly separated from Section 02's confirmed Google Search work.

## Future Considerations

- **[Observation]** This space is moving fast and pre-print/informal (AI Overviews, Bing AI Performance reports are all sub-12-months-old as of this research); Phase 0 architecture should avoid hard-coupling to any single AI engine's current behavior and instead invest in fundamentals (structured data, entity clarity, crawlability, freshness signaling) that plausibly generalize across engines.
- **[Observation]** Expect more vendors to publish first-party AI-citation analytics (following Bing's lead) — revisit this document when Google Search Console or OpenAI/Perplexity publish equivalent reporting, as that would upgrade several items above from [Observation] to [Official Requirement]-adjacent guidance.

## Checklist

- [ ] Confirm current AI-crawler bot-token list (training vs. citation bots) directly from each vendor before finalizing robots.txt policy
- [ ] Decide and document EnconeMed's stance on AI-training opt-out (`Google-Extended`, `GPTBot`, etc.) separately from AI-citation eligibility
- [ ] Ensure standard snippet-eligibility controls (`nosnippet`, `noindex`) are deliberately set, not accidental, on every page
- [ ] Set up IndexNow (or equivalent) submission on publish/update if hosting stack supports it
- [ ] Establish consistent entity identity (business name, address, structured Organization data) across site and external profiles
- [ ] Treat all "AI Overview / ChatGPT / Perplexity ranking factor" claims from blogs as unverified until cross-checked against official vendor documentation
- [ ] Plan to monitor Bing Webmaster Tools AI Performance report once live for the domain
- [ ] Re-audit this document in 2-3 months given the pace of change in this specific space
