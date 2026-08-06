import { PagePending } from "@/components/PagePending";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms covering equipment rental and purchase from Encore Care, currently under legal review.",
  path: "/terms",
  // Thin until the real content lands — kept out of the index rather than
  // shipped as a placeholder Google can score the whole site down for.
  index: false,
});

export default function TermsPage() {
  return (
    <PagePending
      title="Terms of Service"
      crumbLabel="Terms of Service"
      href="/terms"
      explanation={"Rental and purchase terms are under legal review. Equipment rental in India sits between medical device regulation, consumer protection law and GST treatment that differs between renting and selling the same item — we are not publishing binding terms until counsel has signed them off."}
      contactPrompt="Rental agreements are provided in writing at delivery. Ask for a copy in advance and we will send one."
    />
  );
}
