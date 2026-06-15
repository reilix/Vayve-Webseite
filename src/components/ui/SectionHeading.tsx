"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "max-w-3xl mb-12 md:mb-16",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="inline-block font-display text-xs font-bold uppercase tracking-[0.25em] mb-4 text-primary">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-5xl font-extrabold leading-[1.05] tracking-tight text-cream">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg md:text-xl leading-relaxed text-muted">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
