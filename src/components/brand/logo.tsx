import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { LOGO_HORIZONTAL, LOGO_STACKED, type LogoArt } from "./logo-paths";

type LogoProps = {
  variant?: "horizontal" | "stacked";
  /** Hero intro: glyphs rise in sequence, then the smile draws left → right. */
  animate?: boolean;
  /** Hide from assistive tech when a visible/hidden heading already names the brand. */
  decorative?: boolean;
  className?: string;
};

type CustomProps = CSSProperties & Record<`--${string}`, string | number>;

/**
 * Full Senyum wordmark as inline SVG (vector, `fill="currentColor"` so it
 * takes the text colour). Size it with a height (header) or width (hero,
 * footer); the other side follows the viewBox ratio.
 */
export function Logo({
  variant = "horizontal",
  animate = false,
  decorative = false,
  className,
}: LogoProps) {
  const art: LogoArt = variant === "stacked" ? LOGO_STACKED : LOGO_HORIZONTAL;
  const a11y = decorative
    ? ({ "aria-hidden": true, focusable: "false" } as const)
    : ({ role: "img", "aria-label": "Full Senyum" } as const);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={art.viewBox}
      width={art.width}
      height={art.height}
      fill="currentColor"
      className={cn("block shrink-0", animate && "logo-animate", className)}
      style={animate ? ({ "--glyphs": art.letters.length } as CustomProps) : undefined}
      {...a11y}
    >
      {art.letters.map((d, i) => (
        <path
          key={i}
          d={d}
          className="logo-glyph"
          style={animate ? ({ "--i": i } as CustomProps) : undefined}
        />
      ))}
      <path d={art.smile} className="logo-smile" />
    </svg>
  );
}
