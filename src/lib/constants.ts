/**
 * Single source of truth for brand, entity, contact and geography constants.
 *
 * Values marked "verified" were taken from enconecare.in (the parent company's
 * live site) on 5 August 2026. Values marked "placeholder" still need a human.
 *
 * ⚠️ BRAND NAME — STILL NEEDS A DECISION
 * The build brief spells the brand "EconeMed" on econemedical.in. The research
 * corpus and the parent company both point to "EnconeMed" (Encone Care + Med).
 * `05-geo.md` requires byte-identical entity naming across site, GBP, schema
 * and directories. Defaulting to "Encone Care"; change BRAND.name here only.
 */

export const BRAND = {
  /** Public-facing brand name. Must match GBP, schema and directories exactly. */
  name: "Encone Care",
  /** Verified: legal entity name. */
  legalName: "Encone Care Nurse Private Limited",
  parent: {
    name: "Encone Care",
    url: "https://enconecare.in",
    /** Verified: parent's own hero tagline. */
    tagline: "Your Health, Our Priority",
  },
  tagline: "Your Health, Our Priority",
  description:
    "Rent or buy medical equipment across Delhi NCR — hospital beds, oxygen concentrators, BiPAP and complete home ICU setups — from our own fleet, with documented sanitisation, technician installation and honest quotes.",
  /** Verified: "since 2022" on enconecare.in. */
  operatingSince: 2022,
} as const;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.enconemed.com"
).replace(/\/$/, "");

/**
 * Contact details.
 *
 * Phone numbers and the registered address are verified from enconecare.in.
 * The email is a placeholder — the parent site exposes no address publicly, so
 * it must be confirmed before launch rather than guessed at.
 */
export const CONTACT = {
  /** Verified: +91 888 769 9109 (primary line on enconecare.in). */
  phone: process.env.NEXT_PUBLIC_PHONE ?? "+918887699109",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "+91 88876 99109",
  /** Verified: second published line. */
  phoneAlt: process.env.NEXT_PUBLIC_PHONE_ALT ?? "+918920813780",
  phoneAltDisplay: process.env.NEXT_PUBLIC_PHONE_ALT_DISPLAY ?? "+91 89208 13780",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "918887699109",
  /** ⚠️ Placeholder — confirm the real inbox. */
  email: process.env.NEXT_PUBLIC_EMAIL ?? "care@enconecare.in",
  /** ⚠️ Placeholder — Companies Act s.12(3)(c). Leave blank rather than invent. */
  cin: process.env.NEXT_PUBLIC_CIN ?? "",
  /** Verified: S-548 School Block, Shakarpur Delhi, 110092 India. */
  registeredOffice: {
    street: "S-548 School Block",
    locality: "Shakarpur",
    city: "Delhi",
    region: "Delhi",
    postalCode: "110092",
    country: "IN",
  },
  hours: "Open 24×7 — equipment delivery 8:00 AM – 10:00 PM IST",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100083129450615",
    instagram: "https://www.instagram.com/enconecarenursing",
  },
} as const;

/**
 * Verified operating figures from enconecare.in. Specific, checkable numbers
 * build credibility where vague superlatives erode it (`09-trust-psychology.md`),
 * so nothing here is rounded up or embellished.
 */
export const PARENT_STATS = [
  { value: "500+", label: "Families served since 2022" },
  { value: "100+", label: "Qualified nurses on the network" },
  { value: "24×7", label: "Availability across Delhi NCR" },
  { value: "< 4 hrs", label: "Equipment delivered and installed" },
] as const;

/** Pre-filled WhatsApp deep link — a first-class channel, not a fallback. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function telLink(): string {
  return `tel:${CONTACT.phone}`;
}

/* -------------------------------------------------------------------------- */
/*  Geography                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The six Delhi NCR cities equipment is delivered to — and nowhere else.
 *
 * Deliberately lightweight: this file is imported by client components (the
 * enquiry form), so it must not pull in the pincode dataset. The full model —
 * verified pincodes, localities, local notes — lives in
 * `src/lib/service-areas.ts`, which only server components import.
 *
 * New Delhi is not a separate entry: every New Delhi pincode is a Delhi
 * (110xxx) pincode, so its page duplicated Delhi's with the name swapped.
 * `/locations/new-delhi` 308-redirects to `/locations/delhi` (next.config.ts).
 */
export const NCR_CITIES = [
  { slug: "delhi", name: "Delhi", state: "Delhi" },
  { slug: "noida", name: "Noida", state: "Uttar Pradesh" },
  { slug: "greater-noida", name: "Greater Noida", state: "Uttar Pradesh" },
  { slug: "gurgaon", name: "Gurgaon", alsoKnownAs: "Gurugram", state: "Haryana" },
  { slug: "ghaziabad", name: "Ghaziabad", state: "Uttar Pradesh" },
  { slug: "faridabad", name: "Faridabad", state: "Haryana" },
] as const;

export type NcrCitySlug = (typeof NCR_CITIES)[number]["slug"];

/** "Delhi, Noida and Faridabad" */
export function formatCityList(names: readonly string[]): string {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

export const CITY_OPTIONS = NCR_CITIES.map((c) => c.name);

/* -------------------------------------------------------------------------- */
/*  Encone Care services (verified from enconecare.in)                        */
/* -------------------------------------------------------------------------- */

export type CareService = {
  slug: string;
  name: string;
  description: string;
  /** Path on enconecare.in, not on this site. */
  href: string;
};

/**
 * The parent's ten home-care services, with their own copy.
 *
 * These are surfaced here because equipment is only half the answer: a family
 * that needs a hospital bed usually also needs someone who knows how to turn a
 * patient in it. `02-caregiver-journey.md` describes the decision as a single
 * journey, not two purchases — so the handover between the two brands should be
 * one click, not a search.
 */
export const CARE_SERVICES: CareService[] = [
  {
    slug: "nursing-staff",
    name: "Nursing Staff",
    description:
      "Trained male & female staff nurses providing professional nursing care for 12/24 hour home care shifts across Delhi NCR.",
    href: "https://enconecare.in/services/nursing-staff",
  },
  {
    slug: "attendants",
    name: "Patient Attendants",
    description:
      "Dedicated attendants and professional caregivers providing in-home care — daily care, mobility assistance, and companionship.",
    href: "https://enconecare.in/services/attendants",
  },
  {
    slug: "elder-care",
    name: "Elder Care",
    description:
      "Compassionate senior citizen care, elderly care and personal home care — daily care, companionship & monitoring.",
    href: "https://enconecare.in/services/elder-care",
  },
  {
    slug: "baby-care",
    name: "Mother & Baby Care",
    description:
      "Experienced nannies and babysitters for newborns, infants, and toddlers — safe, nurturing child care at home.",
    href: "https://enconecare.in/services/baby-care",
  },
  {
    slug: "specialized-care",
    name: "Specialised Care",
    description:
      "Expert neurological care and disability care for paralysis, bedridden patients & complex conditions.",
    href: "https://enconecare.in/services/specialized-care",
  },
  {
    slug: "post-operative-care",
    name: "Post-Operative Care",
    description:
      "Trained nurses for orthopaedic care, dressing care, medication & recovery support after surgery.",
    href: "https://enconecare.in/services/post-operative-care",
  },
  {
    slug: "physiotherapy",
    name: "Physiotherapy",
    description:
      "Qualified physiotherapists for home rehabilitation, pain management, and walking assistance.",
    href: "https://enconecare.in/services/physiotherapy",
  },
  {
    slug: "doctor-visit",
    name: "Doctor Visit",
    description:
      "Experienced doctors for a doctor visit at home — consultations, diagnosis & treatment.",
    href: "https://enconecare.in/services/doctor-visit",
  },
  {
    slug: "injection-visit",
    name: "Injection Visit",
    description: "Qualified nurses for safe, hygienic home injection visits.",
    href: "https://enconecare.in/services/injection-visit",
  },
  {
    slug: "sleep-study",
    name: "Sleep Study",
    description: "Home sleep study tests to diagnose sleep apnoea and disorders.",
    href: "https://enconecare.in/services/sleep-study",
  },
];

/**
 * Condition-led entry points on the parent site. `14-mental-models.md`:
 * caregivers search by condition and symptom, not by device category — these
 * are the bridge from "my father had a stroke" to the right equipment.
 */
export const CARE_CONDITIONS = [
  { name: "Dementia & Alzheimer's care", href: "https://enconecare.in/conditions/dementia-alzheimers-care" },
  { name: "Post-stroke rehabilitation", href: "https://enconecare.in/conditions/post-stroke-rehab" },
  { name: "Parkinson's patient care", href: "https://enconecare.in/conditions/parkinsons-patient-care" },
  { name: "Cancer patient care at home", href: "https://enconecare.in/conditions/cancer-patient-care-at-home" },
  { name: "Paralysis patient care", href: "https://enconecare.in/conditions/paralysis-care" },
] as const;

/* -------------------------------------------------------------------------- */
/*  Trust signals                                                             */
/* -------------------------------------------------------------------------- */

/**
 * ⚠️ Claim discipline (`01-business-understanding.md`): no fabricated CDSCO
 * licensure, ISO 13485, ICMED or AiMeD membership, and never the word
 * "marketplace" — this is structurally an inventory-model business under the
 * Consumer Protection E-Commerce Rules, 2020.
 *
 * Every claim below is about Encone Care's own process, which it can verify.
 */
export const TRUST_PILLARS = [
  {
    id: "sanitisation",
    title: "Documented sanitisation between rentals",
    body: "Every returned unit is detergent-washed, disinfected and inspected against the manufacturer's reprocessing instructions before it goes out again. You get the checklist with the delivery.",
    icon: "shield",
  },
  {
    id: "pricing",
    title: "One quote, and it does not move",
    body: "Ask and you get a straight number the same day — delivery, installation and servicing already in it, GST stated separately. It does not change because you sounded worried on the phone.",
    icon: "receipt",
  },
  {
    id: "delivery",
    title: "Delivered and installed in under four hours",
    body: "A technician assembles the equipment, commissions it, and stays until whoever is doing the caring has operated it themselves.",
    icon: "truck",
  },
  {
    id: "support",
    title: "Nurses on the other end of the same number",
    body: "Encone Care's 100+ verified nurses and attendants cover the same cities. Equipment and the person who knows how to use it come from one call.",
    icon: "headset",
  },
] as const;

/* -------------------------------------------------------------------------- */
/*  Navigation                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Dual-door IA (`05-information-architecture-research.md`): an object-type door
 * (Equipment / Care Essentials) alongside a situation door, kept flat and
 * cross-linked rather than nested.
 */
export const NAV_LINKS = [
  { href: "/products", label: "Equipment" },
  { href: "/care-essentials", label: "Care Essentials" },
  { href: "/home-care", label: "Home Care" },
  { href: "/blog", label: "Resources" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  equipment: {
    title: "Equipment",
    links: [
      { href: "/categories/hospital-beds", label: "Hospital Beds" },
      { href: "/categories/oxygen-therapy", label: "Oxygen Concentrators" },
      { href: "/categories/bipap-cpap", label: "BiPAP & CPAP" },
      { href: "/categories/wheelchairs", label: "Wheelchairs & Mobility" },
      { href: "/categories/patient-monitors", label: "Patient Monitors" },
      { href: "/categories/icu-setup", label: "Home ICU Setup" },
    ],
  },
  homeCare: {
    title: "Home Care",
    links: [
      { href: "/home-care", label: "All care services" },
      { href: "https://enconecare.in/services/nursing-staff", label: "Nursing Staff" },
      { href: "https://enconecare.in/services/elder-care", label: "Elder Care" },
      { href: "https://enconecare.in/services/physiotherapy", label: "Physiotherapy" },
      { href: "https://enconecare.in/services/post-operative-care", label: "Post-Operative Care" },
      { href: "https://enconecare.in/caretakers", label: "Our Caretakers" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { href: "/about", label: "About Encone Care" },
      { href: "/certifications", label: "Quality & Sanitisation" },
      { href: "/contact", label: "Contact" },
      { href: "https://enconecare.in/verification-process", label: "Verification Process" },
      { href: "https://enconecare.in/faq", label: "FAQ" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/refund-policy", label: "Refund & Return Policy" },
      { href: "https://enconecare.in/editorial-policy", label: "Editorial Policy" },
    ],
  },
} as const;

/* -------------------------------------------------------------------------- */
/*  SEO                                                                       */
/* -------------------------------------------------------------------------- */

export const DEFAULT_KEYWORDS = [
  "medical equipment supplier india",
  "hospital bed on rent delhi",
  "oxygen concentrator rent delhi",
  "bipap machine price india",
  "icu setup at home delhi",
  "medical equipment rental delhi ncr",
] as const;

export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
} as const;
