"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { AuthLayout } from "@/app/(auth)/_components/auth-layout";

export function OAuthCallbackClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oauthError = searchParams.get("error");
  const redirectTo = searchParams.get("next") || "/";

  if (!oauthError) {
    router.replace(redirectTo);
  }

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
