import type { LucideIcon } from "lucide-react";

export type ShortcutItem = {
  label: string;
  icon: LucideIcon;
};

export type ActivityItem = {
  user: string;
  action: string;
  time: string;
};

export type SuggestedUser = {
  name: string;
  handle: string;
};

export type FeedPost = {
  id: string;
  name: string;
  handle: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
};
