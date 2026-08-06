import type { Metadata, Viewport } from "next";
import { Archivo, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyContactBar } from "@/components/layout/StickyContactBar";
import { JsonLd } from "@/components/JsonLd";
import { BRAND, DEFAULT_KEYWORDS, SITE_URL } from "@/lib/constants";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/schema-generator";

// next/font self-hosts and subsets at build time, so there is no third-party
// request and no FOIT on the LCP heading.

/**
 * Archivo carries the display headings — a grotesque with enough weight and a
 * tight enough uppercase to hold a 3.85rem line without looking like a default.
 * Only the weights actually used are requested; pulling the full variable range
 * would ship several unused faces.
 */
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-mono-src",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${BRAND.tagline} | ${BRAND.name}`,
    // Page titles fill the %s; the brand suffix is appended once, here.
    template: `%s | ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [...DEFAULT_KEYWORDS],
  applicationName: BRAND.name,
  authors: [{ name: BRAND.legalName }],
  creator: BRAND.legalName,
  publisher: BRAND.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: BRAND.name,
    locale: "en_IN",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${archivo.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/* Organization and WebSite are emitted once, at the root, and keyed by
            @id so every other schema on the site references those entities
            rather than repeating them. */}
        <JsonLd schema={[generateOrganizationSchema(), generateWebSiteSchema()]} />

        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        <Header />
        {/* Bottom padding on mobile clears the sticky contact bar. */}
        <main id="main" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <StickyContactBar />
      </body>
    </html>
  );
}
