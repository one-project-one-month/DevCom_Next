import {
  ImageIcon,
  ListChecks,
  Lock,
  MessageCircle,
  PlayCircle,
  Send,
  Share2,
  ThumbsUp,
} from "lucide-react";

import { feedPosts } from "@/components/dashboard/data";
import { AvatarCircle, PanelCard } from "@/components/dashboard/shared";
import type { FeedPost } from "@/components/dashboard/types";

function PostCreatorCard() {
  return (
    <PanelCard className="p-4">
      <div className="mb-3 flex items-center gap-3">
        <AvatarCircle className="h-10 w-10" />
        <input
          className="h-11 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500"
          placeholder="Share something with the community..."
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <ImageIcon className="h-4 w-4 text-blue-600" />
            Image
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <PlayCircle className="h-4 w-4 text-rose-500" />
            Video
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
            <ListChecks className="h-4 w-4 text-emerald-500" />
            Poll
          </button>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400">
          <Lock className="h-3.5 w-3.5" />
          Public
        </button>
      </div>
    </PanelCard>
  );
}

function FeedPostCard({ post }: { post: FeedPost }) {
  return (
    <PanelCard className="p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{post.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {post.handle} • {post.time}
            </p>
          </div>
        </div>
        <button className="text-xs text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">•••</button>
      </div>

      <p className="mb-4 text-sm leading-6 text-slate-700 dark:text-slate-300">{post.content}</p>

      <div className="mb-4 h-72 rounded-2xl bg-gradient-to-br from-slate-200 via-blue-100 to-indigo-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800" />

      <div className="mb-3 flex items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <ThumbsUp className="h-4 w-4" />
          {post.likes}
        </button>
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <MessageCircle className="h-4 w-4" />
          {post.comments}
        </button>
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <Share2 className="h-4 w-4" />
          Share
        </button>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
        <input
          className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
          placeholder="Write a comment..."
        />
        <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100">
          <Send className="h-4 w-4" />
        </button>
      </div>
    </PanelCard>
  );
}

export function CenterFeed() {
  return (
    <section className="space-y-5">
      <PostCreatorCard />
      {feedPosts.map((post) => (
        <FeedPostCard key={post.id} post={post} />
      ))}
    </section>
  );
}
