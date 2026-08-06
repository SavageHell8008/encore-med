import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProductsByCategory } from "@/data/products";
import { CATEGORIES, getCategory } from "@/data/taxonomy";
import { LIVE_SERVICE_AREAS } from "@/lib/constants";
import {
  generateFAQSchema,
  generateItemListSchema,
} from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

type Params = Promise<{ slug: string }>;

/**
 * Category pages are the curated, indexable layer. Filtered `/products?…` URLs
 * are noindex by design (`04-seo.md` — scaled content abuse), so these are what
 * actually compete for "hospital bed on rent delhi" style queries.
 */
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};

  const products = getProductsByCategory(slug);
  const rentable = products.filter((p) => p.offerMode === "rent-or-buy").length;

  const offerFragment = rentable
    ? `${rentable} of ${products.length} available on rent or to buy.`
    : `${products.length} available to buy.`;

  return buildMetadata({
    title: category.headline,
    description: `${category.description} ${offerFragment} Delivered and installed in Delhi within four hours — ask for a quote.`,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(slug);

  // Category-level questions, distinct from the per-product ones so the two
  // sets do not cannibalise each other.
  const faqs: Faq[] = [
    {
      question: `Where can I rent ${category.name.toLowerCase()} in Delhi?`,
      answer: `EnconeMed supplies ${category.name.toLowerCase()} on rent and for sale across ${LIVE_SERVICE_AREAS.map((a) => a.name).join(" and ")}, delivered and installed by a technician usually within four hours of a confirmed order.`,
    },
    {
      question: `How much do ${category.name.toLowerCase()} cost?`,
      answer:
        products.length > 0
          ? `We quote rather than publish a rate card. The right number depends on how long you need the equipment, which configuration, and whether nursing goes with it — a published figure would fit almost nobody. Tell us what you need and we will give you a straight quote the same day, with GST stated separately. ${products.filter((p) => p.offerMode === "rent-or-buy").length} of the ${products.length} items in this category are available on rent as well as to buy.`
          : "Ask us for a quote and we will price against what you actually need.",
    },
    {
      question: "Is the equipment new or refurbished?",
      answer:
        "Purchase units are new and carry a manufacturer warranty. Rental units are previously used and are detergent-washed, disinfected and inspected against the manufacturer's reprocessing instructions before every issue — the completed checklist is handed over at delivery.",
    },
  ];

  return (
    <>
      <JsonLd
        schema={generateItemListSchema(
          products.map((p) => ({ name: p.name, href: `/products/${p.slug}` })),
          category.name,
        )}
      />
      <JsonLd schema={generateFAQSchema(faqs, `/categories/${category.slug}`)} />

      <Container className="pt-10">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Equipment", href: "/products" },
            { name: category.name, href: `/categories/${category.slug}` },
          ]}
        />

        <div className="mt-8">
          {/* One H1 per page, leading with the primary keyword. The suffix is
              derived rather than fixed: categories like Pressure Care and
              Hospital Furniture are sale-only, and an H1 promising "on rent"
              for them would be a claim the page immediately contradicts. */}
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            <span className="text-glow text-brand-green">{category.name}</span>{" "}
            <span className="text-text-primary">
              {products.some((p) => p.offerMode === "rent-or-buy")
                ? "on rent & sale in Delhi"
                : "for sale in Delhi"}
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-text-secondary">
            {category.description}
          </p>
          <p className="mt-4 text-sm text-text-muted">
            Also searched as: {category.laySynonyms.join(" · ")}
          </p>
        </div>

        <ProductGrid products={products} className="mt-12" priorityCount={3} />

        <div className="mt-20 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <FaqSection faqs={faqs} title={`About ${category.name.toLowerCase()}`} />

          <aside className="h-fit rounded-2xl border border-line-strong bg-surface-raised/40 p-6 sm:p-7">
            <h2 className="text-base font-semibold text-text-primary">
              Not sure which one you need?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Tell us what the patient is struggling with rather than which model
              you want. We will narrow it to one or two options and explain the
              difference — including when the cheaper one is the right answer.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-brand-mint/50 bg-brand-mint/10 px-5 py-2.5 text-sm font-semibold text-brand-mint transition-all hover:bg-brand-mint/20 hover:shadow-glow-mint"
            >
              Talk to someone who knows the equipment
            </Link>
          </aside>
        </div>

        <section className="mt-20">
          <SectionHeading
            eyebrow="Other categories"
            title="Everything else we supply"
            as="h2"
          />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {CATEGORIES.filter((c) => c.slug !== category.slug).map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="inline-block rounded-full border border-line-strong px-4 py-2.5 text-sm text-text-secondary transition-all hover:border-brand-green/50 hover:text-text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>

      <div className="h-24" />
    </>
  );
}
