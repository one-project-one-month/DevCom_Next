import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { settingsSections } from "@/app/settings/_data/settings.mock";

export function SettingsPageView() {
  return (
    <DashboardShell>
      <div className="space-y-4 pb-8">
        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Manage your account, preferences, and notification behavior.
          </p>
        </PanelCard>

        <div className="grid gap-4 md:grid-cols-2">
          {settingsSections.map((section) => (
            <PanelCard key={section.id} className="p-5">
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">{section.title}</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {section.fields.map((field) => (
                  <li key={field} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                    {field}
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
