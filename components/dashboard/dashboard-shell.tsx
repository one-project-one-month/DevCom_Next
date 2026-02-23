"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { X } from "lucide-react";

import { LeftSidebar } from "@/components/dashboard/left-sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
  rightSidebar?: ReactNode;
  contentClassName?: string;
};

export function DashboardShell({
  children,
  rightSidebar,
  contentClassName,
}: DashboardShellProps) {
  const hasRightSidebar = Boolean(rightSidebar);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const toggleMobileSidebar = () => setIsMobileSidebarOpen((prev) => !prev);

  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full">
        <TopNavbar
          onToggleSidebar={toggleMobileSidebar}
          isSidebarOpen={isMobileSidebarOpen}
        />
        <div className="h-18 sm:h-20" />
        <section
          className={cn(
            "mx-auto grid h-[calc(100vh-80px)] w-full max-w-365 gap-3 px-3 sm:gap-4 sm:px-4 max-[980px]:h-auto max-[980px]:grid-cols-1",
            hasRightSidebar
              ? "justify-center grid-cols-[250px_minmax(0,1fr)_270px] xl:grid-cols-[270px_minmax(0,780px)_290px]"
              : "justify-center grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[270px_minmax(0,860px)]",
          )}
        >
          <div className="sticky top-0 h-fit self-start max-[980px]:hidden">
            <LeftSidebar />
          </div>

          <div
            className={cn(
              "scrollbar-hidden h-full overflow-y-auto ",
              contentClassName,
            )}
          >
            {children}
          </div>

          {hasRightSidebar ? (
            <div className="scrollbar-hidden h-full overflow-y-auto max-[980px]:hidden">
              {rightSidebar}
            </div>
          ) : null}
        </section>

        <div
          className={cn(
            "fixed inset-0 z-60 min-[981px]:hidden transition-opacity duration-300 ease-out",
            isMobileSidebarOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          )}
        >
          <button
            className={cn(
              "absolute inset-0 bg-slate-950/45 backdrop-blur-[1px] transition-opacity duration-300",
              isMobileSidebarOpen ? "opacity-100" : "opacity-0",
            )}
            aria-label="Close sidebar overlay"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside
            id="mobile-left-sidebar"
            className={cn(
              "absolute left-0 top-0 h-full w-[86vw] max-w-90 overflow-y-auto border-r border-slate-200 bg-white p-3 shadow-2xl transition-transform duration-300 ease-out dark:border-slate-700 dark:bg-slate-900",
              isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full",
            )}
          >
            <div className="mb-3 flex items-center justify-between px-1">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Navigation
              </p>
              <button
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                aria-label="Close sidebar"
                onClick={() => setIsMobileSidebarOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <LeftSidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
