"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { EventRecord } from "@/lib/db/events";
import { SERIES, TICKET_STATUSES, seriesLabel, ticketStatusLabel } from "@/lib/labels";
import { toDatetimeLocalValue } from "@/lib/datetime";

type ActionState = { error?: string };
type Action = (prev: ActionState, formData: FormData) => Promise<ActionState>;

const field =
  "w-full rounded-[14px] bg-[#160c2c] border border-white/10 px-4 py-2.5 text-cream placeholder:text-muted/50 outline-none focus:border-primary transition-colors";
const label = "block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5";

export default function EventForm({
  action,
  event,
  submitLabel,
}: {
  action: Action;
  event?: EventRecord;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    action,
    {},
  );

  return (
    <form action={formAction} className="space-y-8">
      {event && <input type="hidden" name="id" value={event.id} />}

      {state.error && (
        <p className="rounded-[14px] border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
          {state.error}
        </p>
      )}

      {/* Basis */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-bold text-cream mb-2">
          Basis
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="title">Titel *</label>
            <input id="title" name="title" required defaultValue={event?.title}
              className={field} placeholder="Vayve:Air" />
          </div>
          <div>
            <label className={label} htmlFor="slug">Slug (optional)</label>
            <input id="slug" name="slug" defaultValue={event?.slug}
              className={field} placeholder="wird aus Titel erzeugt" />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={label} htmlFor="series">Reihe</label>
            <select id="series" name="series" defaultValue={event?.series ?? "other"} className={field}>
              {SERIES.map((s) => (
                <option key={s} value={s}>{seriesLabel(s)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="status">Status</label>
            <select id="status" name="status" defaultValue={event?.status ?? "draft"} className={field}>
              <option value="draft">Entwurf</option>
              <option value="published">Veröffentlicht</option>
            </select>
          </div>
          <div className="flex items-end pb-1">
            <label className="flex items-center gap-2 text-sm text-cream cursor-pointer">
              <input type="checkbox" name="featured" defaultChecked={event?.featured === 1}
                className="size-4 accent-pink-500" />
              Als Highlight zeigen
            </label>
          </div>
        </div>
      </fieldset>

      {/* Zeit & Ort */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-bold text-cream mb-2">
          Zeit &amp; Ort
        </legend>
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={label} htmlFor="starts_at">Beginn *</label>
            <input id="starts_at" name="starts_at" type="datetime-local" required
              defaultValue={toDatetimeLocalValue(event?.starts_at)} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="ends_at">Ende (optional)</label>
            <input id="ends_at" name="ends_at" type="datetime-local"
              defaultValue={toDatetimeLocalValue(event?.ends_at)} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="doors">Einlass (Text)</label>
            <input id="doors" name="doors" defaultValue={event?.doors ?? ""}
              className={field} placeholder="16:00" />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={label} htmlFor="location_name">Location *</label>
            <input id="location_name" name="location_name" required
              defaultValue={event?.location_name} className={field} placeholder="Thomas Read" />
          </div>
          <div>
            <label className={label} htmlFor="city">Stadt</label>
            <input id="city" name="city" defaultValue={event?.city ?? ""}
              className={field} placeholder="Bonn" />
          </div>
          <div>
            <label className={label} htmlFor="location_address">Adresse (optional)</label>
            <input id="location_address" name="location_address"
              defaultValue={event?.location_address ?? ""} className={field} />
          </div>
        </div>
      </fieldset>

      {/* Inhalt */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-bold text-cream mb-2">
          Inhalt
        </legend>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="genres">Genres</label>
            <input id="genres" name="genres" defaultValue={event?.genres ?? ""}
              className={field} placeholder="Hard House · Trance · Bounce" />
          </div>
          <div>
            <label className={label} htmlFor="lineup">Line-up</label>
            <input id="lineup" name="lineup" defaultValue={event?.lineup ?? ""}
              className={field} placeholder="DJ A, DJ B, DJ C" />
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="description_de">Beschreibung (DE)</label>
            <textarea id="description_de" name="description_de" rows={5}
              defaultValue={event?.description_de ?? ""} className={field} />
          </div>
          <div>
            <label className={label} htmlFor="description_en">Beschreibung (EN)</label>
            <textarea id="description_en" name="description_en" rows={5}
              defaultValue={event?.description_en ?? ""} className={field} />
          </div>
        </div>
      </fieldset>

      {/* Bild */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-bold text-cream mb-2">
          Cover-Bild
        </legend>
        {event?.cover_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.cover_image} alt="" className="h-40 w-auto rounded-[14px] border border-white/10 object-cover" />
        )}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className={label} htmlFor="cover_file">Datei hochladen</label>
            <input id="cover_file" name="cover_file" type="file" accept="image/*"
              className="block w-full text-sm text-muted file:mr-3 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white file:cursor-pointer" />
          </div>
          <div>
            <label className={label} htmlFor="cover_image_url">…oder Bild-URL</label>
            <input id="cover_image_url" name="cover_image_url"
              defaultValue={event?.cover_image?.startsWith("/uploads/") ? "" : event?.cover_image ?? ""}
              className={field} placeholder="https://…" />
          </div>
        </div>
      </fieldset>

      {/* Tickets */}
      <fieldset className="space-y-5">
        <legend className="font-display text-lg font-bold text-cream mb-2">
          Tickets
        </legend>
        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className={label} htmlFor="ticket_status">Ticket-Status</label>
            <select id="ticket_status" name="ticket_status"
              defaultValue={event?.ticket_status ?? "soon"} className={field}>
              {TICKET_STATUSES.map((s) => (
                <option key={s} value={s}>{ticketStatusLabel(s)}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={label} htmlFor="ticket_url">Ticket-URL</label>
            <input id="ticket_url" name="ticket_url" defaultValue={event?.ticket_url ?? ""}
              className={field} placeholder="https://shop.weeztix.com/…" />
          </div>
          <div>
            <label className={label} htmlFor="price_info">Preis-Info</label>
            <input id="price_info" name="price_info" defaultValue={event?.price_info ?? ""}
              className={field} placeholder="ab 15 € / Kostenlos" />
          </div>
        </div>
      </fieldset>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={pending}
          className="rounded-full bg-primary px-6 py-3 font-display font-bold text-white hover:bg-primary-dark disabled:opacity-50 transition-colors cursor-pointer">
          {pending ? "Speichern…" : submitLabel}
        </button>
        <Link href="/admin" className="rounded-full px-6 py-3 font-display font-semibold text-muted hover:text-cream transition-colors">
          Abbrechen
        </Link>
      </div>
    </form>
  );
}
