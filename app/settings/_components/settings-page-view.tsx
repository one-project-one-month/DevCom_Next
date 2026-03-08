"use client";

import { type ChangeEvent, useMemo, useState } from "react";
import { Camera } from "lucide-react";

import { profilePageMock } from "@/app/profile/_data/profile.mock";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type EditableProfile = {
  name: string;
  handle: string;
  role: string;
  location: string;
  bio: string;
  expertise: string;
  avatar: string;
};

const initialProfile: EditableProfile = {
  name: profilePageMock.profile.name,
  handle: profilePageMock.profile.handle,
  role: profilePageMock.profile.role,
  location: profilePageMock.profile.location,
  bio: profilePageMock.profile.bio,
  expertise: profilePageMock.profile.expertise.join(", "),
  avatar: "/window.svg",
};

export function SettingsPageView() {
  const [profile, setProfile] = useState<EditableProfile>(initialProfile);

  const hasChanges = useMemo(
    () => JSON.stringify(profile) !== JSON.stringify(initialProfile),
    [profile],
  );

  function updateField<Key extends keyof EditableProfile>(key: Key, value: EditableProfile[Key]) {
    setProfile((current) => ({ ...current, [key]: value }));
  }

  function handleReset() {
    setProfile(initialProfile);
  }

  function handleAvatarChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const localImageUrl = URL.createObjectURL(file);
    updateField("avatar", localImageUrl);
  }

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
                    <AvatarImage src={profile.avatar} alt={profile.name} />
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="settings-name">Name</Label>
                <Input
                  id="settings-name"
                  value={profile.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Your display name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-handle">Handle</Label>
                <Input
                  id="settings-handle"
                  value={profile.handle}
                  onChange={(event) => updateField("handle", event.target.value)}
                  placeholder="@your.handle"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-role">Role</Label>
                <Input
                  id="settings-role"
                  value={profile.role}
                  onChange={(event) => updateField("role", event.target.value)}
                  placeholder="Frontend Engineer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="settings-location">Location</Label>
                <Input
                  id="settings-location"
                  value={profile.location}
                  onChange={(event) => updateField("location", event.target.value)}
                  placeholder="City, Country"
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
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="settings-expertise">Expertise (comma-separated)</Label>
                <Input
                  id="settings-expertise"
                  value={profile.expertise}
                  onChange={(event) => updateField("expertise", event.target.value)}
                  placeholder="React, Next.js, TypeScript"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button disabled={!hasChanges}>Save Changes</Button>
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
