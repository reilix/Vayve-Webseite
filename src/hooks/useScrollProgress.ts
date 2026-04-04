"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";

export function useScrollProgress(): {
  scrollY: MotionValue<number>;
  scrollProgress: MotionValue<number>;
} {
  const { scrollY, scrollYProgress } = useScroll();
  return { scrollY, scrollProgress: scrollYProgress };
}

export function useParallax(scrollY: MotionValue<number>, distance: number) {
  return useTransform(scrollY, [0, 1000], [0, distance]);
}
