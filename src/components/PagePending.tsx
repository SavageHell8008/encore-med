import Link from "next/link";
import { Phone } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CONTACT, telLink } from "@/lib/constants";

/**
 * Placeholder for routes that are linked from the navigation but whose content
 * is not written yet.
 *
 * These exist so the internal link graph has no dead ends, and they are
 * `noindex` so Google never sees a thin page. They deliberately do not fake the
 * content: publishing an invented privacy policy or refund policy would be a
 * legal claim the business has not actually made, and
 * `01-business-understanding.md` requires those to go through counsel before
 * they go live.
 */
export function PagePending({
  title,
  crumbLabel,
  href,
  explanation,
  contactPrompt = "In the meantime, ask us directly — we will answer in writing.",
}: {
  title: string;
  crumbLabel: string;
  href: string;
  explanation: string;
  contactPrompt?: string;
}) {
  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: crumbLabel, href },
        ]}
      />

      <h1 className="mt-8 max-w-3xl text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl">
        {title}
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-text-secondary">
        {explanation}
      </p>

      <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-secondary">
        {contactPrompt}
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={telLink()} variant="primary" size="lg">
          <Phone className="h-4 w-4" aria-hidden />
          {CONTACT.phoneDisplay}
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary" size="lg">
          Send us a question
        </ButtonLink>
      </div>

      <p className="mt-12 text-sm text-text-muted">
        Looking for equipment?{" "}
        <Link
          href="/products"
          className="text-brand-green underline-offset-4 hover:underline"
        >
          Browse the full catalogue
        </Link>
        .
      </p>
    </Container>
  );
}
