import { notFound } from "next/navigation";
import Link from "next/link";
import {
  BadgeCheck,
  CalendarClock,
  Info,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGallery } from "@/components/product/ProductGallery";
import { InquiryForm } from "@/components/product/InquiryForm";
import { SafetyInformation } from "@/components/product/SafetyInformation";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { getProduct, getAllProducts, getRelatedProducts } from "@/data/products";
import { whatsappLink } from "@/lib/constants";
import { SERVICE_AREAS, getServiceArea } from "@/lib/service-areas";
import {
  generateFAQSchema,
  generateProductSchema,
} from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import type { SpecRow } from "@/lib/types";

type Params = Promise<{ slug: string; product: string }>;

export function generateStaticParams() {
  const paths: { slug: string; product: string }[] = [];
  
  for (const area of SERVICE_AREAS) {
    for (const product of getAllProducts()) {
      if (product.availability.some((a) => a.city === area.slug)) {
        paths.push({ slug: area.slug, product: product.slug });
      }
    }
  }
  return paths;
}



export async function generateMetadata({ params }: { params: Params }) {
  const { slug, product: productSlug } = await params;
  const area = getServiceArea(slug);
  const product = getProduct(productSlug);
  
  if (!area || !product) return {};

  const offerFragment = product.offerMode === "rent-or-buy" ? "On rent or to buy" : "Available to buy";
  const title = `${product.name} on Rent & Sale in ${area.name} | Encone Care`;
  const description = `${product.summary} ${offerFragment} in ${area.name} — sanitised, technician-installed, usually within four hours. Get the best quote.`;

  return buildMetadata({
    title,
    description,
    path: `/locations/${area.slug}/${product.slug}`,
    images: product.images.slice(0, 1).map((img) => ({
      url: img.src,
      width: img.width,
      height: img.height,
      alt: img.alt,
    })),
    modifiedTime: product.updatedAt,
  });
}

export default async function LocationProductPage({ params }: { params: Params }) {
  const { slug, product: productSlug } = await params;
  const area = getServiceArea(slug);
  const product = getProduct(productSlug);
  
  if (!area || !product) notFound();

  const related = getRelatedProducts(product);
  const badgeIcons = {
    sanitised: ShieldCheck,
    "same-day-delivery": Truck,
    "technician-installed": Wrench,
    bestseller: BadgeCheck,
    new: BadgeCheck,
  } as const;

  return (
    <>
      <JsonLd schema={generateProductSchema(product)} />
      <JsonLd schema={generateFAQSchema(product.faqs, `/locations/${area.slug}/${product.slug}`)} />

      <Container className="pt-10">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Delhi NCR", href: "/locations" },
            { name: area.name, href: `/locations/${area.slug}` },
            { name: product.name, href: `/locations/${area.slug}/${product.slug}` },
          ]}
        />

        {/* ---- Photo left, enquiry form right ---- */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <ProductGallery images={product.images} productName={`${product.name} in ${area.name}`} />

            <div className="mt-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                {product.name} in {area.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                <span className="font-medium text-text-primary">Available across {area.pincodes.length} pincodes in {area.name}.</span> {product.summary}
              </p>

              <ul className="mt-6 flex flex-wrap gap-2">
                {product.badges.map((badge) => {
                  const Icon = badgeIcons[badge] ?? BadgeCheck;
                  return (
                    <li
                      key={badge}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-mint/35 bg-brand-mint/8 px-3 py-1.5 text-xs font-medium text-brand-mint"
                    >
                      <Icon className="h-3.5 w-3.5" aria-hidden />
                      {badge.replace(/-/g, " ")}
                    </li>
                  );
                })}
              </ul>

              {/* ---- How it is supplied ---- */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div
                  className={
                    product.offerMode === "rent-or-buy"
                      ? "rounded-2xl border border-brand-mint/35 bg-brand-mint/5 p-5"
                      : "rounded-2xl border border-line-strong bg-surface-raised/50 p-5"
                  }
                >
                  <h2
                    className={
                      product.offerMode === "rent-or-buy"
                        ? "text-xs font-semibold uppercase tracking-widest text-brand-mint"
                        : "text-xs font-semibold uppercase tracking-widest text-text-muted"
                    }
                  >
                    On rent in {area.name}
                  </h2>
                  <p className="mt-3 text-lg font-bold text-text-primary">
                    {product.offerMode === "rent-or-buy" ? "Available" : "Not on the rental fleet"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {product.offerMode === "rent-or-buy"
                      ? `Stocked for rental across ${area.name} with delivery, installation and servicing included.`
                      : "This item is supplied for purchase. If you need something similar on rent, call us."}
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-green/35 bg-brand-green/5 p-5">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                    To buy in {area.name}
                  </h2>
                  <p className="mt-3 text-lg font-bold text-text-primary">Available</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    Outright purchase including delivery anywhere in {area.name}, installation and a one-year warranty.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-brand-green/30 bg-brand-green/6 p-5">
                <p className="text-base font-semibold text-text-primary">
                  Get the best quote for delivery in {area.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  We price against what you actually need — how long, which
                  configuration, whether nursing goes with it — rather than
                  publishing a number that fits nobody. Ask and we will give you
                  a straight one, GST stated separately.
                </p>
                <div className="mt-4 pt-3 border-t border-brand-green/20">
                  <a
                    href={whatsappLink(`Hi Encone Care, I want to rent/buy ${product.name} in ${area.name}. Please share price & details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-mint/50 bg-brand-mint/10 px-4 py-2.5 text-sm font-semibold text-brand-mint transition-all hover:bg-brand-mint hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Inquire via WhatsApp
                  </a>
                </div>
              </div>
              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-muted">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                Quotes state GST separately at the applicable rate. Rental and
                purchase are taxed differently.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <InquiryForm
              equipmentName={product.name}
              defaultIntent={product.offerMode === "rent-or-buy" ? "rent" : "buy"}
            />
          </div>
        </div>

        <div className="mt-20 grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div className="space-y-14">
            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                About this equipment
              </h2>
              <p className="mt-5 text-base leading-relaxed text-text-secondary">
                {product.description}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Indications — when this is used
              </h2>
              <ul className="mt-5 space-y-3">
                {product.indications.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                    <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Who it is for
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {product.audience.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-line-strong bg-surface-raised/35 px-4 py-3.5 text-sm leading-relaxed text-text-secondary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <SpecTable title="Specifications" rows={product.specifications} accent="cyan" />

            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Dimensions &amp; space required
              </h2>
              <div className="mt-6 overflow-hidden rounded-2xl border border-line-strong">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-[color:var(--color-line)]">
                    {(
                      [
                        ["Length", product.dimensions.length],
                        ["Width", product.dimensions.width],
                        ["Height", product.dimensions.height],
                        ["Weight", product.dimensions.weight],
                        ["Load capacity", product.dimensions.loadCapacity],
                      ] as const
                    )
                      .filter(([, value]) => Boolean(value))
                      .map(([label, value]) => (
                        <tr key={label} className="bg-surface-raised/30">
                          <th scope="row" className="w-2/5 px-5 py-3.5 text-left font-medium text-text-muted">
                            {label}
                          </th>
                          <td className="px-5 py-3.5 text-text-primary">{value}</td>
                        </tr>
                      ))}
                    {product.dimensions.extra?.map((row) => (
                      <tr key={row.label} className="bg-surface-raised/30">
                        <th scope="row" className="w-2/5 px-5 py-3.5 text-left font-medium text-text-muted">
                          {row.label}
                        </th>
                        <td className="px-5 py-3.5 text-text-primary">{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Also know about
              </h2>
              <ul className="mt-6 space-y-3">
                {product.alsoKnowAbout.map((row) => (
                  <li key={row.label} className="rounded-xl border border-brand-amber/25 bg-brand-amber/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand-amber">
                      {row.label}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-text-primary">
                      {row.value}
                    </p>
                    {row.note && (
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                        {row.note}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>

            <SafetyInformation medical={product.medical} />
            <FaqSection faqs={product.faqs} />
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {product.reviewedBy && (
              <div className="rounded-2xl border border-line-strong bg-surface-raised/40 p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <BadgeCheck className="h-4 w-4 text-brand-green" aria-hidden />
                  Clinically reviewed
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Verified by <span className="font-medium text-text-primary">{product.reviewedBy.name}</span>
                  <br />
                  <span className="text-text-muted">{product.reviewedBy.credentials}</span>
                </p>
                <p className="mt-3 flex items-center gap-2 text-xs text-text-muted">
                  <CalendarClock className="h-3.5 w-3.5" aria-hidden />
                  Last verified {formatDate(product.reviewedBy.date)}
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-line-strong bg-surface-raised/40 p-6">
              <h2 className="text-sm font-semibold text-text-primary">Service Area Information</h2>
              <p className="mt-3 text-sm text-text-secondary">
                Currently viewing {product.name} availability for {area.name}.
              </p>
              <dl className="mt-3 space-y-2 text-sm border-t border-line pt-3">
                <div className="flex justify-between gap-3">
                  <dt className="text-text-muted">Pincodes served</dt>
                  <dd className="text-text-secondary font-medium">{area.pincodes.length}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-text-muted">Delivery</dt>
                  <dd className="text-text-secondary font-medium">Usually under 4 hours</dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              Other {area.name} Rentals
            </h2>
            <ProductGrid products={related} className="mt-8" />
          </section>
        )}
      </Container>
      <div className="h-24" />
    </>
  );
}

function SpecTable({ title, rows, accent }: { title: string; rows: SpecRow[]; accent: "cyan" | "mint" }) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">{title}</h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line-strong">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-[color:var(--color-line)]">
            {rows.map((row) => (
              <tr key={row.label} className="bg-surface-raised/30">
                <th scope="row" className="w-2/5 px-5 py-3.5 text-left align-top font-medium text-text-muted">
                  {row.label}
                </th>
                <td className="px-5 py-3.5 align-top">
                  <span className={accent === "cyan" ? "text-text-primary" : "text-brand-mint"}>
                    {row.value}
                  </span>
                  {row.note && <span className="mt-1 block text-xs leading-relaxed text-text-muted">{row.note}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
