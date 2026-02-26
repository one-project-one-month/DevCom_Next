import type { ReactNode } from "react";
import Link from "next/link";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerPrompt: string;
  footerLinkLabel: string;
  footerHref: string;
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
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_20%,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_85%_82%,rgba(59,130,246,0.14),transparent_34%)]" />
      <main className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 text-slate-900 dark:text-slate-100">
        <section className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-[520px] overflow-hidden rounded-3xl border border-white/45 bg-white/35 shadow-[0_24px_60px_rgba(15,23,42,0.24)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/30 dark:border-slate-600/55 dark:bg-slate-900/35 dark:supports-[backdrop-filter]:bg-slate-900/30">
          <div className="h-1.5 bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-500" />
          <div className="relative p-5 sm:p-6">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/28 to-transparent dark:from-white/6" />
            <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">{title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
            <div className="mt-5">{children}</div>
            <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
              {footerPrompt}{" "}
              <Link href={footerHref} className="font-semibold text-blue-700 hover:underline dark:text-cyan-300">
                {footerLinkLabel}
              </Link>
            </p>
            </div>
          </div>
        </section>
      </main>
    </BackgroundBeamsWithCollision>
  );
}
