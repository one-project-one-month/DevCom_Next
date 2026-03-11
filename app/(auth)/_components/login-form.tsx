"use client";

import { SocialAuthButtons } from "@/app/(auth)/_components/social-auth-buttons";

export function LoginForm() {
  return (
    <div className="flex h-full w-full flex-col justify-around rounded-[28px] border border-white/60 bg-white/55 p-8 shadow-[0_24px_70px_rgba(15,23,42,0.16)] backdrop-blur-2xl dark:border-slate-700/50 dark:bg-slate-900/55">
      <div className="space-y-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-300">
          Secure access
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Fast, secure, and password-free.
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          We only read your public profile and email.
        </p>
      </div>
      <div>
        <SocialAuthButtons />
      </div>
    </div>
  );
}
