"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import CornerMarks from "@/components/retro/CornerMarks";

export type PlayerSet = {
  id: string;
  title: string;
  /** bereits formatiertes Datum, z. B. "15.11.26" */
  date: string;
  thumb: string;
  thumbLarge: string;
};

type Labels = {
  play: string;
  nowPlaying: string;
  queue: string;
  consent: string;
};

/**
 * „Deck“ mit großem Monitor und Warteschlange. Bis jemand auf Play drückt,
 * zeigt der Monitor nur das Vorschaubild (über die eigene Domain geladen);
 * erst dann wird der YouTube-Player (youtube-nocookie) eingebunden.
 */
export default function SetPlayer({ sets, labels }: { sets: PlayerSet[]; labels: Labels }) {
  const [activeId, setActiveId] = useState(sets[0]?.id);
  const [playing, setPlaying] = useState(false);
  const active = sets.find((s) => s.id === activeId) ?? sets[0];
  if (!active) return null;

  const activeIndex = sets.indexOf(active);

  function select(id: string) {
    setActiveId(id);
    setPlaying(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      {/* Monitor */}
      <div className="min-w-0 lg:col-span-8">
        <div className="border border-line bg-surface">
          <div className="label-mono flex items-center justify-between gap-3 border-b border-line px-3 py-2.5 text-cream/60">
            <span className="flex min-w-0 items-center gap-2">
              <span
                className={cn(
                  "inline-block size-2 shrink-0 rounded-full",
                  playing ? "animate-blink bg-primary" : "bg-cream/30",
                )}
              />
              <span className="shrink-0">CH-{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="truncate text-cream">
                {playing ? `${labels.nowPlaying}: ` : ""}
                {active.title}
              </span>
            </span>
            <span className="shrink-0">{active.date}</span>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-base">
            {playing ? (
              <iframe
                key={active.id}
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                title={active.title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute inset-0 size-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="scanlines group absolute inset-0 cursor-pointer"
                aria-label={`${labels.play}: ${active.title}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={active.thumbLarge}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover opacity-80 transition-[opacity,transform] duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <CornerMarks className="m-4" />
                <span className="absolute inset-0 z-10 flex items-center justify-center">
                  <span className="btn-hard btn-acid pointer-events-none">▶ {labels.play}</span>
                </span>
                <span className="absolute inset-x-0 bottom-0 z-10 p-4 text-left md:p-6">
                  <span className="block font-display text-[clamp(1.4rem,3.4vw,2.6rem)] leading-[0.95] text-cream">
                    {active.title}
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
        <p className="label-mono mt-3 text-cream/40">{labels.consent}</p>
      </div>

      {/* Warteschlange */}
      <div className="min-w-0 lg:col-span-4">
        <p className="label-mono mb-3 text-cream/50">▸ {labels.queue}</p>
        <ol className="max-h-[34rem] divide-y divide-line overflow-y-auto border border-line">
          {sets.map((s, i) => {
            const isActive = s.id === active.id;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => select(s.id)}
                  className={cn(
                    "group flex w-full cursor-pointer items-center gap-3 p-3 text-left transition-colors",
                    isActive ? "bg-acid text-ink" : "bg-surface hover:bg-surface-2",
                  )}
                >
                  <span className={cn("label-mono w-7 shrink-0", isActive ? "text-ink" : "text-cream/40")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative aspect-video w-24 shrink-0 overflow-hidden bg-base">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.thumb} alt="" loading="lazy" className="size-full object-cover" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold">{s.title}</span>
                    <span className={cn("label-mono mt-1 block", isActive ? "text-ink/70" : "text-cream/45")}>
                      {isActive && playing ? `▶ ${labels.nowPlaying}` : s.date}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
