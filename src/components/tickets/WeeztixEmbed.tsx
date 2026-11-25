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

/** Nur Weeztix-URLs als Embed-Ziel zulassen. */
function safeWeeztixUrl(to: string | null | undefined): string | undefined {
  if (!to) return undefined;
  try {
    const u = new URL(to);
    return u.protocol === "https:" && u.hostname.endsWith("weeztix.com")
      ? to
      : undefined;
  } catch {
    return undefined;
  }
}

/**
 * @param url             fester Shop-Link (z. B. vom Event)
 * @param allowQueryOverride  `?to=<weeztix-url>` aus der Adresszeile übernehmen.
 *   Wird im Browser gelesen, damit die Ticket-Seite statisch bleibt.
 */
export default function WeeztixEmbed({
  url,
  allowQueryOverride = false,
}: {
  url?: string;
  allowQueryOverride?: boolean;
}) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let base = url ?? siteConfig.ticketUrl;
    if (allowQueryOverride) {
      const to = safeWeeztixUrl(new URLSearchParams(window.location.search).get("to"));
      if (to) base = to;
    }
    setSrc(buildSrc(base));
  }, [url, allowQueryOverride]);

  return (
    <div className="w-full">
      {src ? (
        <iframe
          src={src}
          title="VAYVE Tickets — Weeztix"
          className="w-full h-[calc(100vh-7rem)] min-h-[640px] border border-line bg-white"
          loading="lazy"
          allow="payment"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="h-[640px] animate-pulse border border-line bg-surface" />
      )}
      {src && (
        <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted">
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-acid hover:text-cream transition-colors"
          >
            ↗ Weeztix
          </a>
        </p>
      )}
    </div>
  );
}
