import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getAllProducts } from "@/data/products";
import { CONTACT, SERVICE_AREAS, telLink } from "@/lib/constants";
import {
  generateFAQSchema,
  generateMedicalBusinessSchema,
} from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

type Params = Promise<{ slug: string }>;

/**
 * Location pages exist only for areas we actually serve.
 *
 * `04-seo.md`: generating a page per city we hope to serve one day is exactly
 * the scaled-content pattern Google's spam policy targets — and per
 * `09-trust-psychology.md`, a page implying same-day delivery to a city we
 * cannot reach costs more trust than the traffic is worth. Planned cities are
 * intentionally excluded from generateStaticParams and 404.
 */
export function generateStaticParams() {
  return SERVICE_AREAS.filter((a) => a.status === "live").map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug && a.status === "live");
  if (!area) return {};

  return buildMetadata({
    title: `Medical Equipment on Rent in ${area.name}`,
    description: `Hospital beds, oxygen concentrators, BiPAP machines and home ICU setups on rent or for sale in ${area.name}. Sanitised equipment, technician setup, delivered in under four hours. Get the best quote.`,
    path: `/locations/${area.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug && a.status === "live");
  if (!area) notFound();

  const all = getAllProducts().filter((p) =>
    p.availability.some((a) => a.city === area.slug),
  );
  const forRent = all.filter((p) => p.offerMode === "rent-or-buy");
  const forSale = all;

  const faqs: Faq[] = [
    {
      question: `Do you deliver medical equipment in ${area.name}?`,
      answer: `Yes. Encore Care delivers, installs and commissions equipment across ${area.name}, usually within four hours of a confirmed order. A technician assembles the equipment and demonstrates it before leaving.`,
    },
    {
      question: `What does hospital bed rental cost in ${area.name}?`,
      answer: `We quote rather than publish a rate card, because the right number depends on how long you need the equipment, which configuration, and whether nursing goes with it. Call or send an enquiry and we will give you a straight quote for ${area.name} the same day, with GST stated separately.`,
    },
    {
      question: `Is there a delivery charge in ${area.name}?`,
      answer: `No. Delivery, assembly and technician commissioning are included in every quote within ${area.name}, for rental and purchase alike. There is no separate installation fee.`,
    },
  ];

  return (
    <>
      {/* City-scoped MedicalBusiness. No street address — a service-area
          business must not publish one (15-local-seo.md). */}
      <JsonLd
        schema={generateMedicalBusinessSchema({ citySlug: area.slug, cityName: area.name })}
      />
      <JsonLd schema={generateFAQSchema(faqs, `/locations/${area.slug}`)} />

      <Container className="pt-10">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Locations", href: "/" },
            { name: area.name, href: `/locations/${area.slug}` },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/5 px-3.5 py-1.5 text-xs font-medium text-brand-green">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {area.name}, {area.region}
          </p>
          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-glow text-brand-green">Medical equipment</span>{" "}
            <span className="text-text-primary">on rent &amp; sale in {area.name}</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-secondary">
            {forRent.length} items available on rent and {forSale.length} to
            buy, delivered and installed across {area.name} — usually within four
            hours. Tell us what you need and we will quote for it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={telLink()} variant="primary" size="lg">
              <Phone className="h-4 w-4" aria-hidden />
              {CONTACT.phoneDisplay}
            </ButtonLink>
            <ButtonLink href="/products" variant="secondary" size="lg">
              Browse everything
            </ButtonLink>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-text-muted">
            <Clock className="h-4 w-4" aria-hidden />
            {CONTACT.hours} · Delivered and installed in under four hours
          </p>
        </header>

        <section className="mt-16">
          <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            Available to rent in {area.name}
          </h2>
          <ProductGrid products={forRent} className="mt-8" priorityCount={3} />
        </section>

        <section className="mt-20">
          <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            Available to buy in {area.name}
          </h2>
          <ProductGrid products={forSale} className="mt-8" />
        </section>

        <div className="mt-20">
          <FaqSection faqs={faqs} title={`Delivering to ${area.name}`} />
        </div>

        <section className="mt-16 rounded-2xl border border-line-strong bg-surface-raised/35 p-6 sm:p-8">
          <h2 className="font-display text-lg uppercase text-text-primary">
            Somewhere else?
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary">
            Equipment delivery is live only where we can install and support it
            properly —{" "}
            {SERVICE_AREAS.filter((a) => a.status === "live")
              .map((a) => a.name)
              .join(" and ")}
            . Across{" "}
            {SERVICE_AREAS.filter((a) => a.status === "care-network")
              .map((a) => a.name)
              .join(", ")}
            , Encore Care&apos;s nursing network is already on the ground and
            equipment is arranged on request. Call us and we will tell you
            honestly whether we can reach you rather than take the booking and
            miss it.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-block text-sm font-semibold text-brand-green underline-offset-4 hover:underline"
          >
            Ask about your area →
          </Link>
        </section>
      </Container>

      <div className="h-24" />
    </>
  );
}
