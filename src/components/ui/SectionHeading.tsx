import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-green">
          {eyebrow}
        </p>
      )}
      <Tag className="mt-3 text-2xl font-bold leading-tight tracking-tight text-text-primary sm:text-3xl lg:text-4xl">
        {title}
      </Tag>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}
