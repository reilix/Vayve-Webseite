"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import Container from "./Container";

export default function Header() {
  const t = useTranslations("nav");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
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
            ? "bg-[#100722]/85 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent",
        )}
      >
        <Container className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="text-2xl md:text-3xl">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="text-sm font-display font-semibold text-cream/70 hover:text-cream transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/tickets"
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-display font-bold text-white hover:shadow-[var(--shadow-glow-pink)] transition-all"
            >
              {t("tickets")}
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden inline-flex size-11 items-center justify-center text-cream/80 hover:text-cream transition-colors cursor-pointer"
            aria-label="Menü öffnen"
          >
            <Menu size={26} />
          </button>
        </Container>
      </motion.header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
