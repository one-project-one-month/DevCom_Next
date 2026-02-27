import { Separator } from "@/components/ui/separator";
import type { FeedPost } from "@/components/dashboard/types";

type PostContentProps = {
  post: FeedPost;
};

export default function PostContent({ post }: PostContentProps) {
  return (
    <div className="mt-1">
      <h1 className="mb-3 max-w-190 text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-100 sm:text-[2.35rem]">
        {post.title}
      </h1>
      <p className="mb-6 max-w-180 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {post.content}
      </p>
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={`${post.id}-${tag}`}
              className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Separator className="mb-5 mt-6" />
    </div>
  );
}
