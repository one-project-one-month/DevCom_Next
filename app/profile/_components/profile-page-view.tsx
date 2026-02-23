import { profilePageMock } from "@/app/profile/_data/profile.mock";
import { ProfileContributionsCard } from "@/app/profile/_components/profile-contributions-card";
import { ProfileHeaderCard } from "@/app/profile/_components/profile-header-card";
import { ProfileStatsCard } from "@/app/profile/_components/profile-stats-card";
import { ProfileTopicsCard } from "@/app/profile/_components/profile-topics-card";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export function ProfilePageView() {
  return (
    <DashboardShell>
      <div className="space-y-5 pb-8">
        <ProfileHeaderCard profile={profilePageMock.profile} />
        <ProfileStatsCard profile={profilePageMock.profile} />
        <ProfileContributionsCard contributions={profilePageMock.contributions} />
        <ProfileTopicsCard topics={profilePageMock.topTopics} />
      </div>
    </DashboardShell>
  );
}
