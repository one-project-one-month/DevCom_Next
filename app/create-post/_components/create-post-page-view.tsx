import { CreatePostForm } from "@/app/create-post/_components/create-post-form";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

type CreatePostPageViewProps = {
  editId: string | null;
};

export function CreatePostPageView({ editId }: CreatePostPageViewProps) {
  return (
    <DashboardShell>
      <CreatePostForm key={editId ?? "new"} editId={editId} />
    </DashboardShell>
  );
}
