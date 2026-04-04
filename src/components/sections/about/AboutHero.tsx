"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import GlowOrb from "@/components/ui/GlowOrb";

export default function AboutHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-dark overflow-hidden">
      <GlowOrb color="primary" size="lg" className="top-0 right-0 -translate-y-1/2" />
      <GlowOrb color="accent" size="sm" className="bottom-0 left-1/4" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed max-w-2xl">
            {t("subtitle")}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
