import { CenterFeed } from "@/components/dashboard/center-feed";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { RightSidebar } from "@/components/dashboard/right-sidebar";

export function DashboardPage() {
  return (
    <DashboardShell rightSidebar={<RightSidebar />}>
      <CenterFeed />
    </DashboardShell>
  );
}
