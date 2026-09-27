import Link from "next/link";
import { IconArrowRight, IconArrowUpRight } from "@tabler/icons-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type TextLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** `strong`: navy + underline (default). `quiet`: muted, navy on hover. */
  tone?: "strong" | "quiet" | "on-navy";
  arrow?: "right" | "up-right" | false;
  external?: boolean;
};

/**
 * Text link: muted → navy in 150ms, underline offset 6px. Internal links use
 * next/link; `external` opens a new tab.
 */
export function TextLink({
  href,
  children,
  className,
  tone = "strong",
  arrow = false,
  external = false,
}: TextLinkProps) {
  const classes = cn(
    "group/link inline-flex min-h-11 items-center gap-1.5 text-label-strong underline decoration-1 underline-offset-[6px] transition-colors duration-150",
    tone === "strong" && "text-navy decoration-navy/40 hover:decoration-navy",
    tone === "quiet" && "text-muted decoration-transparent hover:text-navy hover:decoration-navy",
    tone === "on-navy" && "text-white decoration-white/40 hover:decoration-white",
    className,
  );
  const Arrow = arrow === "up-right" || (external && arrow !== false) ? IconArrowUpRight : IconArrowRight;
  const icon = arrow ? (
    <Arrow
      stroke={1.5}
      aria-hidden="true"
      className="size-[18px] shrink-0 transition-transform duration-200 ease-out group-hover/link:translate-x-0.5"
    />
  ) : null;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {children}
        {icon}
        <span className="sr-only"> (membuka tab baru)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}
