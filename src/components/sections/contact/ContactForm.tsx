"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2 } from "lucide-react";
import {
  submitContactAction,
  type ContactState,
} from "@/app/[locale]/kontakt/actions";

const field =
  "w-full rounded-[14px] bg-[#1a0f33] border border-white/10 px-4 py-3 text-cream placeholder:text-muted/50 outline-none focus:border-primary transition-colors";
const label = "block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5";

export default function ContactForm() {
  const t = useTranslations("contact.form");
  const [state, formAction, pending] = useActionState<ContactState, FormData>(
    submitContactAction,
    {},
  );

  if (state.ok) {
    return (
      <div className="rounded-[22px] border border-mint/30 bg-mint/10 px-6 py-12 text-center">
        <CheckCircle2 className="mx-auto mb-4 size-12 text-mint" />
        <h3 className="font-display text-2xl font-extrabold text-cream">
          {t("successTitle")}
        </h3>
        <p className="mt-2 text-cream/70">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <p className="rounded-[14px] border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
          {t("error")}
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="name">{t("name")}</label>
          <input id="name" name="name" required className={field} />
        </div>
        <div>
          <label className={label} htmlFor="email">{t("email")}</label>
          <input id="email" name="email" type="email" required className={field} />
        </div>
      </div>
      <div>
        <label className={label} htmlFor="subject">{t("subject")}</label>
        <input id="subject" name="subject" className={field} />
      </div>
      <div>
        <label className={label} htmlFor="message">{t("message")}</label>
        <textarea id="message" name="message" rows={5} required className={field} />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-primary px-7 py-3.5 font-display font-bold text-white hover:shadow-[var(--shadow-glow-pink)] disabled:opacity-50 transition-all cursor-pointer"
      >
        {pending ? t("sending") : t("send")}
      </button>
    </form>
  );
}
