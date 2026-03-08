"use client";

import { useRouter } from "next/navigation";
import {
  ExploreClient,
  ExploreRightSidebar,
} from "@/app/explore/_components/explore-client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

type ExplorePageViewProps = {
  searchQuery: string;
  activeTag: string | null;
};

export function ExplorePageView({
  searchQuery,
  activeTag,
}: ExplorePageViewProps) {
  const router = useRouter();

  function updateParams(newParams: Record<string, string | null>) {
    const params = new URLSearchParams(window.location.search);
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

  function handleClearAll() {
    router.push("/explore");
  }

  return (
    <DashboardShell
      rightSidebar={
        <ExploreRightSidebar
          activeTag={activeTag}
          onTagClick={handleTagClick}
        />
      }
    >
      <ExploreClient
        activeTag={activeTag}
        onTagClick={handleTagClick}
        searchQuery={searchQuery}
        onClearAll={handleClearAll}
      />
    </DashboardShell>
  );
}
