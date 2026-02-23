import { ProfileContributionsCard } from "@/app/profile/_components/profile-contributions-card";
import { ProfileHeaderCard } from "@/app/profile/_components/profile-header-card";
import { ProfileStatsCard } from "@/app/profile/_components/profile-stats-card";
import { ProfileTopicsCard } from "@/app/profile/_components/profile-topics-card";
import type { ProfilePageData } from "@/app/profile/_types";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export function ProfileLayoutView({ data }: { data: ProfilePageData }) {
  return (
    <DashboardShell>
      <div className="space-y-5 pb-8">
        <ProfileHeaderCard profile={data.profile} />
        <ProfileStatsCard profile={data.profile} />
        <ProfileContributionsCard contributions={data.contributions} />
        <ProfileTopicsCard topics={data.topTopics} />
      </div>
    </DashboardShell>
  );
}
