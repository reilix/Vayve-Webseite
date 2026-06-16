"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowUp, Ticket } from "lucide-react";
import { siteConfig, navLinks, legal } from "@/lib/constants";
import Logo from "@/components/brand/Logo";
import InstagramIcon from "@/components/brand/InstagramIcon";
import Container from "./Container";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="relative bg-[#0c0518] text-cream">
      <div className="h-px bg-gradient-to-r from-primary via-violet-light to-mint" />

      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/">
              <Logo className="h-11 md:h-12" />
            </Link>
            <p className="mt-4 max-w-xs text-cream/50 text-sm leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex gap-3 mt-6">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-white/5 text-cream/60 hover:bg-primary/20 hover:text-primary transition-all"
                aria-label="Instagram"
              >
                <InstagramIcon className="size-[18px]" />
              </a>
              <Link
                href="/tickets"
                className="p-2.5 rounded-full bg-white/5 text-cream/60 hover:bg-mint/20 hover:text-mint transition-all"
                aria-label="Tickets"
              >
                <Ticket size={18} />
              </Link>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-display font-bold uppercase tracking-wider text-cream/60 mb-4">
              {t("navigation")}
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.key}
                  href={link.href}
                  className="text-sm text-cream/60 hover:text-cream transition-colors"
                >
                  {tNav(link.key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Kontakt */}
          <div>
            <h4 className="text-xs font-display font-bold uppercase tracking-wider text-cream/60 mb-4">
              {t("contact")}
            </h4>
            <div className="flex flex-col gap-3 text-sm text-cream/60">
              <a href={`mailto:${siteConfig.email}`} className="hover:text-cream transition-colors">
                {siteConfig.email}
              </a>
              <span>{legal.company}</span>
              <span>
                {legal.street}, {legal.zipCity}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-cream/60">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6 text-sm text-cream/60">
            <Link href="/impressum" className="hover:text-cream transition-colors">
              {t("imprint")}
            </Link>
            <Link href="/datenschutz" className="hover:text-cream transition-colors">
              {t("privacy")}
            </Link>
            <Link href="/agb" className="hover:text-cream transition-colors">
              AGB
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/5 hover:bg-primary/20 text-cream/60 hover:text-cream transition-all cursor-pointer"
              aria-label="Nach oben"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  );
}
