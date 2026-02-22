import { RoutePlaceholderPage } from "@/components/dashboard/route-placeholder-page";

export default function SavedPostsPage() {
  return (
    <RoutePlaceholderPage
      title="Saved Posts"
      description="This page will collect bookmarked threads for quick revisit."
      sections={[
        {
          heading: "Goal",
          items: ["Help users manage bookmarked knowledge threads."],
        },
        {
          heading: "Required UI Blocks",
          items: [
            "Filter bar by type (Question, Guide, RFC, Build Log) and status (Solved, Reviewing).",
            "Search input for title and tags.",
            "Saved thread cards/list.",
            "Bulk action toolbar when multiple items are selected.",
          ],
        },
        {
          heading: "Thread Card Fields",
          items: [
            "Title, author, format badge, status badge.",
            "Saved date and tags.",
            "Quick stats like helpful and replies.",
          ],
        },
        {
          heading: "Interactions",
          items: [
            "Unsave a single item.",
            "Mark item as reviewed.",
            "Open thread action.",
            "Filter + search + sort by newest saved and most helpful.",
          ],
        },
        {
          heading: "Edge Cases",
          items: [
            "No saved items state.",
            "No results after applying filters.",
            "Unsave failure with rollback UI state.",
          ],
        },
        {
          heading: "Definition of Done",
          items: [
            "Combined filtering and searching works correctly.",
            "Unsave and mark reviewed update UI immediately.",
            "State persists on refresh (local storage acceptable in MVP).",
          ],
        },
      ]}
    />
  );
}
