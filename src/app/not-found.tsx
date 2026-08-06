import Link from "next/link";
import { Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CATEGORIES } from "@/data/taxonomy";
import { CONTACT, telLink } from "@/lib/constants";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * A 404 that keeps the visitor moving. Someone who lands here mid-search for a
 * hospital bed should be one click from the category, not staring at a dead end
 * — and if they are in a hurry, one tap from a phone call.
 */
export default function NotFound() {
  return (
    <Container className="py-24 lg:py-32">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand-amber">
        404
      </p>
      <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
        That page isn&apos;t here
      </h1>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-text-secondary">
        The link may be old, or the equipment may have been renamed. Here is
        everything we supply — or call us and describe what you need.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/products" variant="primary" size="lg">
          Browse all equipment
        </ButtonLink>
        <ButtonLink href={telLink()} variant="secondary" size="lg">
          <Phone className="h-4 w-4" aria-hidden />
          {CONTACT.phoneDisplay}
        </ButtonLink>
      </div>

      <nav aria-label="Equipment categories" className="mt-14">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Equipment categories
        </h2>
        <ul className="mt-5 flex flex-wrap gap-2.5">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/categories/${category.slug}`}
                className="inline-block rounded-full border border-line-strong px-4 py-2.5 text-sm text-text-secondary transition-all hover:border-brand-green/50 hover:text-text-primary"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
