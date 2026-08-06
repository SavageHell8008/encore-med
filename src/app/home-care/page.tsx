import Link from "next/link";
import { ArrowUpRight, Phone, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import {
  BRAND,
  CARE_CONDITIONS,
  CARE_SERVICES,
  CONTACT,
  PARENT_STATS,
  SERVICE_AREAS,
  telLink,
} from "@/lib/constants";
import { generateFAQSchema } from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Home Nursing & Care Services — Encone Care",
  description:
    "Verified nurses, attendants, physiotherapists and doctor visits at home across Delhi NCR, Lucknow, Kanpur, Prayagraj and Varanasi — from EnconeMed's parent, Encone Care.",
  path: "/home-care",
});

/**
 * The bridge page between equipment and care.
 *
 * `02-caregiver-journey.md`: the decision-maker is often not the site visitor,
 * and the journey runs discharge → search → comparison → family discussion →
 * phone contact. Someone hunting for a hospital bed is frequently one question
 * away from also needing a nurse; sending them to a bare external link loses
 * them. This page carries the parent's own service copy, then hands over.
 *
 * All service names, descriptions and links are verified from enconecare.in.
 */
const FAQS: Faq[] = [
  {
    question: "Can I get a nurse and equipment together?",
    answer:
      "Yes. EnconeMed supplies the equipment and Encone Care supplies the nursing, from the same phone number. A hospital bed and an attendant trained to reposition a patient in it can be arranged on one call rather than two.",
  },
  {
    question: "How are the nurses verified?",
    answer:
      "Every nurse passes a four-step check before placement: credentials verified with the nursing councils, police clearance, a live in-person clinical skills test, and reference calls to two previous employers. Roughly 30% of applicants are rejected.",
  },
  {
    question: "What does home nursing cost in Delhi?",
    answer:
      "It depends on whether you need a care taker or a GNM/B.Sc. nurse, whether the shift is 12 or 24 hours, and which city you are in — rates outside Delhi NCR are lower. Call us and we will quote for your actual requirement rather than a rate card that fits nobody.",
  },
  {
    question: "Which cities do you cover for home nursing?",
    answer:
      "Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad across the NCR, plus Lucknow, Kanpur, Prayagraj and Varanasi in Uttar Pradesh — over 180 neighbourhoods in total, staffed 24/7.",
  },
];

export default function HomeCarePage() {
  const cities = SERVICE_AREAS.filter((a) => a.areaCount);

  return (
    <>
      <JsonLd schema={generateFAQSchema(FAQS, "/home-care")} />

      <Container className="pt-10 pb-24">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Home Care", href: "/home-care" },
          ]}
        />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_0.8fr] lg:gap-20">
          <div>
            <SectionLabel index={1}>Encone Care · home nursing</SectionLabel>

            <DisplayHeading
              as="h1"
              align="left"
              className="mt-8"
              lead="The equipment is ours."
              trail="So are the nurses."
            />

            <p className="mt-8 text-base leading-relaxed text-text-secondary">
              {BRAND.name} is the equipment arm of{" "}
              <a
                href={BRAND.parent.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-green underline-offset-4 hover:underline"
              >
                {BRAND.parent.name}
              </a>
              , which has been placing verified nurses, attendants and
              physiotherapists in homes across Delhi NCR and Uttar Pradesh since{" "}
              {BRAND.operatingSince}. When a patient comes home from hospital, the
              bed is the easy part — this is the other half.
            </p>

            <p className="mt-5 text-base italic leading-relaxed text-text-muted">
              “{BRAND.parent.tagline}”
            </p>
          </div>

          <aside className="h-fit rounded-2xl border border-line-strong bg-surface-raised/40 p-7">
            <h2 className="flex items-center gap-2.5 font-display text-lg uppercase text-text-primary">
              <ShieldCheck className="h-5 w-5 text-brand-green" aria-hidden />
              Four-step verification
            </h2>
            <ol className="mt-5 space-y-3 text-sm leading-relaxed text-text-secondary">
              <li>1. Credentials verified with the nursing councils.</li>
              <li>2. Police clearance.</li>
              <li>3. A live clinical skills test, in person.</li>
              <li>4. Reference calls to two previous employers.</li>
            </ol>
            <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-text-muted">
              Roughly 30% of applicants do not make it through.
            </p>
            <ButtonLink href={telLink()} variant="primary" size="md" className="mt-6 w-full">
              <Phone className="h-4 w-4" aria-hidden />
              {CONTACT.phoneDisplay}
            </ButtonLink>
          </aside>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-8 border-y border-line py-10 lg:grid-cols-4">
          {PARENT_STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl text-brand-mint sm:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-xs leading-snug text-text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <section className="mt-20">
          <SectionLabel index={2}>Services</SectionLabel>
          <DisplayHeading
            align="left"
            className="mt-8 max-w-3xl"
            lead="Ten ways"
            trail="someone can help at home."
          />

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-[color:var(--color-line)] sm:grid-cols-2">
            {CARE_SERVICES.map((service) => (
              <li key={service.slug} className="bg-surface-raised/40">
                <a
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start justify-between gap-5 p-7 transition-colors hover:bg-surface-raised/80"
                >
                  <span className="min-w-0">
                    <span className="block font-display text-lg uppercase text-text-primary transition-colors group-hover:text-brand-green">
                      {service.name}
                    </span>
                    <span className="mt-2.5 block text-sm leading-relaxed text-text-secondary">
                      {service.description}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="mt-1 h-4 w-4 shrink-0 text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-green"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <SectionLabel index={3}>By condition</SectionLabel>
          <DisplayHeading
            align="left"
            className="mt-8 max-w-3xl"
            lead="Start from the diagnosis,"
            trail="not the device."
          />
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-text-secondary">
            Most families arrive describing a condition rather than a piece of
            equipment. These are the routes in — each pairs a care plan with the
            equipment that usually goes with it.
          </p>
          <ul className="mt-10 flex flex-wrap gap-3">
            {CARE_CONDITIONS.map((condition) => (
              <li key={condition.href}>
                <a
                  href={condition.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-xl border border-line-strong px-5 py-3.5 text-sm text-text-secondary transition-all hover:border-brand-teal/60 hover:text-text-primary"
                >
                  {condition.name}
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20">
          <SectionLabel index={4}>Coverage</SectionLabel>
          <DisplayHeading
            align="left"
            className="mt-8 max-w-3xl"
            lead="Nine cities."
            trail="Over 180 neighbourhoods."
          />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-strong bg-[color:var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {cities.map((city) => (
              <li
                key={city.slug}
                className="flex items-baseline justify-between gap-4 bg-surface-raised/40 px-6 py-5"
              >
                <span className="text-sm font-semibold text-text-primary">
                  {city.name}
                </span>
                <span className="text-xs text-text-muted">
                  {city.areaCount} areas
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-text-muted">
            Equipment delivery is live in Delhi. Elsewhere the care network is
            on the ground and equipment is arranged on request.
          </p>
        </section>

        <div className="mt-20">
          <FaqSection faqs={FAQS} title="Home care questions" />
        </div>

        <section className="mt-16 rounded-2xl border border-line-strong bg-surface-raised/35 p-7 sm:p-10">
          <h2 className="font-display text-xl uppercase text-text-primary sm:text-2xl">
            Need both?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
            Tell us what happened and who is coming home. We will work out the
            equipment and the care together rather than selling you one and
            leaving you to find the other.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact" variant="primary" size="lg">
              Talk to us
            </ButtonLink>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-line-strong px-7 py-3.5 text-sm font-semibold text-text-secondary transition-all hover:border-brand-green/50 hover:text-text-primary"
            >
              Browse equipment
            </Link>
          </div>
        </section>
      </Container>
    </>
  );
}
