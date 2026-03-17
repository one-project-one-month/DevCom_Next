import { PanelCard } from "@/components/dashboard/shared";

type ProfileStats = {
  threads: number;
  helpful: number;
  replies: number;
  topTopics: number;
};

export function ProfileStatsCard({ stats }: { stats?: ProfileStats }) {
  const safe = stats ?? { threads: 0, helpful: 0, replies: 0, topTopics: 0 };

  return (
    <PanelCard className="p-4">
      <div className="grid grid-cols-2 gap-3 text-center md:grid-cols-4">
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{safe.threads}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Threads</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{safe.helpful}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Helpful</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{safe.replies}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Replies</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{safe.topTopics}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">Top Topics</p>
        </div>
      </div>
    </PanelCard>
  );
}
