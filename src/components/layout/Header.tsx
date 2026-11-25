"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Logo from "@/components/brand/Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileNav from "./MobileNav";
import Container from "./Container";

function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled
            ? "border-line bg-background/90 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Link href="/" className="shrink-0" aria-label="VAYVE">
            <Logo className="h-8 md:h-9" />
          </Link>

          <nav className="hidden items-center lg:flex">
            {navLinks.map((link, i) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "label-mono group flex items-center gap-1.5 px-3.5 py-2 transition-colors",
                    active ? "text-acid" : "text-cream/65 hover:text-cream",
                  )}
                >
                  <span className={cn("text-[0.6rem]", active ? "text-acid" : "text-cream/30")}>
                    0{i + 1}
                  </span>
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitcher />
            <Link href="/tickets" className="btn-hard btn-acid !px-5 !py-2.5">
              {t("tickets")} →
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex size-11 cursor-pointer items-center justify-center border border-line text-cream transition-colors hover:border-acid hover:text-acid lg:hidden"
            aria-label="Menü öffnen"
          >
            <Menu size={22} />
          </button>
        </Container>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
