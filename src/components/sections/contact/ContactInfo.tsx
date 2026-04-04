"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Clock, Globe, Link2, Music2 } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import ScrollReveal from "@/components/animation/ScrollReveal";

export default function ContactInfo() {
  const t = useTranslations("contact.info");

  return (
    <ScrollReveal direction="right">
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-heading font-bold text-dark mb-6">
            {t("title")}
          </h3>

          <div className="space-y-4">
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-[12px] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-muted font-heading uppercase tracking-wider">
                  {t("email_label")}
                </p>
                <p className="text-dark font-medium">{siteConfig.email}</p>
              </div>
            </a>

            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-4 group"
            >
              <div className="w-10 h-10 rounded-[12px] bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-muted font-heading uppercase tracking-wider">
                  {t("phone_label")}
                </p>
                <p className="text-dark font-medium">{siteConfig.phone}</p>
              </div>
            </a>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-[12px] bg-primary/5 flex items-center justify-center text-primary">
                <Clock size={18} />
              </div>
              <p className="text-sm text-muted">{t("response_time")}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted font-heading uppercase tracking-wider mb-3">
            {t("social_label")}
          </p>
          <div className="flex gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[12px] bg-dark/5 text-muted hover:bg-primary hover:text-white transition-all cursor-pointer"
              aria-label="Instagram"
            >
              <Globe size={20} />
            </a>
            <a
              href={siteConfig.social.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[12px] bg-dark/5 text-muted hover:bg-primary hover:text-white transition-all cursor-pointer"
              aria-label="TikTok"
            >
              <Music2 size={20} />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-[12px] bg-dark/5 text-muted hover:bg-primary hover:text-white transition-all cursor-pointer"
              aria-label="LinkedIn"
            >
              <Link2 size={20} />
            </a>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
