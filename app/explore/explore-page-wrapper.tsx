"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ExploreClient, ExploreRightSidebar } from "@/app/explore/explore-client";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export function ExplorePageWrapper() {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("q") || "";
    const [activeTag, setActiveTag] = useState<string | null>(null);

    function handleTagClick(tag: string) {
        setActiveTag((prev) => (prev === tag ? null : tag));
    }

    return (
        <DashboardShell
            rightSidebar={
                <ExploreRightSidebar activeTag={activeTag} onTagClick={handleTagClick} />
            }
        >
            <ExploreClient activeTag={activeTag} onTagClick={handleTagClick} searchQuery={searchQuery} />
        </DashboardShell>
    );
}
