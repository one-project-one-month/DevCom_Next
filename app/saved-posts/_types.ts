import { FeedPostStatus, FeedPostType, FeedPostTag } from "@/components/dashboard/types";

export type SavedPost = {
  id: string,
  postType: FeedPostType,
  author: {
    id: string,
    name: string,
    email: string,
    avatar: string|null,
  },
  handle: string,
  time: string,
  title: string,
  status: FeedPostStatus,
  savedDate: string,
  tags: FeedPostTag[],
  stats: {
    helpful: number,
    replies: number,
    saves: number
  },
};

export type FilterFeedPostType = "All" | FeedPostType;
export type FilterFeedPostStatus = "All" | FeedPostStatus;
export type FilterFeedPostSortType = "newest" | "helpful";
