import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { exploreSections } from "@/app/explore/_data/explore.mock";

export function ExplorePageView() {
  return (
    <DashboardShell>
      <div className="space-y-4 pb-8">
        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Explore</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Discover useful engineering discussions, guides, and solutions.
          </p>
        </PanelCard>

        {exploreSections.map((section) => (
          <PanelCard key={section.id} className="p-5">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{section.description}</p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700 dark:text-slate-300">
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </PanelCard>
        ))}
      </div>
    </DashboardShell>
  );
}
