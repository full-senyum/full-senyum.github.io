import { IconBrandWhatsapp } from "@tabler/icons-react";

import { buttonVariants, type ButtonVariantProps } from "@/components/ui/button";
import { waLink } from "@/data/site";
import { cn } from "@/lib/utils";

type WaButtonProps = ButtonVariantProps & {
  /** Product name appended to the WhatsApp greeting. */
  product?: string;
  label?: string;
  className?: string;
};

/** The one call to action on the site: opens a WhatsApp chat with the admin. */
export function WaButton({
  product,
  label = "Chat WhatsApp",
  variant = "primary",
  size = "md",
  className,
}: WaButtonProps) {
  return (
    <a
      href={waLink(product)}
      target="_blank"
      rel="noopener"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <IconBrandWhatsapp stroke={1.5} aria-hidden="true" />
      <span>{label}</span>
      <span className="sr-only"> (membuka WhatsApp)</span>
    </a>
  );
}
