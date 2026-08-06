import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * `/products?…` is not disallowed here on purpose.
 *
 * Those URLs carry `noindex, follow` via generateMetadata. Blocking them in
 * robots.txt instead would stop crawlers reading the page at all — including
 * the noindex directive — so they would stay eligible for indexing. Disallow
 * and noindex are mutually exclusive tools; using both on the same URL defeats
 * the purpose.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/private/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
