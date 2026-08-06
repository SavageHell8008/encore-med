import { Clock, Mail, MessageCircle, Phone, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { InquiryForm } from "@/components/product/InquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { Container } from "@/components/ui/Container";
import { BRAND, CONTACT, SERVICE_AREAS, telLink, whatsappLink } from "@/lib/constants";
import { generateMedicalBusinessSchema } from "@/lib/schema-generator";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Contact EnconeMed — Delhi Medical Equipment",
  description:
    "Call, WhatsApp or send your details and someone who knows the equipment will call back. Same-day delivery and setup across Delhi, 8 AM to 10 PM.",
  path: "/contact",
});

export default function ContactPage() {
  const live = SERVICE_AREAS.filter((a) => a.status === "live");

  return (
    <>
      <JsonLd schema={generateMedicalBusinessSchema()} />

      <Container className="pt-10">
        <Breadcrumbs
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Contact", href: "/contact" },
          ]}
        />

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
          <div>
            <h1 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              <span className="text-text-primary">Talk to someone who</span>{" "}
              <span className="text-glow text-brand-green">knows the equipment</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-text-secondary">
              Not a call centre reading from a script. If you describe what the
              patient is struggling with, we will narrow it to one or two options
              and tell you when the cheaper one is the right answer.
            </p>

            {/* Urgent path first and visually dominant. */}
            <div className="mt-10 rounded-2xl border border-brand-amber/35 bg-brand-amber/5 p-6">
              <h2 className="flex items-center gap-2.5 text-base font-semibold text-text-primary">
                <ShieldAlert className="h-5 w-5 text-brand-amber" aria-hidden />
                Need something today?
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-text-secondary">
                Call. Do not use the form. Orders confirmed before 4 PM are
                delivered and installed the same evening in Delhi.
              </p>
              <a
                href={telLink()}
                className="mt-5 inline-flex items-center gap-2.5 rounded-xl border border-brand-amber/50 bg-brand-amber/12 px-6 py-3.5 text-base font-bold text-brand-amber transition-all hover:bg-brand-amber/20"
              >
                <Phone className="h-5 w-5" aria-hidden />
                {CONTACT.phoneDisplay}
              </a>
            </div>

            <dl className="mt-10 space-y-6">
              <ContactRow
                icon={<MessageCircle className="h-5 w-5 text-brand-mint" aria-hidden />}
                label="WhatsApp"
                value={
                  <a
                    href={whatsappLink(`Hi ${BRAND.name}, I need help choosing equipment.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-primary underline-offset-4 hover:text-brand-mint hover:underline"
                  >
                    Start a chat
                  </a>
                }
                hint="Useful when the decision involves family in another city — forward the whole thread."
              />
              <ContactRow
                icon={<Mail className="h-5 w-5 text-brand-green" aria-hidden />}
                label="Email"
                value={
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-text-primary underline-offset-4 hover:text-brand-green hover:underline"
                  >
                    {CONTACT.email}
                  </a>
                }
                hint="For quotes, purchase orders and facility enquiries."
              />
              <ContactRow
                icon={<Clock className="h-5 w-5 text-brand-teal" aria-hidden />}
                label="Hours"
                value={<span className="text-text-primary">{CONTACT.hours}</span>}
                hint="Breakdown replacement for existing rentals runs 24×7."
              />
            </dl>

            <div className="mt-12 rounded-2xl border border-line-strong bg-surface-raised/35 p-6">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-text-muted">
                Company details
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                <span className="text-text-primary">{BRAND.legalName}</span>
                {CONTACT.cin && (
                  <>
                    <br />
                    CIN: {CONTACT.cin}
                  </>
                )}
                <br />
                Serving {live.map((a) => a.name).join(" and ")}
                <br />
                <span className="text-text-muted">
                  We deliver to your address rather than operating a walk-in
                  showroom, so there is no counter to visit.
                </span>
              </p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Pre-filled rather than blank: the equipment field is required,
                and a visitor who has not picked anything yet should not be
                blocked by a validation error on a field they cannot answer. */}
            <InquiryForm equipmentName="General enquiry" defaultIntent="not-sure" />
          </div>
        </div>
      </Container>

      <div className="h-24" />
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  hint: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 shrink-0">{icon}</span>
      <div>
        <dt className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          {label}
        </dt>
        <dd className="mt-1.5 text-base font-medium">{value}</dd>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">{hint}</p>
      </div>
    </div>
  );
}
