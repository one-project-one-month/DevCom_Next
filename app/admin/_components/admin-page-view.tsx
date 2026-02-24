"use client";

import { useState } from "react";

import { adminPanels } from "@/app/admin/_data/admin.mock";
import type { AdminPanelKey } from "@/app/admin/_types";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";

export function AdminPageView() {
  const [activePanel, setActivePanel] = useState<AdminPanelKey>("overview");
  const active = adminPanels.find((panel) => panel.key === activePanel) ?? adminPanels[0];

  return (
    <DashboardShell>
      <div className="grid gap-4 pb-8 lg:grid-cols-[220px_minmax(0,1fr)]">
        <PanelCard className="h-fit p-3">
          <p className="px-2 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Admin Panel
          </p>
          <nav className="space-y-1">
            {adminPanels.map((panel) => (
              <button
                key={panel.key}
                type="button"
                onClick={() => setActivePanel(panel.key)}
                className={cn(
                  "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                  panel.key === activePanel
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
                )}
              >
                {panel.label}
              </button>
            ))}
          </nav>
        </PanelCard>

        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{active.label}</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{active.description}</p>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Route-local admin module is ready for table integration, moderation actions, and access guard.
          </div>
        </PanelCard>
      </div>
    </DashboardShell>
  );
}
