import { LoginForm } from "@/app/(auth)/_components/login-form";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function LoginPage() {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen bg-linear-to-br from-slate-50 via-white to-sky-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_15%_20%,rgba(14,165,233,0.18),transparent_40%),radial-gradient(circle_at_85%_78%,rgba(99,102,241,0.16),transparent_42%)]" />
      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-12 text-slate-900 dark:text-slate-100">
        <div className="grid w-full items-stretch gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="flex h-full flex-col justify-center gap-6 animate-in fade-in duration-700">
            <span className="w-fit rounded-full border border-slate-200/70 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.32em] text-slate-500 shadow-sm backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/60 dark:text-slate-300">
              Social Dev Community
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                Build, share, and learn with developers you trust.
              </h1>
              <p className="max-w-xl text-base text-slate-600 dark:text-slate-300 sm:text-lg">
                A focused home for dev discussions, curated knowledge, and open
                collaboration.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/60">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Ship smarter
                </p>
                <p className="mt-2">
                  Get concise threads and real-world fixes.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/60">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Stay aligned
                </p>
                <p className="mt-2">
                  Follow communities and save key insights.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-lg dark:border-slate-700/60 dark:bg-slate-900/60">
                <p className="font-semibold text-slate-800 dark:text-slate-100">
                  Grow fast
                </p>
                <p className="mt-2">
                  Learn from peers with similar tech stacks.
                </p>
              </div>
            </div>
          </section>

          <section className="flex h-full items-stretch animate-in fade-in duration-700">
            <LoginForm />
          </section>
        </div>
      </main>
    </BackgroundBeamsWithCollision>
  );
}
