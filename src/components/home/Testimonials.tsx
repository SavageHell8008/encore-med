import { BadgeCheck, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS, TESTIMONIALS_VERIFIED } from "@/data/testimonials";
import { formatDate } from "@/lib/utils";

/**
 * Testimonials.
 *
 * Placed mid-page, after the trust/legitimacy section — `09-trust-psychology.md`
 * finds trust sequencing is directional: authority signals must land before
 * social proof, or the social proof reads as marketing.
 *
 * The section renders only when the quotes have been confirmed real. See
 * `src/data/testimonials.ts` for why.
 */
export function Testimonials() {
  if (!TESTIMONIALS_VERIFIED) return null;

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionHeading
          eyebrow="From the people using it"
          title="Named, dated and checkable"
          description="Every quote below carries a name, a role, a city and the date it was given. Anonymous praise is not evidence."
        />

        <ul className="mt-12 grid gap-4 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <li
              key={`${t.name}-${t.date}`}
              className="relative flex flex-col rounded-2xl border border-line-strong bg-surface-raised/40 p-6 sm:p-7"
            >
              <Quote className="h-6 w-6 text-brand-teal/60" aria-hidden />

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                “{t.quote}”
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                {/* Gradient avatar rather than a stock photo — inventing a face
                    for a real quote would undercut the point of the section. */}
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-green via-brand-mint to-brand-teal text-sm font-bold text-surface"
                  style={{ filter: `hue-rotate(${i * 40}deg)` }}
                >
                  {t.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                    {t.name}
                    <BadgeCheck className="h-4 w-4 shrink-0 text-brand-green" aria-label="Verified customer" />
                  </p>
                  <p className="truncate text-xs text-text-muted">
                    {t.role} · {t.city}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-text-muted">
                {t.equipment} · {formatDate(t.date)}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
