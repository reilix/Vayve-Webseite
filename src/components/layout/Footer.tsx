"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { siteConfig, navLinks, legal } from "@/lib/constants";
import Logo from "@/components/brand/Logo";
import InstagramIcon from "@/components/brand/InstagramIcon";
import YouTubeIcon from "@/components/brand/YouTubeIcon";
import Container from "./Container";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative overflow-hidden bg-base text-cream">
      <div className="bg-hazard h-2" aria-hidden />

      <Container className="relative py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link href="/" aria-label="VAYVE">
              <Logo className="h-12" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream/55">{t("tagline")}</p>
            <div className="mt-6 flex gap-2">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center border border-line text-cream/70 transition-colors hover:border-acid hover:text-acid"
                aria-label="Instagram"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-11 items-center justify-center border border-line text-cream/70 transition-colors hover:border-acid hover:text-acid"
                aria-label="YouTube"
              >
                <YouTubeIcon className="size-[18px]" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="label-mono mb-5 text-acid">[ {t("navigation")} ]</h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="label-mono text-cream/60 transition-colors hover:text-cream"
                >
                  → {tNav(link.key)}
                </Link>
              ))}
              <Link href="/tickets" className="label-mono text-cream/60 transition-colors hover:text-cream">
                → {tNav("tickets")}
              </Link>
            </nav>
          </div>

          {/* Kontakt */}
          <div className="lg:col-span-4">
            <h4 className="label-mono mb-5 text-acid">[ {t("contact")} ]</h4>
            <div className="flex flex-col gap-2.5 text-sm text-cream/60">
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-cream">
                {siteConfig.email}
              </a>
              <span>{legal.company}</span>
              <span>
                {legal.street}, {legal.zipCity}
              </span>
              <span className="label-mono mt-3 text-cream/35">53.5511° N / 9.9937° E</span>
            </div>
          </div>
        </div>

        {/* Riesige Kontur-Zeile */}
        <p
          aria-hidden
          className="text-outline pointer-events-none mt-16 select-none whitespace-nowrap font-display text-[13vw] leading-none opacity-30 lg:text-[11.5vw]"
        >
          Good Vibes
        </p>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 md:flex-row md:items-center">
          <p className="label-mono text-cream/45">{t("copyright", { year: new Date().getFullYear() })}</p>
          <div className="label-mono flex flex-wrap items-center gap-5 text-cream/55">
            <Link href="/impressum" className="transition-colors hover:text-cream">
              {t("imprint")}
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-cream">
              {t("privacy")}
            </Link>
            <Link href="/agb" className="transition-colors hover:text-cream">
              AGB
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="cursor-pointer border border-line px-3 py-1.5 transition-colors hover:border-acid hover:text-acid"
              aria-label="Nach oben"
            >
              ↑ Top
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
