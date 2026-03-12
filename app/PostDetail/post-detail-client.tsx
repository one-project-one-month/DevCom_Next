"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import CommentSection from "@/app/PostDetail/CommentSection";
import PostContent from "@/app/PostDetail/PostContent";
import { PanelCard } from "@/components/dashboard/shared";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { apiFetch } from "@/lib/api/fetcher";
import { useMeQuery } from "@/hooks/use-auth";
import type { FeedPost } from "@/components/dashboard/types";
import type { CommentDetail, PostDetail } from "@/app/PostDetail/_types";
import type { CommentItem } from "@/app/PostDetail/comment-types";

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
    tags: post.tags,
    helpful: post.helpfulCount,
    replies: post.commentsCount,
    saves: post.reactionCount,
    status: post.status,
    hasHelpful: post.viewerHasHelpful ?? false,
  };
}

function mapCommentToItem(comment: CommentDetail): CommentItem {
  return {
    id: comment.id,
    authorName: comment.author.name,
    authorHandle: comment.author.handle,
    authorAvatarUrl: comment.author.avatarUrl,
    createdAtLabel: formatRelativeTime(comment.createdAt),
    body: comment.body,
    parentId: comment.parentId,
    replies: comment.replies?.map(mapCommentToItem) ?? [],
  };
}

export default function PostDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { data: meData } = useMeQuery();
  const queryClient = useQueryClient();

  const postQuery = useQuery<{ post: PostDetail }>({
    queryKey: ["post", id],
    queryFn: () => apiFetch<{ post: PostDetail }>(`/api/posts/${id}`),
    retry: false,
  });

  const commentsQuery = useQuery<{ comments: CommentDetail[] }>({
    queryKey: ["post", id, "comments"],
    queryFn: () =>
      apiFetch<{ comments: CommentDetail[] }>(`/api/posts/${id}/comments`),
    retry: false,
  });

  const createComment = useMutation<
    { comment: CommentDetail },
    Error,
    { body: string; parentId?: string }
  >({
    mutationFn: (payload) =>
      apiFetch<{ comment: CommentDetail }>(`/api/posts/${id}/comments`, {
        method: "POST",
        body: payload,
      }),
    onSuccess: () => {
      queryClient.setQueryData<{ post: PostDetail }>(["post", id], (old) => {
        if (!old?.post) return old;
        return {
          post: { ...old.post, commentsCount: old.post.commentsCount + 1 },
        };
      });

      commentsQuery.refetch();
      postQuery.refetch();
    },
  });

  if (postQuery.isLoading) {
    return (
      <DashboardShell>
        <PanelCard className="p-6 text-sm text-slate-600 dark:text-slate-300">
          Loading post...
        </PanelCard>
      </DashboardShell>
    );
  }

  if (!postQuery.data?.post) {
    return (
      <DashboardShell>
        <PanelCard className="p-6 text-sm text-slate-600 dark:text-slate-300">
          Post not found.
        </PanelCard>
      </DashboardShell>
    );
  }

  const post = mapPostDetailToFeed(postQuery.data.post);
  const comments = (commentsQuery.data?.comments ?? []).map(mapCommentToItem);

  return (
    <DashboardShell>
      <div className="mx-auto flex w-full max-w-255 flex-col gap-4 pb-8 pt-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <PanelCard className="mx-auto w-full grow border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.07)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          {post.imageUrl ? (
            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <Image
                src={post.imageUrl}
                alt={`${post.title} visual`}
                width={1200}
                height={700}
                className="max-h-115 w-full object-contain"
              />
            </div>
          ) : null}
          <PostContent post={post} />
          <CommentSection
            comments={comments}
            onSubmitComment={(value) => createComment.mutate({ body: value })}
            onSubmitReply={(commentId, body) =>
              createComment.mutate({ body, parentId: commentId })
            }
            isSubmitting={createComment.isPending}
            avatarUrl={meData?.user?.avatarUrl}
          />
        </PanelCard>
      </div>
    </DashboardShell>
  );
}
