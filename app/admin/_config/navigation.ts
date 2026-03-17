import { Flag, LayoutDashboard, Settings, Users } from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Moderation", href: "/admin/moderation", icon: Flag },
  { name: "Settings", href: "/admin/settings", icon: Settings },
] as const;

export const ADMIN_ROUTE_TITLES: Record<
  string,
  { title: string; subtitle: string }
> = {
  "/admin/overview": {
    title: "Dashboard Overview",
    subtitle: "Welcome back, Admin.",
  },
  "/admin/users": {
    title: "User Management",
    subtitle: "Manage community members and permissions.",
  },
  "/admin/moderation": {
    title: "Moderation Queue",
    subtitle: "Review flagged posts and reports together.",
  },
  "/admin/settings": {
    title: "Platform Settings",
    subtitle: "Configure policy and moderation defaults.",
  },
};
