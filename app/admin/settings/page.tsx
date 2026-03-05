import { PanelCard } from "@/components/dashboard/shared";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-4">
      <PanelCard className="p-5">
        <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
          Admin Settings
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Basic configuration placeholders for platform policy and branding.
        </p>
      </PanelCard>

      <div className="grid gap-4 lg:grid-cols-2">
        <PanelCard className="p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Community Identity
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Configure community name, logo, and visual identity.
          </p>
        </PanelCard>

        <PanelCard className="p-5">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Moderation Defaults
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Configure default report SLA, escalation rules, and auto actions.
          </p>
        </PanelCard>
      </div>
    </div>
  );
}
