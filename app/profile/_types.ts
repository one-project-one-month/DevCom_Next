import type { FeedPost } from "@/components/dashboard/types";

export type ProfileOverview = {
  id: string;
  isOwnProfile: boolean;
  name: string;
  handle: string;
  role: string;
  location: string;
  avatarUrl?: string;
  bio: string;
  expertise: string[];
  stats: {
    threads: number;
    helpful: number;
    replies: number;
    topTopics: number;
  };
};

export type TopicStat = {
  topic: string;
  count: number;
};

export type ProfilePageData = {
  profile: ProfileOverview;
  contributions: FeedPost[];
  topTopics: TopicStat[];
};
