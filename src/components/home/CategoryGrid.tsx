import Link from "next/link";
import {
  Accessibility,
  Activity,
  ArrowRight,
  Bed,
  HeartPulse,
  Monitor,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { CapabilityGrid, type Capability } from "@/components/ui/CapabilityGrid";
import { CATEGORIES, USE_CASES } from "@/data/taxonomy";
import { getProductsByCategory } from "@/data/products";

const ICONS: Record<string, LucideIcon> = {
  bed: Bed,
  wind: Wind,
  activity: Activity,
  accessibility: Accessibility,
  monitor: Monitor,
  "heart-pulse": HeartPulse,
};

/**
 * The dual-door IA from `05-information-architecture-research.md`, rendered
 * literally: an object-type door (what the equipment is) and a situation door
 * (what the problem is), side by side and cross-linked — never one nested
 * inside the other. Caregivers arrive with a symptom, clinicians with a name.
 */
export function CategoryGrid() {
  const items: Capability[] = CATEGORIES.map((category) => {
    const products = getProductsByCategory(category.slug);
    const rentable = products.filter((p) => p.offerMode === "rent-or-buy").length;

    return {
      icon: ICONS[category.icon] ?? Bed,
      title: category.name,
      body: category.description,
      // Lay synonyms shown, not buried in a meta tag: the gap between "oxygen
      // concentrator" and "oxygen ka machine" is a real navigation barrier
      // (`14-mental-models.md`).
      meta: `${products.length} item${products.length === 1 ? "" : "s"}${
        rentable ? `, ${rentable} on rent` : ", to buy"
      } · Also called ${category.laySynonyms[0]}`,
      href: `/categories/${category.slug}`,
      linkLabel: `See ${category.name.toLowerCase()}`,
    };
  });

  return (
    <section id="categories" className="scroll-mt-24 py-16 lg:py-20">
      <Container>
        <SectionLabel index={1} align="center">
          What we supply
        </SectionLabel>

        <DisplayHeading
          className="mx-auto mt-8 max-w-4xl"
          lead="Everything a room needs"
          trail="to become a ward."
        />

        <p className="mx-auto mt-7 max-w-2xl text-center text-base leading-relaxed text-text-secondary">
          Browse by the equipment you already know you need — or, if you are not
          sure, start from what the patient is actually struggling with.
        </p>

        <CapabilityGrid items={items} columns={3} className="mt-16" />

        {/* Consumables are a sibling catalogue, not a category — linked here so
            the equipment door does not dead-end for someone who came looking
            for catheters or diapers. */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line-strong bg-surface p-7 shadow-card sm:p-8">
          <div className="max-w-xl">
            <h3 className="font-display text-lg uppercase text-text-primary">
              Also need the consumables?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Catheters, feeding tubes, suction catheters, gloves, masks and
              adult diapers — with the sizing and safety guidance that should
              come with them.
            </p>
          </div>
          <Link
            href="/care-essentials"
            className="group inline-flex items-center gap-2.5 rounded-xl border border-brand-green/40 bg-brand-green/6 px-6 py-3.5 text-sm font-semibold text-brand-green transition-all hover:bg-brand-green hover:text-white"
          >
            Care Essentials
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>

        {/* Door two — situation-based entry. */}
        <div className="mt-16 border-t border-line pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4">
            <h3 className="font-display text-lg uppercase text-text-primary">
              Not sure what you need?
            </h3>
            <p className="text-sm text-text-muted">
              Tell us the problem, not the product.
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2.5">
            {USE_CASES.map((useCase) => (
              <li key={useCase.slug}>
                <Link
                  href={`/products?need=${useCase.slug}`}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong px-5 py-3 text-sm text-text-secondary transition-all hover:border-brand-green/60 hover:bg-brand-green/5 hover:text-text-primary"
                >
                  {useCase.name}
                  <ArrowRight
                    className="h-3.5 w-3.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
