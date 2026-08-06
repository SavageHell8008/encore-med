import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { BRAND, TRUST_PILLARS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About EnconeMed — Medical Equipment in Delhi",
  description:
    "EnconeMed rents and sells medical equipment across Delhi, owning its own fleet rather than listing other people's stock. Documented sanitisation, technician setup, honest quotes.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="pt-10 pb-24">
      <Breadcrumbs
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
        ]}
      />

      <h1 className="mt-8 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
        <span className="text-text-primary">We own the equipment</span>{" "}
        <span className="text-glow text-brand-green">we send you</span>
      </h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6 text-base leading-relaxed text-text-secondary">
          <p>
            {BRAND.name} is the medical equipment arm of{" "}
            <a
              href={BRAND.parent.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-green underline-offset-4 hover:underline"
            >
              {BRAND.parent.name}
            </a>
            , operated by {BRAND.legalName}. We rent and sell hospital beds,
            oxygen concentrators, BiPAP machines, wheelchairs, patient monitors
            and complete home ICU setups across Delhi.
          </p>

          <p>
            One structural fact shapes everything else here:{" "}
            <span className="text-text-primary">we are not a marketplace</span>. We own
            and maintain our own fleet rather than listing other people&apos;s
            stock and taking a cut. That means when a concentrator fails at
            midnight, there is no third-party seller to chase — the unit is ours,
            the replacement is ours, and the responsibility is ours.
          </p>

          <p>
            We quote rather than publish a rate card, and it is worth saying why.
            What a hospital bed should cost you depends on how long you need it,
            which configuration actually suits the patient, and whether nursing
            goes with it — a single published figure would be wrong for almost
            everyone who read it. What we will not do is make the number depend
            on how urgent you sounded on the phone. Ask, and you get a straight
            quote the same day, with GST stated separately and delivery,
            installation and servicing already in it.
          </p>

          <h2 className="pt-4 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            What we will not do
          </h2>

          <p>
            We do not claim certifications we do not hold. Medical device
            regulation in India (the Medical Devices Rules, 2017, under CDSCO)
            licenses manufacturers, importers and sellers of particular device
            classes — it does not issue a generic &ldquo;approved rental
            provider&rdquo; licence, and any company implying otherwise is
            describing something that does not exist. Where we reference quality
            standards, we reference them accurately: our sanitisation process
            follows each manufacturer&apos;s own reprocessing instructions, which
            is a real, checkable thing, rather than a badge.
          </p>

          <p>
            We also do not list thirty cities we cannot reach. We deliver where
            we can install the equipment, demonstrate it to whoever is doing the
            caring, and get a replacement out the same night if it fails. Today
            that is Delhi. It will expand when the operations do, not before.
          </p>

          <h2 className="pt-4 text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            How we decide what to recommend
          </h2>

          <p>
            Frequently the honest answer costs less. A five-function ICU bed is
            the wrong recommendation for most home-care patients — a manual
            three-function bed does the same clinical job for a fraction of it.
            An air mattress costs a small fraction of what it takes to treat the
            pressure ulcers it prevents. Those are the
            conversations we would rather have than upsell, because this business
            runs on families recommending us to other families.
          </p>

          <p className="rounded-2xl border border-line-strong bg-surface-raised/35 p-6 text-sm">
            <span className="text-text-primary">On medical advice:</span> nothing on this
            site is a substitute for a treating clinician. Oxygen flow rates,
            BiPAP pressures and monitor alarm limits are clinical settings, and we
            configure equipment to the prescription rather than to a default. If
            you do not have those numbers yet, that is the first call to make —
            and it is not to us.
          </p>
        </div>

        <aside className="h-fit space-y-4">
          {TRUST_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl border border-line-strong bg-surface-raised/40 p-5"
            >
              <h3 className="text-sm font-semibold text-text-primary">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {pillar.body}
              </p>
            </div>
          ))}

          <div className="rounded-2xl border border-brand-green/35 bg-brand-green/5 p-6">
            <h3 className="text-sm font-semibold text-text-primary">
              Want the sanitisation detail?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              The full between-rental process, step by step.
            </p>
            <Link
              href="/certifications"
              className="mt-4 inline-block text-sm font-semibold text-brand-green underline-offset-4 hover:underline"
            >
              Quality &amp; sanitisation →
            </Link>
          </div>
        </aside>
      </div>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Next step"
          title="Tell us what the patient is struggling with"
          description="Not which model you want. We will work backwards from the problem."
        />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" variant="primary" size="lg">
            Get in touch
          </ButtonLink>
          <ButtonLink href="/products" variant="secondary" size="lg">
            Browse equipment
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
