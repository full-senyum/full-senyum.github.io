/* eslint-disable @next/next/no-img-element -- static export: plain <img> with
   a pre-generated srcset is the intended pipeline (images.unoptimized). */
import type { CSSProperties } from "react";

import type { ImageAsset } from "@/lib/media";
import { cn } from "@/lib/utils";

type ImgProps = {
  image: ImageAsset;
  /** Responsive `sizes` attribute; required so the browser picks a sane source. */
  sizes: string;
  className?: string;
  alt?: string;
  /** Above-the-fold images: eager + high fetch priority. */
  priority?: boolean;
  style?: CSSProperties;
};

/**
 * Renders a manifest entry as <img srcset> with a grey-50 surface and the
 * optional LQIP painted underneath while the real file loads. Always
 * object-cover, radius 0.
 */
export function Img({ image, sizes, className, alt, priority = false, style }: ImgProps) {
  const sources = [...(image.sources ?? [])].sort((a, b) => a.w - b.w);
  const fallback = sources.at(-1)?.src ?? "";
  const srcSet = sources.map((s) => `${s.src} ${s.w}w`).join(", ");

  return (
    <img
      src={fallback}
      srcSet={srcSet || undefined}
      sizes={srcSet ? sizes : undefined}
      width={image.width}
      height={image.height}
      alt={alt ?? image.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : undefined}
      className={cn("block bg-grey-50 object-cover", className)}
      style={{
        ...(image.lqip
          ? {
              backgroundImage: `url("${image.lqip}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : null),
        ...style,
      }}
    />
  );
}
