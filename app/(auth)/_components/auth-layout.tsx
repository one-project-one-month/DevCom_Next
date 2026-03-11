import type { ReactNode } from "react";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerPrompt?: string;
  footerLinkLabel?: string;
  footerHref?: string;
};

export function AuthLayout({
  title,
  subtitle,
  children,
  footerPrompt,
  footerLinkLabel,
  footerHref,
}: AuthLayoutProps) {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_20%_18%,rgba(56,189,248,0.12),transparent_35%),radial-gradient(circle_at_80%_82%,rgba(99,102,241,0.12),transparent_38%)]" />
      <main className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 text-slate-900 dark:text-slate-100">
        <section className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-[700px] overflow-hidden rounded-[30px] border border-white/60 bg-white/40 shadow-[0_40px_90px_rgba(15,23,42,0.2)] backdrop-blur-3xl supports-[backdrop-filter]:bg-white/30 dark:border-slate-600/50 dark:bg-slate-900/35 dark:supports-[backdrop-filter]:bg-slate-900/25">
          <div className="h-1.5 bg-linear-to-r from-cyan-400 via-blue-500 to-indigo-500" />
          <div className="relative p-7 sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/25 to-transparent dark:from-white/6" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:border-slate-600/60 dark:bg-slate-900/60 dark:text-slate-300">
                Secure Access
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                {title}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300 sm:text-lg">{subtitle}</p>
              <div className="mt-7 min-h-[360px]">{children}</div>
              {footerPrompt && footerLinkLabel && footerHref ? (
                <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
                  {footerPrompt}{" "}
                  <Link
                    href={footerHref}
                    className="font-semibold text-blue-700 hover:underline dark:text-cyan-300"
                  >
                    {footerLinkLabel}
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </BackgroundBeamsWithCollision>
  );
}
