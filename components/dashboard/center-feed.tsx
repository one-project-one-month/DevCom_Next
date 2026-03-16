"use client";

import { useMemo, useRef, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { FeedPostCard } from "@/components/dashboard/feed-post-card";
import { PanelCard } from "@/components/dashboard/shared";
import type { FeedPost } from "@/components/dashboard/types";
import { apiFetch } from "@/lib/api/fetcher";
import { useAuthStore } from "@/store/auth-store";

function PostCreatorCard() {
  return (
    <PanelCard className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Create Hub
        </p>
      </div>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Create detailed posts in the dedicated editor with validation, tags,
        attachments, and draft/publish flow.
      </p>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Link
          href="/create-post"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400"
        >
          <FileText className="h-3.5 w-3.5" />
          Open Editor
        </Link>
        <Link
          href="/create-post"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Create Post
        </Link>
      </div>
    </PanelCard>
  );
}

type FeedApiPost = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  imageUrl?: string;
  status: "published" | "draft" | "flagged";
  helpfulCount: number;
  commentsCount: number;
  reactionCount: number;
  viewerHasHelpful?: boolean;
  viewerHasReported?: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
  };
};

type FeedResponse = {
  posts: FeedApiPost[];
  nextCursor?: string;
  hasMore: boolean;
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

function mapToFeedPost(post: FeedApiPost, viewerId?: string): FeedPost {
  return {
    id: post.id,
    isOwnPost: viewerId ? post.author.id === viewerId : false,
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

export function CenterFeed() {
  const viewerId = useAuthStore((state) => state.user?.id);
  const searchParams = useSearchParams();
  const searchQuery = (searchParams.get("q") ?? "").trim().toLowerCase();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const feedQuery = useInfiniteQuery<FeedResponse>({
    queryKey: ["feed", searchQuery],
    queryFn: ({ pageParam }) =>
      apiFetch<FeedResponse>("/api/posts", {
        params: {
          limit: 8,
          cursor: (pageParam as string) ?? undefined,
          q: searchQuery || undefined,
        },
      }),
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,
  });

  const posts = useMemo(() => {
    const flat = feedQuery.data?.pages.flatMap((page) => page.posts) ?? [];
    return flat.map((post) => mapToFeedPost(post, viewerId));
  }, [feedQuery.data?.pages, viewerId]);

  const filteredPosts = useMemo(() => {
    if (!searchQuery) return posts;

    return posts.filter((post) => {
      const matchesTitle = post.title.toLowerCase().includes(searchQuery);
      const matchesTags = post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery),
      );
      const matchesName = post.name.toLowerCase().includes(searchQuery);
      const matchesHandle = post.handle.toLowerCase().includes(searchQuery);

      return matchesTitle || matchesTags || matchesName || matchesHandle;
    });
  }, [posts, searchQuery]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;
    if (!feedQuery.hasNextPage || feedQuery.isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          feedQuery.fetchNextPage();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [
    feedQuery.hasNextPage,
    feedQuery.isFetchingNextPage,
    feedQuery.fetchNextPage,
    feedQuery,
  ]);

  return (
    <section className="space-y-5">
      <PostCreatorCard />

      {feedQuery.isLoading ? (
        <PanelCard className="p-6 text-sm text-slate-600 dark:text-slate-300">
          Loading feed...
        </PanelCard>
      ) : null}

      {!feedQuery.isLoading && posts.length === 0 ? (
        <PanelCard className="p-6 text-center text-sm text-slate-600 dark:text-slate-300">
          No posts yet. Be the first to share something useful.
        </PanelCard>
      ) : null}

      {!feedQuery.isLoading && posts.length > 0 && filteredPosts.length === 0 ? (
        <PanelCard className="p-6 text-center text-sm text-slate-600 dark:text-slate-300">
          No posts match this search.
        </PanelCard>
      ) : null}

      {filteredPosts.map((post) => (
        <FeedPostCard
          key={post.id}
          post={post}
          highlightQuery={searchQuery}
        />
      ))}

      <div ref={loadMoreRef} />

      {feedQuery.isFetchingNextPage ? (
        <PanelCard className="p-4 text-sm text-slate-600 dark:text-slate-300">
          Loading more...
        </PanelCard>
      ) : null}

      {!feedQuery.hasNextPage && posts.length > 0 ? (
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          You&apos;ve reached the end.
        </p>
      ) : null}
    </section>
  );
}
