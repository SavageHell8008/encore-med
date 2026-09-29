import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getAllProducts } from "@/data/products";
import { NCR_PINCODES_FETCHED_ON } from "@/data/ncr-pincodes";
import { CONTACT, formatCityList, telLink, whatsappLink } from "@/lib/constants";
import { SERVICE_AREAS, getServiceArea, type ServiceArea } from "@/lib/service-areas";
import { generateFAQSchema, generateMedicalBusinessSchema } from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

type Params = Promise<{ slug: string }>;

/**
 * One page per Delhi NCR city we deliver to — six, and no others.
 *
 * `04-seo.md`: pages for places we do not serve are the scaled-content pattern
 * Google's spam policy targets, so `dynamicParams = false` 404s anything else.
 *
 * Each page is differentiated by data rather than by swapping a city name into
 * shared copy: its own verified pincode table, its own named localities, and a
 * local note. The FAQ answers are built from that same data, so they differ
 * page to page in substance, not just in the noun.
 */
export function generateStaticParams() {
  return SERVICE_AREAS.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

const displayName = (a: ServiceArea) => (a.alsoKnownAs ? `${a.name} (${a.alsoKnownAs})` : a.name);

const featuredList = (a: ServiceArea) =>
  formatCityList(a.featured.map((f) => `${f.name} (${f.pincode})`));

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) return {};

  const firstTwo = area.featured.slice(0, 2).map((f) => f.name).join(" and ");

  return buildMetadata({
    title: `Medical Equipment on Rent in ${area.name}`,
    description: `Hospital beds, oxygen concentrators and ICU setups on rent or sale across ${area.pincodes.length} pincodes in ${area.name}, including ${firstTwo}. Own fleet, sanitised, technician-installed.`,
    path: `/locations/${area.slug}`,
  });
}

/** Delhi spans several India Post districts; group its table by them. */
function groupPincodes(area: ServiceArea) {
  if (!area.pincodes.some((p) => p.district)) {
    return [{ heading: null as string | null, entries: area.pincodes }];
  }
  const groups = new Map<string, ServiceArea["pincodes"][number][]>();
  for (const p of area.pincodes) {
    const key = p.district ?? "Other";
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([heading, entries]) => ({ heading, entries }));
}

const MAX_LOCALITIES = 8;

export default async function LocationPage({ params }: { params: Params }) {
  const { slug } = await params;
  const area = getServiceArea(slug);
  if (!area) notFound();

  const products = getAllProducts().filter((p) => p.availability.some((a) => a.city === area.slug));
  const forRent = products.filter((p) => p.offerMode === "rent-or-buy");
  const otherCities = SERVICE_AREAS.filter((a) => a.slug !== area.slug);
  const groups = groupPincodes(area);

  const faqs: Faq[] = [
    {
      question: `Do you deliver medical equipment in ${area.name}?`,
      answer: `Yes — to every one of the ${area.pincodes.length} ${area.name} pincodes listed on this page, including ${featuredList(area)}. A technician delivers the equipment, assembles it in the room and shows whoever is caring for the patient how to use it before leaving.`,
    },
    {
      question: `Which pincodes in ${area.name} do you cover?`,
      answer: `${area.pincodes.map((p) => p.pincode).join(", ")}. If your pincode is not in this list, call us and we will tell you honestly whether we can reach you rather than take the booking and miss it.`,
    },
    {
      question: `How quickly can you deliver in ${area.name}?`,
      answer: `Usually within four hours of a confirmed order. Travel time across ${area.name} varies with traffic and the time of day, so we confirm the delivery time for your pincode when you call instead of promising a slot we might miss.`,
    },
    {
      question: `How much does equipment rental cost in ${area.name}?`,
      answer: `We quote rather than publish a rate card, because the right number depends on how long you need the equipment, which configuration, and whether nursing goes with it. Delivery, assembly and installation within ${area.name} are included in the quote, and GST is stated separately.`,
    },
  ];

  return (
    <>
      <JsonLd schema={generateMedicalBusinessSchema({ citySlug: area.slug })} />
      <JsonLd schema={generateFAQSchema(faqs, `/locations/${area.slug}`)} />

      <Container className="pt-10">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Delhi NCR", href: "/locations" },
            { name: area.name, href: `/locations/${area.slug}` },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-green/30 bg-brand-green/5 px-3.5 py-1.5 text-xs font-medium text-brand-green">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {area.name}, {area.state} · {area.pincodes.length} pincodes
          </p>
          <h1 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-brand-green">Medical equipment</span>{" "}
            <span className="text-text-primary">on rent &amp; sale in {displayName(area)}</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-secondary">
            Hospital beds, oxygen concentrators, BiPAP machines and complete home ICU
            setups, delivered from our own fleet and installed by a technician across{" "}
            {area.pincodes.length} pincodes in {area.name} — including {featuredList(area)}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={telLink()} variant="primary" size="lg">
              <Phone className="h-4 w-4" aria-hidden />
              {CONTACT.phoneDisplay}
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(`Hi Encone Care, I need medical equipment delivered in ${area.name}.`)}
              variant="secondary"
              size="lg"
              external
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp
            </ButtonLink>
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-text-muted">
            <Clock className="h-4 w-4" aria-hidden />
            {CONTACT.hours}
          </p>
        </header>

        <section className="mt-14 max-w-3xl rounded-2xl border border-line-strong bg-surface-raised/40 p-6 sm:p-8">
          <h2 className="font-display text-lg uppercase text-text-primary">
            Before we deliver in {area.name}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">{area.localNote}</p>
        </section>

        <section className="mt-16" aria-labelledby="pincodes-heading">
          <h2 id="pincodes-heading" className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            Pincodes we deliver to in {area.name}
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Locality names are India Post post offices at each pincode, checked{" "}
            {NCR_PINCODES_FETCHED_ON}.
          </p>

          <div className="mt-8 space-y-10">
            {groups.map((group) => (
              <div key={group.heading ?? "all"}>
                {group.heading && (
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-text-muted">
                    {group.heading}
                  </h3>
                )}
                <dl className="divide-y divide-[color:var(--color-line)] border-y border-line">
                  {group.entries.map((p) => {
                    const shown = p.localities.slice(0, MAX_LOCALITIES);
                    const more = p.localities.length - shown.length;
                    return (
                      <div key={p.pincode} className="grid gap-1 py-3 sm:grid-cols-[110px_1fr] sm:gap-6">
                        <dt className="font-mono text-sm font-semibold text-text-primary">{p.pincode}</dt>
                        <dd className="text-sm leading-relaxed text-text-secondary">
                          {shown.join(", ")}
                          {more > 0 && <span className="text-text-muted"> and {more} more</span>}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            Available to rent in {area.name}
          </h2>
          <ProductGrid products={forRent} className="mt-8" priorityCount={3} />
        </section>

        <section className="mt-20">
          <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            Available to buy in {area.name}
          </h2>
          <ProductGrid products={products} className="mt-8" />
        </section>

        <div className="mt-20">
          <FaqSection faqs={faqs} title={`Delivering to ${area.name}`} />
        </div>

        <section className="mt-16 rounded-2xl border border-line-strong bg-surface-raised/35 p-6 sm:p-8">
          <h2 className="font-display text-lg uppercase text-text-primary">
            Elsewhere in Delhi NCR
          </h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherCities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/locations/${city.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm transition hover:border-brand-green/50"
                >
                  <span>
                    <span className="font-semibold text-text-primary">{city.name}</span>
                    <span className="ml-2 text-text-muted">{city.pincodes.length} pincodes</span>
                  </span>
                  <ArrowRight className="h-4 w-4 text-text-muted transition group-hover:translate-x-0.5 group-hover:text-brand-green" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-text-secondary">
            Not sure which area your pincode falls in?{" "}
            <Link href="/locations" className="font-semibold text-brand-green underline-offset-4 hover:underline">
              Check your pincode
            </Link>
            .
          </p>
        </section>
      </Container>

      <div className="h-24" />
    </>
  );
}
