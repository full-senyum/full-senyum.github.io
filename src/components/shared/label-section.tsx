import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type LabelSectionProps = {
  label: string;
  /** The label is the section's h2 unless the content carries its own heading. */
  labelAs?: "h2" | "p";
  labelId?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
};

/**
 * Origo's signature layout: a small muted label top-left, content on the
 * right. 12-col grid; tablet 4 / 8, desktop 7 / 5.
 */
export function LabelSection({
  label,
  labelAs: Label = "h2",
  labelId,
  children,
  className,
  contentClassName,
}: LabelSectionProps) {
  return (
    <div className={cn("grid gap-y-6 md:grid-cols-12 md:gap-x-5", className)}>
      <Label id={labelId} className="text-label text-muted md:col-span-4 xl:col-span-7">
        {label}
      </Label>
      <div className={cn("min-w-0 md:col-span-8 xl:col-span-5", contentClassName)}>{children}</div>
    </div>
  );
}
