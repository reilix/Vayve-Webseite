import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import EventForm from "@/components/admin/EventForm";
import { getById } from "@/lib/db/events";
import { updateEventAction } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = getById(id);
  if (!event) notFound();

  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-8 font-display text-3xl font-extrabold tracking-tight text-cream">
          Event bearbeiten
        </h1>
        <EventForm action={updateEventAction} event={event} submitLabel="Änderungen speichern" />
      </main>
    </>
  );
}
