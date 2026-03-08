import { ExplorePageView } from "@/app/explore/_components/explore-page-view";

export default function ExplorePage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const queryParam = searchParams?.q;
  const tagParam = searchParams?.tag;

  const searchQuery = Array.isArray(queryParam)
    ? queryParam[0] ?? ""
    : queryParam ?? "";
  const activeTag = Array.isArray(tagParam) ? tagParam[0] ?? null : tagParam ?? null;

  return <ExplorePageView searchQuery={searchQuery} activeTag={activeTag} />;
}
