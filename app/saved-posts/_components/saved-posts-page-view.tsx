"use client"

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { PanelCard } from "@/components/dashboard/shared";
import { savedPosts } from "@/app/saved-posts/_data/saved-posts.mock";
import { SearchBlock } from "@/app/saved-posts/_components/search-block";
import { useMemo, useState } from "react";
import { FilterBlock } from "@/app/saved-posts/_components/filter-block";
import { FilterFeedPostType, FilterFeedPostSortType, FilterFeedPostStatus, SavedPost } from "@/app/saved-posts/_types";
import { SavedPostCard } from "@/app/saved-posts/_components/saved-post-card";
import { SelectBulkSection } from "@/app/saved-posts/_components/select-bulk-section";
import { useSavedPostsFilters } from "@/app/saved-posts/_hook/use-saved-post-filters";
import { useBulkSelection } from "@/app/saved-posts/_hook/use-bulk-selection";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

type PostId = SavedPost["id"];

type SavedPostControlsProps = {
  query: string;
  setQuery: (query: string) => void;
  type: FilterFeedPostType;
  setType: (type: FilterFeedPostType) => void;
  status: FilterFeedPostStatus;
  setStatus: (status: FilterFeedPostStatus) => void;
  sort: FilterFeedPostSortType;
  setSort: (sort: FilterFeedPostSortType) => void;
  onClearQuery: () => void;
  onClearFilter: () => void;
  className?: string;
};

function SavedPostControls({
  query,
  setQuery,
  type,
  setType,
  status,
  setStatus,
  sort,
  setSort,
  onClearQuery,
  onClearFilter,
  className
}: SavedPostControlsProps) {
  return (
    <div className={className}>
      <SearchBlock query={query} onQuery={setQuery} onClear={onClearQuery} />
      <FilterBlock
        type={type}
        onTypeChange={setType}
        status={status}
        onStatusChange={setStatus}
        sort={sort}
        onSortChange={setSort}
        onClear={onClearFilter}
      />
    </div>
  );
}

export function SavedPostsPageView() {
  const [posts] = useState<SavedPost[]>(savedPosts);
  const [isMobileControlsOpen, setIsMobileControlsOpen] = useState(false);

  const { query, filters, setQuery, setFilters, resetQuery, resetFilters } = useSavedPostsFilters();
  const { type, status, sort } = filters;

  const filteredPosts = useMemo(() => {
    let rows = [...posts];

    if (type !== "All") rows = rows.filter(t => t.postType === type);

    if (status !== "All") rows = rows.filter(t => t.status === status);

    if (query) rows = rows.filter((row) =>
      row.title.toLowerCase().includes(query.toLowerCase())
      || row.tags.some(tag => tag.name.toLowerCase().includes(query.toLowerCase()))
    );

    if (sort === "helpful") rows.sort((a, b) => b.stats.helpful - a.stats.helpful);

    return rows;
  }, [posts, type, status, query, sort]);

  const postIds = useMemo(
    () => filteredPosts.map((p) => p.id),
    [filteredPosts]
  );

  const selection = useBulkSelection<PostId>(postIds);
  const hasSelectedPosts = selection.selectedIds.size > 0;

  return (
    <DashboardShell rightSidebar={
      <SavedPostControls
        query={query}
        setQuery={(query) => setQuery(query)}
        type={type}
        setType={(type) => setFilters({ type: type })}
        status={status}
        setStatus={(status) => setFilters({ status: status })}
        sort={sort}
        setSort={(sort) => setFilters({ sort: sort })}
        onClearQuery={resetQuery}
        onClearFilter={resetFilters}
        className="space-y-2"
      />
    }>
      <div className="space-y-4 pb-8">
        <PanelCard className="p-6">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Saved Posts</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Manage posts you've saved for later.
          </p>
        </PanelCard>
        <div className="px-2 min-[981px]:hidden">
          <Sheet open={isMobileControlsOpen} onOpenChange={setIsMobileControlsOpen}>
            <SheetTrigger asChild>
              <Button className="w-full justify-center gap-2" variant="outline">
                <SlidersHorizontal className="size-4" />
                Search & Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[92vw] max-w-105 overflow-y-auto p-0">
              <SheetHeader className="border-b border-slate-200 dark:border-slate-800">
                <SheetTitle>Search & Filters</SheetTitle>
                <SheetDescription>
                  Quickly find the saved post you need.
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-3 p-4">
                <SavedPostControls
                  query={query}
                  setQuery={(query) => setQuery(query)}
                  type={type}
                  setType={(type) => setFilters({ type: type })}
                  status={status}
                  setStatus={(status) => setFilters({ status: status })}
                  sort={sort}
                  setSort={(sort) => setFilters({ sort: sort })}
                  onClearQuery={resetQuery}
                  onClearFilter={resetFilters}
                  className="space-y-3"
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className={`px-2 ${hasSelectedPosts ? "pb-24 md:pb-0" : ""}`}>
          <SelectBulkSection
            allSelected={selection.isAllSelected}
            someSelected={selection.isSomeSelected}
            selectedCount={selection.selectedIds.size}
            visibleCount={filteredPosts.length}
            onToggleAll={selection.toggleAll}
            onClearAll={selection.clearAll}
            onBulkUnsave={() => {
              console.log("Unsave:", selection.selectedIds);
            }}
          />

          <div className="space-y-4">
            { filteredPosts.length === 0
              ? (
                <div className="w-full mt-10 lg:h-[80vh] grid place-content-center">No posts found</div>
              )
              : filteredPosts.map((post: SavedPost) => (
                  <SavedPostCard
                    key={post.id}
                    post={post}
                    isSelected={selection.selectedIds.has(post.id)}
                    onSelect={selection.setSelected}
                  />
                )
              )}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
