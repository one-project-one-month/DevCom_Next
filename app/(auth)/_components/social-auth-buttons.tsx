"use client";

import { useState } from "react";
import { Github, LoaderCircle } from "lucide-react";

import { startOAuthLogin } from "@/lib/auth/client";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path d="M21.35 12.24c0-.78-.07-1.53-.2-2.24H12v4.25h5.24a4.5 4.5 0 0 1-1.95 2.95v2.44h3.15c1.84-1.69 2.91-4.18 2.91-7.4Z" fill="#4285F4" />
      <path d="M12 21.5c2.63 0 4.83-.87 6.44-2.36l-3.15-2.44c-.87.58-1.99.92-3.29.92-2.53 0-4.67-1.71-5.43-4H3.3v2.52A9.73 9.73 0 0 0 12 21.5Z" fill="#34A853" />
      <path d="M6.57 13.62A5.86 5.86 0 0 1 6.26 12c0-.56.1-1.11.31-1.62V7.86H3.3a9.72 9.72 0 0 0 0 8.28l3.27-2.52Z" fill="#FBBC05" />
      <path d="M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79A9.3 9.3 0 0 0 12 2.5 9.73 9.73 0 0 0 3.3 7.86l3.27 2.52c.76-2.29 2.9-4 5.43-4Z" fill="#EA4335" />
    </svg>
  );
}

type SocialAuthButtonsProps = {
  mode: "login" | "register";
};

export function SocialAuthButtons({ mode }: SocialAuthButtonsProps) {
  const [providerLoading, setProviderLoading] = useState<"google" | "github" | null>(null);
  const [error, setError] = useState("");

  function handleProvider(provider: "google" | "github") {
    setError("");
    setProviderLoading(provider);
    const result = startOAuthLogin(provider, "/");
    if (!result.ok) {
      setProviderLoading(null);
      setError(result.error ?? "Provider login failed.");
    }
  }

  const label = mode === "login" ? "Continue with" : "Sign up with";

  return (
    <div className="space-y-2">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleProvider("google")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {providerLoading === "google" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <GoogleMark />}
          {label} Google
        </button>
        <button
          type="button"
          onClick={() => handleProvider("github")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          {providerLoading === "github" ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Github className="h-4 w-4" />}
          {label} GitHub
        </button>
      </div>
      {error ? <p className="text-xs text-red-600 dark:text-red-300">{error}</p> : null}
    </div>
  );
}
