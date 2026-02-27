import { PanelCard } from "@/components/dashboard/shared";
import { ArrowLeft, UserRound } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/img/default.png";

type CreatorProfileProps = {
  name?: string;
  handle?: string;
};

function profileHrefFromHandle(handle: string) {
  const slug = handle.replace(/^@/, "");
  if (slug === "hhlaing.swan") {
    return "/profile";
  }
  return `/profile/${slug}`;
}

export default function CreatorProfile({
  handle = "@john.doe",
}: CreatorProfileProps) {
  return (
    <PanelCard className="overflow-hidden rounded-xl ">
      <div className="px-4 pb-4">
        <div className="mt-4 flex flex-col gap-2">
          <Link
            href={profileHrefFromHandle(handle)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <UserRound className="h-4 w-4" />
            View Profile
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Feed
          </Link>
        </div>
      </div>
    </PanelCard>
  );
}
