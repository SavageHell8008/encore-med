import { PagePending } from "@/components/PagePending";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How EnconeMed handles the personal information you share when enquiring about medical equipment.",
  path: "/privacy",
  // Thin until the real content lands — kept out of the index rather than
  // shipped as a placeholder Google can score the whole site down for.
  index: false,
});

export default function PrivacyPage() {
  return (
    <PagePending
      title="Privacy Policy"
      crumbLabel="Privacy Policy"
      href="/privacy"
      explanation={"Our privacy policy is with legal counsel and will be published here before launch. What we can tell you now without qualification: a phone number given through an enquiry form is used to answer that enquiry and is not sold, rented or passed to third-party marketers."}
      contactPrompt="If you want to know what we hold about you, or want it deleted, ask and we will action it."
    />
  );
}
