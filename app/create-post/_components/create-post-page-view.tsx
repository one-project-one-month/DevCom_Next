import { CreatePostForm } from "@/app/create-post/_components/create-post-form";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export function CreatePostPageView() {
  return (
    <DashboardShell>
      <CreatePostForm />
    </DashboardShell>
  );
}
