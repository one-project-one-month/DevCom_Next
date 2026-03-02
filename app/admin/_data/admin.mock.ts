import type { AdminPanel, ReportRow, UserRow } from "@/app/admin/_types";

export const adminPanels: AdminPanel[] = [
  { key: "overview", label: "Overview", description: "Platform health and KPI summary." },
  { key: "users", label: "Users", description: "Review user status and moderation actions." },
  { key: "posts", label: "Posts", description: "Inspect posts and content visibility controls." },
  { key: "reports", label: "Reports", description: "Process reports and apply moderation decisions." },
  { key: "settings", label: "Settings", description: "Admin configuration and policy controls." },
];

export const adminUsers: UserRow[] = [
  {
    id: "u_1001",
    name: "Ariana Wells",
    handle: "@ariana.dev",
    role: "member",
    status: "active",
    joinedAt: "2026-01-12",
  },
  {
    id: "u_1002",
    name: "Leo Martinez",
    handle: "@leocodes",
    role: "moderator",
    status: "active",
    joinedAt: "2025-10-05",
  },
  {
    id: "u_1003",
    name: "Maya Chen",
    handle: "@maya.dev",
    role: "member",
    status: "suspended",
    joinedAt: "2025-08-21",
  },
  {
    id: "u_1004",
    name: "Nina Park",
    handle: "@nina.codes",
    role: "admin",
    status: "active",
    joinedAt: "2024-11-30",
  },
];

export const adminReports: ReportRow[] = [
  {
    id: "r_9201",
    type: "spam",
    targetType: "post",
    targetId: "1",
    targetTitle: "How are teams versioning shared Zod schemas across services?",
    reporterName: "Kai Ohn",
    reason: "Duplicate promotional link across multiple threads.",
    status: "open",
    createdAt: "2026-03-01",
  },
  {
    id: "r_9202",
    type: "abuse",
    targetType: "comment",
    targetId: "c_2109",
    targetTitle: "Comment under RFC: Unified design token governance",
    reporterName: "Moe Lin",
    reason: "Personal attack in technical discussion.",
    status: "in_review",
    createdAt: "2026-02-28",
  },
  {
    id: "r_9203",
    type: "misinformation",
    targetType: "post",
    targetId: "6",
    targetTitle: "Route-level code splitting checklist for large dashboards",
    reporterName: "Rin Su",
    reason: "Unsafe production command with destructive side effects.",
    status: "resolved",
    createdAt: "2026-02-25",
  },
  {
    id: "r_9204",
    type: "harassment",
    targetType: "comment",
    targetId: "c_2114",
    targetTitle: "Comment under Knowledge feed UX migration notes",
    reporterName: "Aung Min",
    reason: "Repeated hostile replies after moderation warning.",
    status: "open",
    createdAt: "2026-03-02",
  },
];

export const adminOverviewStats = [
  { label: "Total Users", value: "24,180" },
  { label: "Open Reports", value: "37" },
  { label: "New Posts (7d)", value: "412" },
  { label: "Suspended Users", value: "63" },
];
