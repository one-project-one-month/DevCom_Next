import { RoutePlaceholderPage } from "@/components/dashboard/route-placeholder-page";

export default function ExplorePage() {
  return (
    <RoutePlaceholderPage
      title="Explore"
      description="This page helps developers discover high-signal content and topics."
      sections={[
        {
          heading: "Goal",
          items: ["Help users discover high-signal knowledge content quickly."],
        },
        {
          heading: "Required UI Blocks",
          items: [
            "Global search bar.",
            "Trending topics section.",
            "Recently solved threads section.",
            "Recommended for you section.",
            "New this week section.",
          ],
        },
        {
          heading: "Ranking Requirements",
          items: [
            "Trending score formula: score = helpful * 2 + replies + saves.",
            "Sort threads by score descending.",
            "Exclude stale items older than configurable threshold if date data exists.",
          ],
        },
        {
          heading: "Interactions",
          items: [
            "Topic click applies filter to all lists.",
            "Search input updates results.",
            "Clear all filters action resets state.",
          ],
        },
        {
          heading: "Definition of Done",
          items: [
            "Discovery sections render distinct datasets.",
            "Topic filter and search behavior are predictable.",
            "Ranking logic is unit-tested and documented.",
          ],
        },
      ]}
    />
  );
}
