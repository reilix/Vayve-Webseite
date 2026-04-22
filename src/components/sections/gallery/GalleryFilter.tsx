"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface GalleryFilterProps {
  active: string;
  onChange: (filter: string) => void;
}

const filters = ["all", "festivals", "silent_disco", "beach", "corporate", "weddings"];

export default function GalleryFilter({ active, onChange }: GalleryFilterProps) {
  const t = useTranslations("gallery.filters");

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={cn(
            "px-4 py-2 rounded-[9999px] text-sm font-heading font-semibold transition-all duration-200 cursor-pointer",
            active === filter
              ? "bg-primary text-white"
              : "bg-dark/5 text-muted hover:bg-dark/10 hover:text-dark"
          )}
        >
          {t(filter)}
        </button>
      ))}
    </div>
  );
}
