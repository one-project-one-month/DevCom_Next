import { shortcuts } from "@/components/dashboard/data";
import { AvatarCircle, PanelCard } from "@/components/dashboard/shared";

function ProfileCard() {
  return (
    <PanelCard className="overflow-hidden">
      <div className="h-20 bg-linear-to-r from-blue-500 to-indigo-500" />
      <div className="px-5 pb-5">
        <AvatarCircle className="-mt-8 mb-3 h-16 w-16 border-4 border-white dark:border-slate-900" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">H.Hlaing Swan</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">@hhlaing.swan</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">128</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Posts</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">3.4k</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Followers</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">542</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Following</p>
          </div>
        </div>
        <button className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
          View Profile
        </button>
      </div>
    </PanelCard>
  );
}

function ShortcutsCard() {
  return (
    <PanelCard className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Shortcuts</p>
      <ul className="space-y-1">
        {shortcuts.map((item) => (
          <li key={item.label}>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

export function LeftSidebar() {
  return (
    <aside className="space-y-5">
      <ProfileCard />
      <ShortcutsCard />
    </aside>
  );
}
