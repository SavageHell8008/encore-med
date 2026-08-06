import { cn } from "@/lib/utils";

/**
 * Two-tone display heading: a bright leading clause and a dimmed trailing one,
 * set tight and uppercase.
 *
 * The dimming is what stops a very large heading shouting — the eye reads the
 * first clause at full contrast and the second as context, so the type can be
 * big without the page feeling like an advert.
 */
export function DisplayHeading({
  lead,
  trail,
  as: Tag = "h2",
  align = "center",
  className,
}: {
  lead: React.ReactNode;
  trail?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-display text-balance uppercase leading-[0.94] text-text-primary",
        "text-[2.15rem] sm:text-5xl lg:text-[3.85rem]",
        align === "center" && "text-center",
        className,
      )}
    >
      {lead}
      {trail && (
        <>
          {" "}
          <span className="text-text-muted">{trail}</span>
        </>
      )}
    </Tag>
  );
}
