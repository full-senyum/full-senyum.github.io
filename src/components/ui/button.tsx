import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * shadcn Button, restyled to the Full Senyum spec: pills are the only rounded
 * shape on the site (a deliberate echo of the smile). Focus rings come from the
 * global :focus-visible rule (2px navy, 2px offset; white on navy surfaces).
 */
const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full whitespace-nowrap transition-colors duration-200 ease-out select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-navy text-white hover:bg-navy-800",
        secondary: "border border-navy text-navy hover:bg-navy hover:text-white",
        inverse: "bg-white text-navy hover:bg-grey-100 focus-visible:outline-white",
        link: "rounded-none text-navy underline decoration-1 underline-offset-[6px] hover:decoration-2",
      },
      size: {
        // 36px pill; an invisible ::before extends the hit area to 44px.
        sm: "h-9 px-4 text-label-strong before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] [&_svg]:size-[18px]",
        md: "h-11 px-5 text-label-strong [&_svg]:size-5",
        lg: "h-14 px-7 text-title [&_svg]:size-[22px]",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", class: "h-auto px-0" },
      { variant: "link", size: "md", class: "h-auto min-h-11 px-0" },
      { variant: "link", size: "lg", class: "h-auto min-h-11 px-0" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Omit<ButtonPrimitive.Props, "className"> & ButtonVariantProps & { className?: string }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants, type ButtonVariantProps };
