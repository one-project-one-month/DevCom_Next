import { Activity, ArrowUpRight, BookMarked } from "lucide-react";
import Link from "next/link";

import { activities, knowledgeTopics } from "@/components/dashboard/data";
import { PanelCard } from "@/components/dashboard/shared";

function ActivityCard() {
  return (
    <PanelCard className="p-4">
      <p className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">
        Knowledge Signals
      </p>
      <ul className="space-y-3">
        {activities.map((item) => (
          <li
            key={`${item.title}-${item.time}`}
            className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-base font-medium text-slate-900 dark:text-slate-100">
              {item.title}
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              {item.detail}
            </p>
            <p className="mt-2 text-sm text-emerald-700 dark:text-emerald-300">
              {item.impact}
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              <Activity className="mr-1 inline h-3.5 w-3.5" />
              {item.time}
            </p>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

function TrendingTopicsCard() {
  return (
    <PanelCard className="p-4">
      <p className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">
        Trending Topics
      </p>
      <ul className="space-y-2">
        {knowledgeTopics.map((topic) => (
          <li key={topic.label}>
            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-left text-base transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800">
              <span className="text-slate-700 dark:text-slate-200">
                #{topic.label}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {topic.threads} threads
              </span>
            </button>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

function QuickShareCard() {
  return (
    <PanelCard className="p-4">
      <p className="mb-1 text-base font-semibold text-slate-900 dark:text-slate-100">
        Contribution Sprint
      </p>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
        Improve one existing thread with a runnable fix or measurable result.
      </p>
      <Link
        href="/create-post"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        <BookMarked className="h-4 w-4" />
        Add Solution Note
      </Link>
      <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
        <ArrowUpRight className="h-4 w-4" />
        Open Knowledge Board
      </button>
    </PanelCard>
  );
}

export function RightSidebar() {
  return (
    <aside className="space-y-5">
      <ActivityCard />
      <TrendingTopicsCard />
      <QuickShareCard />
    </aside>
  );
}
