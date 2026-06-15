"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";

export default function VibeSection() {
  const t = useTranslations("home.vibe");

  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="glow-orb left-[60%] top-[10%] size-[30vw] bg-magenta/30" />
      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-display text-xs font-bold uppercase tracking-[0.25em] text-mint"
          >
            {t("eyebrow")}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-4 font-display text-4xl md:text-6xl font-extrabold leading-[1.02] tracking-tight text-cream"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 text-lg md:text-xl leading-relaxed text-cream/70"
          >
            {t("body")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-8"
          >
            <Link
              href="/ueber-uns"
              className="inline-block rounded-full border border-white/25 px-7 py-3.5 font-display font-bold text-cream hover:border-primary hover:text-primary transition-all"
            >
              {t("cta")} →
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
