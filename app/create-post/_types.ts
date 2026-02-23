export type PostFormat = "Question" | "Guide" | "RFC" | "Build Log";
export type PostStatus = "Draft" | "Publish";

export type CreatePostFormData = {
  title: string;
  format: PostFormat;
  body: string;
  tags: string[];
  communityId: string;
  notifyReplies: boolean;
  notifyMentions: boolean;
  image: File | null;
};

export type CreatePostValidationErrors = Partial<Record<string, string>>;
