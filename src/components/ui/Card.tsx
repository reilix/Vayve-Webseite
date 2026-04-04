"use client";

import { cn } from "@/lib/utils";
import { motion, type HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  dark?: boolean;
  hoverable?: boolean;
}

export default function Card({
  className,
  dark = false,
  hoverable = true,
  children,
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-[16px] p-6 transition-shadow duration-200",
        dark
          ? "bg-white/5 border border-white/10 text-white"
          : "bg-white border border-border shadow-[0_1px_3px_rgba(15,10,26,0.08)]",
        hoverable && "cursor-pointer hover:shadow-[0_4px_12px_rgba(15,10,26,0.12)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
