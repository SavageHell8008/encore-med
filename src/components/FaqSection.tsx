import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * FAQ block.
 *
 * Built on native `<details>`/`<summary>` rather than a JS accordion: it is
 * keyboard- and screen-reader-correct with no client bundle, and the answer
 * text is present in the server HTML whether or not it is expanded — which is
 * what matters for extraction by answer engines.
 *
 * `06-aeo.md`: FAQPage rich results were fully deprecated in May 2026. The
 * content earns its place through on-page usefulness and AI answer extraction,
 * not through a SERP treatment that no longer exists. Answers are written
 * answer-first (direct response in the opening sentence, detail after).
 */
export function FaqSection({
  faqs,
  title = "Frequently asked questions",
  className,
  headingLevel: Heading = "h2",
}: {
  faqs: Faq[];
  title?: string;
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  if (faqs.length === 0) return null;

  return (
    <section className={cn("", className)}>
      {/* An empty title is a deliberate "the surrounding page already has a
          heading" signal, not a mistake — rendering an empty <h2> would leave a
          blank landmark in the accessibility tree. */}
      {title ? (
        <Heading className="font-display text-xl uppercase text-text-primary sm:text-2xl">
          {title}
        </Heading>
      ) : null}

      <div className="mt-6 divide-y divide-[color:var(--color-line)] overflow-hidden rounded-2xl border border-line-strong bg-surface-raised/35">
        {faqs.map((faq) => (
          <details key={faq.question} className="group">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-text-primary transition-colors hover:text-brand-green sm:px-6 sm:py-5 sm:text-base [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                className="mt-0.5 h-4 w-4 shrink-0 text-text-muted transition-transform duration-200 group-open:rotate-180 group-open:text-brand-green"
                aria-hidden
              />
            </summary>
            <div className="px-5 pb-5 text-sm leading-relaxed text-text-secondary sm:px-6 sm:pb-6">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
