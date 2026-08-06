"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { ProductImage } from "@/lib/types";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<ProductImage["kind"], string> = {
  hero: "Main view",
  angle: "Alternate angle",
  "in-use": "In use",
  detail: "Close-up",
};

/**
 * Product gallery.
 *
 * `11-image-strategy.md`: 5–8 images per product covering an isolated hero,
 * alternate angles, at least one authentic in-use shot and a functional
 * close-up — and the affordances must be *visible*. Pinch-to-zoom is not
 * universally understood by the elderly and low-literacy users who make up a
 * large share of this audience, so thumbnails are labelled rather than left as
 * bare swatches.
 */
export function ProductGallery({ images, productName }: { images: ProductImage[]; productName: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface-raised/40">
        <motion.div
          key={current.src}
          initial={{ opacity: 0.4, scale: 1.01 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative aspect-4/3"
        >
          <Image
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            // The gallery hero is the LCP element on this route.
            priority={active === 0}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent"
        />

        <span className="absolute bottom-3 left-3 rounded-full border border-line-strong bg-surface/80 px-3 py-1 text-xs text-text-secondary backdrop-blur-md">
          {KIND_LABEL[current.kind]}
        </span>
      </div>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show ${KIND_LABEL[image.kind].toLowerCase()} of ${productName}`}
                aria-current={i === active}
                className={cn(
                  "group block w-full overflow-hidden rounded-xl border transition-all",
                  i === active
                    ? "border-brand-green shadow-glow"
                    : "border-line-strong hover:border-brand-green/50",
                )}
              >
                <span className="relative block aspect-square">
                  <Image
                    src={image.src}
                    alt=""
                    width={image.width}
                    height={image.height}
                    loading="lazy"
                    sizes="120px"
                    className="h-full w-full object-cover"
                  />
                </span>
                <span className="block bg-surface-raised/70 px-1 py-1 text-[10px] leading-tight text-text-muted group-hover:text-text-secondary">
                  {KIND_LABEL[image.kind]}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
