export type PostDetailAuthor = {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
};

export type PostDetail = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  imageUrl?: string;
  status: "published" | "draft" | "flagged";
  helpfulCount: number;
  viewerHasHelpful?: boolean;
  viewerHasReported?: boolean;
  commentsCount: number;
  reactionCount: number;
  createdAt: string;
  updatedAt: string;
  author: PostDetailAuthor;
};

export type CommentDetail = {
  id: string;
  post: string;
  body: string;
  parentId?: string;
  createdAt: string;
  updatedAt: string;
  author: PostDetailAuthor;
  replies?: CommentDetail[];
};
