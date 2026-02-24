import type { AdminPanel } from "@/app/admin/_types";

export const adminPanels: AdminPanel[] = [
  { key: "overview", label: "Overview", description: "Platform health and KPI summary." },
  { key: "users", label: "Users", description: "Review user status and moderation actions." },
  { key: "posts", label: "Posts", description: "Inspect posts and content visibility controls." },
  { key: "reports", label: "Reports", description: "Process reports and apply moderation decisions." },
  { key: "settings", label: "Settings", description: "Admin configuration and policy controls." },
];
