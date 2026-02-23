import Link from "next/link";
import Image from "next/image";
import {
  BookOpenText,
  Bookmark,
  Copy,
  FileCode2,
  Flag,
  MessageCircle,
  PencilLine,
  Send,
  Trash2,
} from "lucide-react";

import { PanelCard } from "@/components/dashboard/shared";
import type { FeedPost } from "@/components/dashboard/types";
import { cn } from "@/lib/utils";

type FeedPostCardProps = {
  post: FeedPost;
  className?: string;
  showAuthor?: boolean;
  showCommentBox?: boolean;
  showOpenThreadAction?: boolean;
  showThreadSnapshot?: boolean;
};

function formatStyles(format: FeedPost["format"]) {
  if (format === "Question") {
    return "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200";
  }
  if (format === "Guide") {
    return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200";
  }
  if (format === "RFC") {
    return "bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200";
  }
  return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
}

export function FeedPostCard({
  post,
  className,
  showAuthor = true,
  showCommentBox = true,
  showOpenThreadAction = true,
  showThreadSnapshot = true,
}: FeedPostCardProps) {
  return (
    <PanelCard className={cn("p-4", className)}>
      <div className="mb-3 flex items-center justify-between">
        {showAuthor ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{post.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {post.handle} • {post.time}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400">{post.time}</p>
        )}

        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${formatStyles(post.format)}`}>
            {post.format}
          </span>
          {post.status ? (
            <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
              {post.status}
            </span>
          ) : null}
        </div>
      </div>

      <h3 className="mb-2 text-base font-semibold text-slate-900 dark:text-slate-100">{post.title}</h3>
      <p className="mb-4 text-sm leading-6 text-slate-700 dark:text-slate-300">{post.content}</p>

      {post.imageUrl ? (
        <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
          <Image
            src={post.imageUrl}
            alt={`${post.title} visual`}
            width={160}
            height={160}
            className="mx-auto h-40 w-40 object-contain opacity-85"
          />
        </div>
      ) : null}

      <div className="mb-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {post.tags.map((tag) => (
            <span
              key={`${post.id}-${tag}`}
              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {showThreadSnapshot ? (
          <div className="rounded-xl bg-slate-900 p-3 text-xs leading-5 text-slate-100">
            <p className="mb-1 text-slate-300">Thread Snapshot</p>
            <p>Repro steps, constraints, and accepted answers stay here so teams can reuse solutions later.</p>
          </div>
        ) : null}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <BookOpenText className="h-4 w-4" />
          {post.helpful} helpful
        </button>
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <MessageCircle className="h-4 w-4" />
          {post.replies} replies
        </button>
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <Bookmark className="h-4 w-4" />
          {post.saves} saves
        </button>
        {showOpenThreadAction ? (
          <Link
            href={`/posts/${post.id}`}
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <FileCode2 className="h-4 w-4" />
            Open thread
          </Link>
        ) : null}
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800">
        {post.isOwnPost ? (
          <>
            <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">
              Move to Draft
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-red-600 transition hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10">
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </>
        ) : (
          <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-amber-700 transition hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10">
            <Flag className="h-3.5 w-3.5" />
            Report to Admin
          </button>
        )}
        <button className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">
          <Copy className="h-3.5 w-3.5" />
          Copy Link
        </button>
      </div>

      {showCommentBox ? (
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <input
            className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-100 dark:placeholder:text-slate-500"
            placeholder="Add a reproducible answer, code sample, or reference..."
          />
          <button className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-100">
            <Send className="h-4 w-4" />
          </button>
        </div>
      ) : null}
    </PanelCard>
  );
}
