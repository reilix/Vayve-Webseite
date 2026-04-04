import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vayve — Events, die bewegen.",
    template: "%s | Vayve",
  },
  description:
    "Vayve kreiert unvergessliche Event-Erlebnisse — von Sunrise Silent Discos bis hin zu maßgeschneiderten Hochzeiten und Corporate Events.",
  keywords: [
    "Eventagentur",
    "Silent Disco",
    "Sunrise Disco",
    "Eventplanung",
    "Hochzeiten",
    "Corporate Events",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${spaceGrotesk.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
