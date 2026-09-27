import type { CSSProperties } from "react";

import type { Client } from "@/lib/media";
import { cn } from "@/lib/utils";

type ClientLogoProps = {
  client: Client;
  className?: string;
  /** Visually hidden duplicates (marquee loop) render without a name. */
  hidden?: boolean;
  /** `marquee`: sized from the row's `--logo-h`. `tile`: fixed 20px wordmark. */
  variant?: "marquee" | "tile";
};

/**
 * A client mark rendered as a CSS mask filled with `currentColor`, so every
 * logo is monochrome and follows the text colour (muted → navy on hover).
 * Height = `--logo-h` × `scale`; width keeps the file's aspect ratio.
 * Clients without a usable file render their short name as a bold wordmark
 * (½ × `--logo-h` in the marquee, 20px in grid tiles).
 */
export function ClientLogo({
  client,
  className,
  hidden = false,
  variant = "marquee",
}: ClientLogoProps) {
  const scale = client.scale ?? 1;
  const label = hidden ? undefined : client.name;

  if (client.fallbackText || !client.src || !client.width || !client.height) {
    // No usable file: the short name set as a wordmark with the weight of a logo.
    const wordmark: CSSProperties = {
      fontSize: variant === "marquee" ? "calc(var(--logo-h, 40px) * 0.5)" : "20px",
      letterSpacing: "-0.01em",
      lineHeight: 1,
    };
    return (
      <span
        className={cn(
          "font-bold whitespace-nowrap text-muted transition-colors duration-200 hover:text-navy",
          className,
        )}
        style={wordmark}
      >
        <span aria-hidden={hidden ? undefined : true}>{client.short || client.name}</span>
        {hidden ? null : <span className="sr-only">{client.name}</span>}
      </span>
    );
  }

  const ratio = client.width / client.height;
  const mask = `url("${client.src}")`;
  const style: CSSProperties = {
    height: `calc(var(--logo-h, 40px) * ${scale})`,
    width: `calc(var(--logo-h, 40px) * ${(scale * ratio).toFixed(4)})`,
    maskImage: mask,
    WebkitMaskImage: mask,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskPosition: "center",
    WebkitMaskPosition: "center",
  };

  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn(
        "block shrink-0 bg-current text-muted transition-colors duration-200 hover:text-navy",
        className,
      )}
      style={style}
    />
  );
}
