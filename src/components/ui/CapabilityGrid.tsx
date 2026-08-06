import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
  /** Optional footnote shown beneath the body in muted type. */
  meta?: string;
  href?: string;
  linkLabel?: string;
  /** Absolute URLs open in a new tab and get rel="noopener". */
  external?: boolean;
};

/**
 * Editorial capability grid: one bordered plate, split into cells by hairlines
 * rather than into separate floating cards.
 *
 * Continuous rules across the whole block are what make a set of items read as
 * one considered layout instead of a row of components — the difference between
 * a spec sheet and a template. Cells are generously padded so the negative
 * space does the structural work, which also keeps the density low enough for
 * the stressed readers `15-emergency-user-behavior.md` describes.
 */
export function CapabilityGrid({
  items,
  columns = 2,
  className,
  headingLevel: Heading = "h3",
}: {
  items: Capability[];
  columns?: 2 | 3;
  className?: string;
  headingLevel?: "h3" | "h4";
}) {
  return (
    <div
      className={cn(
        // Opaque white plate over the page's green wash, lifted on a soft
        // shadow. The graph-paper lines sit on the plate, not the page, so the
        // block reads as one object rather than a hole cut in the background.
        "grid-lines overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-card",
        className,
      )}
    >
      <ul
        className={cn(
          "grid",
          // The negative margins pull each cell's border onto its neighbour's,
          // so interior rules are single-width and the outer edge stays clean.
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item, i) => {
          const Icon = item.icon;
          const isLastCol =
            columns === 2 ? i % 2 === 1 : (i + 1) % 3 === 0;

          const inner = (
            <>
              <Icon
                className="h-6 w-6 text-brand-green transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden
                strokeWidth={1.5}
              />

              <Heading className="mt-8 font-display text-xl uppercase leading-[1.05] text-text-primary sm:text-2xl">
                {item.title}
              </Heading>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-text-secondary">
                {item.body}
              </p>

              {item.meta && (
                <p className="mt-4 text-xs leading-relaxed text-text-muted">
                  {item.meta}
                </p>
              )}

              {item.href && (
                <span className="mt-8 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary transition-colors group-hover:text-brand-green">
                  {item.linkLabel ?? "Read more"}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              )}
            </>
          );

          const cellClass = cn(
            "group relative flex h-full flex-col border-line p-8 sm:p-10 lg:p-12",
            // Every cell gets a bottom rule; the outer container clips the last row's.
            "border-b",
            !isLastCol && "sm:border-r",
          );

          return (
            <li key={item.title} className="contents">
              {item.href ? (
                item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(cellClass, "transition-colors hover:bg-surface-sunken/60")}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(cellClass, "transition-colors hover:bg-surface-sunken/60")}
                  >
                    {inner}
                  </Link>
                )
              ) : (
                <div className={cellClass}>{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
