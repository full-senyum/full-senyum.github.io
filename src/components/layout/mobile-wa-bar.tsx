"use client";

import { useEffect, useState } from "react";

import { WaButton } from "@/components/shared/wa-button";
import { cn } from "@/lib/utils";

/**
 * Phones only (<810px): a fixed bottom bar with one navy pill. It slides in
 * after 60% of the first viewport has scrolled by and steps aside while the
 * footer (which has its own WhatsApp button) is on screen.
 */
export function MobileWaBar() {
  const [pastHero, setPastHero] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    const footer = document.getElementById("site-footer");
    const io = footer
      ? new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
          threshold: 0,
        })
      : null;
    if (footer && io) io.observe(footer);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io?.disconnect();
    };
  }, []);

  const visible = pastHero && !footerVisible;

  return (
    <div
      inert={!visible}
      aria-hidden={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-3 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 ease-soft md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <WaButton size="md" label="Chat WhatsApp" className="w-full" />
    </div>
  );
}
