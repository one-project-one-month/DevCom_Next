import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

import type { ProfileOverview } from "@/app/profile/_types";
import { PanelCard } from "@/components/dashboard/shared";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function getLargeAvatarUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "lh3.googleusercontent.com") {
      parsed.searchParams.set("s", "512");
      parsed.searchParams.set("sz", "512");
      return parsed.toString();
    }
    if (parsed.hostname === "avatars.githubusercontent.com") {
      parsed.searchParams.set("s", "512");
      return parsed.toString();
    }
    if (parsed.hostname === "i.pravatar.cc") {
      parsed.pathname = "/512";
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

export function ProfileHeaderCard({ profile }: { profile: ProfileOverview }) {
  const initials = initialsFromName(profile.name || "User");
  const avatarLabel = `${profile.name} avatar`;
  const largeAvatarUrl = profile.avatarUrl
    ? getLargeAvatarUrl(profile.avatarUrl)
    : undefined;

  return (
    <PanelCard className="overflow-hidden">
      <div
        className="h-28"
        style={{
          background:
            profile.profileBgColor ?? "linear-gradient(90deg,#3b82f6,#6366f1)",
        }}
      />
      <div className="px-5 pb-5">
        <div className="-mt-12 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  aria-label="View profile avatar"
                >
                  {profile.avatarUrl ? (
                    <Image
                      src={profile.avatarUrl}
                      alt={avatarLabel}
                      width={80}
                      height={80}
                      style={{ width: "auto", height: "auto" }}
                      className="h-20 w-20 rounded-full border-4 border-white object-cover transition group-hover:opacity-90 dark:border-slate-900"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-slate-900 text-xl font-bold text-white transition group-hover:opacity-90 dark:border-slate-900">
                      {initials}
                    </div>
                  )}
                </button>
              </DialogTrigger>
              <DialogContent className="bg-transparent p-0 shadow-none">
                <DialogTitle className="sr-only">Profile photo</DialogTitle>
                {largeAvatarUrl ? (
                  <Image
                    src={largeAvatarUrl}
                    alt={avatarLabel}
                    width={800}
                    height={500}
                    className="h-[500px] w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-[360px] w-[360px] items-center justify-center rounded-2xl bg-slate-800 text-5xl font-bold text-white">
                    {initials}
                  </div>
                )}
              </DialogContent>
            </Dialog>

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
