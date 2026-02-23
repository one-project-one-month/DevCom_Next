"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { shortcuts } from "@/components/dashboard/data";
import { AvatarCircle, PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ProfileCard({ pathname }: { pathname: string }) {
  const isActive = isRouteActive(pathname, "/profile");

  return (
    <PanelCard className="overflow-hidden">
      <div className="h-20 bg-linear-to-r from-blue-500 to-indigo-500" />
      <div className="px-5 pb-5">
        <AvatarCircle className="-mt-8 mb-3 h-16 w-16 border-4 border-white dark:border-slate-900" />
        <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">H.Hlaing Swan</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">@hhlaing.swan</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">128</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Threads</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">884</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Helpful</p>
          </div>
        </div>
        <Link
          href="/profile"
          className={cn(
            "mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition",
            isActive
              ? "bg-blue-700 text-white"
              : "bg-blue-600 text-white hover:bg-blue-700",
          )}
        >
          View Profile
        </Link>
      </div>
    </PanelCard>
  );
}

function ShortcutsCard({ pathname }: { pathname: string }) {
  return (
    <PanelCard className="p-4">
      <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">Shortcuts</p>
      <ul className="space-y-1">
        {shortcuts.map((item) => {
          const isActive = isRouteActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                  isActive
                    ? "bg-blue-600 text-white dark:bg-blue-600 dark:text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </PanelCard>
  );
}

export function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="space-y-5">
      <ProfileCard pathname={pathname} />
      <ShortcutsCard pathname={pathname} />
    </aside>
  );
}
