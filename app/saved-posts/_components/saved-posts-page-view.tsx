import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { savedPostsSections } from "@/app/saved-posts/_data/saved-posts.mock";

export function SavedPostsPageView() {
  return (
    <DashboardShell>
      <div className="space-y-4 pb-8">
        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Saved Posts</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Revisit and manage bookmarked threads.
          </p>
        </PanelCard>

        {savedPostsSections.map((section) => (
          <PanelCard key={section.id} className="p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {section.items.map((item) => (
                <li key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {item}
                </li>
              ))}
            </ul>
          </PanelCard>
        ))}
      </div>
    </DashboardShell>
  );
}
