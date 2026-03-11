"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { ProfileLayoutView } from "@/app/profile/_components/profile-layout-view";
import type { ProfilePageData, ProfileOverview } from "@/app/profile/_types";
import { useMeQuery } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api/fetcher";
import { PanelCard } from "@/components/dashboard/shared";

type UserResponse = {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    role?: string;
    location?: string;
    expertise?: string[];
    profileBgColor?: string;
  };
};

function buildHandle(input?: string) {
  if (!input) return "@user";
  return input.startsWith("@") ? input : `@${input}`;
}

function buildProfileOverview(source: UserResponse["user"], isOwnProfile: boolean): ProfileOverview {
  const handle = buildHandle(source.handle || source.email?.split("@")[0]);
  return {
    id: source.id,
    isOwnProfile,
    name: source.name,
    handle,
    role: source.role ?? "Member",
    location: source.location ?? "Location not set",
    avatarUrl: source.avatarUrl,
    profileBgColor: source.profileBgColor,
    bio: source.bio ?? "",
    expertise: source.expertise ?? [],
  };
}

export function ProfilePageView() {
  const { data: meData, isLoading: isLoadingMe } = useMeQuery();
  const userId = meData?.user?.id;

  const userQuery = useQuery<UserResponse>({
    queryKey: ["profile", "me", userId],
    queryFn: () => apiFetch<UserResponse>(`/api/users/${userId}`),
    enabled: Boolean(userId),
    retry: false,
  });

  const profileData = useMemo<ProfilePageData | null>(() => {
    if (userQuery.data?.user) {
      return {
        profile: buildProfileOverview(userQuery.data.user, true),
      };
    }

    if (meData?.user) {
      return {
        profile: buildProfileOverview(
          {
            id: meData.user.id,
            name: meData.user.name,
            email: meData.user.email,
            handle: meData.user.email.split("@")[0] ?? "user",
            avatarUrl: meData.user.avatarUrl,
            profileBgColor: meData.user.profileBgColor,
          },
          true,
        ),
      };
    }

    return null;
  }, [meData?.user, userQuery.data?.user]);

  if (!profileData) {
    return (
      <div className="space-y-4">
        <PanelCard className="p-6 text-sm text-slate-600 dark:text-slate-300">
          {isLoadingMe ? "Loading profile..." : "Unable to load profile."}
        </PanelCard>
      </div>
    );
  }

  return <ProfileLayoutView data={profileData} />;
}
