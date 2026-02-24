import type { SavedPostSection } from "@/app/saved-posts/_types";

export const savedPostsSections: SavedPostSection[] = [
  {
    id: "filters",
    title: "Filters",
    items: ["Type filter", "Status filter", "Title/tag search"],
  },
  {
    id: "list",
    title: "Saved List",
    items: ["Saved thread cards", "Quick stats", "Open thread action"],
  },
  {
    id: "actions",
    title: "Actions",
    items: ["Unsave", "Mark reviewed", "Sort by newest / helpful"],
  },
];
