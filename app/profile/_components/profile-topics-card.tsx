import type { TopicStat } from "@/app/profile/_types";
import { PanelCard } from "@/components/dashboard/shared";

export function ProfileTopicsCard({ topics }: { topics: TopicStat[] }) {
  return (
    <PanelCard className="p-4">
      <h2 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Top Topics</h2>
      <div className="grid gap-2 sm:grid-cols-3">
        {topics.map((topic) => (
          <div
            key={topic.topic}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">#{topic.topic}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{topic.count} contributions</p>
          </div>
        ))}
      </div>
    </PanelCard>
  );
}
