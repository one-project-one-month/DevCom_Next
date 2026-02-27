export type PostType = "Post";
export type PostStatus = "DRAFT" | "PUBLISHED";

export type ApiErrorResponse = {
  ok: false;
  error: {
    code:
      | "VALIDATION_ERROR"
      | "UNAUTHORIZED"
      | "FORBIDDEN"
      | "NOT_FOUND"
      | "CONFLICT"
      | "RATE_LIMITED"
      | "INTERNAL_ERROR";
    message: string;
    fields?: Array<{ field: string; message: string }>;
    requestId: string;
  };
};

export type PostAuthor = {
  id: string;
  name: string;
  handle: string;
  avatarUrl?: string;
};

export type PostStats = {
  replies: number;
  helpful: number;
  saves: number;
};

export type PostEntity = {
  id: string;
  title: string;
  body: string;
  postType: PostType;
  status: PostStatus;
  visibility: "PUBLIC";
  tags: string[];
  communityId?: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  author: PostAuthor;
  stats: PostStats;
};

export type CreatePostRequest = {
  title: string;
  body: string;
  postType: PostType;
  tags: string[];
  communityId?: string;
  notifyReplies: boolean;
  notifyMentions: boolean;
  imageId?: string;
};

export type SaveDraftRequest = CreatePostRequest;

export type CreatePostSuccessResponse = {
  ok: true;
  data: {
    post: PostEntity;
  };
  meta: {
    requestId: string;
  };
};

export type SaveDraftSuccessResponse = {
  ok: true;
  data: {
    post: PostEntity;
  };
  meta: {
    requestId: string;
  };
};

export type UploadImageSuccessResponse = {
  ok: true;
  data: {
    imageId: string;
    imageUrl: string;
    width: number;
    height: number;
    mimeType: "image/png" | "image/jpeg" | "image/webp";
    sizeBytes: number;
  };
  meta: {
    requestId: string;
  };
};

export type GetPostSuccessResponse = {
  ok: true;
  data: {
    post: PostEntity;
  };
  meta: {
    requestId: string;
  };
};
