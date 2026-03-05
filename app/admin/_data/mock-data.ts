import { User, Post, Report, AdminStats } from "./admin";

export const MOCK_STATS: AdminStats = {
  totalDevelopers: 1284,
  activePosts: 452,
  newComments: 89,
  totalReports: 12,
};

export const SIGNUPS_CHART_DATA = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 18 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 25 },
  { day: "Fri", count: 22 },
  { day: "Sat", count: 30 },
  { day: "Sun", count: 28 },
];


export const MOCK_USERS: User[] = [
  { id: "u_1", name: "Ariana Wells", handle: "@ariana.dev", email: "ariana@example.com", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-01-12" },
  { id: "u_2", name: "Leo Martinez", handle: "@leocodes", email: "leo@example.com", role: "MODERATOR", status: "ACTIVE", joinedAt: "2025-10-05" },
  { id: "u_3", name: "Maya Chen", handle: "@maya.dev", email: "maya@example.com", role: "MEMBER", status: "SUSPENDED", joinedAt: "2025-08-21" },
  { id: "u_4", name: "Nina Park", handle: "@nina.codes", email: "nina@example.com", role: "ADMIN", status: "ACTIVE", joinedAt: "2024-11-30" },
  { id: "u_5", name: "Arjun Mehta", handle: "@arjun_js", email: "arjun@example.com", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-02-15" },
  { id: "u_6", name: "Sarah Connor", handle: "@terminator_dev", email: "sarah@sky.net", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-02-20" },
  { id: "u_7", name: "Hiroshi Tanaka", handle: "@hiro_rust", email: "hiro@example.jp", role: "MODERATOR", status: "ACTIVE", joinedAt: "2025-12-01" },
  { id: "u_8", name: "Elena Rossi", handle: "@elena_ux", email: "elena@design.it", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-01-05" },
  { id: "u_9", name: "David Miller", handle: "@dave_ops", email: "david@example.com", role: "MEMBER", status: "SUSPENDED", joinedAt: "2025-09-15" },
  { id: "u_10", name: "Zoe Wang", handle: "@zoe_codes", email: "zoe@example.com", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-02-28" },
  { id: "u_11", name: "Lucas Brown", handle: "@lucas_fullstack", email: "lucas@dev.com", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-03-01" },
  { id: "u_12", name: "Fatima Zahra", handle: "@fatima_dev", email: "fatima@tech.ma", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-01-30" },
  { id: "u_13", name: "David Miller", handle: "@dave_ops", email: "david@example.com", role: "MEMBER", status: "SUSPENDED", joinedAt: "2025-09-15" },
  { id: "u_14", name: "Zoe Wang", handle: "@zoe_codes", email: "zoe@example.com", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-02-28" },
  { id: "u_15", name: "Lucas Brown", handle: "@lucas_fullstack", email: "lucas@dev.com", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-03-01" },
  { id: "u_16", name: "Fatima Zahra", handle: "@fatima_dev", email: "fatima@tech.ma", role: "MEMBER", status: "ACTIVE", joinedAt: "2026-01-30" },
];

export const MOCK_POSTS: Post[] = [
  { id: "p_1", title: "Understanding React 19 features", authorName: "Kyaw Hsan", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-03-01" },
  { id: "p_2", title: "Next.js App Router Deep Dive", authorName: "Alice Smith", status: "PUBLISHED", reportsCount: 2, createdAt: "2026-02-28" },
  { id: "p_3", title: "How are teams versioning Zod schemas?", authorName: "Kai Ohn", status: "FLAGGED", reportsCount: 5, createdAt: "2026-02-27" },
  { id: "p_4", title: "Why I switched from Prisma to Drizzle", authorName: "Arjun Mehta", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-26" },
  { id: "p_5", title: "Mastering TypeScript Generics", authorName: "Maya Chen", status: "DRAFT", reportsCount: 0, createdAt: "2026-02-25" },
  { id: "p_6", title: "PostgreSQL Indexing Strategies", authorName: "Leo Martinez", status: "PUBLISHED", reportsCount: 1, createdAt: "2026-02-24" },
  { id: "p_7", title: "Dockerizing a Turborepo", authorName: "Nina Park", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-23" },
  { id: "p_8", title: "The State of CSS in 2026", authorName: "Elena Rossi", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-22" },
  { id: "p_9", title: "Cheap Web3 Marketing Scam", authorName: "BotAccount", status: "FLAGGED", reportsCount: 12, createdAt: "2026-03-02" },
  { id: "p_10", title: "Zustand vs Redux Toolkit", authorName: "Zoe Wang", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-21" },
  { id: "p_11", title: "The State of CSS in 2026", authorName: "Elena Rossi", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-22" },
  { id: "p_12", title: "Cheap Web3 Marketing Scam", authorName: "BotAccount", status: "FLAGGED", reportsCount: 12, createdAt: "2026-03-02" },
  { id: "p_13", title: "Zustand vs Redux Toolkit", authorName: "Zoe Wang", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-21" },
  { id: "p_14", title: "Zustand vs Redux Toolkit", authorName: "Zoe Wang", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-21" },
  { id: "p_15", title: "The State of CSS in 2026", authorName: "Elena Rossi", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-22" },
  { id: "p_16", title: "Cheap Web3 Marketing Scam", authorName: "BotAccount", status: "FLAGGED", reportsCount: 12, createdAt: "2026-03-02" },
  { id: "p_17", title: "Zustand vs Redux Toolkit", authorName: "Zoe Wang", status: "PUBLISHED", reportsCount: 0, createdAt: "2026-02-21" },

];

export const MOCK_REPORTS: Report[] = [
  {
    id: "r_1",
    type: "SPAM",
    targetType: "POST",
    targetId: "p_3",
    targetTitle: "How are teams versioning Zod schemas?",
    reporterName: "Moe Lin",
    reason: "Duplicate promotional link.",
    status: "OPEN",
    createdAt: "2026-03-01"
  },
  {
    id: "r_2",
    type: "ABUSE",
    targetType: "COMMENT",
    targetId: "c_101",
    targetTitle: "Comment: 'You don't know what you're talking about...'",
    reporterName: "Ariana Wells",
    reason: "Personal attack in a technical discussion.",
    status: "IN_REVIEW",
    createdAt: "2026-03-02"
  },
  {
    id: "r_3",
    type: "MISINFORMATION",
    targetType: "POST",
    targetId: "p_9",
    targetTitle: "Cheap Web3 Marketing Scam",
    reporterName: "Hiroshi Tanaka",
    reason: "Phishing link detected in the body.",
    status: "OPEN",
    createdAt: "2026-03-03"
  },
  {
    id: "r_4",
    type: "HARASSMENT",
    targetType: "COMMENT",
    targetId: "c_205",
    targetTitle: "Comment: 'Stop posting these stupid tutorials.'",
    reporterName: "Zoe Wang",
    reason: "Repeated harassment towards a new member.",
    status: "RESOLVED",
    createdAt: "2026-02-25"
  },
  {
    id: "r_5",
    type: "SPAM",
    targetType: "POST",
    targetId: "p_2",
    targetTitle: "Next.js App Router Deep Dive",
    reporterName: "Leo Martinez",
    reason: "Incorrectly flagged as spam by mistake.",
    status: "RESOLVED",
    createdAt: "2026-02-24"
  },
  {
    id: "r_6",
    type: "SPAM",
    targetType: "POST",
    targetId: "p_3",
    targetTitle: "How are teams versioning Zod schemas?",
    reporterName: "Moe Lin",
    reason: "Duplicate promotional link.",
    status: "OPEN",
    createdAt: "2026-03-01"
  },
  {
    id: "r_7",
    type: "ABUSE",
    targetType: "COMMENT",
    targetId: "c_101",
    targetTitle: "Comment: 'You don't know what you're talking about...'",
    reporterName: "Ariana Wells",
    reason: "Personal attack in a technical discussion.",
    status: "IN_REVIEW",
    createdAt: "2026-03-02"
  },
  {
    id: "r_8",
    type: "MISINFORMATION",
    targetType: "POST",
    targetId: "p_9",
    targetTitle: "Cheap Web3 Marketing Scam",
    reporterName: "Hiroshi Tanaka",
    reason: "Phishing link detected in the body.",
    status: "OPEN",
    createdAt: "2026-03-03"
  },
  {
    id: "r_9",
    type: "HARASSMENT",
    targetType: "COMMENT",
    targetId: "c_205",
    targetTitle: "Comment: 'Stop posting these stupid tutorials.'",
    reporterName: "Zoe Wang",
    reason: "Repeated harassment towards a new member.",
    status: "RESOLVED",
    createdAt: "2026-02-25"
  },
  {
    id: "r_10",
    type: "SPAM",
    targetType: "POST",
    targetId: "p_2",
    targetTitle: "Next.js App Router Deep Dive",
    reporterName: "Leo Martinez",
    reason: "Incorrectly flagged as spam by mistake.",
    status: "RESOLVED",
    createdAt: "2026-02-24"
  },
   {
    id: "r_11",
    type: "HARASSMENT",
    targetType: "COMMENT",
    targetId: "c_205",
    targetTitle: "Comment: 'Stop posting these stupid tutorials.'",
    reporterName: "Zoe Wang",
    reason: "Repeated harassment towards a new member.",
    status: "RESOLVED",
    createdAt: "2026-02-25"
  },
  {
    id: "r_12",
    type: "SPAM",
    targetType: "POST",
    targetId: "p_2",
    targetTitle: "Next.js App Router Deep Dive",
    reporterName: "Leo Martinez",
    reason: "Incorrectly flagged as spam by mistake.",
    status: "RESOLVED",
    createdAt: "2026-02-24"
  }
];