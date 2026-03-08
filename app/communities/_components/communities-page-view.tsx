"use client";

import Link from "next/link";
import { type ComponentType } from "react";
import { CalendarDays, MessageSquareText, ThumbsUp, Users } from "lucide-react";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { communityUsers } from "@/app/communities/_data/community.mock";
import type { CommunityUser } from "@/app/communities/_types/community.types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";

function RoleBadge({ role }: { role: string }) {
  const styles = {
    admin: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300",
    moderator: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    user: "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300",
  };

  const style = styles[role as keyof typeof styles] || styles.user;

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize",
        style,
      )}
    >
      {role}
    </span>
  );
}

function StatCell({ label, value, icon: Icon }: { label: string; value: string | number; icon: ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-xl border border-slate-200/80 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/70">
      <div className="mb-1 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
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
      <PanelCard className="p-0 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md dark:hover:border-sky-700">
        <div className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            <Avatar size="lg" className="size-12">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-slate-100">
                {user.name}
              </h3>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
              <RoleBadge role={user.role} />
            </div>
          </div>

          <div className="mt-4 border-t border-slate-200/80 pt-4 dark:border-slate-700">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <StatCell label="Threads" value={user.totalThreads} icon={MessageSquareText} />
              <StatCell label="Likes" value={user.totalLikes} icon={ThumbsUp} />
              <div className="sm:col-span-2">
                <StatCell label="Joined" value={joinDate} icon={CalendarDays} />
              </div>
            </div>
          </div>
        </div>
      </PanelCard>
    </Link>
  );
}

export function CommunitiesPageView() {
  return (
    <DashboardShell>
      <div className="space-y-4 pb-8">
        <PanelCard className="overflow-hidden border-slate-200/80 bg-white/85 p-0 dark:border-slate-700/80 dark:bg-slate-900/80">
          <div className="bg-linear-to-r from-sky-500/15 via-blue-500/10 to-emerald-500/10 px-5 py-6 dark:from-sky-500/20 dark:via-blue-500/15 dark:to-emerald-500/15 sm:px-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
              <Users className="h-3.5 w-3.5" />
              Community Directory
            </p>
            <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-100">Community Members</h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Connect with contributors and discover who is active across the platform.
            </p>
          </div>
          <div className="border-t border-slate-200/80 px-5 py-3 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-300 sm:px-6">
            Showing <span className="font-semibold text-slate-900 dark:text-slate-100">{communityUsers.length}</span> members
          </div>
        </PanelCard>

        {communityUsers.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {communityUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <PanelCard className="py-16 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400">No community members available.</p>
          </PanelCard>
        )}
      </div>
    </DashboardShell>
  );
}
