"use client";

import Image from "next/image";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import CommentSection from "@/app/PostDetail/CommentSection";
import CommentEditorSection from "@/app/PostDetail/CommentEditorSection";
import { Field } from "@/components/ui/field";
import PostContent from "@/app/PostDetail/PostContent";
import type { CommentDetail, PostDetail, ReplyDetail } from "@/app/PostDetail/_types";
import type { CommentItem } from "@/app/PostDetail/comment-types";
import type { FeedPost } from "@/components/dashboard/types";
import { PanelCard } from "@/components/dashboard/shared";
import { apiFetch } from "@/lib/api/fetcher";
import { useAuthStore } from "@/store/auth-store";
import {
  Dialog,
  DialogClose,
  DialogCloseIcon,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

type PostDetailDialogProps = {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatRelativeTime(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diffMs)) return "just now";
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;
  const months = Math.floor(days / 30);
  return `${months}mo`;
}

function mapPostDetailToFeed(post: PostDetail): FeedPost {
  return {
    id: post.id,
    isOwnPost: false,
    postType: "Post",
    name: post.author.name,
    handle: post.author.handle.startsWith("@")
      ? post.author.handle
      : `@${post.author.handle}`,
    avatarUrl: post.author.avatarUrl,
    time: formatRelativeTime(post.createdAt),
    title: post.title,
    content: post.body,
    imageUrl: post.imageUrl,
    tags: post.tags,
    helpful: post.helpfulCount,
    replies: post.commentsCount,
    saves: post.reactionCount,
    status: post.status,
    hasHelpful: post.viewerHasHelpful ?? false,
    hasReported: post.viewerHasReported ?? false,
  };
}

function mapCommentToItem(comment: CommentDetail): CommentItem {
  return {
    id: comment.id,
    authorId: comment.author.id,
    authorName: comment.author.name,
    authorHandle: comment.author.handle,
    authorAvatarUrl: comment.author.avatarUrl,
    createdAtLabel: formatRelativeTime(comment.createdAt),
    body: comment.body,
    isHidden: comment.status === "hidden",
    repliesCount: comment.repliesCount ?? 0,
  };
}

function mapReplyToItem(reply: ReplyDetail) {
  return {
    id: reply.id,
    commentId: reply.comment,
    authorId: reply.author.id,
    authorName: reply.author.name,
    authorHandle: reply.author.handle,
    authorAvatarUrl: reply.author.avatarUrl,
    createdAtLabel: formatRelativeTime(reply.createdAt),
    body: reply.body,
    isHidden: reply.status === "hidden",
  };
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function PostDetailDialog({
  postId,
  open,
  onOpenChange,
}: PostDetailDialogProps) {
  const user = useAuthStore((state) => state.user);
  const queryClient = useQueryClient();

  const postQuery = useQuery<{ post: PostDetail }>({
    queryKey: ["post", postId],
    queryFn: () => apiFetch<{ post: PostDetail }>(`/api/posts/${postId}`),
    enabled: open,
    retry: false,
  });

  const commentsQuery = useQuery<{ comments: CommentDetail[] }>({
    queryKey: ["post", postId, "comments"],
    queryFn: () =>
      apiFetch<{ comments: CommentDetail[] }>(`/api/posts/${postId}/comments`),
    enabled: open,
    retry: false,
  });

  const createComment = useMutation<
    { comment: CommentDetail },
    Error,
    { body: string }
  >({
    mutationFn: (payload) =>
      apiFetch<{ comment: CommentDetail }>(`/api/posts/${postId}/comments`, {
        method: "POST",
        body: payload,
      }),
    onSuccess: () => {
      queryClient.setQueryData<{ post: PostDetail }>(
        ["post", postId],
        (old) => {
          if (!old?.post) return old;
          return {
            post: { ...old.post, commentsCount: old.post.commentsCount + 1 },
          };
        },
      );

      commentsQuery.refetch();
      postQuery.refetch();
    },
  });

  const [repliesByCommentId, setRepliesByCommentId] = useState<
    Record<string, ReturnType<typeof mapReplyToItem>[]>
  >({});

  const loadReplies = async (commentId: string) => {
    if (repliesByCommentId[commentId]) return;
    const result = await apiFetch<{ replies: ReplyDetail[] }>(
      `/api/comments/${commentId}/replies`,
    );
    setRepliesByCommentId((prev) => ({
      ...prev,
      [commentId]: result.replies.map(mapReplyToItem),
    }));
  };

  const createReply = useMutation<
    { reply: ReplyDetail },
    Error,
    { commentId: string; body: string }
  >({
    mutationFn: (payload) =>
      apiFetch<{ reply: ReplyDetail }>(
        `/api/comments/${payload.commentId}/replies`,
        {
          method: "POST",
          body: { body: payload.body },
        },
      ),
    onSuccess: (data, variables) => {
      setRepliesByCommentId((prev) => ({
        ...prev,
        [variables.commentId]: [
          ...(prev[variables.commentId] ?? []),
          mapReplyToItem(data.reply),
        ],
      }));
      commentsQuery.refetch();
      postQuery.refetch();
    },
  });

  const deleteComment = useMutation<void, Error, string>({
    mutationFn: (commentId) =>
      apiFetch<void>(`/api/comments/${commentId}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.setQueryData<{ post: PostDetail }>(
        ["post", postId],
        (old) => {
          if (!old?.post) return old;
          return {
            post: {
              ...old.post,
              commentsCount: Math.max(0, old.post.commentsCount - 1),
            },
          };
        },
      );
      commentsQuery.refetch();
      postQuery.refetch();
    },
  });

  const deleteReply = useMutation<void, Error, string>({
    mutationFn: (replyId) =>
      apiFetch<void>(`/api/replies/${replyId}`, { method: "DELETE" }),
    onSuccess: () => {
      commentsQuery.refetch();
      postQuery.refetch();
    },
  });

  const hideComment = useMutation<{ comment: CommentDetail }, Error, string>({
    mutationFn: (commentId) =>
      apiFetch<{ comment: CommentDetail }>(`/api/comments/${commentId}/status`, {
        method: "PATCH",
        body: { status: "hidden" },
      }),
    onSuccess: () => {
      commentsQuery.refetch();
    },
  });

  const hideReply = useMutation<{ reply: ReplyDetail }, Error, string>({
    mutationFn: (replyId) =>
      apiFetch<{ reply: ReplyDetail }>(`/api/replies/${replyId}/status`, {
        method: "PATCH",
        body: { status: "hidden" },
      }),
    onSuccess: (data) => {
      setRepliesByCommentId((prev) => {
        const commentId = data.reply.comment;
        const replies = prev[commentId] ?? [];
        return {
          ...prev,
          [commentId]: replies.map((reply) =>
            reply.id === data.reply.id ? mapReplyToItem(data.reply) : reply,
          ),
        };
      });
    },
  });

  const post = postQuery.data?.post
    ? mapPostDetailToFeed(postQuery.data.post)
    : null;
  const comments =
    (commentsQuery.data?.comments ?? []).map((comment) => {
      const mapped = mapCommentToItem(comment);
      return {
        ...mapped,
        replies: repliesByCommentId[mapped.id] ?? [],
      };
    }) ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[80vh] w-[92vw] max-w-4xl flex-col overflow-hidden border-slate-200 bg-white p-0 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
        <DialogTitle className="sr-only">Post detail</DialogTitle>
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <div className="flex items-center gap-3">
            {post?.avatarUrl ? (
              <Image
                src={post.avatarUrl}
                alt={`${post.name} avatar`}
                width={40}
                height={40}
                className="h-9 w-9 rounded-full border border-slate-200 object-cover dark:border-slate-700"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 text-xs font-semibold text-white">
                {post?.name ? initialsFromName(post.name) : "PD"}
              </div>
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {post?.name ?? "Post detail"}
              </span>
              {post ? (
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {post.handle} • {post.time}
                </span>
              ) : null}
            </div>
          </div>
          <DialogClose aria-label="Close dialog">
            <DialogCloseIcon />
          </DialogClose>
        </div>

        <div className="flex-1 overflow-y-auto p-5 scrollbar-hidden sm:p-6">
          {postQuery.isLoading ? (
            <PanelCard className="p-6 text-sm text-slate-600 dark:text-slate-300">
              Loading post...
            </PanelCard>
          ) : null}

          {!postQuery.isLoading && !post ? (
            <PanelCard className="p-6 text-sm text-slate-600 dark:text-slate-300">
              Post not found.
            </PanelCard>
          ) : null}

          {post ? (
            <div className="space-y-5">
              {post.imageUrl ? (
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
                  <div className="max-h-150 w-full bg-slate-900/5 dark:bg-slate-950/40 sm:aspect-video">
                    <Image
                      src={post.imageUrl}
                      alt={`${post.title} visual`}
                      width={3000}
                      height={3000}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ) : null}
              <PostContent post={post} />
              <CommentSection
                comments={comments}
                onSubmitComment={(value) =>
                  createComment.mutate({ body: value })
                }
                onSubmitReply={(commentId, body) =>
                  createReply.mutate({ commentId, body })
                }
                onDeleteComment={(commentId) => deleteComment.mutate(commentId)}
                onDeleteReply={(replyId) => deleteReply.mutate(replyId)}
                onLoadReplies={loadReplies}
                isSubmitting={createComment.isPending}
                avatarUrl={user?.avatarUrl}
                currentUserId={user?.id}
                currentUserRole={user?.role}
                onHideComment={(commentId) => hideComment.mutate(commentId)}
                onHideReply={(replyId) => hideReply.mutate(replyId)}
                fixedEditor
                showEditor={false}
              />
            </div>
          ) : null}
        </div>

        <div className="border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
          <div className="flex justify-center items-center gap-2">
            {user?.avatarUrl ? (
              <Image
                width={500}
                height={500}
                src={user.avatarUrl}
                alt="User Avatar"
                className="h-10 w-10 rounded-full bg-slate-200 object-cover dark:bg-slate-700"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700" />
            )}
            <Field className="w-full">
              <CommentEditorSection
                onSubmit={(value) => createComment.mutate({ body: value })}
                isSubmitting={createComment.isPending}
                compact
              />
            </Field>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
