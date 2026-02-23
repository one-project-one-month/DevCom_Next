import { DashboardShell } from "@/components/dashboard/dashboard-shell";

type RoutePlaceholderPageProps = {
  title: string;
  description: string;
  sections: {
    heading: string;
    items: string[];
  }[];
};

export function RoutePlaceholderPage({
  title,
  description,
  sections,
}: RoutePlaceholderPageProps) {
  return (
    <DashboardShell>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_10px_28px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900 dark:shadow-[0_10px_28px_rgba(2,6,23,0.45)]">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Welcome to {title}
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>

        <div className="mt-6 space-y-4">
          {sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
            >
              <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {section.heading}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700 dark:text-slate-300">
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
