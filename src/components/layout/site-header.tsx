"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IconMenu, IconX } from "@tabler/icons-react";

import { Logo } from "@/components/brand/logo";
import { WaButton } from "@/components/shared/wa-button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

function normalize(path: string) {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
}

function isActive(pathname: string, href: string) {
  const current = normalize(pathname);
  const target = normalize(href);
  return target === "/" ? current === "/" : current === target || current.startsWith(`${target}/`);
}

/**
 * Fixed white header, 52px / 66px. No shadow; a 1px hairline fades in once
 * the page has scrolled more than 8px.
 */
export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white">
      <div className="container-page flex h-[52px] items-center justify-between md:h-[66px]">
        <Link
          href="/"
          aria-label="Full Senyum, ke beranda"
          className="-mx-1 flex min-h-11 items-center px-1 text-navy"
        >
          <Logo decorative className="h-[22px] w-auto md:h-[26px]" />
        </Link>

        <nav aria-label="Utama" className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "text-label-strong inline-flex min-h-11 items-center underline-offset-[6px] transition-colors duration-150",
                      active
                        ? "text-navy underline decoration-1"
                        : "text-muted hover:text-navy",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <WaButton size="sm" label="Chat WhatsApp" />
        </nav>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger
            aria-label="Buka menu"
            className="-mr-2 flex size-11 items-center justify-center text-navy md:hidden"
          >
            <IconMenu stroke={1.5} className="size-7" aria-hidden="true" />
          </SheetTrigger>
          <SheetContent>
            <div className="container-page flex h-[52px] shrink-0 items-center justify-between border-b border-line">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                aria-label="Full Senyum, ke beranda"
                className="-mx-1 flex min-h-11 items-center px-1"
              >
                <Logo decorative className="h-[22px] w-auto" />
              </Link>
              <SheetClose
                aria-label="Tutup menu"
                className="-mr-2 flex size-11 items-center justify-center text-navy"
              >
                <IconX stroke={1.5} className="size-7" aria-hidden="true" />
              </SheetClose>
            </div>

            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav aria-label="Menu seluler" className="container-page flex-1 overflow-y-auto pt-6">
              <ul>
                {nav.map((item) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-line">
                      <Link
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "text-h3 flex min-h-11 items-center py-4 underline-offset-[6px]",
                          active ? "text-navy underline decoration-2" : "text-navy",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="container-page shrink-0 space-y-6 pt-6 pb-[max(24px,env(safe-area-inset-bottom))]">
              <WaButton size="lg" label="Chat WhatsApp" className="w-full" />
              <SheetDescription render={<address />} className="not-italic">
                {site.address.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </SheetDescription>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-0 h-px bg-line transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />
    </header>
  );
}
