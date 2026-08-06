import { PagePending } from "@/components/PagePending";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Resources & Equipment Guides",
  description: "Guides on choosing, using and maintaining medical equipment at home. Written and clinically reviewed before publication.",
  path: "/blog",
  // Thin until the real content lands — kept out of the index rather than
  // shipped as a placeholder Google can score the whole site down for.
  index: false,
});

export default function BlogPage() {
  return (
    <PagePending
      title="Resources"
      crumbLabel="Resources"
      href="/blog"
      explanation={"Our equipment guides are being written and clinically reviewed before publication — how to choose an ICU ventilator, what maintenance a concentrator actually needs, and a compliance checklist for facility equipment. We would rather publish six pieces a doctor has read than sixty nobody has."}
    />
  );
}
