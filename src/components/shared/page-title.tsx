import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Left side bearing of Switzer Bold's first glyph, so giant titles sit on the gutter. */
const LSB: Record<string, number> = { K: 0.061, T: 0.024, "4": 0.035 };

type PageTitleProps = {
  title: string;
  intro?: ReactNode;
  className?: string;
  children?: ReactNode;
};

/**
 * Giant `text-mega` h1 for inner pages (origo /work) plus an optional
 * `text-h4` intro. Top padding clears the fixed header plus ~100px.
 * Animated with CSS so the LCP text paints without waiting for hydration.
 */
export function PageTitle({ title, intro, className, children }: PageTitleProps) {
  const lsb = LSB[title.charAt(0)] ?? 0.05;
  return (
    <section
      className={cn(
        "container-page pt-[calc(var(--header-h)+48px)] pb-12 md:pt-[calc(var(--header-h)+72px)] md:pb-16 xl:pt-[calc(var(--header-h)+96px)] xl:pb-20",
        className,
      )}
    >
      <h1 className="text-mega animate-rise text-navy" style={{ marginLeft: `-${lsb}em` }}>
        {title}
      </h1>
      {intro ? (
        <p className="text-h4 animate-rise mt-8 max-w-[800px] text-navy [animation-delay:90ms] md:mt-12 xl:mt-16">
          {intro}
        </p>
      ) : null}
      {children}
    </section>
  );
}
