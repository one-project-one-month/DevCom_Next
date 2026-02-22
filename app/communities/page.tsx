import { RoutePlaceholderPage } from "@/components/dashboard/route-placeholder-page";

export default function CommunitiesPage() {
  return (
    <RoutePlaceholderPage
      title="Communities"
      description="This page will show all developer communities and their activity."
      sections={[
        {
          heading: "Goal",
          items: ["Provide a directory to browse and join developer communities."],
        },
        {
          heading: "Required UI Blocks",
          items: [
            "Community directory list/grid.",
            "Community card with name, description, topic, member count, active thread count.",
            "Join/Leave action on each card.",
            "Top threads preview per community.",
          ],
        },
        {
          heading: "Data Requirements",
          items: [
            "Community fields: id, name, slug, description, topic, memberCount, threadCount, joined.",
            "Top thread preview fields: id, title, status, helpful.",
          ],
        },
        {
          heading: "Interactions",
          items: [
            "Join/Leave toggles membership state.",
            "Filter by topic.",
            "Sort by most active and largest.",
            "Optional community detail placeholder route at /communities/[slug].",
          ],
        },
        {
          heading: "Edge Cases",
          items: [
            "Join action failure with retry.",
            "Community with no active threads.",
            "Long names/descriptions should not break layout.",
          ],
        },
        {
          heading: "Definition of Done",
          items: [
            "Membership toggle reflects immediately in UI.",
            "Filters and sorting work correctly.",
            "Empty and error states are implemented.",
          ],
        },
      ]}
    />
  );
}
