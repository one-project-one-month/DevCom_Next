"use client";

import { useMemo, useState } from "react";

import { FeedPostCard } from "@/components/dashboard/feed-post-card";
import { PanelCard } from "@/components/dashboard/shared";
import type { FeedPost } from "@/components/dashboard/types";

type ContributionSort = "latest" | "most_helpful";

export function ProfileContributionsCard({ contributions }: { contributions: FeedPost[] }) {
  const [sortBy, setSortBy] = useState<ContributionSort>("latest");

  const sortedContributions = useMemo(() => {
    if (sortBy === "most_helpful") {
      return [...contributions].sort((a, b) => b.helpful - a.helpful);
    }

    return [...contributions].sort((a, b) => Number(b.id) - Number(a.id));
  }, [contributions, sortBy]);

  return (
    <PanelCard className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">Recent Contributions</h2>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value as ContributionSort)}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          aria-label="Sort contributions"
        >
          <option value="latest">Latest</option>
          <option value="most_helpful">Most Helpful</option>
        </select>
      </div>

      {sortedContributions.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-5 text-center dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-300">No contributions yet.</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Create your first thread to start sharing knowledge.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedContributions.map((post) => (
            <FeedPostCard
              key={post.id}
              post={post}
              showAuthor={false}
              showCommentBox={false}
            />
          ))}
        </div>
      )}
    </PanelCard>
  );
}
