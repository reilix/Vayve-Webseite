import { db } from "./index";

export function createSubmission(input: {
  name: string;
  email: string;
  subject: string | null;
  message: string;
}): void {
  db.prepare(
    `INSERT INTO submissions (id, name, email, subject, message, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(
    crypto.randomUUID(),
    input.name,
    input.email,
    input.subject,
    input.message,
    new Date().toISOString(),
  );
}
