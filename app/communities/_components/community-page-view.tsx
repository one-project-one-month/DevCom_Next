"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { communityUsers } from "@/app/communities/_data/community.mock";
import type { CommunityUser } from "@/app/communities/_types/community.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";

function RoleBadge({ role }: { role: string }) {
  const styles = {
    admin: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
    moderator: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    user: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  };

  const style = styles[role as keyof typeof styles] || styles.user;

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        style
      )}
    >
      {role}
    </span>
  );
}

function UserCard({ user }: { user: CommunityUser }) {
  const handle = user.name.toLowerCase().replace(/\s+/g, "");
  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/profile/${handle}`}>
      <PanelCard className="p-5 transition hover:border-blue-300 dark:hover:border-blue-600">
        <div className="flex items-start gap-4">
          <Avatar size="lg">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                {user.name}
              </h3>
              <RoleBadge role={user.role} />
            </div>
            <p className="truncate text-sm text-slate-500 dark:text-slate-400">
              {user.email}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-700">
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {user.totalThreads}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Threads</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {user.totalLikes}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Likes</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {joinDate}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Joined</p>
          </div>
        </div>
      </PanelCard>
    </Link>
  );
}

export function CommunitiesPageView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [localQuery, setLocalQuery] = useState("");

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredUsers = useMemo(() => {
    if (!normalizedQuery) {
      return communityUsers;
    }

    return communityUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(normalizedQuery) ||
        user.email.toLowerCase().includes(normalizedQuery) ||
        user.role.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  function handleSearch() {
    setSearchQuery(localQuery);
  }

  function handleClearSearch() {
    setLocalQuery("");
    setSearchQuery("");
  }

  return (
    <DashboardShell>
      <div className="space-y-4 pb-8">
        <div className="sticky top-0 z-20 pb-2">
          <PanelCard className="border-slate-200/80 bg-white/85 p-4 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Community Members
            </h1>
            <p className="mt-1 mb-4 text-sm text-slate-600 dark:text-slate-300">
              Browse and discover community members.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex min-w-55 flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
                <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                <input
                  value={localQuery}
                  onChange={(e) => setLocalQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                  className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
                  placeholder="Search by name, email, or role..."
                  aria-label="Search users"
                />
                {localQuery ? (
                  <button
                    onClick={handleClearSearch}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                ) : null}
              </div>
              <button
                onClick={handleSearch}
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Search
              </button>
            </div>
          </PanelCard>
        </div>

        {searchQuery.trim() ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredUsers.length} members for &quot;{searchQuery.trim()}&quot;
          </p>
        ) : null}

        {filteredUsers.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <PanelCard className="py-16 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No users found matching "{searchQuery}".
            </p>
          </PanelCard>
        )}
      </div>
    </DashboardShell>
  );
}
