import { Suspense } from "react";
import { ExplorePageWrapper } from "@/app/explore/_components/explore-page-wrapper";

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExplorePageWrapper />
    </Suspense>
  );
}
