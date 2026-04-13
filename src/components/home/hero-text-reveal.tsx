"use client";

import { motion, useReducedMotion } from "motion/react";

interface HeroTextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function HeroTextReveal({
  text,
  className,
  style,
}: HeroTextRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <h1 className={className} style={style}>
        {text}
      </h1>
    );
  }

  return (
    <h1 className={className} style={style} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block"
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </h1>
  );
}
