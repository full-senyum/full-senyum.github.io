"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { metrics } from "@/data/metrics";

/** Counts 0 → value (1.4s ease-out) once in view; static under reduced motion. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduce) return;
    if (!inView) {
      node.textContent = "0";
      return;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <p className="text-display text-navy tabular-nums">
      <span aria-hidden="true">
        <span ref={ref}>{value}</span>
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </p>
  );
}

/** Origo count-up metrics: 4-up (2×2 on phones), hairline on top. */
export function Metrics() {
  return (
    <section aria-label="Full Senyum dalam angka" className="container-page section-y">
      <RevealGroup as="ul" className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
        {metrics.map((metric) => (
          <RevealItem as="li" key={metric.label} className="border-t border-line pt-5 md:pt-6">
            <Counter value={metric.value} suffix={metric.suffix} />
            <p className="text-body mt-1 text-muted md:mt-2">{metric.label}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
