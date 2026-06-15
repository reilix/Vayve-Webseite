"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";

export default function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden grain">
      {/* Hintergrund: Film-Rave-Dunkelheit + Brand-Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#3b1576_0%,#1a0b2e_45%,#0c0518_100%)]" />
      <div className="glow-orb left-[-10%] top-[10%] size-[40vw] bg-primary/40" />
      <div className="glow-orb right-[-5%] bottom-[5%] size-[34vw] bg-mint/25" />
      <div className="glow-orb left-[30%] top-[40%] size-[28vw] bg-violet/40" />

      <Container className="relative z-10 py-28 text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-[0.25em] text-mint backdrop-blur"
        >
          {t("eyebrow")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-7 font-display text-6xl sm:text-7xl md:text-8xl font-extrabold leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block text-cream">{t("line1")}</span>
          <span className="block text-cream">{t("line2")}</span>
          <span className="block text-gradient">{t("line3")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.18 }}
          className="mx-auto mt-7 max-w-xl text-lg text-cream/70"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/events"
            className="rounded-full bg-primary px-7 py-3.5 font-display font-bold text-white hover:shadow-[var(--shadow-glow-pink)] transition-all"
          >
            {t("ctaEvents")}
          </Link>
          <Link
            href="/tickets"
            className="rounded-full border border-white/25 px-7 py-3.5 font-display font-bold text-cream hover:border-mint hover:text-mint transition-all"
          >
            {t("ctaTickets")}
          </Link>
        </motion.div>
      </Container>

      {/* Scroll-Hinweis */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="font-display text-[10px] uppercase tracking-[0.3em] text-cream/40"
        >
          {t("scroll")}
        </motion.div>
      </div>
    </section>
  );
}
