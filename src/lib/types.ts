/**
 * Domain types for the Encone Care catalogue.
 *
 * Modelling notes drawn from Phase 0 research:
 * - Rent and buy are a per-product *attribute pair*, not separate site sections
 *   (`12-medical-equipment-industry.md`). Every item is sellable; only some are
 *   also rentable, which is what `offerMode` encodes.
 * - CDSCO Class A–D risk classification is backend compliance metadata and must
 *   never surface as a customer-facing filter (`12-medical-equipment-industry.md`).
 * - Image dimensions live in the data itself so `next/image` can reserve space
 *   and keep CLS at zero (`16-technical-architecture.md`).
 *
 * NO PRICES ANYWHERE.
 * The catalogue carries no amounts, no "starting from", no indicative ranges.
 * Every commercial question resolves to a quote. This is a deliberate business
 * decision by the owner and it is enforced structurally — there is no field on
 * `Product` capable of holding a price, so a stray number cannot be added to
 * one product page without first changing this file. Note the cost: without
 * `offers.price`, product pages are not eligible for price-carrying rich
 * results in Google. See `generateProductSchema`.
 */

/**
 * `rent-or-buy` — the item is stocked for rental and can also be purchased.
 * `buy-only`    — sale only; the rental fleet does not carry it.
 */
export type OfferMode = "rent-or-buy" | "buy-only";

export type ProductImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** `11-image-strategy.md`: at least one authentic in-use shot per product. */
  kind: "hero" | "angle" | "in-use" | "detail";
};

export type SpecRow = {
  label: string;
  value: string;
  /** Optional plain-language gloss. `14-mental-models.md`: clinical terms must
   *  be glossed on first use — caregivers think in symptoms, not taxonomy. */
  note?: string;
};

export type Dimensions = {
  length?: string;
  width?: string;
  height?: string;
  weight?: string;
  /** e.g. maximum safe working load */
  loadCapacity?: string;
  /** Anything dimensional that does not fit the fields above. */
  extra?: SpecRow[];
};

export type Faq = {
  question: string;
  answer: string;
};

export type AvailabilityArea = {
  /** Matches a slug in NCR_CITIES. */
  city: string;
  /** Whether same-day delivery and installation is promised here. */
  sameDay: boolean;
  /** Human-readable delivery promise. Must be operationally true. */
  deliveryNote?: string;
};
// Rent-vs-buy used to live here as per-city flags. It is a property of the
// product, not of the city — a rentable item is rentable everywhere we deliver
// — so it moved to `Product.offerMode` and the duplication went away.

/** CDSCO risk class — internal compliance metadata, never rendered as a filter. */
export type CdscoClass = "A" | "B" | "C" | "D" | "unclassified";

/* -------------------------------------------------------------------------- */
/*  schema.org MedicalDevice                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Members of the schema.org MedicalSpecialty enumeration.
 * https://schema.org/MedicalSpecialty — only the ones this catalogue uses.
 */
export type MedicalSpecialty =
  | "Pulmonary"
  | "RespiratoryTherapy"
  | "Geriatric"
  | "Nursing"
  | "Neurologic"
  | "Musculoskeletal"
  | "Physiotherapy"
  | "Surgical"
  | "Emergency"
  | "PrimaryCare"
  | "Cardiovascular"
  | "Urologic"
  | "Gastroenterologic"
  | "Dermatology"
  | "PublicHealth";

export type Contraindication = {
  /** Short label, e.g. "Weight above the safe working load". */
  name: string;
  /** The clinical reason, in plain language. */
  description: string;
};

export type AdverseOutcome = {
  name: string;
  description: string;
  /**
   * True for outcomes schema.org classes as *serious* — life-threatening,
   * permanently damaging, or requiring hospitalisation. These are emitted as
   * `seriousAdverseOutcome`; the rest as `adverseOutcome`.
   */
  serious?: boolean;
};

/**
 * The clinical half of a product, mapped onto https://schema.org/MedicalDevice.
 *
 * Every field here corresponds to a real, verified property on MedicalDevice or
 * its MedicalEntity supertype. Two properties are deliberately absent:
 *
 * - `recognizingAuthority` — it means "the organization that officially
 *   recognizes this entity as part of its endorsed system". Naming CDSCO there
 *   would assert an endorsement that does not exist; CDSCO classifies devices
 *   and licenses manufacturers, it does not endorse a rental catalogue.
 *   `01-business-understanding.md` names this exact overclaim as a thing to
 *   avoid. Device class goes in `legalStatus` (Text) instead.
 * - `purpose` — schema.org still publishes the MedicalDevicePurpose
 *   enumeration, but /purpose itself 404s, so the property is not part of the
 *   current vocabulary and is not emitted.
 *
 * `code` (MedicalCode) is also omitted: we hold no real UDI, GMDN or SNOMED-CT
 * identifier for these units, and inventing one would be worse than silence.
 */
export type MedicalProfile = {
  /** MedicalDevice.procedure — setting up, using and installing the device. */
  procedure: string;
  /** MedicalDevice.preOp — workup and preparation required before use. */
  preOp?: string;
  /** MedicalDevice.postOp — follow-up, servicing and ongoing care. */
  postOp?: string;
  /** MedicalDevice.contraindication */
  contraindications: Contraindication[];
  /** MedicalDevice.adverseOutcome / seriousAdverseOutcome */
  adverseOutcomes: AdverseOutcome[];
  /** MedicalEntity.relevantSpecialty */
  specialties: MedicalSpecialty[];
  /** MedicalEntity.legalStatus — regulatory classification, stated factually. */
  legalStatus: string;
};

export type Product = {
  slug: string;
  name: string;
  /** Short line used on cards and in meta descriptions. */
  summary: string;
  categorySlug: string;
  /** Situation-based tags for the second IA door (Respiratory, Mobility, …). */
  useCaseSlugs: string[];

  description: string;
  /** "Indication of usages" — the clinical situations this equipment is for. */
  indications: string[];
  /** Who this is appropriate for. */
  audience: string[];
  /** Brands Encone Care actually stocks for this item. */
  brandsAvailable: string[];

  specifications: SpecRow[];
  dimensions: Dimensions;

  /** "ALSO KNOW ABOUT" — caveats, running costs, consumables, safety notes.
   *  Deliberately includes the awkward facts; `09-trust-psychology.md` finds
   *  specific checkable claims build credibility where vague ones erode it. */
  alsoKnowAbout: SpecRow[];

  faqs: Faq[];

  /** Rentable as well as sellable, or sale only. There is no price field. */
  offerMode: OfferMode;

  images: ProductImage[];
  availability: AvailabilityArea[];

  /** Slugs of related products — "These Might be of Interest". */
  relatedSlugs: string[];

  badges: ProductBadge[];
  cdscoClass: CdscoClass;
  /** Clinical profile, emitted as schema.org/MedicalDevice and rendered on page. */
  medical: MedicalProfile;
  inStock: boolean;

  /** EEAT byline. `07-eeat.md`: advisory content needs named authorship. */
  reviewedBy?: { name: string; credentials: string; date: string };
  updatedAt: string;
};

export type ProductBadge =
  | "bestseller"
  | "sanitised"
  | "same-day-delivery"
  | "technician-installed"
  | "new";

/* -------------------------------------------------------------------------- */
/*  Care essentials (consumables)                                             */
/* -------------------------------------------------------------------------- */

/**
 * Consumables are a separate catalogue from durable equipment, not a category
 * within it (`18-care-essentials-research.md`). They are bought repeatedly
 * rather than once, chosen by size and material rather than by specification,
 * and are never rented — so they get their own type rather than a `Product`
 * with half its fields empty.
 */
export type CareEssentialGroup =
  | "airway"
  | "urology"
  | "feeding"
  | "ppe"
  | "incontinence";

export type CareEssential = {
  slug: string;
  name: string;
  /** What a family would actually call it — "food pipe", "peshab ki nali". */
  laySynonyms: string[];
  summary: string;
  description: string;
  group: CareEssentialGroup;
  /** Sizes, materials and variants actually stocked. */
  variants: SpecRow[];
  /** Practice points a carer needs before first use. */
  usage: string[];
  alsoKnowAbout: SpecRow[];
  image: ProductImage;
  /**
   * Present where the item carries real clinical risk worth publishing —
   * catheters, feeding tubes, PPE, and incontinence products (whose skin
   * complications are the usual first step towards a pressure ulcer).
   */
  medical?: MedicalProfile;
  /**
   * Whether the item is a *regulated medical device* under India's Medical
   * Devices Rules, 2017.
   *
   * Separate from `medical` on purpose: adult diapers have genuine clinical
   * guidance worth rendering, but they are personal care consumables, not
   * notified devices. Typing them as schema.org/MedicalDevice would assert a
   * regulatory status their own `legalStatus` text denies — so this flag, not
   * the presence of a profile, decides the schema type.
   */
  regulatedDevice?: boolean;
  /** Which equipment this pairs with, for cross-linking. */
  relatedProductSlugs: string[];
  faqs: Faq[];
  updatedAt: string;
};

export type Category = {
  slug: string;
  name: string;
  /** Plain-language name a caregiver would actually search for. */
  laySynonyms: string[];
  headline: string;
  description: string;
  icon: string;
};

export type UseCase = {
  slug: string;
  name: string;
  description: string;
};
