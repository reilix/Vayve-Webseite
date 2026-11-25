"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navLinks, siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "@/components/brand/Logo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.35, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[70] flex flex-col bg-background"
        >
          <div className="absolute inset-0 bg-grid opacity-70" />
          <div className="relative flex h-16 items-center justify-between border-b border-line px-4">
            <Logo className="h-8" />
            <button
              onClick={onClose}
              className="inline-flex size-11 cursor-pointer items-center justify-center border border-line text-cream hover:border-acid hover:text-acid"
              aria-label="Menü schließen"
            >
              <X size={22} />
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col justify-center px-4">
            {navLinks.map((link, i) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.04 }}
                  className="border-b border-line"
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-baseline gap-4 py-3.5 font-display text-[2.4rem] leading-none transition-colors",
                      active ? "text-acid" : "text-cream hover:text-acid",
                    )}
                  >
                    <span className="label-mono text-cream/40">0{i + 1}</span>
                    {t(link.key)}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          <div className="relative space-y-5 border-t border-line p-4">
            <Link href="/tickets" onClick={onClose} className="btn-hard btn-acid w-full">
              {t("tickets")} →
            </Link>
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <div className="label-mono flex gap-4">
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-acid">
                  IG ↗
                </a>
                <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" className="text-cream/70 hover:text-acid">
                  YT ↗
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
