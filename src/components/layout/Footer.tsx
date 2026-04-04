"use client";

import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { Globe, Link2, Music2, ArrowUp } from "lucide-react";
import { siteConfig, navLinks } from "@/lib/constants";
import Container from "./Container";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-dark text-white relative">
      <div className="h-px bg-gradient-to-r from-primary via-secondary to-accent" />

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="text-2xl font-heading font-bold text-white hover:text-primary-light transition-colors"
            >
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-white/50 text-sm leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-white/50 hover:bg-primary/20 hover:text-primary-light transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Globe size={18} />
              </a>
              <a
                href={siteConfig.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-white/50 hover:bg-primary/20 hover:text-primary-light transition-all cursor-pointer"
                aria-label="TikTok"
              >
                <Music2 size={18} />
              </a>
              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/5 text-white/50 hover:bg-primary/20 hover:text-primary-light transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <Link2 size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("navigation")}
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={`/${locale}${link.href === "/" ? "" : link.href}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {tNav(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("services")}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <span>{t("own_events")}</span>
              <span>{t("event_planning")}</span>
              <span>{t("weddings")}</span>
              <span>{t("corporate")}</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-heading font-semibold uppercase tracking-wider text-white/40 mb-4">
              {t("contact")}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-white/60">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="hover:text-white transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6 text-sm text-white/40">
            <Link href={`/${locale}/impressum`} className="hover:text-white transition-colors">
              {t("imprint")}
            </Link>
            <Link href={`/${locale}/datenschutz`} className="hover:text-white transition-colors">
              {t("privacy")}
            </Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-primary/20 text-white/40 hover:text-white transition-all cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
