"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/constants";

const STORAGE_KEY = "vayve_fbclid";

/** Ermittelt die fbclid: aktuelle URL → gespeichert → Meta `_fbc`-Cookie. */
function resolveFbclid(): string | null {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("fbclid");
    if (fromUrl) {
      localStorage.setItem(STORAGE_KEY, fromUrl);
      return fromUrl;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    // _fbc-Cookie hat das Format fb.<subdomainIndex>.<timestamp>.<fbclid>
    const m = document.cookie.match(/_fbc=fb\.\d+\.\d+\.([^;]+)/);
    if (m) return decodeURIComponent(m[1]);
  } catch {
    /* SSR / kein window */
  }
  return null;
}

function buildSrc(base: string): string {
  try {
    const url = new URL(base);
    const fbclid = resolveFbclid();
    if (fbclid) url.searchParams.set("fbclid", fbclid);
    return url.toString();
  } catch {
    return base;
  }
}

export default function WeeztixEmbed({ url }: { url?: string }) {
  const base = url ?? siteConfig.ticketUrl;
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    setSrc(buildSrc(base));
  }, [base]);

  return (
    <div className="w-full">
      {src ? (
        <iframe
          src={src}
          title="VAYVE Tickets — Weeztix"
          className="w-full h-[calc(100vh-7rem)] min-h-[640px] rounded-[18px] border border-white/10 bg-white"
          loading="lazy"
          allow="payment"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="h-[640px] animate-pulse rounded-[18px] border border-white/10 bg-[#1a0f33]" />
      )}
      {src && (
        <p className="mt-4 text-center text-sm text-muted">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mint hover:text-cream transition-colors"
          >
            ↗ Weeztix
          </a>
        </p>
      )}
    </div>
  );
}
