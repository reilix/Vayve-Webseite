"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/constants";
import Container from "@/components/layout/Container";
import InstagramIcon from "@/components/brand/InstagramIcon";

export default function InstagramCTA() {
  const t = useTranslations("home.instagram");

  return (
    <section className="relative py-20 md:py-24">
      <Container>
        <motion.a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative block overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-primary via-magenta to-violet p-10 md:p-16 text-center grain"
        >
          <InstagramIcon className="mx-auto mb-5 size-10 text-white" />
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">{t("body")}</p>
          <span className="mt-6 inline-block rounded-full bg-white px-6 py-3 font-display font-bold text-[#0c0518] group-hover:scale-105 transition-transform">
            {t("cta")}
          </span>
        </motion.a>
      </Container>
    </section>
  );
}
