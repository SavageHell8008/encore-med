import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { PincodeChecker } from "@/components/location/PincodeChecker";
import { Container } from "@/components/ui/Container";
import { formatCityList } from "@/lib/constants";
import { NCR_PINCODE_COUNT, SERVICE_AREAS, pincodeIndex } from "@/lib/service-areas";
import { generateFAQSchema, generateMedicalBusinessSchema } from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Medical Equipment Delivery Across Delhi NCR",
  description: `Check your pincode. We deliver and install medical equipment across ${NCR_PINCODE_COUNT} pincodes in Delhi, Noida, Greater Noida, Gurgaon, Ghaziabad and Faridabad — and nowhere else.`,
  path: "/locations",
});

/**
 * The Delhi NCR hub: every city we deliver to, its pincode count, and a pincode
 * checker. Gives the city pages' "Delhi NCR" breadcrumb a real destination and
 * links all six of them from one indexable page.
 */
export default function LocationsPage() {
  const cityNames = SERVICE_AREAS.map((a) => a.name);

  const faqs: Faq[] = [
    {
      question: "Which areas do you deliver medical equipment to?",
      answer: `Delhi NCR only: ${formatCityList(cityNames)} — ${NCR_PINCODE_COUNT} pincodes in total, each listed on its city page. We do not deliver outside Delhi NCR.`,
    },
    {
      question: "Why do you not deliver outside Delhi NCR?",
      answer:
        "Because delivery is only half the job. A technician installs the equipment and shows the family how to use it, and a breakdown has to be answered the same night. We only take orders where we can do all of that properly.",
    },
  ];

  return (
    <>
      <JsonLd schema={generateMedicalBusinessSchema()} />
      <JsonLd schema={generateFAQSchema(faqs, "/locations")} />

      <Container className="pt-10 pb-24">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Delhi NCR", href: "/locations" },
          ]}
        />

        <header className="mt-8 max-w-3xl">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Medical equipment delivery across{" "}
            <span className="text-brand-green">Delhi NCR</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-text-secondary">
            We deliver and install equipment in six cities — {formatCityList(cityNames)} — across{" "}
            {NCR_PINCODE_COUNT} pincodes. Enter yours to check.
          </p>
        </header>

        <div className="mt-10 max-w-2xl">
          <PincodeChecker index={pincodeIndex()} />
        </div>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_AREAS.map((area) => (
            <li key={area.slug}>
              <Link
                href={`/locations/${area.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition hover:border-brand-green/45"
              >
                <span className="flex items-center gap-2 text-xs font-medium text-text-muted">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {area.state}
                </span>
                <span className="mt-3 text-xl font-bold text-text-primary">
                  {area.name}
                  {area.alsoKnownAs && (
                    <span className="ml-2 text-sm font-normal text-text-muted">({area.alsoKnownAs})</span>
                  )}
                </span>
                <span className="mt-2 text-sm text-text-secondary">
                  {area.pincodes.length} pincodes, including{" "}
                  {formatCityList(area.featured.slice(0, 3).map((f) => f.name))}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-green">
                  See pincodes
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-20 max-w-3xl">
          <FaqSection faqs={faqs} title="Delivery areas" />
        </div>
      </Container>
    </>
  );
}
