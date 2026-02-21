import { Compass, ListChecks, Settings, Users } from "lucide-react";

import type {
  ActivityItem,
  FeedPost,
  ShortcutItem,
  SuggestedUser,
} from "@/components/dashboard/types";

export const shortcuts: ShortcutItem[] = [
  { label: "Explore", icon: Compass },
  { label: "Communities", icon: Users },
  { label: "Saved Posts", icon: ListChecks },
  { label: "Settings", icon: Settings },
];

export const activities: ActivityItem[] = [
  { user: "Nina Park", action: "commented on your post", time: "2m ago" },
  { user: "Ibrahim Noor", action: "started following you", time: "15m ago" },
  { user: "Maya Chen", action: "liked your UI concept", time: "39m ago" },
  { user: "Dev Weekly", action: "featured your thread", time: "1h ago" },
];

export const suggestions: SuggestedUser[] = [
  { name: "Ariana Wells", handle: "@ariana.dev" },
  { name: "Leo Martinez", handle: "@leocodes" },
  { name: "Kaito Sato", handle: "@kaito.builds" },
];

export const feedPosts: FeedPost[] = [
  {
    id: "1",
    name: "Nina Park",
    handle: "@nina.codes",
    time: "1h",
    content:
      "Wrapped up a fresh dashboard concept for developer communities with clean cards and modular feed widgets.",
    likes: 286,
    comments: 39,
  },
  {
    id: "2",
    name: "Ibrahim Noor",
    handle: "@inoor",
    time: "2h",
    content:
      "Shipping a new release pipeline with preview deployments and changelog automation. Feels fast now.",
    likes: 174,
    comments: 22,
  },
  {
    id: "3",
    name: "Maya Chen",
    handle: "@maya.dev",
    time: "3h",
    content:
      "Created a shared design token package for all frontend repos. Fewer UI inconsistencies already.",
    likes: 241,
    comments: 31,
  },
  {
    id: "4",
    name: "Leo Martinez",
    handle: "@leocodes",
    time: "5h",
    content:
      "Anyone benchmarking React Query cache invalidation strategies at scale? Looking for real-world results.",
    likes: 132,
    comments: 47,
  },
  {
    id: "5",
    name: "Ariana Wells",
    handle: "@ariana.dev",
    time: "7h",
    content:
      "Published a short guide on balancing product velocity and code quality during fast feature sprints.",
    likes: 209,
    comments: 28,
  },
  {
    id: "6",
    name: "Kaito Sato",
    handle: "@kaito.builds",
    time: "9h",
    content:
      "Moved our dashboard to segmented route-level code splitting. Initial load improved by 27 percent.",
    likes: 167,
    comments: 19,
  },
  {
    id: "7",
    name: "Dev Weekly",
    handle: "@devweekly",
    time: "11h",
    content:
      "Curating top community tools this week. Share your favorite OSS utility and why your team relies on it.",
    likes: 318,
    comments: 58,
  },
  {
    id: "8",
    name: "Armad Khan",
    handle: "@armad.dev",
    time: "12h",
    content:
      "Testing long feed scrolling behavior with realistic card lengths and interaction rows before wiring APIs.",
    likes: 94,
    comments: 13,
  },
];
