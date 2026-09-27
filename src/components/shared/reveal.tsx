"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: motion.div,
  section: motion.section,
  li: motion.li,
  ul: motion.ul,
  ol: motion.ol,
  p: motion.p,
  article: motion.article,
  figure: motion.figure,
} as const;

type Tag = keyof typeof tags;

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  id?: string;
};

/** Spec §3 reveal: opacity 0 → 1, y 12 → 0, once, 20% in view, 0.6s soft ease. */
export function Reveal({ children, className, as = "div", delay = 0, id }: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      id={id}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </Component>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

/** Parent for small groups (metrics, steps): children stagger by 0.06s. */
export function RevealGroup({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={groupVariants}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: Omit<RevealProps, "delay">) {
  const Component = tags[as];
  return (
    <Component className={className} variants={itemVariants}>
      {children}
    </Component>
  );
}
