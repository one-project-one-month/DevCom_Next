import type { CommunitySection } from "@/app/communities/_types";

export const communitiesSections: CommunitySection[] = [
  {
    id: "directory",
    title: "Community Directory",
    details: ["List/Grid View", "Topic filter", "Sort by activity and size"],
  },
  {
    id: "cards",
    title: "Community Cards",
    details: ["Description", "Members count", "Active thread count", "Join/Leave"],
  },
  {
    id: "previews",
    title: "Top Thread Previews",
    details: ["Latest useful threads", "Status and helpful indicators"],
  },
];
