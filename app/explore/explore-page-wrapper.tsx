"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ExploreClient, ExploreRightSidebar } from "@/app/explore/explore-client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export function ExplorePageWrapper() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const searchQuery = searchParams.get("q") || "";
    const activeTag = searchParams.get("tag");
    const formatFilter = searchParams.get("format");

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

    function handleFormatChange(format: string | null) {
        updateParams({ format: formatFilter === format ? null : format });
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
                formatFilter={formatFilter}
                onFormatChange={handleFormatChange}
                onClearAll={handleClearAll}
            />
        </DashboardShell>
    );
}
