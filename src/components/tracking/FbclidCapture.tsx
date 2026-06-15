"use client";

import { useEffect } from "react";

/**
 * Speichert die fbclid aus der Landing-URL (z. B. von einer Meta-Anzeige), damit
 * sie auch nach Navigation noch verfügbar ist und an den Weeztix-iframe übergeben
 * werden kann. Läuft einmal beim ersten Laden.
 */
export default function FbclidCapture() {
  useEffect(() => {
    try {
      const fbclid = new URLSearchParams(window.location.search).get("fbclid");
      if (fbclid) localStorage.setItem("vayve_fbclid", fbclid);
    } catch {
      /* ignore */
    }
  }, []);
  return null;
}
