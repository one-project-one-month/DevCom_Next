"use client";

import { useMemo } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import { ProfileLayoutView } from "@/app/profile/_components/profile-layout-view";
import type { ProfilePageData, ProfileOverview } from "@/app/profile/_types";
import { useMeQuery } from "@/hooks/use-auth";
import { apiFetch } from "@/lib/api/fetcher";
import { PanelCard } from "@/components/dashboard/shared";
import type { FeedPost } from "@/components/dashboard/types";

type UserResponse = {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    role?: string;
    location?: string;
    expertise?: string[];
    profileBgColor?: string;
  };
};

type FeedApiPost = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  status: "published" | "draft" | "flagged";
  helpfulCount: number;
  commentsCount: number;
  reactionCount: number;
  viewerHasHelpful?: boolean;
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

function buildHandle(input?: string) {
  if (!input) return "@user";
  return input.startsWith("@") ? input : `@${input}`;
}

function buildProfileOverview(source: UserResponse["user"], isOwnProfile: boolean): ProfileOverview {
  const handle = buildHandle(source.handle || source.email?.split("@")[0]);
  return {
    id: source.id,
    isOwnProfile,
    name: source.name,
    handle,
    role: source.role ?? "Member",
    location: source.location ?? "Location not set",
    avatarUrl: source.avatarUrl || undefined,
    profileBgColor: source.profileBgColor || undefined,
    bio: source.bio ?? "",
    expertise: source.expertise ?? [],
  };
}

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

function mapToFeedPost(post: FeedApiPost, isOwnProfile: boolean): FeedPost {
  return {
    id: post.id,
    isOwnPost: isOwnProfile,
    postType: "Post",
    name: post.author.name,
    handle: post.author.handle.startsWith("@") ? post.author.handle : `@${post.author.handle}`,
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

export function PublicProfileView({ handle }: { handle?: string }) {
  const { data: meData, isLoading: isLoadingMe } = useMeQuery();
  const normalizedHandle = (handle ?? "").replace(/^@/, "").toLowerCase();
  const isOwnProfile =
    meData?.user?.handle?.replace(/^@/, "").toLowerCase() === normalizedHandle;

  const userQuery = useQuery<UserResponse>({
    queryKey: ["profile", "handle", normalizedHandle],
    queryFn: () => apiFetch<UserResponse>(`/api/users/${normalizedHandle}`),
    enabled: Boolean(normalizedHandle),
    retry: false,
  });

  const postsQuery = useInfiniteQuery<FeedResponse>({
    queryKey: ["profile", "posts", normalizedHandle],
    queryFn: ({ pageParam }) =>
      apiFetch<FeedResponse>("/api/posts", {
        params: {
          limit: 6,
          cursor: pageParam ?? undefined,
          author: isOwnProfile ? "me" : userQuery.data?.user?.id,
        },
      }),
    enabled: Boolean(userQuery.data?.user?.id),
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextCursor : undefined),
    initialPageParam: undefined,
  });

  const profileData = useMemo<ProfilePageData | null>(() => {
    if (userQuery.data?.user) {
      const posts = postsQuery.data?.pages.flatMap((page) => page.posts) ?? [];
      return {
        profile: buildProfileOverview(userQuery.data.user, isOwnProfile),
        posts: posts.map((post) => mapToFeedPost(post, isOwnProfile)),
        hasMorePosts: postsQuery.hasNextPage ?? false,
      };
    }
    return null;
  }, [userQuery.data?.user, postsQuery.data?.pages, postsQuery.hasNextPage, isOwnProfile]);

  if (!profileData) {
    return (
      <div className="space-y-4">
        <PanelCard className="p-6 text-sm text-slate-600 dark:text-slate-300">
          {isLoadingMe || userQuery.isLoading ? "Loading profile..." : "User not found."}
        </PanelCard>
      </div>
    );
  }

  return (
    <ProfileLayoutView
      data={profileData}
      onLoadMore={() => postsQuery.fetchNextPage()}
      hasMorePosts={postsQuery.hasNextPage ?? false}
      isLoadingMore={postsQuery.isFetchingNextPage}
    />
  );
}
