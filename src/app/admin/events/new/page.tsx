import AdminHeader from "@/components/admin/AdminHeader";
import EventForm from "@/components/admin/EventForm";
import { createEventAction } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewEventPage() {
  return (
    <>
      <AdminHeader />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-8 font-display text-3xl font-extrabold tracking-tight text-cream">
          Neues Event
        </h1>
        <EventForm action={createEventAction} submitLabel="Event anlegen" />
      </main>
    </>
  );
}
