import { RoutePlaceholderPage } from "@/components/dashboard/route-placeholder-page";

export default function ProfilePage() {
  return (
    <RoutePlaceholderPage
      title="Profile"
      description="This page will show user identity, expertise, and contribution history."
      sections={[
        {
          heading: "Goal",
          items: ["Present identity, expertise, and contribution credibility."],
        },
        {
          heading: "Required UI Blocks",
          items: [
            "Profile header with avatar, full name, handle, role, and location/timezone.",
            "Bio and expertise tags section.",
            "Stats strip: threads opened, accepted answers, guides published, total saves.",
            "Recent contributions list.",
            "Top topics card.",
          ],
        },
        {
          heading: "Data Requirements",
          items: [
            "Profile fields: id, name, handle, bio, role, location, avatarUrl.",
            "Contribution fields: id, title, type, status, replies, helpful, createdAt.",
            "Topic stat fields: topic and count.",
          ],
        },
        {
          heading: "Interactions",
          items: [
            "Edit profile button (can route to settings for now).",
            "Contribution row click should open a thread detail placeholder route.",
            "Sort contributions by latest and most helpful.",
          ],
        },
        {
          heading: "Edge Cases",
          items: [
            "Avatar fallback to initials if image is missing.",
            "Bio fallback text when empty.",
            "Empty contributions state with CTA to create first thread.",
          ],
        },
        {
          heading: "Definition of Done",
          items: [
            "All required sections render with mock data.",
            "Sorting works correctly.",
            "Loading and empty states are implemented.",
          ],
        },
      ]}
    />
  );
}
