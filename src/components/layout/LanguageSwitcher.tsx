"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  }

  return (
    <div
      className={cn(
        "flex items-center rounded-[9999px] p-0.5 text-sm font-heading font-semibold",
        light ? "bg-white/10" : "bg-dark/5"
      )}
    >
      <button
        onClick={() => switchLocale("de")}
        className={cn(
          "px-3 py-1 rounded-[9999px] transition-all duration-200 cursor-pointer",
          locale === "de"
            ? "bg-primary text-white"
            : light
              ? "text-white/60 hover:text-white"
              : "text-muted hover:text-dark"
        )}
      >
        DE
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "px-3 py-1 rounded-[9999px] transition-all duration-200 cursor-pointer",
          locale === "en"
            ? "bg-primary text-white"
            : light
              ? "text-white/60 hover:text-white"
              : "text-muted hover:text-dark"
        )}
      >
        EN
      </button>
    </div>
  );
}
