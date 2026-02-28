import { Suspense } from "react";
import { ExplorePageWrapper } from "@/app/explore/explore-page-wrapper";

export default function ExplorePage() {
  return (
    <Suspense fallback={<div>Loading explore...</div>}>
      <ExplorePageWrapper />
    </Suspense>
  );
}
