import { Compass, ListChecks, Settings, Users } from "lucide-react";

import type {
  ActivityItem,
  FeedPost,
  ShortcutItem,
  SuggestedUser,
} from "@/components/dashboard/types";

export const shortcuts: ShortcutItem[] = [
  { label: "Explore", icon: Compass, href: "/explore" },
  { label: "Communities", icon: Users, href: "/communities" },
  { label: "Saved Posts", icon: ListChecks, href: "/saved-posts" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export const activities: ActivityItem[] = [
  {
    title: "Type-safe API Contract",
    detail: "6 accepted answers in Backend Patterns",
    time: "4m ago",
    impact: "+29 readers helped",
  },
  {
    title: "Incident Retrospective",
    detail: "Marked as canonical in Platform Reliability",
    time: "17m ago",
    impact: "42 saves",
  },
  {
    title: "React Query Invalidation RFC",
    detail: "Maintainer review requested by Core UI",
    time: "33m ago",
    impact: "11 reviewers",
  },
  {
    title: "Auth Middleware Checklist",
    detail: "Referenced by 3 new onboarding docs",
    time: "1h ago",
    impact: "Team adoption rising",
  },
];

export const suggestions: SuggestedUser[] = [
  { name: "Ariana Wells", handle: "@ariana.dev", focus: "Frontend architecture" },
  { name: "Leo Martinez", handle: "@leocodes", focus: "DevOps and CI/CD" },
  { name: "Kaito Sato", handle: "@kaito.builds", focus: "Performance engineering" },
];

export const feedPosts: FeedPost[] = [
  {
    id: "1",
    format: "Question",
    name: "Nina Park",
    handle: "@nina.codes",
    time: "1h",
    title: "How are teams versioning shared Zod schemas across services?",
    content:
      "We have 7 services consuming a shared contract package. Looking for patterns that prevent hidden breaking changes while keeping release cadence fast.",
    tags: ["TypeScript", "API Contract", "Monorepo"],
    helpful: 86,
    replies: 14,
    saves: 62,
    status: "Reviewing",
  },
  {
    id: "2",
    format: "Guide",
    name: "Ibrahim Noor",
    handle: "@inoor",
    time: "2h",
    title: "Guide: Preview deploys with automatic rollback checks",
    content:
      "Published our exact workflow: smoke tests + budget alarms + feature flag guardrails. Includes failure playbook and rollback triggers.",
    tags: ["CI/CD", "Release Engineering", "Playbook"],
    helpful: 124,
    replies: 9,
    saves: 103,
    status: "Solved",
  },
  {
    id: "3",
    format: "RFC",
    name: "Maya Chen",
    handle: "@maya.dev",
    time: "3h",
    title: "RFC: Unified design token governance for multi-repo UI",
    content:
      "Proposal includes migration phases, deprecation windows, and lint rule enforcement. Requesting feedback before lock-in.",
    tags: ["Design Systems", "Governance", "Frontend"],
    helpful: 72,
    replies: 22,
    saves: 49,
    status: "Reviewing",
  },
  {
    id: "4",
    format: "Build Log",
    name: "Leo Martinez",
    handle: "@leocodes",
    time: "5h",
    title: "Build log: cache invalidation benchmark at scale",
    content:
      "Documenting experiments across 4 strategies with P95 and memory impact. Posting raw metrics so others can reproduce.",
    imageUrl: "/globe.svg",
    tags: ["React Query", "Benchmark", "Performance"],
    helpful: 58,
    replies: 17,
    saves: 41,
  },
  {
    id: "5",
    format: "Question",
    name: "Ariana Wells",
    handle: "@ariana.dev",
    time: "7h",
    title: "What code review policies improved velocity without lowering quality?",
    content:
      "Interested in real policies that reduced cycle time, not theory. Especially around reviewer assignment and max PR size.",
    tags: ["Engineering Process", "Code Review", "Team Ops"],
    helpful: 67,
    replies: 26,
    saves: 55,
  },
  {
    id: "6",
    format: "Guide",
    name: "Kaito Sato",
    handle: "@kaito.builds",
    time: "9h",
    title: "Route-level code splitting checklist for large dashboards",
    content:
      "Sharing the migration sequence we used to avoid regressions: route boundaries, suspense islands, and observability checkpoints.",
    tags: ["Next.js", "Web Perf", "Checklist"],
    helpful: 93,
    replies: 11,
    saves: 81,
    status: "Solved",
  },
  {
    id: "7",
    format: "RFC",
    name: "Dev Weekly",
    handle: "@devweekly",
    time: "11h",
    title: "RFC: Community standards for reproducible bug reports",
    content:
      "Drafting a shared template for issue context, environment capture, and minimal reproduction expectations across teams.",
    tags: ["OSS", "DX", "Standards"],
    helpful: 147,
    replies: 33,
    saves: 90,
    status: "Reviewing",
  },
  {
    id: "8",
    format: "Build Log",
    name: "Armad Khan",
    handle: "@armad.dev",
    time: "12h",
    title: "Knowledge feed UX migration notes",
    content:
      "Capturing decisions while transforming a social-style feed into a knowledge-first layout with better scanning for developers.",
    tags: ["UX", "Community", "Product"],
    helpful: 43,
    replies: 8,
    saves: 37,
  },
];

export const knowledgeTopics = [
  { label: "System Design", threads: 128 },
  { label: "Debugging", threads: 94 },
  { label: "Testing", threads: 76 },
  { label: "DevOps", threads: 63 },
  { label: "Security", threads: 51 },
];
