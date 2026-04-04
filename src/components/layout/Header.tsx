"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import Container from "./Container";
import Button from "@/components/ui/Button";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-dark/90 backdrop-blur-lg shadow-[0_4px_12px_rgba(15,10,26,0.12)]"
            : "bg-transparent"
        )}
      >
        <Container className="flex items-center justify-between h-16 md:h-20">
          <Link
            href={`/${locale}`}
            className="text-2xl font-heading font-bold text-white hover:text-primary-light transition-colors"
          >
            {siteConfig.name}
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={`/${locale}${link.href === "/" ? "" : link.href}`}
                className="text-sm font-heading font-medium text-white/70 hover:text-white transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher light />
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                (window.location.href = `/${locale}/kontakt`)
              }
            >
              {t("contact")}
            </Button>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 text-white/70 hover:text-white transition-colors cursor-pointer"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </Container>
      </motion.header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
