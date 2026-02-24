import type { ExploreSection } from "@/app/explore/_types";

export const exploreSections: ExploreSection[] = [
  {
    id: "goal",
    title: "Goal",
    description: "Help users discover high-signal knowledge content quickly.",
    items: ["Fast discovery with topic + relevance controls."],
  },
  {
    id: "search",
    title: "Search & Filtering",
    description: "Global discovery controls for topics and threads.",
    items: [
      "Global search input.",
      "Trending topics chips.",
      "Clear all filters action.",
    ],
  },
  {
    id: "content",
    title: "Content Streams",
    description: "Separate sections for different discovery intent.",
    items: [
      "Recently solved threads.",
      "Recommended for you.",
      "New this week.",
    ],
  },
];
