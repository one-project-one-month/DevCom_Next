import { feedPosts } from "@/components/dashboard/data";
import type { FeedPost } from "@/components/dashboard/types";

export type PostDetailData = {
  post: FeedPost;
};

export function getPostDetailData(postId: string): PostDetailData | null {
  const post = feedPosts.find((item) => item.id === postId);
  if (!post) {
    return null;
  }

  return {
    post,
  };
}
