import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { HomeCareBand } from "@/components/home/HomeCareBand";
import { WhyEnconeMed } from "@/components/home/WhyEnconeMed";
import { Testimonials } from "@/components/home/Testimonials";
import { ProductGrid } from "@/components/product/ProductGrid";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { getFeaturedProducts } from "@/data/products";
import { CARE_NETWORK_AREAS, LIVE_SERVICE_AREAS } from "@/lib/constants";
import {
  generateFAQSchema,
  generateMedicalBusinessSchema,
} from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Medical Equipment on Rent & Sale in Delhi",
  description:
    "Rent or buy hospital beds, oxygen concentrators, BiPAP machines and home ICU setups in Delhi. Sanitised equipment, technician-installed in under four hours. Get the best quote.",
  path: "/",
});

/** Answer-first responses to the questions people actually type. */
const HOME_FAQS: Faq[] = [
  {
    question: "Where can I rent medical equipment in Delhi?",
    answer:
      "Encone Care rents and sells medical equipment across Delhi and New Delhi, delivered and installed in under four hours. The catalogue covers hospital beds, oxygen concentrators, BiPAP and CPAP machines, wheelchairs, patient monitors and complete home ICU setups.",
  },
  {
    question: "Is it cheaper to rent or buy medical equipment?",
    answer:
      "Renting costs less for needs under roughly six to eight months — recovery after surgery, a rehabilitation period, or an uncertain prognosis. Beyond that, accumulated monthly rental starts to exceed the purchase price, so long-term home care usually favours buying.",
  },
  {
    question: "Do you deliver and install the equipment?",
    answer:
      "Yes. A technician delivers, assembles and commissions the equipment, then demonstrates it to whoever will be using it and does not leave until they have operated it themselves. Installation is included in every quote, for rental and purchase alike — there is no separate delivery or setup fee.",
  },
  {
    question: "How is rented equipment cleaned between patients?",
    answer:
      "Every returned item is detergent-washed, disinfected and inspected against the manufacturer's reprocessing instructions before it is issued again. The completed sanitisation checklist is handed over at delivery.",
  },
  {
    question: "Can you provide a nurse along with the equipment?",
    answer:
      "Yes. Encone Care is a home nursing and medical equipment service operating since 2022 with over 100 verified nurses and attendants across Delhi NCR, Lucknow, Kanpur, Prayagraj and Varanasi. Equipment and trained care can be arranged on the same call.",
  },
  {
    question: "Do I need a prescription to rent an oxygen concentrator or BiPAP machine?",
    answer:
      "Yes, for both. Oxygen flow rate and BiPAP pressures must be set by the treating clinician, because incorrect settings can cause harm. We ask for the prescribed values before delivery and configure the machine to them.",
  },
  {
    question: "What happens if equipment fails at night?",
    answer:
      "Breakdown replacement runs 24×7 within the service area. We dispatch a replacement unit rather than scheduling a repair visit, because a patient on continuous oxygen or ventilation cannot wait for a service appointment.",
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts(6);

  return (
    <>
      {/* MedicalBusiness is the most specific applicable subtype — Google's
          guidance is to use the narrowest type that fits, not generic
          LocalBusiness. No street address: this is a service-area business. */}
      <JsonLd schema={generateMedicalBusinessSchema()} />
      <JsonLd schema={generateFAQSchema(HOME_FAQS, "/")} />

      <Hero />

      {/* 01 — Trending / featured */}
      <section className="py-16 lg:py-20">
        <Container>
          <SectionLabel index={1}>Most rented this month</SectionLabel>

          <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <DisplayHeading
              align="left"
              className="max-w-2xl"
              lead="What Delhi households"
              trail="are taking home."
            />
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-brand-green"
            >
              All equipment
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-text-muted">
            Items marked <span className="text-brand-mint">on rent</span> can
            also be bought outright. Tell us how long you need it and we will
            quote for that, with GST stated separately.
          </p>

          <ProductGrid products={featured} className="mt-14" priorityCount={3} />
        </Container>
      </section>

      {/* 02 — Categories */}
      <CategoryGrid />

      {/* 03 — the Encone Care handover */}
      <HomeCareBand />

      {/* 04 — trust commitments */}
      <WhyEnconeMed />

      <Testimonials />

      {/* 05 — coverage */}
      <section className="border-t border-line py-16 lg:py-20">
        <Container>
          <SectionLabel index={5}>Where we reach</SectionLabel>

          <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <DisplayHeading
              align="left"
              lead="Equipment in Delhi."
              trail="Care across nine cities."
            />

            <div>
              <p className="text-base leading-relaxed text-text-secondary">
                We deliver equipment where we can install it, demonstrate it, and
                get a replacement out the same night if it fails. Today that is
                Delhi. Everywhere else, Encone Care&apos;s nursing network is
                already on the ground and equipment is arranged on request — we
                would rather tell you that than take a booking we cannot keep.
              </p>

              <div className="mt-10">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">
                  Equipment delivery — live
                </h3>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {LIVE_SERVICE_AREAS.map((area) => (
                    <li key={area.slug}>
                      <Link
                        href={`/locations/${area.slug}`}
                        className="group inline-flex items-center gap-2.5 rounded-xl border border-brand-green/40 bg-brand-green/8 px-5 py-3 text-sm font-semibold text-brand-green transition-all hover:bg-brand-green/15 hover:shadow-glow"
                      >
                        <MapPin className="h-4 w-4" aria-hidden />
                        {area.name}
                        <ArrowRight
                          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-t border-line pt-8">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                  Encone Care network — equipment on request
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {CARE_NETWORK_AREAS.map((area) => (
                    <li
                      key={area.slug}
                      className="rounded-full border border-line-strong px-4 py-2 text-xs text-text-secondary"
                    >
                      {area.name}
                      {area.areaCount && (
                        <span className="ml-2 text-text-muted">
                          {area.areaCount} areas
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 06 — FAQ */}
      <section className="border-t border-line py-16 lg:py-20">
        <Container>
          <SectionLabel index={6}>Before you call</SectionLabel>
          <DisplayHeading
            align="left"
            className="mt-8 max-w-3xl"
            lead="Questions people"
            trail="ask us first."
          />
          <div className="mt-14">
            <FaqSection faqs={HOME_FAQS} title="" />
          </div>
        </Container>
      </section>
    </>
  );
}
