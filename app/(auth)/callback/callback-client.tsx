"use client";

import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthLayout } from "@/app/(auth)/_components/auth-layout";
import { apiFetch } from "@/lib/api/fetcher";
import type { MeResponse } from "@/lib/auth/types";
import { useAuthStore } from "@/store/auth-store";

export function OAuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const oauthError = searchParams.get("error");
    if (oauthError) {
      setError("Social login was canceled or failed.");
      return;
    }

    async function finalizeAuth(): Promise<void> {
      try {
        const me = await apiFetch<MeResponse>("/api/auth/me");
        useAuthStore.getState().setUser(me.user);
        console.log("OAuth user:", me.user);
        router.replace("/");
      } catch {
        setError("Could not complete social login.");
      }
    }

    void finalizeAuth();
  }, [router, searchParams]);

  return (
    <AuthLayout
      title="Signing you in"
      subtitle="Finalizing your social login and redirecting to the app."
      footerPrompt="Need another try?"
      footerLinkLabel="Back to login"
      footerHref="/login"
    >
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-300">{error}</p>
        ) : (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin text-cyan-500" />
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Please wait...
            </p>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
