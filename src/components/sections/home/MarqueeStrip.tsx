import InfiniteMarquee from "@/components/animation/InfiniteMarquee";

const WORDS =
  "GOOD VIBE RAVES ✺ VAYVE:AIR ✺ VAYVE:RUN ✺ HARD HOUSE ✺ TRANCE ✺ BOUNCE ✺ HOUSE ✺";

export default function MarqueeStrip() {
  return (
    <div className="relative border-y border-white/10 bg-primary py-4 md:py-5">
      <InfiniteMarquee
        text={WORDS}
        speed={30}
        textClassName="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white"
      />
    </div>
  );
}
