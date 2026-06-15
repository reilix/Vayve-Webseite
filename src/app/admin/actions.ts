"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createSession,
  destroySession,
  isAuthenticated,
  verifyPassword,
} from "@/lib/auth";
import {
  createEvent,
  deleteEvent,
  ensureUniqueSlug,
  getById,
  updateEvent,
  type EventInput,
  type EventSeries,
  type EventStatus,
  type TicketStatus,
} from "@/lib/db/events";
import { saveUpload, deleteUpload, UploadError } from "@/lib/uploads";
import { fromDatetimeLocalValue } from "@/lib/datetime";
import { SERIES, TICKET_STATUSES } from "@/lib/labels";

type ActionState = { error?: string };

// === Auth ===

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "");
  if (!(await verifyPassword(password))) {
    return { error: "Falsches Passwort." };
  }
  await createSession();
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

// === Helpers ===

async function requireAuth() {
  if (!(await isAuthenticated())) {
    throw new Error("Unauthorized");
  }
}

function str(formData: FormData, key: string): string | null {
  const v = formData.get(key);
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t === "" ? null : t;
}

function pick<T extends string>(value: string | null, allowed: T[], fallback: T): T {
  return value && (allowed as string[]).includes(value) ? (value as T) : fallback;
}

async function buildInput(
  formData: FormData,
  existing?: { cover_image: string | null },
): Promise<EventInput> {
  const title = str(formData, "title") ?? "Unbenanntes Event";
  const startsLocal = str(formData, "starts_at");
  const endsLocal = str(formData, "ends_at");

  // Cover: Upload > URL > Bestand
  let cover_image: string | null = existing?.cover_image ?? null;
  const file = formData.get("cover_file");
  const coverUrl = str(formData, "cover_image_url");
  if (file instanceof File && file.size > 0) {
    cover_image = await saveUpload(file);
    if (existing?.cover_image && existing.cover_image.startsWith("/uploads/")) {
      await deleteUpload(existing.cover_image);
    }
  } else if (coverUrl !== null) {
    cover_image = coverUrl;
  }

  return {
    slug: title, // wird vom Aufrufer durch ensureUniqueSlug ersetzt
    title,
    series: pick<EventSeries>(str(formData, "series"), SERIES, "other"),
    starts_at: startsLocal
      ? fromDatetimeLocalValue(startsLocal)
      : new Date().toISOString(),
    ends_at: endsLocal ? fromDatetimeLocalValue(endsLocal) : null,
    doors: str(formData, "doors"),
    location_name: str(formData, "location_name") ?? "",
    location_address: str(formData, "location_address"),
    city: str(formData, "city") ?? "",
    lineup: str(formData, "lineup"),
    genres: str(formData, "genres"),
    description_de: str(formData, "description_de"),
    description_en: str(formData, "description_en"),
    cover_image,
    gallery: null,
    ticket_url: str(formData, "ticket_url"),
    ticket_status: pick<TicketStatus>(
      str(formData, "ticket_status"),
      TICKET_STATUSES,
      "soon",
    ),
    price_info: str(formData, "price_info"),
    status: pick<EventStatus>(str(formData, "status"), ["draft", "published"], "draft"),
    featured: formData.get("featured") === "on",
  };
}

function revalidatePublic() {
  revalidatePath("/", "layout");
}

// === Event CRUD ===

export async function createEventAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  try {
    const input = await buildInput(formData);
    const slugOverride = str(formData, "slug");
    input.slug = ensureUniqueSlug(slugOverride ?? input.title);
    createEvent(input);
  } catch (e) {
    if (e instanceof UploadError) return { error: e.message };
    throw e;
  }
  revalidatePublic();
  redirect("/admin");
}

export async function updateEventAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  const existing = getById(id);
  if (!existing) return { error: "Event nicht gefunden." };
  try {
    const input = await buildInput(formData, existing);
    const slugOverride = str(formData, "slug");
    input.slug = ensureUniqueSlug(slugOverride ?? input.title, id);
    updateEvent(id, input);
  } catch (e) {
    if (e instanceof UploadError) return { error: e.message };
    throw e;
  }
  revalidatePublic();
  redirect("/admin");
}

export async function deleteEventAction(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  const existing = getById(id);
  if (existing?.cover_image) await deleteUpload(existing.cover_image);
  deleteEvent(id);
  revalidatePublic();
  revalidatePath("/admin");
}

export async function togglePublishAction(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  const ev = getById(id);
  if (!ev) return;
  updateEvent(id, {
    ...ev,
    featured: ev.featured === 1,
    status: ev.status === "published" ? "draft" : "published",
  });
  revalidatePublic();
  revalidatePath("/admin");
}

export async function toggleFeatureAction(formData: FormData): Promise<void> {
  await requireAuth();
  const id = String(formData.get("id") ?? "");
  const ev = getById(id);
  if (!ev) return;
  updateEvent(id, { ...ev, featured: ev.featured !== 1 });
  revalidatePublic();
  revalidatePath("/admin");
}
