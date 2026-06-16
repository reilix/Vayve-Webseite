import { cn } from "@/lib/utils";

/**
 * VAYVE-Wordmark (SVG, magenta auf transparent). Höhe über className steuern
 * (z. B. "h-8 md:h-10"), Breite passt sich automatisch an.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/vayve-logo.svg"
      alt="VAYVE"
      className={cn("h-7 w-auto select-none", className)}
    />
  );
}
