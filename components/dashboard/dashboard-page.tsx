import { CenterFeed } from "@/components/dashboard/center-feed";
import { LeftSidebar } from "@/components/dashboard/left-sidebar";
import { RightSidebar } from "@/components/dashboard/right-sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";

export function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#f3f5f9] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto w-full">
        <TopNavbar />
        <section className="grid h-[calc(100vh-136px)] px-6 grid-cols-[280px_minmax(0,1fr)_290px] gap-6">
          <div className="sticky top-0 h-fit self-start">
            <LeftSidebar />
          </div>
          <div className="scrollbar-hidden h-full overflow-y-auto pr-1">
            <CenterFeed />
          </div>
          <div className="scrollbar-hidden h-full overflow-y-auto pr-1">
            <RightSidebar />
          </div>
        </section>
      </div>
    </main>
  );
}
