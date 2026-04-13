"use client";

import { motion, useReducedMotion } from "motion/react";

interface LineRevealProps {
  className?: string;
  delay?: number;
  direction?: "left" | "center";
}

export default function LineReveal({
  className = "h-0.5 w-24 bg-accent-bright",
  delay = 0,
  direction = "left",
}: LineRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className} />;
  }

  return (
    <motion.div
      className={className}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformOrigin: direction === "left" ? "left center" : "center center" }}
    />
  );
}
