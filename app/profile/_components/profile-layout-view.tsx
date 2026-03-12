 "use client";

import { useEffect, useRef } from "react";

import { ProfileHeaderCard } from "@/app/profile/_components/profile-header-card";
import type { ProfilePageData } from "@/app/profile/_types";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { FeedPostCard } from "@/components/dashboard/feed-post-card";

export function ProfileLayoutView({
  data,
  onLoadMore,
  hasMorePosts,
  isLoadingMore,
}: {
  data: ProfilePageData;
  onLoadMore: () => void;
  hasMorePosts: boolean;
  isLoadingMore: boolean;
}) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMorePosts || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMorePosts, isLoadingMore, onLoadMore]);

  return (
    <DashboardShell narrowContent>
      <div className="space-y-5 pb-8">
        <ProfileHeaderCard profile={data.profile} />

        {data.posts.length === 0 ? (
          <PanelCard className="p-6 text-center">
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No posts yet
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Share your first post and it will appear here.
            </p>
          </PanelCard>
        ) : (
          <div className="space-y-5">
            {data.posts.map((post) => (
              <FeedPostCard key={post.id} post={post} showAuthor={false} />
            ))}
          </div>
        )}

        {data.posts.length > 0 ? <div ref={loadMoreRef} /> : null}

        {isLoadingMore ? (
          <PanelCard className="p-4 text-sm text-slate-600 dark:text-slate-300">
            Loading more...
          </PanelCard>
        ) : null}

        {!hasMorePosts && data.posts.length > 0 ? (
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            You&apos;ve reached the end.
          </p>
        ) : null}
      </div>
    </DashboardShell>
  );
}
