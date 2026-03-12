"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { Camera } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMeQuery } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api/fetcher";
import { useAuthStore } from "@/store/auth-store";

type EditableProfile = {
  name: string;
  handle: string;
  role: string;
  location: string;
  bio: string;
  avatarUrl: string;
};

type UserResponse = {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    avatarUrl?: string;
    role?: string;
    location?: string;
    bio?: string;
    profileBgColor?: string;
  };
};

const emptyProfile: EditableProfile = {
  name: "",
  handle: "",
  role: "",
  location: "",
  bio: "",
  avatarUrl: "",
};

function formatHandle(handle?: string) {
  if (!handle) return "";
  return handle.startsWith("@") ? handle : `@${handle}`;
}

function getHighResAvatarUrl(url: string) {
  if (!url || url.startsWith("blob:")) {
    return url;
  }

  if (url.includes("googleusercontent.com")) {
    return url.replace(/=s\\d+-c/g, "=s256-c").replace(/=s\\d+/g, "=s256");
  }

  if (url.includes("avatars.githubusercontent.com")) {
    try {
      const parsed = new URL(url);
      parsed.searchParams.set("s", "256");
      return parsed.toString();
    } catch {
      return url;
    }
  }

  return url;
}

function mapToEditableProfile(user: UserResponse["user"]): EditableProfile {
  return {
    name: user.name ?? "",
    handle: formatHandle(user.handle),
    role: user.role ?? "Member",
    location: user.location ?? "",
    bio: user.bio ?? "",
    avatarUrl: user.avatarUrl ?? "",
  };
}

export function SettingsPageView() {
  const { toast } = useToast();
  const { data: meData } = useMeQuery();
  const userId = meData?.user?.id;

  const userQuery = useQuery<UserResponse>({
    queryKey: ["settings", "me", userId],
    queryFn: () => apiFetch<UserResponse>(`/api/users/${userId}`),
    enabled: Boolean(userId),
    retry: false,
  });

  const [localProfile, setLocalProfile] = useState<EditableProfile | null>(
    null,
  );

  const originalProfile = useMemo(
    () =>
      userQuery.data ? mapToEditableProfile(userQuery.data.user) : emptyProfile,
    [userQuery.data],
  );

  const profile = localProfile ?? originalProfile;
  const displayAvatarUrl = useMemo(
    () => getHighResAvatarUrl(profile.avatarUrl),
    [profile.avatarUrl],
  );
  const providerLabel = useMemo(() => {
    const provider = meData?.user?.provider ?? "google";
    if (provider === "github") return "GitHub";
    if (provider === "google") return "Google";
    return "Local";
  }, [meData?.user?.provider]);

  const hasChanges = useMemo(
    () =>
      localProfile !== null &&
      JSON.stringify(localProfile) !== JSON.stringify(originalProfile),
    [localProfile, originalProfile],
  );

  function updateField<Key extends keyof EditableProfile>(
    key: Key,
    value: EditableProfile[Key],
  ) {
    setLocalProfile({ ...profile, [key]: value });
  }

  function handleReset() {
    setLocalProfile(null);
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const localImageUrl = URL.createObjectURL(file);
    updateField("avatarUrl", localImageUrl);
  }

  const updateMutation = useMutation<UserResponse, Error, EditableProfile>({
    mutationFn: async (payload) => {
      const body = {
        name: payload.name,
        handle: payload.handle,
        location: payload.location,
        bio: payload.bio,
        avatarUrl: payload.avatarUrl,
      };
      return apiFetch<UserResponse>("/api/users/me", {
        method: "PATCH",
        body,
      });
    },
    onSuccess: (data) => {
      setLocalProfile(null);
      useAuthStore.getState().setUser({
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        avatarUrl: data.user.avatarUrl,
        profileBgColor: data.user.profileBgColor,
        provider: useAuthStore.getState().user?.provider ?? "google",
      });
      toast({
        title: "Profile updated",
        description: "Your changes are live.",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Update failed",
        description: error.message ?? "Please try again.",
        variant: "destructive",
      });
    },
  });

  const isLoading = userQuery.isLoading || !userId;

  return (
    <DashboardShell>
      <div className="space-y-6 pb-10">
        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Settings
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Manage your public profile details and how others see you.
          </p>
        </PanelCard>

        <PanelCard className="overflow-hidden">
          <div className="bg-linear-to-r from-slate-900/5 via-slate-900/0 to-blue-500/10 p-6 dark:from-slate-100/5 dark:via-slate-100/0 dark:to-blue-400/10">
            <div className="flex flex-wrap items-center gap-4">
              <div className="group relative">
                <Avatar
                  size="default"
                  className="size-32 ring-4 ring-white transition group-hover:opacity-90 dark:ring-slate-900"
                >
                  <AvatarImage
                    className="h-full w-full object-cover"
                    src={displayAvatarUrl}
                    alt={profile.name}
                  />
                  <AvatarFallback>
                    {profile.name.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <label
                  htmlFor="settings-avatar-upload"
                  className="absolute -bottom-1 -left-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition hover:scale-105 dark:bg-white dark:text-slate-900"
                >
                  <Camera className="h-4 w-4" />
                </label>
              </div>
              <input
                id="settings-avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />

              <div className="min-w-[180px]">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {profile.name || "Your name"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {profile.handle || "@handle"}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Tap the camera to pick a new photo.
                </p>
              </div>

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <Button
                  disabled={!hasChanges || updateMutation.isPending}
                  onClick={() => updateMutation.mutate(profile)}
                >
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleReset}
                  disabled={!hasChanges}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                Profile details
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Changes here are reflected in your public profile card.
              </p>
            </div>

            <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <Label
                  htmlFor="settings-name"
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  Name
                </Label>
                <Input
                  id="settings-name"
                  value={profile.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your display name"
                  disabled={isLoading}
                  className="sm:max-w-md"
                />
              </div>

              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <Label
                  htmlFor="settings-handle"
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  Handle
                </Label>
                <Input
                  id="settings-handle"
                  value={profile.handle}
                  onChange={(event) =>
                    updateField("handle", event.target.value)
                  }
                  placeholder="@your.handle"
                  disabled={isLoading}
                  className="sm:max-w-md"
                />
              </div>

              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <Label
                  htmlFor="settings-role"
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  Role
                </Label>
                <Input
                  id="settings-role"
                  value={profile.role}
                  placeholder="Frontend Engineer"
                  disabled
                  className="sm:max-w-md"
                />
              </div>

              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <Label
                  htmlFor="settings-provider"
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  Login provider
                </Label>
                <Input
                  id="settings-provider"
                  value={providerLabel}
                  disabled
                  className="sm:max-w-md"
                />
              </div>

              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <Label
                  htmlFor="settings-location"
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  Location
                </Label>
                <Input
                  id="settings-location"
                  value={profile.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                  placeholder="City, Country"
                  disabled={isLoading}
                  className="sm:max-w-md"
                />
              </div>

              <div className="flex flex-col gap-2 p-4 sm:flex-row sm:items-start sm:justify-between">
                <Label
                  htmlFor="settings-bio"
                  className="text-sm text-slate-500 dark:text-slate-400"
                >
                  Bio
                </Label>
                <Textarea
                  id="settings-bio"
                  value={profile.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  placeholder="Write a short bio"
                  className="min-h-24 sm:max-w-md"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              {hasChanges ? "Unsaved changes" : "All changes saved"}
            </div>
          </div>
        </PanelCard>
      </div>
    </DashboardShell>
  );
}
