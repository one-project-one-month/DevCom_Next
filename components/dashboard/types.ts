import type { LucideIcon } from "lucide-react";

export type ShortcutItem = {
  label: string;
  icon: LucideIcon;
  href: string;
};

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  impact: string;
};

export type SuggestedUser = {
  name: string;
  handle: string;
  focus: string;
};

export type FeedPost = {
  status?: string;
  id: string;
  isOwnPost?: boolean;
  postType: "Post";
  name: string;
  handle: string;
  time: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  helpful: number;
  replies: number;
  saves: number;
};
