import { ProductCard3D } from "@/components/product/ProductCard3D";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export function ProductGrid({
  products,
  className,
  /** Number of cards that should load eagerly (above the fold). */
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  priorityCount?: number;
}) {
  if (products.length === 0) {
    return (
      <p className="rounded-2xl border border-line-strong bg-surface-raised/40 px-6 py-12 text-center text-sm text-text-secondary">
        Nothing matches that combination yet. Call us — we source items outside
        the published catalogue regularly.
      </p>
    );
  }

  return (
    <ul className={cn("grid gap-5 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {products.map((product, i) => (
        <li key={product.slug} className="h-full">
          <ProductCard3D product={product} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
