import Image from "next/image";
import { notFound } from "next/navigation";

import CommentSection from "../CommentSection";
import PostContent from "../PostContent";
import { PanelCard } from "@/components/dashboard/shared";
import CreatorProfile from "../CreatorProfile";
import Reaction from "../Reaction";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { getPostDetailData } from "../post-detail-mock-data";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetail({ params }: PostDetailPageProps) {
  const { id } = await params;
  const data = getPostDetailData(id);

  if (!data) {
    notFound();
  }

  const { post } = data;

  return (
    <DashboardShell
      leftSidebar={
        <CreatorProfile
          name={post.name}
          handle={post.handle}
        />
      }
    >
      <div className="mx-auto flex w-full max-w-255 flex-col gap-4 pb-8 pt-3 md:flex-row md:gap-6">
        <div className="hidden lg:block">
          <Reaction post={post} />
        </div>

        <PanelCard className="mx-auto w-full grow border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,23,42,0.07)] dark:border-slate-700 dark:bg-slate-900 sm:p-6">
          {post.imageUrl ? (
            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
              <Image
                src={post.imageUrl}
                alt={`${post.title} visual`}
                width={1200}
                height={700}
                className="max-h-115 w-full object-contain"
              />
            </div>
          ) : null}
          <PostContent post={post} />
          <CommentSection />
        </PanelCard>
      </div>
    </DashboardShell>
  );
}
