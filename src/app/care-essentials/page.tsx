import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import {
  CARE_ESSENTIAL_GROUPS,
  getAllCareEssentials,
  getCareEssentialsByGroup,
} from "@/data/care-essentials";
import { CONTACT, telLink } from "@/lib/constants";
import { generateFAQSchema } from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Care Essentials & Consumables",
  description:
    "Foley catheters, Ryles feeding tubes, suction catheters, gloves, masks and adult diapers for home care in Delhi — with the sizing and safety guidance that should come with them.",
  path: "/care-essentials",
});

const FAQS: Faq[] = [
  {
    question: "What consumables does a bedbound patient need at home?",
    answer:
      "Typically adult diapers and barrier cream, examination gloves, and — depending on the patient — a urinary catheter with sterile lubricant, a feeding tube, and suction catheters. What matters more than the list is that whoever uses the catheter, feeding tube or suction catheters has been shown how; each of those can cause serious harm when used untrained.",
  },
  {
    question: "Do you supply consumables as well as equipment?",
    answer:
      "Yes. Consumables are a separate catalogue from durable equipment because they are bought repeatedly and chosen by size rather than specification. They can go out with an equipment delivery or on their own within the service area.",
  },
  {
    question: "Which of these can a family member use without training?",
    answer:
      "Gloves, masks, diapers and barrier cream. Foley catheters, Ryles feeding tubes and suction catheters all require a trained nurse for placement, and in the case of feeding tubes, for confirming position before every use. Encore Care can send a nurse or teach the family the parts that can safely be taught.",
  },
  {
    question: "How do I order the right size?",
    answer:
      "Catheter and tube sizes come from the treating clinician — ask them once and write the number down. Diapers are sized by waist or hip measurement, not body weight. Gloves are sized per person rather than per household. Tell us the patient's situation and we will work the sizes out with you.",
  },
];

export default function CareEssentialsPage() {
  const all = getAllCareEssentials();

  return (
    <>
      <JsonLd schema={generateFAQSchema(FAQS, "/care-essentials")} />

      <Container className="pt-10 pb-24">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Care Essentials", href: "/care-essentials" },
          ]}
        />

        <header className="mt-10 max-w-3xl">
          <SectionLabel index={1}>Consumables</SectionLabel>
          <DisplayHeading
            as="h1"
            align="left"
            className="mt-8"
            lead="The small things"
            trail="that decide how the care goes."
          />
          <p className="mt-8 text-base leading-relaxed text-text-secondary">
            Equipment gets bought once. These get bought every week, and they are
            where home care quietly succeeds or fails — a catheter left in too
            long, a feeding tube nobody checked, a diaper two sizes wrong. Each
            item below carries the sizing and the safety points that should have
            come with it.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get the best quote
            </ButtonLink>
            <ButtonLink href={telLink()} variant="secondary" size="lg">
              <Phone className="h-4 w-4" aria-hidden />
              {CONTACT.phoneDisplay}
            </ButtonLink>
          </div>
        </header>

        {/* The honest warning, placed before the catalogue rather than in a
            footnote. Three of these seven items are dangerous in untrained
            hands, and a family ordering them online will not be told that
            anywhere else. */}
        <div className="mt-14 flex items-start gap-4 rounded-2xl border border-brand-amber/35 bg-brand-amber/5 p-6 sm:p-7">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-brand-amber" aria-hidden />
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-amber">
              Three of these need a trained nurse
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              Foley catheters, Ryles feeding tubes and suction catheters are
              ordinary-looking objects that cause serious harm when used by
              someone who was never shown how. Feeding into a nasogastric tube
              whose position has not been confirmed is fatal and is classed as a
              never-event. We will supply these to anyone — but if nobody in the
              household has been trained, say so when you order and we will
              arrange a nurse through{" "}
              <a
                href="https://encorecare.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green underline-offset-4 hover:underline"
              >
                Encore Care
              </a>{" "}
              rather than leave you to work it out.
            </p>
          </div>
        </div>

        {/* Grouped by care task, which is how a carer thinks about them —
            "the catheter things", "the feeding things". */}
        {CARE_ESSENTIAL_GROUPS.map((group) => {
          const items = getCareEssentialsByGroup(group.slug);
          if (items.length === 0) return null;

          return (
            <section key={group.slug} className="mt-16">
              <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-line pb-4">
                <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
                  {group.name}
                </h2>
                <p className="text-sm text-text-muted">{group.description}</p>
              </div>

              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <li key={item.slug} className="h-full">
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[border-color,box-shadow] duration-300 hover:border-brand-green/45 hover:shadow-glow-lg">
                      <div className="relative aspect-[3/2] overflow-hidden bg-surface-sunken/50">
                        <Image
                          src={item.image.src}
                          alt=""
                          width={item.image.width}
                          height={item.image.height}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                        {item.medical && (
                          <span className="absolute left-3 top-3 rounded-full border border-brand-amber/35 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brand-amber">
                            Clinical item
                          </span>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-base font-semibold leading-snug text-text-primary">
                          <Link
                            href={`/care-essentials/${item.slug}`}
                            className="after:absolute after:inset-0 after:content-['']"
                          >
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-text-secondary">
                          {item.summary}
                        </p>
                        <p className="mt-4 text-[11px] uppercase tracking-wider text-text-muted">
                          Also called {item.laySynonyms.slice(0, 2).join(" · ")}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">
                          Sizes &amp; safety
                          <ArrowRight
                            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                            aria-hidden
                          />
                        </span>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <div className="mt-20">
          <FaqSection faqs={FAQS} title="Ordering consumables" />
        </div>

        <section className="mt-16 rounded-2xl border border-line-strong bg-surface-raised/40 p-7 sm:p-10">
          <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
            Tell us the situation, not the shopping list
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Describe who is coming home and what they need help with, and we will
            work out the sizes and quantities with you — {all.length} consumables
            and {" "}
            <Link href="/products" className="text-brand-green underline-offset-4 hover:underline">
              28 pieces of equipment
            </Link>{" "}
            between us. It is a faster conversation than a catalogue.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Get the best quote
            </ButtonLink>
          </div>
        </section>
      </Container>
    </>
  );
}
