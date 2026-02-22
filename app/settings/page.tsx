import { RoutePlaceholderPage } from "@/components/dashboard/route-placeholder-page";

export default function SettingsPage() {
  return (
    <RoutePlaceholderPage
      title="Settings"
      description="This page will hold account, preferences, and notification controls."
      sections={[
        {
          heading: "Goal",
          items: ["Manage account preferences and notification behavior."],
        },
        {
          heading: "Required UI Blocks",
          items: [
            "Account settings: name, handle (read-only), bio, expertise tags.",
            "Preferences: theme, language, timezone.",
            "Notification toggles: replies, mentions, RFC review requests, weekly digest.",
            "Security placeholder: change password action and 2FA status badge.",
          ],
        },
        {
          heading: "Form Requirements",
          items: [
            "Name is required and minimum 2 characters.",
            "Bio maximum length is 280 characters.",
            "Expertise tags maximum is 8 tags.",
            "Show inline validation messages near fields.",
          ],
        },
        {
          heading: "Interactions",
          items: [
            "Save button with loading/pending state.",
            "Reset or discard changes action.",
            "Show success toast/banner after save.",
            "Warn user before navigation when there are unsaved changes.",
          ],
        },
        {
          heading: "Definition of Done",
          items: [
            "Controlled form with validation rules implemented.",
            "Save and reset flows use mock API.",
            "Unsaved changes protection works.",
          ],
        },
      ]}
    />
  );
}
