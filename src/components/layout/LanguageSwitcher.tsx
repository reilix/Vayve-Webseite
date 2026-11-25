"use client";

import { useLocale } from "next-intl";
import { useTransition } from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = useTransition();

  function switchLocale(next: "de" | "en") {
    if (next === locale) return;
    startTransition(() => {
      // pathname + params gehören zur Laufzeit zusammen (next-intl Locale-Switch-Pattern)
      // @ts-expect-error -- params werden korrekt durchgereicht
      router.replace({ pathname, params }, { locale: next });
    });
  }

  return (
    <div
      className={cn(
        "label-mono flex items-center border border-line",
        pending && "opacity-60",
      )}
    >
      {(["de", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={cn(
            "cursor-pointer px-2.5 py-1.5 uppercase transition-colors duration-150",
            locale === l ? "bg-cream text-ink" : "text-cream/60 hover:text-cream",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
