import Link from "next/link";
import { CATEGORIES, USE_CASES } from "@/data/taxonomy";
import { cn } from "@/lib/utils";

type Filters = { category?: string; need?: string; intent?: string; sort?: string };

function href(current: Filters, patch: Filters): string {
  const merged = { ...current, ...patch };
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) {
    if (value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `/products?${qs}` : "/products";
}

/**
 * Filters as plain links rather than a client-side control.
 *
 * `04-seo.md`: Google's scaled-content-abuse policy makes auto-generated
 * category × brand × spec × city URL combinations a real risk. Keeping these as
 * ordinary links means the crawl surface is exactly the combinations rendered
 * here, and every filtered URL is served `noindex, follow` (see the page's
 * generateMetadata) so only the curated category pages compete for ranking.
 */
export function FilterBar({ filters }: { filters: Filters }) {
  const groups = [
    {
      label: "Equipment type",
      key: "category" as const,
      options: CATEGORIES.map((c) => ({ value: c.slug, label: c.name })),
    },
    {
      label: "What's the problem?",
      key: "need" as const,
      options: USE_CASES.map((u) => ({ value: u.slug, label: u.name })),
    },
    {
      label: "How you want it",
      key: "intent" as const,
      // Everything in the catalogue can be bought, so there is no "buy" filter —
      // it would select the whole list and teach people the filters do nothing.
      options: [
        { value: "rent", label: "Available on rent" },
        { value: "sale-only", label: "Sale only" },
      ],
    },
  ];

  const hasFilters = Boolean(filters.category || filters.need || filters.intent);

  return (
    <div className="rounded-2xl border border-line-strong bg-surface-raised/35 p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-brand-green">
          Narrow it down
        </h2>
        {hasFilters && (
          <Link
            href="/products"
            className="text-xs text-text-muted underline underline-offset-4 hover:text-text-primary"
          >
            Clear all
          </Link>
        )}
      </div>

      <div className="mt-5 space-y-5">
        {groups.map((group) => (
          <fieldset key={group.key}>
            <legend className="mb-2.5 text-xs font-medium uppercase tracking-wider text-text-muted">
              {group.label}
            </legend>
            <ul className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const active = filters[group.key] === option.value;
                return (
                  <li key={option.value}>
                    <Link
                      href={href(filters, {
                        [group.key]: active ? undefined : option.value,
                      })}
                      aria-pressed={active}
                      className={cn(
                        "inline-block rounded-full border px-3.5 py-2 text-sm transition-all",
                        active
                          ? "border-brand-green bg-brand-green/12 text-brand-green"
                          : "border-line-strong text-text-secondary hover:border-brand-green/40 hover:text-text-primary",
                      )}
                    >
                      {option.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        ))}
      </div>
    </div>
  );
}
