"use server";

import { createSubmission } from "@/lib/db/submissions";

export type ContactState = { ok?: boolean; error?: boolean };

export async function submitContactAction(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message || !email.includes("@")) {
    return { error: true };
  }

  try {
    createSubmission({
      name,
      email,
      subject: subject || null,
      message,
    });
  } catch {
    return { error: true };
  }
  return { ok: true };
}
