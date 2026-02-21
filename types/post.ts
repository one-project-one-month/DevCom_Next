export type FeedFilter = "trending" | "latest" | "following";

export type Post = {
  id: string;
  author: string;
  handle: string;
  content: string;
  likes: number;
  comments: number;
  tags: string[];
  filter: FeedFilter;
};

export type NewPostInput = {
  content: string;
};
