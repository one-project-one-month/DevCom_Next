"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Flame,
  Hash,
  Search,
  SlidersHorizontal,
  TrendingUp,
  X,
} from "lucide-react";
import Link from "next/link";

import { FeedPostCard } from "@/components/dashboard/feed-post-card";
import { PanelCard } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";
import { feedPosts, knowledgeTopics } from "@/components/dashboard/data";

const popularTags = [
  "TypeScript",
  "Next.js",
  "React",
  "Backend",
  "DevOps",
  "CI/CD",
  "Performance",
  "Security",
  "Database",
  "API Design",
  "Design Systems",
  "Observability",
  "Reliability",
  "DX",
  "Distributed Systems",
];

export function ExploreClient({
  activeTag,
  onTagClick,
  searchQuery = "",
  onSearchSubmit,
  onClearSearch,
  onClearAll,
}: {
  activeTag: string | null;
  onTagClick: (tag: string) => void;
  searchQuery?: string;
  onSearchSubmit?: (query: string) => void;
  onClearSearch?: () => void;
  onClearAll?: () => void;
}) {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const hasSearchQuery = normalizedSearch.length > 0;
  const normalizedActiveTag = activeTag?.trim().toLowerCase() ?? "";

  const tagExistsInPosts = useMemo(() => {
    if (!normalizedActiveTag) {
      return false;
    }
    return feedPosts.some((post) =>
      post.tags.some((tag) => tag.toLowerCase() === normalizedActiveTag),
    );
  }, [normalizedActiveTag]);

  const filteredPosts = useMemo(() => {
    return feedPosts.filter((post) => {
      if (
        tagExistsInPosts &&
        !post.tags.some((tag) => tag.toLowerCase() === normalizedActiveTag)
      ) {
        return false;
      }

      if (hasSearchQuery) {
        const matchesTitle = post.title
          .toLowerCase()
          .includes(normalizedSearch);
        const matchesContent = post.content
          .toLowerCase()
          .includes(normalizedSearch);
        const matchesTags = post.tags.some((tag) =>
          tag.toLowerCase().includes(normalizedSearch),
        );
        const matchesName = post.name.toLowerCase().includes(normalizedSearch);

        if (!matchesTitle && !matchesContent && !matchesTags && !matchesName) {
          return false;
        }
      }

      return true;
    });
  }, [tagExistsInPosts, normalizedActiveTag, hasSearchQuery, normalizedSearch]);

  const hasActiveFilters = useMemo(
    () => Boolean((tagExistsInPosts && activeTag) || hasSearchQuery),
    [activeTag, tagExistsInPosts, hasSearchQuery],
  );

  return (
    <section className="space-y-5">
      <div className="sticky top-0 z-20 pb-2">
        <PanelCard className="border-slate-200/80 bg-white/85 p-4 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
            <Search className="h-4 w-4 text-slate-400 dark:text-slate-500" />
            <input
              value={localQuery}
              onChange={(event) => setLocalQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  onSearchSubmit?.(localQuery);
                }
              }}
              className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
              placeholder="Search posts by title, content, tags, or author"
              aria-label="Search posts"
            />
            {localQuery ? (
              <button
                onClick={() => {
                  setLocalQuery("");
                  onClearSearch?.();
                }}
                className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-600 dark:text-slate-500 dark:hover:bg-slate-700 dark:hover:text-slate-300"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
          <button
            onClick={() => onSearchSubmit?.(localQuery)}
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        </PanelCard>
      </div>

      {hasActiveFilters ? (
        <div className="px-1 flex items-center gap-2 justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {filteredPosts.length} posts
            {hasSearchQuery ? (
              <span>
                {" "}
                for{" "}
                <span className="font-semibold italic text-slate-900 dark:text-slate-100">
                  &quot;{searchQuery.trim()}&quot;
                </span>
              </span>
            ) : null}
          </p>
        </div>
      ) : null}

      {hasActiveFilters ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            Filters:
          </span>

          {hasSearchQuery ? (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              Search: {searchQuery.trim()}
            </span>
          ) : null}

          {activeTag && tagExistsInPosts ? (
            <button
              onClick={() => onTagClick(activeTag)}
              className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs text-blue-700 transition hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
            >
              #{activeTag}
              <X className="h-3 w-3" />
            </button>
          ) : null}

          {hasSearchQuery ? (
            <button
              onClick={onClearAll}
              className="ml-auto inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            >
              Clear all
              <X className="h-3 w-3" />
            </button>
          ) : null}
        </div>
      ) : null}

      {filteredPosts.length > 0 ? (
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <FeedPostCard
              key={post.id}
              post={post}
              showCommentBox={false}
              className="transition hover:shadow-md"
            />
          ))}
        </div>
      ) : (
        <PanelCard className="py-16 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No posts match this filter.
          </p>
        </PanelCard>
      )}
    </section>
  );
}

export function ExploreRightSidebar({
  activeTag,
  onTagClick,
}: {
  activeTag: string | null;
  onTagClick: (tag: string) => void;
}) {
  return (
    <aside className="space-y-5">
      <PanelCard className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <Flame className="h-4 w-4 text-rose-500" />
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Trending Topics
          </p>
        </div>
        <ul className="space-y-2">
          {knowledgeTopics.map((topic) => (
            <li key={topic.label}>
              <button
                onClick={() => onTagClick(topic.label)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
                  activeTag === topic.label
                    ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
                )}
              >
                <span className="flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                  {topic.label}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {topic.threads}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </PanelCard>

      <PanelCard className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Popular Tags
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {popularTags.map((tag) => (
            <button
              key={tag}
              onClick={() => onTagClick(tag)}
              className={cn(
                "rounded-full border px-2.5 py-1 text-xs transition",
                activeTag === tag
                  ? "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-300"
                  : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      </PanelCard>

      <PanelCard className="p-4">
        <p className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
          Share Knowledge
        </p>
        <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
          Post a question, guide, or RFC to help the community.
        </p>
        <Link
          href="/create-post"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <ArrowUpRight className="h-4 w-4" /> Create Post
        </Link>
      </PanelCard>
    </aside>
  );
}
