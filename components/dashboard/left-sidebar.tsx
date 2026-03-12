"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Home, Settings, UserRoundSearch } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { AvatarCircle, PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth-store";
import type { AuthUser } from "@/lib/auth/types";
import type { ShortcutItem } from "@/components/dashboard/types";
import { apiFetch } from "@/lib/api/fetcher";

const shortcuts: ShortcutItem[] = [
  { label: "Feed", icon: Home, href: "/" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function ProfileCard({
  pathname,
  user,
  isLoading,
}: {
  pathname: string;
  user: AuthUser | null;
  isLoading: boolean;
}) {
  const isActive = isRouteActive(pathname, "/profile");
  const displayName = user?.name ?? "Anonymous User";
  const profileBgColor = user?.profileBgColor;
  const statsQuery = useQuery<{
    user: { id: string };
    stats: { threads: number; helpful: number };
  }>({
    queryKey: ["me-with-stats", user?.id],
    queryFn: () =>
      apiFetch<{
        user: { id: string };
        stats: { threads: number; helpful: number };
      }>("/api/users/me"),
    enabled: Boolean(user?.id),
    staleTime: 60_000,
  });
  const threads = statsQuery.data?.stats.threads ?? 0;
  const helpful = statsQuery.data?.stats.helpful ?? 0;

  const handle =
    statsQuery.data?.user && "handle" in statsQuery.data.user
      ? (statsQuery.data.user as { handle: string }).handle
      : "";

  return (
    <PanelCard className="overflow-hidden">
      <div
        className="h-16 sm:h-20"
        style={{
          background:
            profileBgColor ?? "linear-gradient(90deg,#3b82f6,#6366f1)",
        }}
      />
      <div className="px-4 pb-4 sm:px-5 sm:pb-5">
        <AvatarCircle
          className="-mt-7 mb-1 h-22 w-22 border-4 border-white dark:border-slate-900 sm:-mt-8 sm:h-16 sm:w-16"
          imageUrl={user?.avatarUrl}
          name={displayName}
        />
        {isLoading ? (
          <div className="space-y-2">
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
            <div className="h-3 w-24 animate-pulse rounded bg-slate-200 dark:bg-slate-700" />
          </div>
        ) : (
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {displayName}
          </h2>
        )}
        {handle && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {handle.startsWith("@") ? handle : `@${handle}`}
          </p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-3 text-center">
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {statsQuery.isLoading ? "—" : threads}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Threads
            </p>
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
              {statsQuery.isLoading ? "—" : helpful}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Helpful
            </p>
          </div>
        </div>
        <Link
          href="/profile"
          className={cn(
            "mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition sm:py-2.5",
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

function PublicProfileContextCard({ pathname }: { pathname: string }) {
  const viewedHandle = pathname.split("/")[2];

  return (
    <PanelCard className="p-4">
      <p className="mb-2 inline-flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-slate-100">
        <UserRoundSearch className="h-4 w-4" />
        Viewing Public Profile
      </p>
      <p className="mb-3 text-sm text-slate-500 dark:text-slate-400">
        You are exploring @{viewedHandle}. This is a public profile view.
      </p>
      <div className="space-y-2">
        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Feed
        </Link>
        <Link
          href="/profile"
          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Go to My Profile
        </Link>
      </div>
    </PanelCard>
  );
}

function ShortcutsCard({ pathname }: { pathname: string }) {
  return (
    <PanelCard className="p-3 sm:p-4">
      <p className="mb-3 text-base font-semibold text-slate-900 dark:text-slate-100">
        Shortcuts
      </p>
      <ul className="grid grid-cols-2 gap-1 sm:grid-cols-1 sm:gap-1">
        {shortcuts.map((item) => {
          const isActive = isRouteActive(pathname, item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-base transition",
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
  const user = useAuthStore((state) => state.user);
  const isLoadingUser = user === null;
  const isPublicProfileRoute =
    pathname.startsWith("/profile/") && pathname !== "/profile";

  return (
    <aside className="space-y-3 sm:space-y-5">
      {isPublicProfileRoute ? (
        <PublicProfileContextCard pathname={pathname} />
      ) : (
        <ProfileCard
          pathname={pathname}
          user={user}
          isLoading={isLoadingUser}
        />
      )}
      <ShortcutsCard pathname={pathname} />
    </aside>
  );
}
