import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { ProfileOverview } from "@/app/profile/_types";
import { PanelCard } from "@/components/dashboard/shared";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ProfileHeaderCard({ profile }: { profile: ProfileOverview }) {
  return (
    <PanelCard className="overflow-hidden">
      <div className="h-28 bg-linear-to-r from-blue-500 to-cyan-500" />
      <div className="px-5 pb-5">
        <div className="-mt-12 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={`${profile.name} avatar`}
                width={80}
                height={80}
                className="h-20 w-20 rounded-full border-4 border-white object-cover dark:border-slate-900"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-xl font-bold text-white dark:border-slate-900">
                {initialsFromName(profile.name)}
              </div>
            )}

            <div className="pt-6">
              <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {profile.name}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {profile.handle}
              </p>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                {profile.role}
              </p>
            </div>
          </div>

          {profile.isOwnProfile ? (
            <Link
              href="/settings"
              className="mt-2 inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Edit Profile
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <span className="mt-2 inline-flex rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              Public Profile
            </span>
          )}
        </div>

        <p className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <MapPin className="h-3.5 w-3.5" />
          {profile.location}
        </p>

        <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
          {profile.bio || "No bio added yet."}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {profile.expertise.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </PanelCard>
  );
}
