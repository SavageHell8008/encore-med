# Phase 1 — Build Handover

> **Update, 6 Aug 2026 (homepage vertical rhythm).** Every homepage section
> carried `py-24 lg:py-32` — 128px top **and** bottom — so two adjacent sections
> produced 256px of dead space before their own internal margins counted.
> Measured gaps were 236–306px.
>
> All sections are now `py-16 lg:py-20` (80px), and the hero's tail dropped from
> `lg:pb-28` to `lg:pb-14`. Measured gaps are now 136–210px at 1440px and
> 120–162px on mobile.
>
> The hero's scroll indicator was removed. It read "What we supply" with a
> chevron — the same words as the section label immediately below it, separated
> by 236px of nothing.
>
> ⚠️ **`<Testimonials />` renders nothing**, and that is deliberate, not a bug:
> `TESTIMONIALS_VERIFIED` is `false` in `src/data/testimonials.ts` because the
> quotes are still placeholders ("Sample Name"). The component refuses to render
> unverified social proof. Flip that flag once real, attributable quotes exist —
> the section will appear between 04 and 05.

> **Update, 6 Aug 2026 (hero is now a static image).** The Three.js scene is
> gone. `public/hero.png` (1536×1024) renders through `next/image` with
> `priority`, verified emitting a `<link rel="preload" as="image">` in the built
> output.
>
> Removed with it: `three`, `@react-three/fiber`, `@react-three/drei`,
> `@types/three`, the `@react-three/drei` entry in `optimizePackageImports`, and
> `EquipmentScene.tsx`. Remaining runtime deps are just clsx, framer-motion,
> lucide-react, next, react, react-dom, tailwind-merge, zod.
>
> `Hero3D.tsx` → `Hero.tsx`, `Hero3D` → `Hero`. The name described the
> implementation, and the implementation is no longer 3D.
>
> Worth knowing: `hero.png` is a ~1.8 MB PNG in the repo. `next/image` converts
> and resizes it on demand, so users never download that — but a pre-compressed
> source would shrink the repo and speed up builds.
>
> **Sizing.** The hero is now square (1024×1024) and the two columns are close to
> level: at a 1600px viewport the image renders 687×687 against a 678px text
> column. Getting there needed two non-obvious fixes:
> - The CTA row's three `whitespace-nowrap` buttons gave the text column a 681px
>   **min-content floor**, which silently overrode the grid's `fr` ratio — the
>   image got whatever was left regardless of what the template said. Fixed with
>   `sm:flex-wrap` plus a shorter primary label.
> - The hero `Container` is widened to `xl:max-w-[88rem]`. `max-w-7xl` is right
>   for reading width and wrong for a two-column hero; it was leaving ~235px of
>   dead margin either side on a 1750px display.
>
> **If the hero image ever looks stale after replacing the file:** Next 16 caches
> optimised transforms in `.next/dev/cache/images` (moved from
> `.next/cache/images`), keyed on url/w/q only — unknown query params are
> ignored, so cache-busting does nothing and restarting the dev server does not
> help either. Delete that directory.

> **Update, 6 Aug 2026 (Care Essentials).** `/care-essentials` is no longer a
> placeholder. Seven consumables from `public/care-essentials/` (folder renamed
> from "Care essential", files given clinical slugs), each with an index card and
> a full detail page at `/care-essentials/[slug]`.
>
> Modelled as `CareEssential`, **not** `Product` — consumables are bought
> repeatedly, sized rather than specified, and never rented, so a `Product` with
> half its fields empty would have been the wrong shape. They also stay out of
> the equipment filters, which is correct.
>
> Two flags decide the schema, and they are deliberately separate:
> - `medical` — has clinical risk worth publishing (6 of 7).
> - `regulatedDevice` — is a notified device under the MDR 2017 (5 of 7).
>
> Adult diapers have the first and not the second: real skin-injury guidance
> worth rendering, but typing them `schema.org/MedicalDevice` would assert a
> regulatory status their own `legalStatus` text denies. Catheter lubricant gel
> has neither and is a plain Product.
>
> Four new family profiles in `medical-profiles.ts`: `urinaryCatheter`,
> `enteralFeeding`, `ppe`, `incontinence`. `validate-schema.mjs` now walks both
> catalogues and additionally fails if a *non*-device item sprouts MedicalDevice
> properties. **35 nodes valid** (28 equipment + 7 consumables).
>
> Equipment filters were audited end to end: all 10 category filters, 10 category
> pages, 5 problem filters and both intent filters return the correct products,
> 28/28 accounted for with no misfiles. One bug found and fixed — category H1s
> read "on rent & sale" even for sale-only categories (Pressure Care, Hospital
> Furniture); the suffix is now derived from the products on the page.

> **Update, 6 Aug 2026 (real catalogue, brand assets, no prices).**
>
> **Prices are gone, everywhere.** Enforced structurally, not by convention:
> `Product` has no field capable of holding an amount, and `formatMoney` /
> `schemaPrice` were deleted from `lib/utils.ts`. Adding a price back to one
> page now requires editing `lib/types.ts` first. `npm run validate:schema`
> fails the build output if `price`, `priceSpecification`, `lowPrice` or
> `highPrice` appears in any Offer. Every commercial CTA is "Get the best quote".
> Accepted cost: no price-carrying product rich results in Google.
>
> **Catalogue rebuilt from the uploaded photos** — 28 products, replacing the 9
> placeholders. `public/Equipment/rental` (12 items) → `offerMode:
> "rent-or-buy"`; `public/Equipment/for-sale` (16 items) → `offerMode:
> "buy-only"`. Both folders were renamed to lowercase-hyphen ("For sale" →
> "for-sale") because a space in an image path must be percent-encoded at every
> use site, and one missed encoding is a broken image.
>
> **Clinical content is now family-based.** `data/medical-profiles.ts` holds ten
> device-family profiles (bed, oxygen, pap, monitor, mobility, pressureCare,
> pump, suction, furniture, icuSetup); products layer specifics on via
> `profile(key, extra)`, which *appends* contraindications and adverse outcomes
> rather than replacing them — a specific device never has fewer risks than its
> family. All 28 pass MedicalDevice validation.
>
> **Taxonomy grew** to 10 categories (added pressure-care, suction, pumps,
> hospital-furniture; `oxygen-concentrators` → `oxygen-therapy`).
>
> **Brand assets.** `src/app/icon.svg` is the uploaded favicon (Next metadata
> convention); the default `src/app/favicon.ico` was deleted so the two do not
> compete. `components/ui/Logo.tsx` wraps `/logo.svg` for header and footer.
>
> ⚠️ Two asset caveats worth acting on:
> - `logo.svg` is a **raster image wrapped in SVG**, not true vector — hence
>   144 KB for a 36 px header mark. A real vector or a 2× WebP would be a
>   straight win; the `Logo` component means that swap touches one file.
> - Product photos are **300×300**. They display fine at card size with
>   `object-contain`, but they cannot fill a large gallery sharply and will look
>   soft on high-DPI screens. Larger source images would help most.
>
> Also removed: Encone Care's nursing day-rates from `/home-care`. They were
> verified from enconecare.in, but they were still figures on the page. Say the
> word and they go back.

> **Update, 6 Aug 2026 (light theme).** The site is now white with a very light
> green gradient wash, replacing the dark theme. Surface tokens were renamed
> `dark-*` → `surface` / `surface-raised` / `surface-sunken` / `surface-strong`,
> since "dark-primary" holding `#FFFFFF` is a trap for the next person.
>
> The accents are deep, not neon: `#047857` green, `#166534` mint, `#0F766E`
> teal, `#92400E` amber. A bright green cannot clear 4.5:1 on white, so tints
> come from opacity modifiers (`bg-brand-green/8`) rather than lighter tokens.
> Verified: **0 contrast failures** across home, product, and home-care pages.
>
> Things that needed rethinking rather than recolouring:
> - **Primary button** is now solid green with white text. A translucent tinted
>   button reads as *disabled* on white.
> - **Cards** are opaque white, not translucent — on a tinted page a see-through
>   card picks up the gradient and every card in a row ends up a different shade.
> - **Product badges** carry an opaque white base; a 10% tint over an
>   unpredictable photo is not a legible background.
> - **The 3D scene** was re-lit, not recoloured. High metalness on a white page
>   mirrors the background and the silhouette dissolves, so the casing is now
>   low-metalness off-white plastic with a fill light from below. The screen
>   stays dark — it is the one anchor of contrast the composition hangs off, and
>   the vivid green ECG trace still works *there* because its backdrop is
>   near-black.
> - **Glows became shadows.** A glow on white reads as a blur, so `shadow-glow`
>   now resolves to a green-tinted ring plus soft drop shadow.
>
> Caveat: the browser preview could not composite screenshots this session, so
> this was verified by computed-style audit rather than by eye. Worth a visual
> pass.

> **Update, 6 Aug 2026 (schema).** Every product now carries a full
> [schema.org/MedicalDevice](https://schema.org/MedicalDevice) profile on the same
> node as `Product`, driven by `Product.medical` in `src/data/products.ts` and
> typed as `MedicalProfile` in `src/lib/types.ts`.
>
> Emitted: `procedure`, `preOp`, `postOp`, `contraindication`
> (MedicalContraindication nodes), `adverseOutcome` / `seriousAdverseOutcome`
> (MedicalEntity nodes, split by severity), `relevantSpecialty` and
> `medicineSystem` (`@id` references to the enumeration members), `legalStatus`,
> `alternateName` (lay synonyms) and `identifier`.
>
> Three properties are deliberately **not** emitted, and this is a decision, not
> an omission to fix later:
> - `recognizingAuthority` — means "the organization that officially recognizes
>   this entity as part of its endorsed system". Naming CDSCO there asserts an
>   endorsement that does not exist. Device class goes in `legalStatus` instead.
> - `purpose` — schema.org still publishes the `MedicalDevicePurpose` enumeration,
>   but `/purpose` itself 404s, so it is not current vocabulary.
> - `code` — no real UDI, GMDN or SNOMED-CT identifiers are held for these units.
>
> `npm run validate:schema` (after `npm run build`) checks the built HTML against
> the verified vocabulary and fails on unknown properties, wrong node types,
> invalid MedicalSpecialty members, a present `recognizingAuthority`, or a lost
> `offers`. All 9 products pass.
>
> The whole profile is also rendered visibly by
> `src/components/product/SafetyInformation.tsx`, from the same object — marking
> up contraindications that appear nowhere on the page is a structured-data
> violation, and a family deserves to read them before booking anyway.

> **Update, 6 Aug 2026.** Palette moved from neon cyan/purple to green-on-near-black
> (`#05100C` base, `#00E58F` accent) to match the Encone Care mark. Layout moved to
> an editorial system — numbered section labels, two-tone Archivo display headings,
> and one bordered plate split by hairlines instead of floating cards
> (`SectionLabel`, `DisplayHeading`, `CapabilityGrid`).
>
> Contact details, the registered office, operating stats, all ten home-care
> services, the condition pages and the nine-city coverage list were pulled from
> **enconecare.in** and are now marked "verified" in `src/lib/constants.ts`.
> Two corrections came out of that: the legal entity is **Encone Care Private
> Limited** (not "Encone Care Nurses Private Limited"), and the parent already
> promises equipment install in **under 4 hours**, not same-day — the copy now
> says four hours throughout.
>
> `SERVICE_AREAS` gained a third tier. `live` = EnconeMed delivers equipment
> (Delhi, New Delhi). `care-network` = Encone Care nursing is on the ground and
> equipment is on request (Noida, Greater Noida, Gurgaon, Ghaziabad, Faridabad,
> Lucknow, Kanpur, Prayagraj, Varanasi). Only `live` areas get a location page.


Status at end of this pass: **Next.js 16 / React 19 / Tailwind v4 app builds clean,
33 routes, lint clean.** Everything below is either a decision you should know
about or a blocker before this can go live.

---

## Must be resolved before launch

### 1. Brand name — `EconeMed` vs `EnconeMed`

The build brief says **EconeMed** on `econemedical.in`. All 36 Phase 0/0.5
research documents say **EnconeMed** (parent company: Encone Care Nurses Private
Limited → Encone + Med). These are different strings.

`05-geo.md` is explicit that entity naming must be byte-identical across the
site, Google Business Profile, schema markup and directory listings, or the
entity graph will not consolidate them.

The code defaults to **EnconeMed**, set in one place — `BRAND.name` in
`src/lib/constants.ts`. Changing it there propagates everywhere except the two
places where the logotype is split for colour (`Header.tsx`, `Footer.tsx`) and
the OG image. Decide this before any external listing is created.

### 2. All commercial data is placeholder

`src/data/products.ts` — every price, deposit, minimum term, brand list and
specification is representative sample data, not EnconeMed inventory. A
published price is read as a commitment (`09-trust-psychology.md`), so none of
these numbers should ship.

### 3. The enquiry form does not deliver anywhere

`src/app/api/inquiry/route.ts` validates and rate-limits correctly, then writes
the lead to the server log and stops. There is no email, no CRM, no database.
In production every lead would be silently lost.
`15-emergency-user-behavior.md` classes an unanswered urgent enquiry as a
high-severity operational failure — wire `deliverLead()` to a real destination
and add alerting on failure.

### 4. Email address and CIN

Phone numbers (+91 88876 99109, +91 89208 13780) and the registered office
(S-558 Dwarka Bhawan, Shakarpur, Delhi 110092) are now verified from
enconecare.in. Two fields remain outstanding:

- **Email** — `care@econemedical.in` is a guess. The parent site publishes no
  address, so this must be confirmed.
- **CIN** — deliberately blank. Companies Act s.12(3)(c) disclosure is a legal
  statement, and the footer renders the CIN clause only when the value is set.

### 5. Testimonials are sample text

`src/data/testimonials.ts` contains three invented quotes to exercise the
layout. The section will not render until
`NEXT_PUBLIC_TESTIMONIALS_VERIFIED=true`. Do not set that flag until the quotes
are real, consented and dated.

### 6. Legal pages are honest placeholders, not policies

`/privacy`, `/terms`, `/refund-policy` exist so the internal link graph has no
dead ends, and are `noindex`. They state that the policy is with counsel rather
than fabricating one. `01-business-understanding.md` flags two unresolved
compliance questions that must go to a practitioner first:

- Whether equipment **rental** is taxed as a SAC-classified service at a
  different rate from the HSN-classified sale of the same item. All prices
  currently render as "excludes GST" for this reason.
- Whether device-vs-consumable labelling diverges post the 2025 LMPC carve-out.

### 7. Product photography

`public/images/products/` holds 15 generated SVG placeholders. Real photography
should be raster (`11-image-strategy.md`: 5–8 images per product, including at
least one authentic in-use shot and a functional close-up). When it lands,
remove `dangerouslyAllowSVG`, `contentDispositionType` and
`contentSecurityPolicy` from `images` in `next.config.ts` — they exist only to
let `next/image` serve the SVG placeholders.

---

## Decisions taken, and why

**Aesthetic.** Built as briefed: dark `#0F0F23` base, neon cyan/mint/purple,
Three.js hero, Framer Motion 3D card tilt. Noted for the record that
`10-premium-healthcare-brands.md`, `09-trust-psychology.md` and
`15-emergency-user-behavior.md` all argue against it for a medical trust
context; you chose the brief-led direction knowing that.

**No cart.** Per your instruction and `01-business-understanding.md`: EnconeMed
is an inventory-model lead-gen business, not a marketplace. Each product card
carries one button to the product page; the product page pairs the photo with a
sticky enquiry form (name, phone, city, rent/buy, equipment, optional note).

**Routing.** `/products/[slug]` for products and `/categories/[slug]` for
categories, kept as separate segments so a category slug can never collide with
a product slug.

**Faceted URLs.** `/products?category=…&need=…` renders server-side from plain
links and is served `noindex, follow`. It is deliberately *not* disallowed in
`robots.txt` — blocking it would stop crawlers reading the noindex directive.
`04-seo.md`: auto-generating category × brand × city URLs is the pattern
Google's scaled-content-abuse policy targets.

**Schema.** `Organization` + `WebSite` once at the root, keyed by `@id` and
referenced everywhere else. `Product` primary with `MedicalDevice` layered
second. Two `Offer`s per rentable item — `LeaseOut` and `Sell` — wrapped in an
`AggregateOffer`. `MedicalBusiness` (not generic `LocalBusiness`) on home and
location pages, with **no street address**, because a service-area business must
not publish one (`15-local-seo.md`). No `Review`/`AggregateRating` anywhere on a
business entity — self-serving review markup will not render (`07-eeat.md`).
`FAQPage` is still emitted for answer-engine extraction with a comment noting
its rich results were deprecated on 7 May 2026; no content decision depends on
it.

**Location pages** exist only for `live` service areas. Planned cities 404 by
design (`dynamicParams = false`) rather than implying same-day delivery to
somewhere we cannot reach.

**Deviations from the brief's `next.config.js`.** The proposed blanket
`Cache-Control: public, max-age=3600` on `/:path*` was dropped — it would let
caches serve stale pricing and stock for an hour with no revalidation path.
Security headers and image optimisation are in place instead.

---

## Not built yet

- `/blog` and `/care-essentials` are honest placeholders. Care Essentials needs
  its own catalogue with per-SKU certification tracking
  (`13-medical-supplies-industry.md`, `18-care-essentials-research.md`) — it is
  structurally a different section from durable equipment, not a sixth category.
- The guided "equipment finder" quiz (`17-equipment-finder-research.md`).
- GA4 / GTM and Search Console verification.
- The Cloudflare-in-front-of-Vercel stale-ISR problem flagged in
  `16-technical-architecture.md` as the single biggest open architectural
  question. Decide which layer owns cache invalidation and image optimisation
  before deploying behind Cloudflare.
