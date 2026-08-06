import type { Metadata } from "next";
import { BRAND, DEFAULT_KEYWORDS, SITE_URL } from "@/lib/constants";
import type { Product } from "@/lib/types";
import { truncate } from "@/lib/utils";

/** Google truncates titles near 60 characters and descriptions near 160. */
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 158;

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  /** Set false on thin, paginated or filtered URLs that should not be indexed. */
  index?: boolean;
  images?: { url: string; width: number; height: number; alt: string }[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  index = true,
  images,
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildMetadataInput): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`;

  const ogImages = images ?? [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: `${BRAND.name} — ${BRAND.tagline}`,
    },
  ];

  return {
    // `absolute` opts out of the root layout's `%s | EnconeMed` template — the
    // brand suffix is already appended above, and letting both run produces
    // "… | EnconeMed | EnconeMed".
    title: { absolute: truncate(fullTitle, TITLE_MAX) },
    description: truncate(description, DESCRIPTION_MAX),
    alternates: { canonical },
    robots: index
      ? { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 }
      : { index: false, follow: true },
    openGraph: {
      type,
      url: canonical,
      siteName: BRAND.name,
      title: truncate(fullTitle, TITLE_MAX),
      description: truncate(description, DESCRIPTION_MAX),
      locale: "en_IN",
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: truncate(fullTitle, TITLE_MAX),
      description: truncate(description, DESCRIPTION_MAX),
      images: ogImages.map((i) => i.url),
    },
  };
}

/**
 * Product metadata.
 *
 * The title follows the brief's "[Equipment] | Medical Grade | EnconeMed"
 * pattern only where it fits inside 60 characters; longer product names drop
 * the middle segment rather than being truncated mid-word by Google.
 */
export function buildProductMetadata(product: Product): Metadata {
  const offerFragment =
    product.offerMode === "rent-or-buy" ? "On rent or to buy" : "Available to buy";

  const shortTitle = `${product.name} | ${BRAND.name}`;
  const longTitle = `${product.name} | Medical Grade | ${BRAND.name}`;
  const title = longTitle.length <= TITLE_MAX ? longTitle : shortTitle;

  // No price in the description: the SERP snippet must not promise a figure the
  // page does not carry.
  const description = `${product.summary} ${offerFragment} in Delhi — sanitised, technician-installed, delivered in under four hours. Get the best quote.`;

  return buildMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    images: product.images.slice(0, 1).map((img) => ({
      url: img.src,
      width: img.width,
      height: img.height,
      alt: img.alt,
    })),
    modifiedTime: product.updatedAt,
  });
}

export const DEFAULT_METADATA_KEYWORDS = [...DEFAULT_KEYWORDS];
