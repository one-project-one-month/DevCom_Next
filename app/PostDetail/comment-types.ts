export type CommentItem = {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatarUrl?: string;
  createdAtLabel: string;
  body: string;
  isHidden?: boolean;
  parentId?: string;
  replies?: CommentItem[];
};
