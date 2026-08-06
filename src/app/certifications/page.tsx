import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { generateFAQSchema } from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";
import type { Faq } from "@/lib/types";

export const metadata = buildMetadata({
  title: "Quality & Sanitisation Process",
  description:
    "How EnconeMed cleans, disinfects and inspects rental equipment between patients — the full process, step by step, with the certifications we do and do not hold stated plainly.",
  path: "/certifications",
});

/**
 * `20-competitor-ux-analysis.md` identifies an articulated hygiene process as
 * the single most underused trust lever in this category. `01-business-
 * understanding.md` is equally clear that certifications must not be implied
 * where they are not held — so this page states both sides.
 */
const STEPS = [
  {
    title: "Strip and inspect on collection",
    body: "Linen, mattresses, cannulae, masks and tubing are removed at the patient's address, bagged and never travel with the frame. Single-patient consumables are disposed of, not reissued.",
  },
  {
    title: "Detergent wash",
    body: "Every surface the patient or carer touches — frame, rails, controls, castors, handsets — is washed with a neutral detergent solution to remove organic soil. Cleaning has to happen before disinfection; disinfectant applied over soil does not work.",
  },
  {
    title: "Disinfection to the manufacturer's instructions",
    body: "Each device is disinfected using the agent, dilution and contact time its own manufacturer specifies for reprocessing. Different plastics and coatings tolerate different chemistry, so we follow the device's instructions rather than applying one product to everything.",
  },
  {
    title: "Consumables replaced, not cleaned",
    body: "Nasal cannulae, BiPAP masks and cushions, humidifier chambers, suction catheters and ECG electrodes are replaced with new items for every issue. These are not reprocessed under any circumstances.",
  },
  {
    title: "Functional test and calibration check",
    body: "Motors, brakes, alarms, flow rates and pressures are tested against specification before the unit is cleared. Oxygen concentrators are checked for output purity; monitors are checked against a reference.",
  },
  {
    title: "Sealed, logged and handed over",
    body: "The unit is sealed and logged against a checklist that lists the date, the technician and each step completed. That checklist is handed to you at delivery — you should not have to take the process on faith.",
  },
];

const FAQS: Faq[] = [
  {
    question: "Is EnconeMed ISO 13485 certified?",
    answer:
      "No, and we will not imply otherwise. ISO 13485 is a quality management standard for organisations that manufacture medical devices; it is not a certification a rental operator normally holds. What we do is follow each manufacturer's own published reprocessing instructions for cleaning and disinfection, and document each step on a checklist you receive at delivery.",
  },
  {
    question: "Is your equipment CDSCO approved?",
    answer:
      "CDSCO classifies medical devices and licenses their manufacturers, importers and sellers under the Medical Devices Rules, 2017. It does not issue an approval to rental providers, so no rental company in India can truthfully claim to be 'CDSCO approved'. The devices we stock come from established manufacturers holding the licences applicable to their device class.",
  },
  {
    question: "How do I know the equipment was actually cleaned?",
    answer:
      "The completed sanitisation checklist travels with the unit and is handed over at delivery, dated and signed by the technician who prepared it. If it is missing, refuse the delivery and call us.",
  },
  {
    question: "Are BiPAP masks and cannulae reused?",
    answer:
      "Never. Masks, cushions, nasal cannulae, humidifier chambers, suction catheters and electrodes are supplied new with every issue and are disposed of on return. Only the durable device itself is reprocessed.",
  },
];

export default function CertificationsPage() {
  return (
    <>
      <JsonLd schema={generateFAQSchema(FAQS, "/certifications")} />

      <Container className="pt-10 pb-24">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Quality & Sanitisation", href: "/certifications" },
          ]}
        />

        <h1 className="mt-8 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          <span className="text-text-primary">What happens to a bed</span>{" "}
          <span className="text-glow-mint text-brand-mint">between two patients</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
          Rental equipment has been in someone else&apos;s home. That is the part
          nobody in this industry wants to talk about, so here is our process in
          full — including what we do not claim.
        </p>

        <ol className="mt-14 space-y-4">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="flex gap-5 rounded-2xl border border-line-strong bg-surface-raised/35 p-6"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-brand-mint/40 bg-brand-mint/10 text-sm font-bold text-brand-mint">
                {i + 1}
              </span>
              <div>
                <h2 className="text-base font-semibold text-text-primary">{step.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-brand-mint/35 bg-brand-mint/5 p-6 sm:p-7">
            <h2 className="flex items-center gap-2.5 text-base font-semibold text-text-primary">
              <CheckCircle2 className="h-5 w-5 text-brand-mint" aria-hidden />
              What we do claim
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-secondary">
              <li>· Reprocessing follows each device manufacturer&apos;s own instructions.</li>
              <li>· A dated, signed checklist accompanies every rental unit.</li>
              <li>· Patient-contact consumables are new for every issue.</li>
              <li>· Devices are function-tested against specification before dispatch.</li>
              <li>· Equipment is sourced from established manufacturers holding the licences applicable to their device class.</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-amber/30 bg-brand-amber/5 p-6 sm:p-7">
            <h2 className="flex items-center gap-2.5 text-base font-semibold text-text-primary">
              <AlertTriangle className="h-5 w-5 text-brand-amber" aria-hidden />
              What we do not claim
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-text-secondary">
              <li>· We are not ISO 13485 certified — that standard applies to device manufacturers.</li>
              <li>· We are not &ldquo;CDSCO approved&rdquo; — CDSCO does not license rental providers.</li>
              <li>· We hold no ICMED certification and are not an AiMeD member.</li>
              <li>· Our equipment is not sterile. It is cleaned and disinfected, which is the correct standard for reusable non-critical devices — not the same thing as sterilisation.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <FaqSection faqs={FAQS} title="Questions about our process" />
        </div>
      </Container>
    </>
  );
}
