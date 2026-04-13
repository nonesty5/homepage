"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { staggerItemVariants } from "./stagger-children";

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={staggerItemVariants} className={className}>
      {children}
    </motion.div>
  );
}
