import { CreatePostPageView } from "@/app/create-post/_components/create-post-page-view";

type CreatePostPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function CreatePostPage({ searchParams }: CreatePostPageProps) {
  const resolved = await searchParams;
  const rawEditId = resolved?.edit;
  const editId = Array.isArray(rawEditId) ? rawEditId[0] : rawEditId;

  return <CreatePostPageView editId={editId ?? null} />;
}
