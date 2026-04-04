"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import GlowOrb from "@/components/ui/GlowOrb";

export default function GalleryHero() {
  const t = useTranslations("gallery.hero");

  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-dark overflow-hidden">
      <GlowOrb color="accent" size="lg" className="top-0 left-1/3 -translate-y-1/2" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight">
            {t("title")}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/60 leading-relaxed">
            {t("subtitle")}
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
