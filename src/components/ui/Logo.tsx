import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/constants";

/**
 * The EnconeMed mark plus wordmark.
 *
 * `/logo.svg` is a vector wrapper around a raster image rather than true paths,
 * which is why it is ~140 KB and why it is rendered at a fixed small size and
 * marked `priority` in the header — it is above the fold on every page. Worth
 * replacing with a true vector or a 2× WebP when a proper export exists; the
 * component boundary means that swap touches one file.
 *
 * The mark is decorative here because the wordmark beside it already carries
 * the brand name as text; giving both the same accessible name would make a
 * screen reader announce "EnconeMed EnconeMed".
 */
export function Logo({
  className,
  size = 36,
  priority = false,
  showWordmark = true,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image
        src="/logo.svg"
        alt={showWordmark ? "" : `${BRAND.name} logo`}
        aria-hidden={showWordmark || undefined}
        width={size}
        height={size}
        priority={priority}
        className="rounded-full"
      />
      {showWordmark && (
        <span className="font-display text-lg uppercase tracking-tight">
          <span className="text-text-primary">Encone</span>
          <span className="text-brand-green">Med</span>
        </span>
      )}
    </span>
  );
}
