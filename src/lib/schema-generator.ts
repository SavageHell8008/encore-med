/**
 * JSON-LD factory.
 *
 * Constraints taken from `08-schema.md`, `07-eeat.md` and `14-trust-signals.md`
 * — these are not stylistic preferences, they change whether Google renders
 * anything at all:
 *
 * 1. Organization goes on the home and about pages only, not sitewide. Repeating
 *    it on every URL adds bytes and no signal.
 * 2. BreadcrumbList goes everywhere below the root.
 * 3. Product is always the primary @type. `MedicalDevice` has no Google
 *    rich-result support, so it is layered as a secondary type, never alone.
 * 4. A rentable item needs TWO Offers — `businessFunction: LeaseOut` for rental
 *    and `Sell` for purchase. One Offer cannot express both.
 * 5. Self-serving reviews are prohibited: never attach Review or
 *    AggregateRating to Organization / LocalBusiness / MedicalBusiness. Google
 *    will not render stars no matter how correct the markup is. Product-scoped
 *    reviews are the compliant path.
 * 6. MedicalBusiness is used in place of the generic LocalBusiness, per Google's
 *    "most specific applicable subtype" guidance.
 * 7. FAQPage rich results were fully deprecated on 7 May 2026. The markup is
 *    still emitted because answer engines parse it, but no rich-result payoff
 *    should be assumed and no content decision should depend on it.
 */

import { getCategory } from "@/data/taxonomy";
import { BRAND, CONTACT, LIVE_SERVICE_AREAS, SITE_URL } from "@/lib/constants";
import type { CareEssential, Faq, Product } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";

type Json = Record<string, unknown>;

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/* -------------------------------------------------------------------------- */

export function generateOrganizationSchema(): Json {
  const sameAs = [BRAND.parent.url].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: SITE_URL,
    description: BRAND.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.svg", SITE_URL),
      width: 287,
      height: 287,
    },
    parentOrganization: {
      "@type": "Organization",
      name: BRAND.parent.name,
      url: BRAND.parent.url,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: CONTACT.phone,
        email: CONTACT.email,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
    sameAs,
  };
}

export function generateWebSiteSchema(): Json {
  // Note: the sitelinks searchbox (WebSite + SearchAction) was retired by
  // Google, so SearchAction is deliberately omitted — it is dead weight.
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  };
}

/* -------------------------------------------------------------------------- */

/**
 * MedicalBusiness for location pages.
 *
 * `15-local-seo.md`: Encore Care is a service-area business, so the street
 * address is deliberately NOT published — an SAB must hide it. Service areas
 * are expressed by named city, not a radius.
 */
export function generateMedicalBusinessSchema(opts?: {
  citySlug?: string;
  cityName?: string;
}): Json {
  const areas = opts?.cityName
    ? [{ "@type": "City", name: opts.cityName }]
    : LIVE_SERVICE_AREAS.map((a) => ({ "@type": "City", name: a.name }));

  return {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "@id": opts?.citySlug
      ? `${SITE_URL}/locations/${opts.citySlug}/#business`
      : `${SITE_URL}/#business`,
    name: BRAND.name,
    legalName: BRAND.legalName,
    url: opts?.citySlug ? `${SITE_URL}/locations/${opts.citySlug}` : SITE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    parentOrganization: { "@id": ORG_ID },
    // Service-area business: region only, no street address.
    address: {
      "@type": "PostalAddress",
      addressLocality: opts?.cityName ?? CONTACT.registeredOffice.city,
      addressRegion: CONTACT.registeredOffice.region,
      addressCountry: "IN",
    },
    areaServed: areas,
    openingHours: "Mo-Su 08:00-22:00",
    priceRange: "₹₹",
    // No aggregateRating / review here — self-serving review markup on a
    // business entity is prohibited and will not render.
  };
}

/* -------------------------------------------------------------------------- */

export function generateBreadcrumbSchema(
  crumbs: { name: string; href: string }[],
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.href, SITE_URL),
    })),
  };
}

/* -------------------------------------------------------------------------- */

export function generateProductSchema(product: Product): Json {
  const url = absoluteUrl(`/products/${product.slug}`, SITE_URL);
  const laySynonyms = getCategory(product.categorySlug)?.laySynonyms ?? [];
  const availability = product.inStock
    ? "https://schema.org/InStock"
    : "https://schema.org/OutOfStock";

  const areaServed = LIVE_SERVICE_AREAS.map((a) => ({ "@type": "City", name: a.name }));

  /**
   * Offers carry no price.
   *
   * The catalogue publishes none, so emitting one here would be marking up
   * content that does not exist on the page — the same violation as inventing
   * a rating. `businessFunction` still distinguishes Sell from LeaseOut, which
   * is the genuinely useful signal: it tells a search engine this item can be
   * rented, not just bought.
   *
   * Accepted cost: without `price` or `priceSpecification`, these pages are not
   * eligible for Google's price-carrying product rich results. That follows
   * from the pricing decision, not from a modelling mistake.
   */
  const offers: Json[] = [
    {
      "@type": "Offer",
      "@id": `${url}#offer-sell`,
      businessFunction: "https://schema.org/Sell",
      name: `Buy ${product.name}`,
      availability,
      priceCurrency: "INR",
      url,
      seller: { "@id": ORG_ID },
      areaServed,
    },
  ];

  if (product.offerMode === "rent-or-buy") {
    offers.push({
      "@type": "Offer",
      "@id": `${url}#offer-lease`,
      businessFunction: "https://schema.org/LeaseOut",
      name: `Rent ${product.name}`,
      availability,
      priceCurrency: "INR",
      url,
      seller: { "@id": ORG_ID },
      areaServed,
    });
  }

  const med = product.medical;

  // https://schema.org/MedicalDevice — MedicalEntity supertype properties.
  // adverseOutcome and seriousAdverseOutcome both expect a MedicalEntity node,
  // not free text, so each outcome is emitted as a typed node. contraindication
  // accepts Text or MedicalContraindication; the node form is used because it
  // carries both a label and the clinical reason.
  const adverse = med.adverseOutcomes.filter((o) => !o.serious);
  const seriousAdverse = med.adverseOutcomes.filter((o) => o.serious);

  const asMedicalEntity = (o: { name: string; description: string }) => ({
    "@type": "MedicalEntity",
    name: o.name,
    description: o.description,
  });

  const schema: Json = {
    "@context": "https://schema.org",
    // Product stays primary so the Offer keeps its rich-result eligibility;
    // MedicalDevice is layered onto the same node rather than split into a
    // second entity, because it is one thing, not two.
    "@type": ["Product", "MedicalDevice"],
    "@id": `${url}#product`,
    name: product.name,
    description: product.summary,
    url,
    category: product.categorySlug,
    image: product.images.map((img) => absoluteUrl(img.src, SITE_URL)),
    brand: product.brandsAvailable.map((b) => ({ "@type": "Brand", name: b })),
    additionalProperty: product.specifications.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),

    /* --- MedicalDevice ------------------------------------------------- */

    // Thing.alternateName carries the lay vocabulary — "oxygen ka machine"
    // alongside "oxygen concentrator" (`14-mental-models.md`).
    ...(laySynonyms.length ? { alternateName: laySynonyms } : {}),

    procedure: med.procedure,
    ...(med.preOp ? { preOp: med.preOp } : {}),
    ...(med.postOp ? { postOp: med.postOp } : {}),

    contraindication: med.contraindications.map((c) => ({
      "@type": "MedicalContraindication",
      name: c.name,
      description: c.description,
    })),

    ...(adverse.length ? { adverseOutcome: adverse.map(asMedicalEntity) } : {}),
    ...(seriousAdverse.length
      ? { seriousAdverseOutcome: seriousAdverse.map(asMedicalEntity) }
      : {}),

    // Enumeration members are identified by URI, so they are referenced by
    // @id rather than emitted as string literals.
    relevantSpecialty: med.specialties.map((s) => ({
      "@id": `https://schema.org/${s}`,
    })),
    medicineSystem: { "@id": "https://schema.org/WesternConventional" },

    // legalStatus accepts Text. The device class goes here rather than in
    // recognizingAuthority, which would assert that CDSCO endorses this
    // catalogue — it does not, and `01-business-understanding.md` names that
    // exact overclaim as a thing to avoid.
    legalStatus: med.legalStatus,

    identifier: {
      "@type": "PropertyValue",
      propertyID: "Encore Care SKU",
      value: product.slug,
    },
  };

  // A single Offer stays a bare node; two are emitted as a plain array rather
  // than wrapped in AggregateOffer, whose whole purpose is lowPrice/highPrice —
  // required properties we have no values for.
  schema.offers = offers.length === 1 ? offers[0] : offers;

  return schema;
}

/* -------------------------------------------------------------------------- */

/**
 * Care essentials.
 *
 * Multi-typed as Product + MedicalDevice only where the item genuinely is a
 * regulated device with clinical risk (catheters, feeding tubes, PPE). Gloves
 * and a Foley catheter are both "consumables" commercially, but only one of
 * them has contraindications — typing adult diapers as a MedicalDevice with an
 * empty clinical profile would be padding the markup, so items without a
 * `medical` profile stay plain Products.
 */
export function generateCareEssentialSchema(item: CareEssential): Json {
  const url = absoluteUrl(`/care-essentials/${item.slug}`, SITE_URL);
  // Only regulated devices get the MedicalDevice type. Adult diapers carry a
  // clinical profile worth rendering but are not notified devices, and typing
  // them as one would contradict their own legalStatus text.
  const med = item.regulatedDevice ? item.medical : undefined;

  const schema: Json = {
    "@context": "https://schema.org",
    "@type": med ? ["Product", "MedicalDevice"] : "Product",
    "@id": `${url}#product`,
    name: item.name,
    description: item.summary,
    url,
    alternateName: [...item.laySynonyms],
    image: [absoluteUrl(item.image.src, SITE_URL)],
    category: item.group,
    additionalProperty: item.variants.map((v) => ({
      "@type": "PropertyValue",
      name: v.label,
      value: v.value,
    })),
    // Consumables are sale-only and, like everything else here, unpriced.
    offers: {
      "@type": "Offer",
      "@id": `${url}#offer-sell`,
      businessFunction: "https://schema.org/Sell",
      name: `Buy ${item.name}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url,
      seller: { "@id": ORG_ID },
      areaServed: LIVE_SERVICE_AREAS.map((a) => ({ "@type": "City", name: a.name })),
    },
  };

  if (med) {
    const adverse = med.adverseOutcomes.filter((o) => !o.serious);
    const serious = med.adverseOutcomes.filter((o) => o.serious);
    const asMedicalEntity = (o: { name: string; description: string }) => ({
      "@type": "MedicalEntity",
      name: o.name,
      description: o.description,
    });

    Object.assign(schema, {
      procedure: med.procedure,
      ...(med.preOp ? { preOp: med.preOp } : {}),
      ...(med.postOp ? { postOp: med.postOp } : {}),
      contraindication: med.contraindications.map((c) => ({
        "@type": "MedicalContraindication",
        name: c.name,
        description: c.description,
      })),
      ...(adverse.length ? { adverseOutcome: adverse.map(asMedicalEntity) } : {}),
      ...(serious.length ? { seriousAdverseOutcome: serious.map(asMedicalEntity) } : {}),
      relevantSpecialty: med.specialties.map((s) => ({
        "@id": `https://schema.org/${s}`,
      })),
      medicineSystem: { "@id": "https://schema.org/WesternConventional" },
      legalStatus: med.legalStatus,
    });
  }

  return schema;
}

/* -------------------------------------------------------------------------- */

/**
 * FAQPage.
 *
 * Rich results for this type were fully deprecated on 7 May 2026 — expect no
 * SERP treatment. It is emitted because answer engines still parse it and the
 * cost is a few hundred bytes. Do not plan content around FAQ rich results.
 */
export function generateFAQSchema(faqs: Faq[], pageUrl: string): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${absoluteUrl(pageUrl, SITE_URL)}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/* -------------------------------------------------------------------------- */

export function generateArticleSchema(article: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt: string;
  author: { name: string; credentials?: string; url?: string };
  image?: string;
}): Json {
  const url = absoluteUrl(`/blog/${article.slug}`, SITE_URL);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    mainEntityOfPage: url,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    // `07-eeat.md`: advisory content needs named, credentialed authorship.
    author: {
      "@type": "Person",
      name: article.author.name,
      ...(article.author.credentials ? { jobTitle: article.author.credentials } : {}),
      ...(article.author.url ? { url: article.author.url } : {}),
    },
    publisher: { "@id": ORG_ID },
    ...(article.image
      ? { image: absoluteUrl(article.image, SITE_URL) }
      : {}),
    inLanguage: "en-IN",
  };
}

/* -------------------------------------------------------------------------- */

export function generateItemListSchema(
  items: { name: string; href: string }[],
  listName: string,
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.href, SITE_URL),
    })),
  };
}
