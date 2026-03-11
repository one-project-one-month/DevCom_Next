"use client";

import { type ChangeEvent, useEffect, useMemo, useState } from "react";
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
  expertise: string;
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
    expertise?: string[];
    profileBgColor?: string;
  };
};

const emptyProfile: EditableProfile = {
  name: "",
  handle: "",
  role: "",
  location: "",
  bio: "",
  expertise: "",
  avatarUrl: "",
};

function formatHandle(handle?: string) {
  if (!handle) return "";
  return handle.startsWith("@") ? handle : `@${handle}`;
}

function parseExpertise(input: string) {
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function mapToEditableProfile(user: UserResponse["user"]): EditableProfile {
  return {
    name: user.name ?? "",
    handle: formatHandle(user.handle),
    role: user.role ?? "Member",
    location: user.location ?? "",
    bio: user.bio ?? "",
    expertise: user.expertise?.join(", ") ?? "",
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

  const [profile, setProfile] = useState<EditableProfile>(emptyProfile);
  const [originalProfile, setOriginalProfile] = useState<EditableProfile>(emptyProfile);

  useEffect(() => {
    if (userQuery.data?.user) {
      const mapped = mapToEditableProfile(userQuery.data.user);
      setProfile(mapped);
      setOriginalProfile(mapped);
    }
  }, [userQuery.data?.user]);

  const hasChanges = useMemo(
    () => JSON.stringify(profile) !== JSON.stringify(originalProfile),
    [profile, originalProfile],
  );

  function updateField<Key extends keyof EditableProfile>(key: Key, value: EditableProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function handleReset() {
    setProfile(originalProfile);
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
        role: payload.role,
        location: payload.location,
        bio: payload.bio,
        expertise: parseExpertise(payload.expertise),
        avatarUrl: payload.avatarUrl,
      };
      return apiFetch<UserResponse>("/api/users/me", {
        method: "PATCH",
        body,
      });
    },
    onSuccess: (data) => {
      const mapped = mapToEditableProfile(data.user);
      setProfile(mapped);
      setOriginalProfile(mapped);
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
      <div className="space-y-4 pb-8">
        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Settings</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Update your profile details and account preferences.
          </p>
        </PanelCard>

        <div className="grid gap-4">
          <PanelCard className="space-y-4 p-5">
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">Edit Profile</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Changes here are reflected in your public profile card.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-900/60">
              <div className="flex justify-center">
                <label htmlFor="settings-avatar-upload" className="group relative cursor-pointer">
                  <Avatar size="lg" className="size-24 ring-4 ring-white transition group-hover:opacity-90 dark:ring-slate-800">
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                    <AvatarFallback>{profile.name.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-md">
                    <Camera className="h-4 w-4" />
                  </span>
                </label>
                <input
                  id="settings-avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>
              <p className="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">
                Avatar upload is preview-only for now. Use an image URL below to save.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="settings-name">Name</Label>
                <Input
                  id="settings-name"
                  value={profile.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your display name"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-handle">Handle</Label>
                <Input
                  id="settings-handle"
                  value={profile.handle}
                  onChange={(event) => updateField("handle", event.target.value)}
                  placeholder="@your.handle"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-role">Role</Label>
                <Input
                  id="settings-role"
                  value={profile.role}
                  onChange={(event) => updateField("role", event.target.value)}
                  placeholder="Frontend Engineer"
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-location">Location</Label>
                <Input
                  id="settings-location"
                  value={profile.location}
                  onChange={(event) => updateField("location", event.target.value)}
                  placeholder="City, Country"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="settings-bio">Bio</Label>
                <Textarea
                  id="settings-bio"
                  value={profile.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  placeholder="Write a short bio"
                  className="min-h-24"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="settings-expertise">Expertise (comma-separated)</Label>
                <Input
                  id="settings-expertise"
                  value={profile.expertise}
                  onChange={(event) => updateField("expertise", event.target.value)}
                  placeholder="React, Next.js, TypeScript"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="settings-avatar-url">Avatar URL</Label>
                <Input
                  id="settings-avatar-url"
                  value={profile.avatarUrl}
                  onChange={(event) => updateField("avatarUrl", event.target.value)}
                  placeholder="https://..."
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                disabled={!hasChanges || updateMutation.isPending}
                onClick={() => updateMutation.mutate(profile)}
              >
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button type="button" variant="outline" onClick={handleReset} disabled={!hasChanges}>
                Reset
              </Button>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {hasChanges ? "Unsaved changes" : "All changes saved"}
              </span>
            </div>
          </PanelCard>
        </div>
      </div>
    </DashboardShell>
  );
}
