"use client";

import { useState } from "react";
import { LoaderCircle } from "lucide-react";

import { useOAuthStartMutation } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        d="M21.35 12.24c0-.78-.07-1.53-.2-2.24H12v4.25h5.24a4.5 4.5 0 0 1-1.95 2.95v2.44h3.15c1.84-1.69 2.91-4.18 2.91-7.4Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.5c2.63 0 4.83-.87 6.44-2.36l-3.15-2.44c-.87.58-1.99.92-3.29.92-2.53 0-4.67-1.71-5.43-4H3.3v2.52A9.73 9.73 0 0 0 12 21.5Z"
        fill="#34A853"
      />
      <path
        d="M6.57 13.62A5.86 5.86 0 0 1 6.26 12c0-.56.1-1.11.31-1.62V7.86H3.3a9.72 9.72 0 0 0 0 8.28l3.27-2.52Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6.38c1.43 0 2.71.49 3.72 1.46l2.79-2.79A9.3 9.3 0 0 0 12 2.5 9.73 9.73 0 0 0 3.3 7.86l3.27 2.52c.76-2.29 2.9-4 5.43-4Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.25a9.75 9.75 0 0 0-3.08 19c.49.09.68-.21.68-.48l-.01-1.68c-2.77.6-3.36-1.18-3.36-1.18-.45-1.14-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.88 1.52 2.31 1.08 2.87.83.09-.65.34-1.08.62-1.33-2.21-.25-4.54-1.11-4.54-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.56 4.93.35.3.66.9.66 1.82l-.01 2.7c0 .27.18.58.69.48A9.75 9.75 0 0 0 12 2.25Z"
      />
    </svg>
  );
}

export function SocialAuthButtons() {
  const [providerLoading, setProviderLoading] = useState<
    "google" | "github" | null
  >(null);
  const [error, setError] = useState("");
  const oauthMutation = useOAuthStartMutation();
  const { toast } = useToast();

  async function handleProvider(provider: "google" | "github") {
    setError("");
    setProviderLoading(provider);
    try {
      await oauthMutation.mutateAsync(provider);
    } catch (mutationError) {
      setProviderLoading(null);
      const message =
        mutationError instanceof Error
          ? mutationError.message
          : "Provider login failed.";
      setError(message);
      toast({
        title: "Social login failed",
        description: message,
        variant: "destructive",
      });
    }
  }

  const label = "Continue with";

  return (
    <div className="space-y-2">
      <div className=" flex flex-col  gap-4 ">
        <button
          type="button"
          onClick={() => void handleProvider("google")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-semibold text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg transition hover:-translate-y-0.5 hover:bg-white/90 dark:border-slate-600/60 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:bg-slate-900/70"
        >
          {providerLoading === "google" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <GoogleMark />
          )}
          {label} Google
        </button>
        <button
          type="button"
          onClick={() => void handleProvider("github")}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/70 bg-white/70 p-4 text-sm font-semibold text-slate-700 shadow-[0_12px_24px_rgba(15,23,42,0.08)] backdrop-blur-lg transition hover:-translate-y-0.5 hover:bg-white/90 dark:border-slate-600/60 dark:bg-slate-950/50 dark:text-slate-200 dark:hover:bg-slate-900/70"
        >
          {providerLoading === "github" ? (
            <LoaderCircle className="h-4 w-4 animate-spin" />
          ) : (
            <GithubMark />
          )}
          {label} GitHub
        </button>
      </div>
      {error ? (
        <p className="text-xs text-red-600 dark:text-red-300">{error}</p>
      ) : null}
    </div>
  );
}
