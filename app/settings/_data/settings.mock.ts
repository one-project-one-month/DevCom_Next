import type { SettingsSection } from "@/app/settings/_types";

export const settingsSections: SettingsSection[] = [
  {
    id: "account",
    title: "Account",
    fields: ["Name", "Handle (read-only)", "Bio", "Expertise Tags"],
  },
  {
    id: "preferences",
    title: "Preferences",
    fields: ["Theme", "Language", "Timezone"],
  },
  {
    id: "notifications",
    title: "Notifications",
    fields: ["Replies", "Mentions", "RFC Reviews", "Weekly Digest"],
  },
];
