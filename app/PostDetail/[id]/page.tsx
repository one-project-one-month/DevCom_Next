import PostDetailClient from "@/app/PostDetail/post-detail-client";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetail({ params }: PostDetailPageProps) {
  const { id } = await params;
  return <PostDetailClient id={id} />;
}
