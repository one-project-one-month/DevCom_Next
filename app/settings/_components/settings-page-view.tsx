"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { Camera } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
    lastProfileChangedAt?: string;
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

  const profileInfoChanged = useMemo(() => {
    if (!localProfile) return false;
    return (
      localProfile.name !== originalProfile.name ||
      localProfile.handle !== originalProfile.handle ||
      localProfile.location !== originalProfile.location ||
      localProfile.bio !== originalProfile.bio
    );
  }, [localProfile, originalProfile]);

  const profileCooldownInfo = useMemo(() => {
    const lastChanged = userQuery.data?.user?.lastProfileChangedAt;
    if (!lastChanged) {
      return { isActive: false, daysRemaining: 0 };
    }
    const cooldownMs = 14 * 24 * 60 * 60 * 1000;
    const lastTime = new Date(lastChanged).getTime();
    if (!Number.isFinite(lastTime)) {
      return { isActive: false, daysRemaining: 0 };
    }
    const endTime = lastTime + cooldownMs;
    // eslint-disable-next-line react-hooks/purity
    const remainingMs = endTime - Date.now();
    if (remainingMs <= 0) {
      return { isActive: false, daysRemaining: 0 };
    }
    return {
      isActive: true,
      daysRemaining: Math.max(
        1,
        Math.ceil(remainingMs / (24 * 60 * 60 * 1000)),
      ),
    };
  }, [userQuery.data?.user?.lastProfileChangedAt]);

  function updateField<Key extends keyof EditableProfile>(
    key: Key,
    value: EditableProfile[Key],
  ) {
    setLocalProfile({ ...profile, [key]: value });
  }

  function handleReset() {
    setLocalProfile(null);
  }

  const avatarMutation = useMutation<UserResponse, Error, File>({
    mutationFn: async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const upload = await apiFetch<{ imageUrl: string }>(
        "/api/uploads/image",
        {
          method: "POST",
          body: formData,
        },
      );

      return apiFetch<UserResponse>("/api/users/me", {
        method: "PATCH",
        body: { avatarUrl: upload.imageUrl },
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
      userQuery.refetch();
      toast({
        title: "Avatar updated",
        description: "Your new photo is live.",
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Avatar update failed",
        description: error.message ?? "Please try again.",
        variant: "destructive",
      });
    },
  });

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    avatarMutation.mutate(file);
  }

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
        role: useAuthStore.getState().user?.role,
      });
      userQuery.refetch();
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

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await apiFetch<{ message: string }>("/api/users/me", {
        method: "DELETE",
      });
    },
    onSuccess: async () => {
      await apiFetch<{ message: string }>("/api/auth/logout", {
        method: "POST",
      });
      useAuthStore.getState().clearUser();
      useAuthStore.getState().clearToken();
      toast({
        title: "Account deleted",
        description: "Your account has been removed.",
        variant: "success",
      });
      window.location.assign("/login");
    },
    onError: (error) => {
      toast({
        title: "Delete failed",
        description: error.message ?? "Please try again.",
        variant: "destructive",
      });
    },
  });

  const isLoading = userQuery.isLoading || !userId;

  return (
    <DashboardShell>
      {avatarMutation.isPending ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/35 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/50 bg-white/90 px-5 py-3 text-sm font-medium text-slate-700 shadow-lg dark:border-slate-800/60 dark:bg-slate-900/90 dark:text-slate-200">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent dark:border-white dark:border-t-transparent" />
            Updating avatar...
          </div>
        </div>
      ) : null}
      <div className="space-y-6 pb-10">
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
                  className={`absolute bottom-1 -right-1 inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow-md transition ${
                    avatarMutation.isPending
                      ? "pointer-events-none opacity-60"
                      : "hover:scale-105"
                  } dark:bg-white dark:text-slate-900`}
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
                disabled={avatarMutation.isPending}
              />

              <div className="min-w-[180px]">
                <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {profile.name || "Your name"}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {profile.handle || "@handle"}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {avatarMutation.isPending
                    ? "Uploading photo..."
                    : "Tap the camera to pick a new photo."}
                </p>
              </div>

              <div className="ml-auto flex flex-wrap items-center gap-2">
                <Button
                  disabled={
                    !hasChanges ||
                    updateMutation.isPending ||
                    (profileInfoChanged && profileCooldownInfo.isActive)
                  }
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
            {profileInfoChanged && profileCooldownInfo.isActive ? (
              <p className="text-xs text-amber-600 dark:text-amber-300">
                You can update profile info again in about{" "}
                {profileCooldownInfo.daysRemaining} days.
              </p>
            ) : null}
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
                  maxLength={120}
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
          <div className="border-t border-slate-200/80 bg-slate-50/70 p-6 dark:border-slate-800/80 dark:bg-slate-900/40">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Delete account
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Permanently remove your account and posts.
                </p>
              </div>
              <Button
                variant="destructive"
                onClick={() => setIsDeleteDialogOpen(true)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete Account"}
              </Button>
            </div>
          </div>
        </PanelCard>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="space-y-3">
                  <DialogTitle className="text-xl font-semibold">
                    Delete account
                  </DialogTitle>
                  <DialogDescription className="text-sm text-slate-600 dark:text-slate-300">
                    This will permanently remove your account and all posts.
                    This action cannot be undone.
                  </DialogDescription>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={deleteMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setIsDeleteDialogOpen(false);
                  deleteMutation.mutate();
                }}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? "Deleting..." : "Confirm Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardShell>
  );
}
