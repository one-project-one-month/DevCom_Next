import type { ReactNode } from "react";
import Link from "next/link";

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-100 px-4 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-cyan-200/60 blur-3xl dark:bg-cyan-500/10" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-blue-200/70 blur-3xl dark:bg-blue-500/10" />
      <section className="animate-in fade-in zoom-in-95 duration-500 w-full max-w-[520px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_14px_36px_rgba(15,23,42,0.08)] dark:border-slate-700 dark:bg-slate-900">
        <div className="h-1.5 bg-linear-to-r from-cyan-500 via-blue-600 to-indigo-500" />
        <div className="p-5 sm:p-6">
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
      </section>
    </main>
  );
}
