import { PublicProfileView } from "@/app/profile/[handle]/public-profile-view";

type PublicProfilePageProps = {
  params: Promise<{ handle: string }>;
};

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { handle } = await params;
  return <PublicProfileView handle={handle} />;
}
