import { Syne, Inter } from "next/font/google";

/** Display / Headlines — charaktervolle Grotesk, passt zur Bubble-Brand */
export const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["600", "700", "800"],
  display: "swap",
});

/** Body / UI */
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
