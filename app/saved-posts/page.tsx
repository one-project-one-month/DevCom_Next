import { Suspense } from "react";
import { SavedPostsPageView } from "@/app/saved-posts/_components/saved-posts-page-view";

export default function SavedPostsPage() {
  return (
    <Suspense fallback={null}>
      <SavedPostsPageView />
    </Suspense>
  );
}
