"use client";

import { useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { AuthLayout } from "@/app/(auth)/_components/auth-layout";
import { apiFetch } from "@/lib/api/fetcher";
import type { MeResponse } from "@/lib/auth/types";
import { useAuthStore } from "@/store/auth-store";

export function OAuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");

  const authQuery = useQuery({
    queryKey: ["auth", "oauth-callback"],
    queryFn: () => apiFetch<MeResponse>("/api/auth/me"),
    enabled: !oauthError,
    retry: false,
  });

  useEffect(() => {
    if (authQuery.data?.user) {
      useAuthStore.getState().setUser(authQuery.data.user);
      console.log("OAuth user:", authQuery.data.user);
      router.replace("/");
    }
  }, [authQuery.data?.user, router]);

  return (
    <AuthLayout
      title="Signing you in"
      subtitle="Finalizing your social login and redirecting to the app."
      footerPrompt="Need another try?"
      footerLinkLabel="Back to login"
      footerHref="/login"
    >
      <div className="flex flex-col items-center justify-center gap-3 py-6">
        {oauthError ? (
          <p className="text-sm text-red-600 dark:text-red-300">
            Social login was canceled or failed.
          </p>
        ) : authQuery.isError ? (
          <p className="text-sm text-red-600 dark:text-red-300">
            Could not complete social login.
          </p>
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
