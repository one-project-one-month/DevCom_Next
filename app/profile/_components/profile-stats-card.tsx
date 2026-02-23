import type { ProfileOverview } from "@/app/profile/_types";
import { PanelCard } from "@/components/dashboard/shared";

export function ProfileStatsCard({ profile }: { profile: ProfileOverview }) {
  return (
    <PanelCard className="p-4">
      <div className="grid grid-cols-2 gap-3 text-center md:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.threadsOpened}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Threads Opened</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.acceptedAnswers}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Accepted Answers</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.guidesPublished}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Guides Published</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.totalSaves}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Total Saves</p>
        </div>
      </div>
    </PanelCard>
  );
}
