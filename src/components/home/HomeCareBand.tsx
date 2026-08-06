import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import {
  BRAND,
  CARE_CONDITIONS,
  CARE_SERVICES,
  PARENT_STATS,
} from "@/lib/constants";

/**
 * The Encone Care handover.
 *
 * A family that needs a hospital bed almost always also needs someone who knows
 * how to turn a patient in one. `02-caregiver-journey.md` frames the discharge
 * as a single journey with one decision-maker, not two separate purchases —
 * so equipment and care are presented as two halves of one answer, and the
 * handover between the two brands is one click rather than a search.
 *
 * All copy and links here are the parent's own, taken from enconecare.in.
 */
export function HomeCareBand() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface-raised/30 py-16 lg:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(50rem_20rem_at_50%_0%,rgba(4, 120, 87, 0.075),transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <SectionLabel index={3}>Equipment is half the answer</SectionLabel>

            <DisplayHeading
              align="left"
              className="mt-8"
              lead="The bed is easy."
              trail="Knowing who to trust isn't."
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
              , a home nursing service running in Delhi NCR and across Uttar
              Pradesh since {BRAND.operatingSince}. So the machine and the person
              who knows how to use it come from the same phone call — and the
              nurse arriving at your door has already been through a four-step
              verification before we ever sent them.
            </p>

            <p className="mt-5 text-sm italic leading-relaxed text-text-muted">
              “{BRAND.parent.tagline}”
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 border-t border-line pt-10">
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

            <Link
              href="/home-care"
              className="group mt-12 inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-primary transition-colors hover:text-brand-green"
            >
              All home care services
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </Link>
          </div>

          {/* Services as a rule-separated index rather than ten more cards —
              a list this long as cards becomes visual noise. */}
          <div>
            <ul className="divide-y divide-[color:var(--color-line)] border-y border-line">
              {CARE_SERVICES.map((service) => (
                <li key={service.slug}>
                  <a
                    href={service.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-6 py-5 transition-colors hover:bg-surface-raised/40"
                  >
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-text-primary transition-colors group-hover:text-brand-green">
                        {service.name}
                      </span>
                      <span className="mt-1.5 block text-sm leading-relaxed text-text-muted">
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

            <div className="mt-10">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                Care by condition
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {CARE_CONDITIONS.map((condition) => (
                  <li key={condition.href}>
                    <a
                      href={condition.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-line-strong px-4 py-2 text-xs text-text-secondary transition-all hover:border-brand-teal/60 hover:text-text-primary"
                    >
                      {condition.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
