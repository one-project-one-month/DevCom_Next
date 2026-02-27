export type PostType = "Post";
export type PostStatus = "Draft" | "Publish";

export type CreatePostFormData = {
  title: string;
  postType: PostType;
  body: string;
  tags: string[];
  communityId: string;
  notifyReplies: boolean;
  notifyMentions: boolean;
  image: File | null;
};

export type CreatePostValidationErrors = Partial<Record<string, string>>;
