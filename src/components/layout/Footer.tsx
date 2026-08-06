import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import {
  BRAND,
  CARE_NETWORK_AREAS,
  CONTACT,
  FOOTER_LINKS,
  LIVE_SERVICE_AREAS,
  telLink,
  whatsappLink,
} from "@/lib/constants";

/**
 * Brand marks as inline SVG.
 *
 * lucide-react dropped its brand icons (Facebook, Instagram et al) because
 * redistributing trademarked logos in an icon set is a licensing problem, so
 * these are drawn here rather than imported.
 */
function FacebookMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Absolute URLs need a plain anchor; internal paths go through the router. */
function FooterLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http");
  const className =
    "text-sm text-text-secondary transition-colors hover:text-text-primary";

  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {label}
    </a>
  ) : (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const office = CONTACT.registeredOffice;

  return (
    <footer className="mt-24 border-t border-line bg-surface-raised/30">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <Logo />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-text-secondary">
              {BRAND.description}
            </p>

            <div className="mt-7 space-y-3 text-sm">
              <a
                href={telLink()}
                className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-brand-green"
              >
                <Phone className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={`tel:${CONTACT.phoneAlt}`}
                className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-brand-green"
              >
                <Phone className="h-4 w-4 shrink-0 opacity-0" aria-hidden />
                {CONTACT.phoneAltDisplay}
              </a>
              <a
                href={whatsappLink(`Hi ${BRAND.name}, I'd like help choosing equipment.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-brand-mint"
              >
                <MessageCircle className="h-4 w-4 shrink-0" aria-hidden />
                WhatsApp us
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-2.5 text-text-secondary transition-colors hover:text-brand-green"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                {CONTACT.email}
              </a>
              {/* Registered office is published because Companies Act s.12(3)(c)
                  disclosure applies to the entity, even though the service-area
                  schema deliberately omits a street address. */}
              <p className="flex items-start gap-2.5 text-text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                <span>
                  {office.street}, {office.locality}
                  <br />
                  {office.city} {office.postalCode}
                  <br />
                  {CONTACT.hours}
                </span>
              </p>
            </div>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Encone Care on Facebook"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-text-muted transition-all hover:border-brand-green/50 hover:text-brand-green"
              >
                <FacebookMark className="h-4 w-4" />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Encone Care on Instagram"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line-strong text-text-muted transition-all hover:border-brand-green/50 hover:text-brand-green"
              >
                <InstagramMark className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.values(FOOTER_LINKS).map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-green">
                {group.title}
              </h2>
              <ul className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <FooterLink href={link.href} label={link.label} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Coverage — contextual internal links, and honest about which tier
            each city is in rather than implying same-day delivery everywhere. */}
        <div className="mt-16 border-t border-line pt-8">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
            Where we deliver
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            <span className="text-text-primary">Equipment, live: </span>
            {LIVE_SERVICE_AREAS.map((area, i) => (
              <span key={area.slug}>
                <Link
                  href={`/locations/${area.slug}`}
                  className="text-brand-green underline-offset-4 hover:underline"
                >
                  {area.name}
                </Link>
                {i < LIVE_SERVICE_AREAS.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p className="mt-2.5 text-sm leading-relaxed text-text-muted">
            <span className="text-text-secondary">Encone Care network: </span>
            {CARE_NETWORK_AREAS.map((a) => a.name).join(", ")} — nursing on the
            ground, equipment on request.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 text-xs text-text-muted sm:flex-row sm:items-start sm:justify-between">
          <p>
            © {year} {BRAND.legalName}
            {CONTACT.cin ? ` · CIN ${CONTACT.cin}` : ""} · A{" "}
            <a
              href={BRAND.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary underline-offset-4 hover:text-text-primary hover:underline"
            >
              {BRAND.parent.name}
            </a>{" "}
            company.
          </p>
          <p className="max-w-md sm:text-right">
            Equipment information is for general guidance. Prescribed settings —
            oxygen flow, BiPAP pressures, alarm limits — must come from the
            treating clinician.
          </p>
        </div>
      </Container>
    </footer>
  );
}
