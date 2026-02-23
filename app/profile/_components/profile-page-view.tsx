import { profilePageMock } from "@/app/profile/_data/profile.mock";
import { ProfileLayoutView } from "@/app/profile/_components/profile-layout-view";

export function ProfilePageView() {
  return <ProfileLayoutView data={profilePageMock} />;
}
