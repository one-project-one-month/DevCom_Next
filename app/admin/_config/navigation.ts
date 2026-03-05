import {
  FileText,
  Flag,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { name: "Overview", href: "/admin/overview", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Posts", href: "/admin/posts", icon: FileText },
  { name: "Reports", href: "/admin/reports", icon: Flag },
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
  "/admin/posts": {
    title: "Post Moderation",
    subtitle: "Review and manage community content.",
  },
  "/admin/reports": {
    title: "Report Center",
    subtitle: "Handle reported content and violations.",
  },
  "/admin/settings": {
    title: "Platform Settings",
    subtitle: "Configure policy and moderation defaults.",
  },
};
