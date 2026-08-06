import type { MetadataRoute } from "next";
import { getAllCareEssentials } from "@/data/care-essentials";
import { getAllProducts } from "@/data/products";
import { CATEGORIES } from "@/data/taxonomy";
import { LIVE_SERVICE_AREAS, SITE_URL } from "@/lib/constants";

/**
 * Only canonical, indexable URLs belong here.
 *
 * Deliberately excluded: filtered `/products?…` permutations (noindex), planned
 * service areas (no page exists), and legal pages, which are linked from the
 * footer and do not need sitemap priority.
 *
 * `changefreq` and `priority` are omitted — Google has stated publicly that it
 * ignores both. `lastModified` is the only signal here that does any work, and
 * it is only useful if it reflects real content change, so it is sourced from
 * the product data rather than `new Date()`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();

  const newestProductChange = products
    .map((p) => p.updatedAt)
    .sort()
    .at(-1);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: newestProductChange },
    { url: `${SITE_URL}/products`, lastModified: newestProductChange },
    { url: `${SITE_URL}/care-essentials` },
    ...getAllCareEssentials().map((item) => ({
      url: `${SITE_URL}/care-essentials/${item.slug}`,
      lastModified: new Date(item.updatedAt),
    })),
    { url: `${SITE_URL}/home-care` },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/certifications` },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((category) => {
    const latest = products
      .filter((p) => p.categorySlug === category.slug)
      .map((p) => p.updatedAt)
      .sort()
      .at(-1);
    return {
      url: `${SITE_URL}/categories/${category.slug}`,
      lastModified: latest,
    };
  });

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  const locationRoutes: MetadataRoute.Sitemap = LIVE_SERVICE_AREAS.map((area) => ({
    url: `${SITE_URL}/locations/${area.slug}`,
    lastModified: newestProductChange,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes, ...locationRoutes];
}
