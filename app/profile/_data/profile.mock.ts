import type { ProfilePageData } from "@/app/profile/_types";

const profile = {
  id: "me-1",
  isOwnProfile: true,
  name: "H.Hlaing Swan",
  handle: "@hhlaing.swan",
  role: "Frontend Engineer",
  location: "Yangon, MM (UTC+06:30)",
  bio: "Building knowledge-first developer experiences focused on readability, maintainability, and practical problem solving.",
  expertise: ["React", "Next.js", "TypeScript", "Design Systems", "DX"],
  stats: {
    threads: 128,
    helpful: 884,
    replies: 221,
    topTopics: 15,
  },
};

export const profilePageMock: ProfilePageData = {
  profile,
  contributions: [
    {
      id: "101",
      isOwnPost: true,
      format: "Build Log",
      name: profile.name,
      handle: profile.handle,
      time: "2h",
      title: "Profile experience refactor notes",
      content:
        "Captured migration notes for moving repeated feed UI into reusable components shared by home feed, profile, and saved posts.",
      tags: ["Refactor", "Component Design", "Frontend"],
      helpful: 64,
      replies: 12,
      saves: 34,
    },
    {
      id: "102",
      isOwnPost: true,
      format: "Guide",
      name: profile.name,
      handle: profile.handle,
      time: "9h",
      title: "Guide: structuring dashboard routes for scalable growth",
      content:
        "Documenting route-level ownership boundaries and shared shell reuse to keep feature teams independent while preserving UX consistency.",
      tags: ["Architecture", "Routing", "Scalability"],
      helpful: 98,
      replies: 19,
      saves: 53,
    },
    {
      id: "103",
      isOwnPost: true,
      format: "Question",
      name: profile.name,
      handle: profile.handle,
      time: "1d",
      title: "What is your preferred strategy for comment moderation queues?",
      content:
        "Looking for practical tradeoffs between manual review, reputation gates, and automated heuristics in dev-focused communities.",
      tags: ["Moderation", "Community", "Product"],
      helpful: 43,
      replies: 27,
      saves: 18,
    },
  ],
  topTopics: [
    { topic: "Next.js", count: 22 },
    { topic: "Architecture", count: 18 },
    { topic: "Design Systems", count: 15 },
  ],
};
