import { PagePending } from "@/components/PagePending";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Refund & Return Policy",
  description: "Deposit refunds, early rental returns and purchase returns — full policy publishing shortly.",
  path: "/refund-policy",
  // Thin until the real content lands — kept out of the index rather than
  // shipped as a placeholder Google can score the whole site down for.
  index: false,
});

export default function RefundPolicyPage() {
  return (
    <PagePending
      title="Refund & Return Policy"
      crumbLabel="Refund & Return Policy"
      href="/refund-policy"
      explanation={"The full policy is being finalised with counsel. The commitments we already operate to: rental security deposits are returned in full within seven working days of pickup and inspection, less any damage beyond normal wear, and faulty equipment is replaced rather than repaired on site."}
      contactPrompt="Ask us for the current terms in writing before you book and we will send them."
    />
  );
}
