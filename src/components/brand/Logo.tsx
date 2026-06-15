import { cn } from "@/lib/utils";

/**
 * VAYVE-Wordmark. Fallback = Display-Font (Syne, extrabold).
 * Sobald die echten Bubble-Logos unter /public/logo/ liegen, kann hier ein
 * <Image src="/logo/vayve-wordmark.svg" /> eingesetzt werden.
 */
export default function Logo({
  className,
  tone = "pink",
}: {
  className?: string;
  tone?: "pink" | "cream" | "gradient";
}) {
  const toneClass =
    tone === "cream"
      ? "text-cream"
      : tone === "gradient"
        ? "text-gradient"
        : "text-primary";

  return (
    <span
      className={cn(
        "font-display font-extrabold tracking-[-0.04em] leading-none select-none",
        toneClass,
        className,
      )}
      aria-label="VAYVE"
    >
      VAYVE
    </span>
  );
}
