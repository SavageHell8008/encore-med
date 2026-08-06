"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, MessageCircle, ShieldCheck, Truck, Wrench, type LucideIcon } from "lucide-react";
import type { Product } from "@/lib/types";
import { whatsappLink } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Badges sit on top of a photograph, so each carries an opaque white base
// rather than a translucent tint — a 10% tint over an unpredictable image is
// not a legible background.
const BADGE_META: Record<string, { label: string; className: string; icon?: LucideIcon }> = {
  bestseller: { label: "Most rented", className: "border-brand-amber/35 bg-white/95 text-brand-amber" },
  sanitised: { label: "Sanitised", className: "border-brand-mint/35 bg-white/95 text-brand-mint", icon: ShieldCheck },
  "same-day-delivery": { label: "Same-day", className: "border-brand-green/35 bg-white/95 text-brand-green", icon: Truck },
  "technician-installed": { label: "Installed", className: "border-brand-teal/35 bg-white/95 text-brand-teal", icon: Wrench },
  new: { label: "New", className: "border-line-strong bg-white/95 text-text-secondary" },
};

/**
 * Product card with a pointer-tracked 3D tilt.
 *
 * There is no "Add to cart" here by design — Encore Care is an inventory-model
 * lead-gen business, not a marketplace (`01-business-understanding.md`). The
 * single action under the card takes the visitor to the product page, where
 * specs, safety information and the quote form live together.
 */
export function ProductCard3D({ product, priority = false }: { product: Product; priority?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springCfg = { stiffness: 220, damping: 22, mass: 0.6 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), springCfg);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), springCfg);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    // Coarse pointers (touch) have no hover state — tilting on tap just looks
    // like a glitch, so it is skipped entirely.
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function reset() {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  const hero = product.images[0];

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={reset}
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <motion.article
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          // Solid white, not translucent: on a tinted page a see-through card
          // picks up the gradient behind it and each card in a row ends up a
          // slightly different colour.
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-[border-color,box-shadow,transform] duration-300",
          hovered
            ? "border-brand-green/45 shadow-glow-lg"
            : "border-line shadow-card",
        )}
      >
        {/* Image */}
        <Link
          href={`/products/${product.slug}`}
          tabIndex={-1}
          aria-hidden
          className="relative block aspect-square overflow-hidden bg-surface-sunken/50"
        >
          {/* object-contain, not cover: the source photographs are square
              product shots on a plain background, so cropping them to a
              landscape card would cut the equipment in half. */}
          <Image
            src={hero.src}
            alt=""
            width={hero.width}
            height={hero.height}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {/* A light scrim, not the dark-theme fade-to-background. Its only job
              now is to keep the badges legible over a bright photo. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-white/45 via-transparent to-transparent"
          />
          {product.badges.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {product.badges.slice(0, 2).map((badge) => {
                const meta = BADGE_META[badge];
                if (!meta) return null;
                const Icon = meta.icon;
                return (
                  <span
                    key={badge}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md",
                      meta.className,
                    )}
                  >
                    {Icon && <Icon className="h-3 w-3" aria-hidden />}
                    {meta.label}
                  </span>
                );
              })}
            </div>
          )}
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-semibold leading-snug text-text-primary">
            <Link
              href={`/products/${product.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {product.summary}
          </p>

          {/* How it can be had, not what it costs. Prices are quoted, never
              published — see the note at the top of `src/lib/types.ts`. */}
          <p className="mt-5 border-t border-line pt-4 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {product.offerMode === "rent-or-buy" ? (
              <>
                Available on <span className="text-brand-mint">rent</span> or to{" "}
                <span className="text-brand-green">buy</span>
              </>
            ) : (
              <>
                Available to <span className="text-brand-green">buy</span>
              </>
            )}
          </p>

          {/* Action buttons under the card */}
          <div className="relative z-10 mt-4 grid grid-cols-2 gap-2">
            <Link
              href={`/products/${product.slug}`}
              className={cn(
                "inline-flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2.5 text-xs font-semibold sm:text-sm transition-all duration-200",
                hovered
                  ? "border-brand-green bg-brand-green text-white"
                  : "border-brand-green/40 bg-brand-green/6 text-brand-green",
              )}
            >
              Get Quote
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden />
            </Link>

            <a
              href={whatsappLink(`Hi Encore Care, I want to buy ${product.name}. Please share price & details.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-brand-mint/50 bg-brand-mint/10 px-3 py-2.5 text-xs font-semibold sm:text-sm text-brand-mint transition-all duration-200 hover:bg-brand-mint hover:text-white"
            >
              <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Buy Now
            </a>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}
