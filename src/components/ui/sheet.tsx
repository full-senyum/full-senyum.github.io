"use client";

import * as React from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";

/**
 * shadcn Sheet (Base UI Dialog), restyled: radius 0, no shadow, no blur.
 * Used full-screen for the mobile menu.
 */
function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetContent({
  className,
  children,
  ...props
}: Omit<SheetPrimitive.Popup.Props, "className"> & { className?: string }) {
  return (
    <SheetPortal>
      <SheetPrimitive.Backdrop
        data-slot="sheet-overlay"
        className="fixed inset-0 z-50 bg-white transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
      />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-white text-navy outline-none transition-[opacity,transform] duration-300 ease-soft data-ending-style:-translate-y-2 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0",
          className,
        )}
        {...props}
      >
        {children}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetTitle({
  className,
  ...props
}: Omit<SheetPrimitive.Title.Props, "className"> & { className?: string }) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={cn(className)} {...props} />;
}

function SheetDescription({
  className,
  ...props
}: Omit<SheetPrimitive.Description.Props, "className"> & { className?: string }) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-label text-muted", className)}
      {...props}
    />
  );
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetTitle, SheetDescription };
