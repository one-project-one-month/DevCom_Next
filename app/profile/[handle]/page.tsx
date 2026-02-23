import { notFound } from "next/navigation";

import { getPublicProfilePageData } from "@/app/profile/[handle]/_data/public-profile.mock";
import { ProfileLayoutView } from "@/app/profile/_components/profile-layout-view";

type PublicProfilePageProps = {
  params: Promise<{ handle: string }>;
};

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { handle } = await params;
  const data = getPublicProfilePageData(handle);

  if (!data) {
    notFound();
  }

  return <ProfileLayoutView data={data} />;
}
