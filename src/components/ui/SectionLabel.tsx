import { cn } from "@/lib/utils";

/**
 * Numbered section marker — `01 —— WHAT WE SUPPLY`.
 *
 * The running number is what turns a stack of unrelated sections into a
 * document with an order to it. It is decorative typography, so the digits are
 * aria-hidden and only the label text reaches a screen reader.
 */
export function SectionLabel({
  index,
  children,
  align = "left",
  className,
}: {
  index: number;
  children: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted",
        align === "center" && "justify-center",
        className,
      )}
    >
      <span aria-hidden className="font-mono text-brand-green">
        {String(index).padStart(2, "0")}
      </span>
      <span aria-hidden className="h-px w-10 bg-line-strong" />
      <span>{children}</span>
    </p>
  );
}
