import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { communitiesSections } from "@/app/communities/_data/communities.mock";

export function CommunitiesPageView() {
  return (
    <DashboardShell>
      <div className="space-y-4 pb-8">
        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Communities</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Browse and join topic-focused developer communities.
          </p>
        </PanelCard>

        <div className="grid gap-4 md:grid-cols-2">
          {communitiesSections.map((section) => (
            <PanelCard key={section.id} className="p-5">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
              <ul className="mt-3 space-y-2">
                {section.details.map((detail) => (
                  <li key={detail} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {detail}
                  </li>
                ))}
              </ul>
            </PanelCard>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
