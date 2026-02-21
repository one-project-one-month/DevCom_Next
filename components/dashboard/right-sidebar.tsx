import { Link2, UserPlus } from "lucide-react";

import { activities, suggestions } from "@/components/dashboard/data";
import { AvatarCircle, PanelCard } from "@/components/dashboard/shared";

function ActivityCard() {
  return (
    <PanelCard className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
        Recent Activity
      </p>
      <ul className="space-y-3">
        {activities.map((item) => (
          <li
            key={`${item.user}-${item.time}`}
            className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-medium text-slate-900 dark:text-slate-100">{item.user}</span>{" "}
              {item.action}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{item.time}</p>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

function SuggestedUsersCard() {
  return (
    <PanelCard className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
        Suggested Users
      </p>
      <ul className="space-y-3">
        {suggestions.map((person) => (
          <li key={person.handle} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AvatarCircle className="h-9 w-9" />
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {person.name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{person.handle}</p>
              </div>
            </div>
            <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100">
              <UserPlus className="h-3.5 w-3.5" />
              Follow
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
      <p className="mb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">Quick Share</p>
      <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-blue-700">
        <Link2 className="h-4 w-4" />
        New Thread
      </button>
    </PanelCard>
  );
}

export function RightSidebar() {
  return (
    <aside className="space-y-5">
      <ActivityCard />
      <SuggestedUsersCard />
      <QuickShareCard />
    </aside>
  );
}
