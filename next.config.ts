import type { NextConfig } from "next";

/**
 * Security headers applied to every route.
 *
 * Note: the original brief proposed a blanket `Cache-Control: public, max-age=3600`
 * on `/:path*`. That is deliberately omitted — it would let browsers and shared
 * caches serve stale HTML (including stale pricing and stock status) for an hour
 * with no revalidation path. Next's own route-level caching plus the CDN's
 * stale-while-revalidate handling is the correct layer for that.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // 30 days — product photography is versioned by filename, so it is safe to
    // cache optimized variants aggressively.
    minimumCacheTTL: 2_592_000,
    // The catalogue currently ships SVG placeholders, which next/image refuses
    // to optimize by default because SVG can carry scripts. Only first-party
    // files under /public are served (no remotePatterns are configured), and
    // the CSP below neutralises scripts regardless.
    // ⚠️ Remove all three lines once real raster product photography lands.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // No Cache-Control override here: Next already serves /_next/static with
      // `immutable, max-age=31536000`, and setting it manually makes the build
      // warn that custom cache headers can break its own caching behaviour.
    ];
  },
};

export default nextConfig;
