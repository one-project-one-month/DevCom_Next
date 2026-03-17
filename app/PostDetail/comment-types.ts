export type CommentItem = {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatarUrl?: string;
  createdAtLabel: string;
  body: string;
  isHidden?: boolean;
  repliesCount: number;
  replies?: ReplyItem[];
};

export type ReplyItem = {
  id: string;
  commentId: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatarUrl?: string;
  createdAtLabel: string;
  body: string;
  isHidden?: boolean;
};
