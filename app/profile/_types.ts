import type { FeedPost } from "@/components/dashboard/types";

export type ProfileOverview = {
  id: string;
  isOwnProfile: boolean;
  name: string;
  handle: string;
  role: string;
  location: string;
  avatarUrl?: string;
  profileBgColor?: string;
  bio: string;
  expertise: string[];
};

export type ProfilePageData = {
  profile: ProfileOverview;
  posts: FeedPost[];
  hasMorePosts: boolean;
};
