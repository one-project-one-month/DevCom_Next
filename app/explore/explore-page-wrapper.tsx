"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ExploreClient, ExploreRightSidebar } from "@/app/explore/explore-client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export function ExplorePageWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const searchQuery = searchParams.get("q") || "";
  const activeTag = searchParams.get("tag");

  function updateParams(newParams: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    const query = params.toString();
    router.push(`/explore${query ? `?${query}` : ""}`);
  }

  function handleTagClick(tag: string) {
    updateParams({ tag: activeTag === tag ? null : tag });
  }

  function handleSearchSubmit(query: string) {
    const normalized = query.trim().toLowerCase();
    updateParams({ q: normalized.length > 0 ? normalized : null });
  }

  function handleClearSearch() {
    updateParams({ q: null });
  }

  function handleClearAll() {
    router.push("/explore");
  }

  return (
    <DashboardShell
      rightSidebar={
        <ExploreRightSidebar activeTag={activeTag} onTagClick={handleTagClick} />
      }
    >
      <ExploreClient
        activeTag={activeTag}
        onTagClick={handleTagClick}
        searchQuery={searchQuery}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={handleClearSearch}
        onClearAll={handleClearAll}
      />
    </DashboardShell>
  );
}
