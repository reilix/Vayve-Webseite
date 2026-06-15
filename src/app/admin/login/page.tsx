"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, {});

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl font-extrabold tracking-tight text-cream">
            VAYVE <span className="text-primary">Admin</span>
          </p>
          <p className="mt-2 text-sm text-muted">Bitte einloggen, um Events zu verwalten.</p>
        </div>
        <form action={formAction} className="space-y-4">
          {state.error && (
            <p className="rounded-[14px] border border-error/40 bg-error/10 px-4 py-3 text-sm text-error">
              {state.error}
            </p>
          )}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-muted mb-1.5">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              required
              className="w-full rounded-[14px] bg-[#160c2c] border border-white/10 px-4 py-3 text-cream outline-none focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-primary px-6 py-3 font-display font-bold text-white hover:bg-primary-dark disabled:opacity-50 transition-colors cursor-pointer"
          >
            {pending ? "…" : "Einloggen"}
          </button>
        </form>
      </div>
    </main>
  );
}
