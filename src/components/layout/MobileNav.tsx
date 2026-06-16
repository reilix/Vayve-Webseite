"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navLinks, siteConfig } from "@/lib/constants";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "@/components/brand/Logo";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const t = useTranslations("nav");

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-[82%] max-w-sm bg-[#160c2c] z-50 flex flex-col border-l border-white/10"
          >
            <div className="flex items-center justify-between p-6">
              <Logo className="h-7" />
              <button
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center text-cream/60 hover:text-cream transition-colors cursor-pointer"
                aria-label="Menü schließen"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col gap-1 px-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.key}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block py-3 font-display text-3xl font-extrabold text-cream hover:text-primary transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="px-6 pb-4">
              <Link
                href="/tickets"
                onClick={onClose}
                className="block rounded-full bg-primary px-6 py-3.5 text-center font-display font-bold text-white"
              >
                {t("tickets")}
              </Link>
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-between">
              <LanguageSwitcher />
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-mint hover:text-cream transition-colors"
              >
                Instagram ↗
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
