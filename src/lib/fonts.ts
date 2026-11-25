import { Archivo, Space_Grotesk, Space_Mono } from "next/font/google";

/**
 * Display — Archivo mit Breiten-Achse. In Extended (font-stretch 125 %) und
 * Black wirkt sie wie die Typo auf 90s-Rave-Flyern.
 */
export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  axes: ["wdth"],
  display: "swap",
});

/** Body / UI — technische Grotesk */
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "700"],
  display: "swap",
});

/** Labels, Ticker, Metadaten — Retro-Monospace */
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-spacemono",
  weight: ["400", "700"],
  display: "swap",
});
