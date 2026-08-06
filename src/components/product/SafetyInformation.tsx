import { AlertOctagon, Ban, ClipboardCheck, Stethoscope } from "lucide-react";
import type { MedicalProfile } from "@/lib/types";

const SPECIALTY_LABELS: Record<string, string> = {
  Pulmonary: "Pulmonary medicine",
  RespiratoryTherapy: "Respiratory therapy",
  Geriatric: "Geriatric medicine",
  Nursing: "Nursing",
  Neurologic: "Neurology",
  Musculoskeletal: "Musculoskeletal medicine",
  Physiotherapy: "Physiotherapy",
  Surgical: "Surgery",
  Emergency: "Emergency medicine",
  PrimaryCare: "Primary care",
  Cardiovascular: "Cardiology",
};

/**
 * Visible rendering of the schema.org/MedicalDevice profile.
 *
 * This exists because structured data must describe content the user can
 * actually see — marking up contraindications and adverse outcomes that appear
 * nowhere on the page is exactly the "markup for hidden content" pattern Google
 * treats as a structured-data violation. Every field emitted in
 * `generateProductSchema` is rendered here, from the same object, so the two
 * cannot drift apart.
 *
 * It is also the right thing to publish. `07-eeat.md` treats this as
 * YMYL-adjacent territory: a family choosing a BiPAP machine deserves to read
 * that it is contraindicated in an untreated pneumothorax before they book it,
 * not after.
 */
export function SafetyInformation({ medical }: { medical: MedicalProfile }) {
  const routine = medical.adverseOutcomes.filter((o) => !o.serious);
  const serious = medical.adverseOutcomes.filter((o) => o.serious);

  return (
    <section aria-labelledby="safety-heading">
      <h2
        id="safety-heading"
        className="font-display text-xl uppercase text-text-primary sm:text-2xl"
      >
        Safety &amp; clinical information
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
        Device information, not medical advice. Suitability for a particular
        patient is a decision for the treating clinician.
      </p>

      <div className="mt-8 space-y-4">
        {/* How it is set up and used */}
        <div className="rounded-2xl border border-line-strong bg-surface-raised/35 p-6 sm:p-7">
          <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-green">
            <ClipboardCheck className="h-4 w-4" aria-hidden />
            How it is installed and used
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {medical.procedure}
          </p>

          {medical.preOp && (
            <div className="mt-6 border-t border-line pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Before delivery
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                {medical.preOp}
              </p>
            </div>
          )}

          {medical.postOp && (
            <div className="mt-5 border-t border-line pt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Ongoing care and servicing
              </h4>
              <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                {medical.postOp}
              </p>
            </div>
          )}
        </div>

        {/* Contraindications */}
        <div className="rounded-2xl border border-brand-amber/30 bg-brand-amber/5 p-6 sm:p-7">
          <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-amber">
            <Ban className="h-4 w-4" aria-hidden />
            When not to use it
          </h3>
          <dl className="mt-5 space-y-4">
            {medical.contraindications.map((item) => (
              <div key={item.name}>
                <dt className="text-sm font-semibold text-text-primary">
                  {item.name}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Adverse outcomes, split by severity to match the schema split. */}
        <div className="grid gap-4 lg:grid-cols-2">
          {routine.length > 0 && (
            <div className="rounded-2xl border border-line-strong bg-surface-raised/35 p-6 sm:p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">
                Possible side effects
              </h3>
              <dl className="mt-5 space-y-4">
                {routine.map((item) => (
                  <div key={item.name}>
                    <dt className="text-sm font-semibold text-text-primary">
                      {item.name}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {serious.length > 0 && (
            <div className="rounded-2xl border border-brand-amber/45 bg-brand-amber/8 p-6 sm:p-7">
              <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-brand-amber">
                <AlertOctagon className="h-4 w-4" aria-hidden />
                Serious risks
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-text-muted">
                Life-threatening, permanently damaging, or requiring
                hospitalisation.
              </p>
              <dl className="mt-5 space-y-4">
                {serious.map((item) => (
                  <div key={item.name}>
                    <dt className="text-sm font-semibold text-text-primary">
                      {item.name}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        {/* Regulatory status and specialties */}
        <div className="rounded-2xl border border-line-strong bg-surface-raised/35 p-6 sm:p-7">
          <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">
            <Stethoscope className="h-4 w-4" aria-hidden />
            Regulatory status
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {medical.legalStatus}
          </p>
          <div className="mt-6 border-t border-line pt-5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Relevant specialties
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {medical.specialties.map((specialty) => (
                <li
                  key={specialty}
                  className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-text-secondary"
                >
                  {SPECIALTY_LABELS[specialty] ?? specialty}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
