export type CommentItem = {
  id: string;
  authorName: string;
  authorHandle: string;
  authorAvatarUrl?: string;
  createdAtLabel: string;
  body: string;
  parentId?: string;
  replies?: CommentItem[];
};
