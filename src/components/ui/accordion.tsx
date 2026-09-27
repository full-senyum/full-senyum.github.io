"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";

/**
 * shadcn Accordion (Base UI), restyled: single + collapsible by default,
 * hairline rows, 300ms height transition. The trigger's icon is supplied by
 * the caller and can rotate via `group-data-[panel-open]/trigger`.
 */
function Accordion({
  className,
  ...props
}: Omit<AccordionPrimitive.Root.Props, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: Omit<AccordionPrimitive.Item.Props, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn(className)} {...props} />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: Omit<AccordionPrimitive.Trigger.Props, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/trigger text-title flex min-h-11 flex-1 items-start justify-between gap-6 py-5 text-left text-navy transition-colors duration-150 md:py-6",
          className,
        )}
        {...props}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: Omit<AccordionPrimitive.Panel.Props, "className"> & { className?: string }) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ease-soft data-ending-style:h-0 data-starting-style:h-0",
        className,
      )}
      {...props}
    >
      {children}
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
