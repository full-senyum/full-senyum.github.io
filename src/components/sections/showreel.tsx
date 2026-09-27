"use client";

import { motion } from "motion/react";

import { Img } from "@/components/shared/img";
import type { StockImage } from "@/lib/media";
import { cn } from "@/lib/utils";

type ShowreelProps = {
  image?: StockImage;
  /** Tailwind aspect classes; default: 4:3 on phones, 1400:800 from 810px. */
  aspectClassName?: string;
  sizes?: string;
  className?: string;
};

/**
 * Wordless full-container image (origo rhythm break). Settles from a 1.04
 * scale as it scrolls into view; no parallax.
 */
export function Showreel({
  image,
  aspectClassName = "aspect-[4/3] md:aspect-[1400/800]",
  sizes = "(min-width: 1440px) 1400px, 100vw",
  className,
}: ShowreelProps) {
  if (!image) return null;
  return (
    <figure className={cn("container-page section-y m-0", className)}>
      <div className={cn("relative overflow-hidden bg-grey-50", aspectClassName)}>
        <motion.div
          className="size-full"
          initial={{ scale: 1.04 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Img image={image} sizes={sizes} className="size-full" />
        </motion.div>
      </div>
    </figure>
  );
}
