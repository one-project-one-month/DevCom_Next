import CommentSection from "../CommentSection";
import PostContent from "../PostContent";
import { ProfileSection } from "../ProfileSection";

export default function PostDetail() {
  return (
    <div className="p-4">
      <ProfileSection />
      <PostContent />
      <CommentSection />
    </div>
  );
}
