"use client";

import { cn } from "@/lib/utils";

interface InfiniteMarqueeProps {
  text: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  textClassName?: string;
}

export default function InfiniteMarquee({
  text,
  speed = 25,
  direction = "left",
  className,
  textClassName,
}: InfiniteMarqueeProps) {
  const content = `${text} ${text} ${text} ${text} `;

  return (
    <div
      className={cn("overflow-hidden whitespace-nowrap", className)}
      aria-hidden="true"
    >
      <div
        className="inline-flex animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        <span className={cn("inline-block pr-8", textClassName)}>{content}</span>
        <span className={cn("inline-block pr-8", textClassName)}>{content}</span>
      </div>
    </div>
  );
}
