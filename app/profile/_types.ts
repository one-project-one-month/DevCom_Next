import type { FeedPost } from "@/components/dashboard/types";

export type ProfileOverview = {
  id: string;
  name: string;
  handle: string;
  role: string;
  location: string;
  avatarUrl?: string;
  bio: string;
  expertise: string[];
  stats: {
    threadsOpened: number;
    acceptedAnswers: number;
    guidesPublished: number;
    totalSaves: number;
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
