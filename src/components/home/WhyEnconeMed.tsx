import { Headset, Receipt, Shield, Truck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DisplayHeading } from "@/components/ui/DisplayHeading";
import { CapabilityGrid, type Capability } from "@/components/ui/CapabilityGrid";
import { TRUST_PILLARS } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  shield: Shield,
  receipt: Receipt,
  truck: Truck,
  headset: Headset,
};

/**
 * Trust section.
 *
 * `09-trust-psychology.md`: legitimacy and specificity come before social
 * proof, and vague superlatives ("India's most trusted") actively erode
 * credibility while specific checkable claims build it. Every line here is a
 * statement about Encore Care's own process that a customer can verify on the
 * day of delivery — no borrowed certifications, no unverifiable counts.
 */
export function WhyEnconeMed() {
  const items: Capability[] = TRUST_PILLARS.map((pillar) => ({
    icon: ICONS[pillar.icon] ?? Shield,
    title: pillar.title,
    body: pillar.body,
  }));

  return (
    <section className="py-16 lg:py-20">
      <Container>
        <SectionLabel index={4}>What we commit to</SectionLabel>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
          <DisplayHeading
            align="left"
            className="max-w-2xl"
            lead="Four things"
            trail="we'll put in writing."
          />
          <p className="max-w-sm text-sm leading-relaxed text-text-secondary">
            Not badges. Commitments you can hold us to on the day of delivery —
            and refuse the delivery over if we miss them.
          </p>
        </div>

        <CapabilityGrid items={items} columns={2} className="mt-16" />
      </Container>
    </section>
  );
}
