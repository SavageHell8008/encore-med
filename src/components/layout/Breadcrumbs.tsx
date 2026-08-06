import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { generateBreadcrumbSchema } from "@/lib/schema-generator";

export type Crumb = { name: string; href: string };

/**
 * Visible breadcrumbs plus BreadcrumbList JSON-LD.
 *
 * `06-navigation-research.md` makes breadcrumbs mandatory at three or more
 * levels of depth. The two are emitted together so the markup can never drift
 * out of sync with what the user actually sees — a common cause of
 * structured-data warnings.
 */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <>
      <JsonLd schema={generateBreadcrumbSchema(crumbs)} />
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-1.5 text-text-muted">
          {crumbs.map((crumb, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={crumb.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className="text-text-secondary">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-brand-green"
                    >
                      {crumb.name}
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
