import type { Metadata } from "next";
import { syne, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vayve.de"),
  title: {
    default: "VAYVE — Good Vibe Raves",
    template: "%s | VAYVE",
  },
  description:
    "VAYVE — Good Vibe Raves. Elektronische Musik, beste Stimmung, gute Leute. Open Airs, Raves und mehr.",
  keywords: [
    "VAYVE",
    "Good Vibe Raves",
    "Rave",
    "Open Air",
    "elektronische Musik",
    "Vayve:Air",
    "Vayve:Run",
  ],
  openGraph: {
    title: "VAYVE — Good Vibe Raves",
    description: "Elektronische Musik, beste Stimmung, gute Leute.",
    url: "https://vayve.de",
    siteName: "VAYVE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${syne.variable} ${inter.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
