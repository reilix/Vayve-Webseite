import Link from "next/link";
import { Star } from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import { listEvents } from "@/lib/db/events";
import { seriesLabel } from "@/lib/labels";
import { formatEventDate, isPast } from "@/lib/datetime";
import {
  deleteEventAction,
  togglePublishAction,
  toggleFeatureAction,
} from "./actions";

export const dynamic = "force-dynamic";

export default function AdminDashboard() {
  const events = listEvents();

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-cream">
              Events
            </h1>
            <p className="mt-1 text-sm text-muted">{events.length} Event(s) gesamt</p>
          </div>
          <Link
            href="/admin/events/new"
            className="rounded-full bg-primary px-5 py-2.5 font-display font-bold text-white hover:bg-primary-dark transition-colors"
          >
            + Neues Event
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="rounded-[18px] border border-white/10 bg-[#160c2c] px-6 py-12 text-center text-muted">
            Noch keine Events. Lege dein erstes Event an.
          </p>
        ) : (
          <div className="overflow-hidden rounded-[18px] border border-white/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#160c2c] text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Datum</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Aktionen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {events.map((ev) => (
                  <tr key={ev.id} className="bg-[#120826] hover:bg-[#160c2c] transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-cream">
                        {ev.title}
                        {ev.featured === 1 && (
                          <span className="ml-2 rounded-full bg-acid/20 px-2 py-0.5 text-[10px] font-bold uppercase text-acid">
                            Highlight
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-muted">
                        {seriesLabel(ev.series)} · {ev.city || "—"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {formatEventDate(ev.starts_at)}
                      {isPast(ev.starts_at) && (
                        <span className="ml-2 text-[10px] uppercase text-muted/60">vorbei</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <form action={togglePublishAction}>
                        <input type="hidden" name="id" value={ev.id} />
                        <button
                          className={
                            ev.status === "published"
                              ? "rounded-full bg-success/20 px-3 py-1 text-xs font-bold text-success cursor-pointer"
                              : "rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-muted cursor-pointer"
                          }
                        >
                          {ev.status === "published" ? "Live" : "Entwurf"}
                        </button>
                      </form>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <form action={toggleFeatureAction}>
                          <input type="hidden" name="id" value={ev.id} />
                          <button
                            title="Highlight umschalten"
                            aria-label="Highlight umschalten"
                            className={
                              "inline-flex size-8 items-center justify-center rounded-full border border-white/15 cursor-pointer hover:bg-white/5 " +
                              (ev.featured === 1 ? "text-acid" : "text-cream")
                            }
                          >
                            <Star size={14} fill={ev.featured === 1 ? "currentColor" : "none"} />
                          </button>
                        </form>
                        <Link
                          href={`/admin/events/${ev.id}/edit`}
                          className="rounded-full border border-white/15 px-3 py-1 text-xs text-cream hover:bg-white/5"
                        >
                          Bearbeiten
                        </Link>
                        <form action={deleteEventAction}>
                          <input type="hidden" name="id" value={ev.id} />
                          <button
                            className="rounded-full border border-error/40 px-3 py-1 text-xs text-error hover:bg-error/10 cursor-pointer"
                          >
                            Löschen
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
}
