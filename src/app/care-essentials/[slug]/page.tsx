import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Info, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SafetyInformation } from "@/components/product/SafetyInformation";
import { InquiryForm } from "@/components/product/InquiryForm";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import {
  CARE_ESSENTIAL_GROUPS,
  getAllCareEssentials,
  getCareEssential,
} from "@/data/care-essentials";
import { getProduct } from "@/data/products";
import {
  generateCareEssentialSchema,
  generateFAQSchema,
} from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllCareEssentials().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getCareEssential(slug);
  if (!item) return {};

  return buildMetadata({
    title: `${item.name} — Sizes & Safety`,
    description: `${item.summary} Supplied in Delhi with sizing guidance. Get the best quote.`,
    path: `/care-essentials/${item.slug}`,
    images: [
      {
        url: item.image.src,
        width: item.image.width,
        height: item.image.height,
        alt: item.image.alt,
      },
    ],
  });
}

export default async function CareEssentialPage({ params }: { params: Params }) {
  const { slug } = await params;
  const item = getCareEssential(slug);
  if (!item) notFound();

  const group = CARE_ESSENTIAL_GROUPS.find((g) => g.slug === item.group);
  const related = item.relatedProductSlugs
    .map((s) => getProduct(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd schema={generateCareEssentialSchema(item)} />
      <JsonLd schema={generateFAQSchema(item.faqs, `/care-essentials/${item.slug}`)} />

      <Container className="pt-10 pb-24">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Care Essentials", href: "/care-essentials" },
            { name: item.name, href: `/care-essentials/${item.slug}` },
          ]}
        />

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <div>
            <div className="overflow-hidden rounded-2xl border border-line bg-surface-sunken/40">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                priority
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="h-full w-full object-contain p-8"
              />
            </div>

            <div className="mt-8">
              {group && (
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  {group.name}
                </p>
              )}
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
                {item.name}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-text-secondary">
                {item.summary}
              </p>
              <p className="mt-4 text-sm text-text-muted">
                Also searched as: {item.laySynonyms.join(" · ")}
              </p>

              {/* Untrained-use warning, above the fold on the items where it
                  matters. A family ordering a feeding tube online is told this
                  nowhere else. */}
              {item.medical && (
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-brand-amber/35 bg-brand-amber/5 p-5">
                  <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-brand-amber" aria-hidden />
                  <p className="text-sm leading-relaxed text-text-secondary">
                    <span className="font-semibold text-text-primary">
                      This is a clinical item.
                    </span>{" "}
                    Read the safety information below before use. If nobody in
                    the household has been trained, tell us when you order and we
                    will arrange a nurse rather than leave you to it.
                  </p>
                </div>
              )}

              <div className="mt-8 rounded-2xl border border-brand-green/30 bg-brand-green/6 p-5">
                <p className="text-base font-semibold text-text-primary">
                  Get the best quote
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  Consumables are quoted by size and quantity, and it is usually
                  cheaper per unit to set up a standing reorder than to buy pack
                  by pack. Tell us the situation and we will work the sizes out
                  with you.
                </p>
              </div>

              <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-text-muted">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
                Quotes state GST separately at the applicable rate.
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <InquiryForm equipmentName={item.name} defaultIntent="buy" compact />
          </div>
        </div>

        <div className="mt-20 max-w-3xl space-y-16">
          <section>
            <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
              What it is for
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-secondary">
              {item.description}
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
              Sizes &amp; variants
            </h2>
            <dl className="mt-6 divide-y divide-[color:var(--color-line)] border-y border-line">
              {item.variants.map((row) => (
                <div key={row.label} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                  <dt className="text-sm font-semibold text-text-primary">{row.label}</dt>
                  <dd className="text-sm leading-relaxed text-text-secondary">
                    {row.value}
                    {row.note && (
                      <span className="mt-1.5 block text-xs text-text-muted">{row.note}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
              How to use it properly
            </h2>
            <ul className="mt-6 space-y-3">
              {item.usage.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-text-secondary">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
              Also know about
            </h2>
            <dl className="mt-6 space-y-5">
              {item.alsoKnowAbout.map((row) => (
                <div
                  key={row.label}
                  className="rounded-2xl border border-line-strong bg-surface-raised/35 p-5"
                >
                  <dt className="text-sm font-semibold text-text-primary">{row.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          {item.medical && <SafetyInformation medical={item.medical} />}

          <FaqSection faqs={item.faqs} title={`About ${item.name.toLowerCase()}`} />

          {related.length > 0 && (
            <section>
              <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
                Used with
              </h2>
              <ul className="mt-6 space-y-2">
                {related.map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/products/${product.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-xl border border-line-strong bg-surface-raised/35 px-5 py-4 transition-colors hover:border-brand-green/50"
                    >
                      <span className="text-sm font-semibold text-text-primary">
                        {product.name}
                      </span>
                      <ArrowRight
                        className="h-4 w-4 shrink-0 text-text-muted transition-all group-hover:translate-x-0.5 group-hover:text-brand-green"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <p className="text-xs text-text-muted">
            Updated {formatDate(item.updatedAt)}. Product information, not medical
            advice — sizes and technique are decisions for the treating clinician.
          </p>
        </div>
      </Container>
    </>
  );
}
