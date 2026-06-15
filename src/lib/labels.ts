import type { EventSeries, TicketStatus } from "./db/events";

export const SERIES: EventSeries[] = [
  "good_vibe_rave",
  "vayve_run",
  "vayve_air",
  "other",
];

export const TICKET_STATUSES: TicketStatus[] = [
  "on_sale",
  "soon",
  "sold_out",
  "free",
];

const SERIES_LABEL: Record<EventSeries, { de: string; en: string }> = {
  good_vibe_rave: { de: "Good Vibe Rave", en: "Good Vibe Rave" },
  vayve_run: { de: "Vayve:Run", en: "Vayve:Run" },
  vayve_air: { de: "Vayve:Air", en: "Vayve:Air" },
  other: { de: "Event", en: "Event" },
};

const TICKET_LABEL: Record<TicketStatus, { de: string; en: string }> = {
  on_sale: { de: "Tickets sichern", en: "Get tickets" },
  soon: { de: "Bald verfügbar", en: "Coming soon" },
  sold_out: { de: "Ausverkauft", en: "Sold out" },
  free: { de: "Kostenlos", en: "Free entry" },
};

export function seriesLabel(series: string, locale = "de"): string {
  const e = SERIES_LABEL[series as EventSeries] ?? SERIES_LABEL.other;
  return locale === "en" ? e.en : e.de;
}

export function ticketStatusLabel(status: string, locale = "de"): string {
  const e = TICKET_LABEL[status as TicketStatus] ?? TICKET_LABEL.soon;
  return locale === "en" ? e.en : e.de;
}
