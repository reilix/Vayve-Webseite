"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import GlowOrb from "@/components/ui/GlowOrb";

export default function ServicesHero() {
  const t = useTranslations("services.hero");

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-dark overflow-hidden">
      <GlowOrb color="secondary" size="lg" className="top-0 -left-32" />
      <GlowOrb color="primary" size="md" className="bottom-0 right-0" />

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
