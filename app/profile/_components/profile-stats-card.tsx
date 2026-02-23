import type { ProfileOverview } from "@/app/profile/_types";
import { PanelCard } from "@/components/dashboard/shared";

export function ProfileStatsCard({ profile }: { profile: ProfileOverview }) {
  return (
    <PanelCard className="p-4">
      <div className="grid grid-cols-2 gap-3 text-center md:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.threads}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Threads</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.helpful}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Helpful</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.replies}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Replies</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{profile.stats.topTopics}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Top Topics</p>
        </div>
      </div>
    </PanelCard>
  );
}
