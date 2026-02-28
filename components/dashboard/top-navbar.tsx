"use client";

import { useEffect, useState } from "react";
import { Home, LayoutGrid, Menu, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { IconButton, PanelCard } from "@/components/dashboard/shared";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { cn } from "@/lib/utils";

type TopNavbarProps = {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
};

export function TopNavbar({
  onToggleSidebar,
  isSidebarOpen = false,
}: TopNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 sm:bg-transparent sm:backdrop-blur-0",
        isScrolled
          ? "bg-white/45 backdrop-blur-2xl dark:bg-slate-950/45"
          : "bg-transparent backdrop-blur-0",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-10 bg-linear-to-b from-white/35 to-transparent transition-all duration-300 dark:from-slate-950/35 sm:hidden",
          isScrolled ? "opacity-100" : "opacity-0",
        )}
      />
      <div
        className={cn(
          "mx-auto w-full max-w-[1460px] transition-all duration-300 ease-out",
          isScrolled ? "px-2 pt-2 sm:px-3 sm:pt-2" : "px-0 pt-0",
        )}
      >
        <PanelCard
          className={cn(
            "flex flex-wrap items-center justify-between gap-2.5 px-3 lg:px-10 py-2.5 transition-all duration-300 ease-out sm:px-4 sm:py-2.5 lg:gap-4",
            isScrolled
              ? "rounded-2xl border-slate-200/70 bg-white/70 shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-slate-700/70 dark:bg-slate-900/65"
              : "rounded-none border-x-0 border-t-0 border-b border-slate-200/80 bg-white/95 shadow-none dark:border-slate-800/80 dark:bg-slate-950/95",
          )}
        >
          <div className="flex shrink-0 items-center gap-2">
            <IconButton
              className={cn(
                "inline-flex transition-transform duration-200 active:scale-95 max-[980px]:inline-flex min-[981px]:hidden",
                isSidebarOpen
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : "",
              )}
              onClick={onToggleSidebar}
              aria-label={
                isSidebarOpen ? "Close sidebar menu" : "Open sidebar menu"
              }
              aria-expanded={isSidebarOpen}
              aria-controls="mobile-left-sidebar"
            >
              <span className="relative block h-4 w-4">
                <Menu
                  className={cn(
                    "absolute inset-0 h-4 w-4 transition-all duration-300 ease-out",
                    isSidebarOpen
                      ? "rotate-90 scale-75 opacity-0"
                      : "rotate-0 scale-100 opacity-100",
                  )}
                />
                <X
                  className={cn(
                    "absolute inset-0 h-4 w-4 transition-all duration-300 ease-out",
                    isSidebarOpen
                      ? "rotate-0 scale-100 opacity-100"
                      : "-rotate-90 scale-75 opacity-0",
                  )}
                />
              </span>
            </IconButton>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              DevLoop
            </p>
          </div>

          <nav className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 md:order-3 lg:ml-0">
            <IconButton
              className="hidden sm:inline-flex"
              onClick={() => router.push("/admin")}
            >
              <LayoutGrid className="h-4 w-4" />
            </IconButton>
            <IconButton
              onClick={() => router.push("/")}
              aria-label="Go to feed"
            >
              <Home className="h-4 w-4" />
            </IconButton>

            <AnimatedThemeToggler className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100" />
          </nav>
        </PanelCard>
      </div>
    </div>
  );
}
