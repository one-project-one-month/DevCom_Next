import { ProfileHeaderCard } from "@/app/profile/_components/profile-header-card";
import type { ProfilePageData } from "@/app/profile/_types";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";

export function ProfileLayoutView({ data }: { data: ProfilePageData }) {
  return (
    <DashboardShell narrowContent>
      <div className="space-y-5 pb-8">
        <ProfileHeaderCard profile={data.profile} />
        <PanelCard className="p-6 text-center">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Profile insights are coming soon
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Your stats, topics, and contributions will appear here once you start engaging.
          </p>
        </PanelCard>
      </div>
    </DashboardShell>
  );
}
