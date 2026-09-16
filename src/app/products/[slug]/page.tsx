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
import { getCategory } from "@/data/taxonomy";
import { whatsappLink } from "@/lib/constants";
import { SERVICE_AREAS } from "@/lib/service-areas";
import {
  generateFAQSchema,
  generateProductSchema,
} from "@/lib/schema-generator";
import { buildProductMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import type { SpecRow } from "@/lib/types";

type Params = Promise<{ slug: string }>;

/** Fully static: the catalogue is a build-time manifest, not a live database. */
export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return buildProductMetadata(product);
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product);

  const availableAreas = product.availability
    .map((a) => ({
      ...a,
      area: SERVICE_AREAS.find((s) => s.slug === a.city),
    }))
    .filter((a) => a.area);

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
      <JsonLd schema={generateFAQSchema(product.faqs, `/products/${product.slug}`)} />

      <Container className="pt-10">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Equipment", href: "/products" },
            ...(category
              ? [{ name: category.name, href: `/categories/${category.slug}` }]
              : []),
            { name: product.name, href: `/products/${product.slug}` },
          ]}
        />

        {/* ---- Photo left, enquiry form right ---- */}
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <ProductGallery images={product.images} productName={product.name} />

            <div className="mt-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {product.summary}
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

              {/* ---- How it is supplied. No amounts: every commercial
                   question resolves to a quote. ---- */}
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
                    On rent
                  </h2>
                  <p className="mt-3 text-lg font-bold text-text-primary">
                    {product.offerMode === "rent-or-buy" ? "Available" : "Not on the rental fleet"}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {product.offerMode === "rent-or-buy"
                      ? "Stocked for rental with delivery, installation and servicing included. Tell us how long you need it and we will quote for that period."
                      : "This item is supplied for purchase. If you need something similar on rent, call us — we will tell you what the rental fleet can do instead."}
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-green/35 bg-brand-green/5 p-5">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                    To buy
                  </h2>
                  <p className="mt-3 text-lg font-bold text-text-primary">Available</p>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    Outright purchase including delivery, installation and a
                    one-year warranty on manufacturing defects.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-brand-green/30 bg-brand-green/6 p-5">
                <p className="text-base font-semibold text-text-primary">
                  Get the best quote for this equipment
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  We price against what you actually need — how long, which
                  configuration, whether nursing goes with it — rather than
                  publishing a number that fits nobody. Ask and we will give you
                  a straight one, GST stated separately.
                </p>
                <div className="mt-4 pt-3 border-t border-brand-green/20">
                  <a
                    href={whatsappLink(`Hi Encone Care, I want to buy ${product.name}. Please share price & details.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-mint/50 bg-brand-mint/10 px-4 py-2.5 text-sm font-semibold text-brand-mint transition-all hover:bg-brand-mint hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Buy Now via WhatsApp
                  </a>
                </div>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-muted">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                {/* GST is called out as separate rather than folded in: rental
                    is a supply of service (SAC) and sale a supply of goods
                    (HSN), and the applicable rental rate is an open question
                    flagged in 01-business-understanding.md. */}
                Quotes state GST separately at the applicable rate. Rental and
                purchase are taxed differently.
              </p>
            </div>
          </div>

          {/* Sticky enquiry form on the right. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <InquiryForm
              equipmentName={product.name}
              defaultIntent={product.offerMode === "rent-or-buy" ? "rent" : "buy"}
            />
          </div>
        </div>

        {/* ---- Long-form content ---- */}
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
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green"
                    />
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

            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Brands available
              </h2>
              <p className="mt-3 text-sm text-text-muted">
                Which brand you receive depends on current stock. Tell us if you
                need a specific one and we will confirm before dispatch.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {product.brandsAvailable.map((brand) => (
                  <li
                    key={brand}
                    className="rounded-xl border border-brand-teal/30 bg-brand-teal/8 px-4 py-2.5 text-sm font-medium text-brand-teal"
                  >
                    {brand}
                  </li>
                ))}
              </ul>
            </section>

            <SpecTable
              title="Specifications"
              rows={product.specifications}
              accent="cyan"
            />

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

            {/* ---- ALSO KNOW ABOUT ---- */}
            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Also know about
              </h2>
              <p className="mt-3 text-sm text-text-muted">
                The things that are easy to find out too late.
              </p>
              <ul className="mt-6 space-y-3">
                {product.alsoKnowAbout.map((row) => (
                  <li
                    key={row.label}
                    className="rounded-xl border border-brand-amber/25 bg-brand-amber/5 p-5"
                  >
                    {/* The pink border marks the section as "read this before
                        you book"; the values themselves stay neutral so a
                        routine fact (running cost, filter schedule) does not
                        read as a warning. */}
                    {/* Full-strength amber, not /80: at 12px on the amber-tinted
                        panel the faded version measured 4.28:1, under AA. */}
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

            {/* Rendered from the same object the MedicalDevice JSON-LD is built
                from, so the markup can never describe content the visitor
                cannot see. */}
            <SafetyInformation medical={product.medical} />

            <FaqSection faqs={product.faqs} />

            {/* ---- Where we supply this ---- */}
            <section>
              <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                Where we supply this
              </h2>
              <ul className="mt-6 space-y-3">
                {availableAreas.map((entry) => (
                  <li
                    key={entry.city}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line-strong bg-surface-raised/35 px-5 py-4"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-semibold text-text-primary">
                      <MapPin className="h-4 w-4 text-brand-green" aria-hidden />
                      <Link
                        href={`/locations/${entry.city}`}
                        className="underline-offset-4 hover:text-brand-green hover:underline"
                      >
                        {entry.area!.name}
                      </Link>
                    </span>
                    <span className="flex flex-wrap items-center gap-2 text-xs">
                      {product.offerMode === "rent-or-buy" && (
                        <span className="rounded-full border border-brand-mint/40 bg-brand-mint/10 px-2.5 py-1 font-medium text-brand-mint">
                          For rent
                        </span>
                      )}
                      <span className="rounded-full border border-brand-green/40 bg-brand-green/10 px-2.5 py-1 font-medium text-brand-green">
                        For sale
                      </span>
                      {entry.sameDay && (
                        <span className="text-text-muted">Installed in under 4 hrs</span>
                      )}
                      {entry.deliveryNote && (
                        <span className="text-text-muted">{entry.deliveryNote}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-text-muted">
                We deliver across Delhi NCR only.{" "}
                <Link href="/locations" className="font-semibold text-brand-green underline-offset-4 hover:underline">
                  Check your pincode
                </Link>
                , or call us and we will tell you honestly whether we can reach you.
              </p>
            </section>
          </div>

          {/* Right rail: EEAT byline and freshness. */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {product.reviewedBy && (
              <div className="rounded-2xl border border-line-strong bg-surface-raised/40 p-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
                  <BadgeCheck className="h-4 w-4 text-brand-green" aria-hidden />
                  Clinically reviewed
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  Verified by{" "}
                  <span className="font-medium text-text-primary">{product.reviewedBy.name}</span>
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
              <h2 className="text-sm font-semibold text-text-primary">Page information</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-text-muted">Updated</dt>
                  <dd className="text-text-secondary">{formatDate(product.updatedAt)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-text-muted">Availability</dt>
                  <dd className="text-text-secondary">
                    {product.inStock ? "In stock" : "On order"}
                  </dd>
                </div>
              </dl>
              <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-text-muted">
                This page describes equipment. It is not medical advice —
                prescribed settings must come from the treating clinician.
              </p>
            </div>
          </aside>
        </div>

        {/* ---- These might be of interest ---- */}
        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              These might be of interest
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-text-secondary">
              Items usually needed alongside this one — chosen because they solve
              an adjacent problem, not because they cost more.
            </p>
            <ProductGrid products={related} className="mt-8" />
          </section>
        )}
      </Container>

      <div className="h-24" />
    </>
  );
}

function SpecTable({
  title,
  rows,
  accent,
}: {
  title: string;
  rows: SpecRow[];
  accent: "cyan" | "mint";
}) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">{title}</h2>
      <div className="mt-6 overflow-hidden rounded-2xl border border-line-strong">
        <table className="w-full text-sm">
          <tbody className="divide-y divide-[color:var(--color-line)]">
            {rows.map((row) => (
              <tr key={row.label} className="bg-surface-raised/30">
                <th
                  scope="row"
                  className="w-2/5 px-5 py-3.5 text-left align-top font-medium text-text-muted"
                >
                  {row.label}
                </th>
                <td className="px-5 py-3.5 align-top">
                  <span
                    className={
                      accent === "cyan" ? "text-text-primary" : "text-brand-mint"
                    }
                  >
                    {row.value}
                  </span>
                  {/* Plain-language gloss on first use of any clinical term. */}
                  {row.note && (
                    <span className="mt-1 block text-xs leading-relaxed text-text-muted">
                      {row.note}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
