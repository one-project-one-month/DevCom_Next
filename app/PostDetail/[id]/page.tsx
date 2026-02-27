import Image from "next/image";
import CommentSection from "../CommentSection";
import PostContent from "../PostContent";
import { ProfileSection } from "../ProfileSection";
import tiptapImg from "@/assets/img/tiptap.png";
import { PanelCard } from "@/components/dashboard/shared";
import CreatorProfile from "../CreatorProfile";
import Reaction from "../Reaction";

export default function PostDetail() {
  return (
    <div className="container flex flex-col w-full gap-5 md:gap-x-5 md:flex-row mx-auto p-4">
      <div className="flex flex-col md:flex-row w-full ">
        {/* Left Side - Reaction Panel */}
        <div className="hidden lg:block lg:w-1/3 max-w-sm sticky top-10">
          <Reaction />
        </div>

        {/* Main Content - PanelCard */}
        <PanelCard className="grow w-full mx-auto">
          <Image
            src={tiptapImg}
            alt="Post Image"
            className="rounded-t-md rounded-b-none w-full border border-slate-200 dark:border-slate-700"
          />
          <div className="p-10">
            <ProfileSection />
            <PostContent />
            <CommentSection />
          </div>
        </PanelCard>
      </div>

      {/* Right Side - Creator Profile with sticky behavior */}
      <div className="hidden lg:block lg:w-1/3 max-w-sm sticky top-10 self-start">
        <CreatorProfile />
      </div>
    </div>
  );
}
