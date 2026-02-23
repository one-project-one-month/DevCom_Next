import type { ReactNode } from "react";

import { LeftSidebar } from "@/components/dashboard/left-sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { cn } from "@/lib/utils";

type DashboardShellProps = {
  children: ReactNode;
  rightSidebar?: ReactNode;
  contentClassName?: string;
};

export function DashboardShell({ children, rightSidebar, contentClassName }: DashboardShellProps) {
  const hasRightSidebar = Boolean(rightSidebar);

  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full">
        <TopNavbar />
        <section
          className={cn(
            "grid h-[calc(100vh-136px)] px-6 gap-6 max-lg:h-auto max-lg:grid-cols-1",
            hasRightSidebar
              ? "grid-cols-[280px_minmax(0,1fr)_290px]"
              : "grid-cols-[280px_minmax(0,1fr)]",
          )}
        >
          <div className="sticky top-0 h-fit self-start max-lg:static">
            <LeftSidebar />
          </div>

          <div className={cn("scrollbar-hidden h-full overflow-y-auto pr-1", contentClassName)}>{children}</div>

          {hasRightSidebar ? (
            <div className="scrollbar-hidden h-full overflow-y-auto pr-1">{rightSidebar}</div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
