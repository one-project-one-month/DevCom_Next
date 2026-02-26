"use client";

import { useMemo, useState } from "react";
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
import {
  deletePost,
  markHelpfulPost,
  reportPost,
  savePost,
} from "@/components/dashboard/post-actions";
import { cn } from "@/lib/utils";

type FeedPostCardProps = {
  post: FeedPost;
  className?: string;
  showAuthor?: boolean;
  showCommentBox?: boolean;
  showOpenThreadAction?: boolean;
  onDelete?: (postId: string) => void;
};

function profileHrefFromHandle(handle: string) {
  const slug = handle.replace(/^@/, "");
  if (slug === "hhlaing.swan") {
    return "/profile";
  }
  return `/profile/${slug}`;
}

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
  onDelete,
}: FeedPostCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(post.helpful);
  const [savesCount, setSavesCount] = useState(post.saves);
  const [isHelpful, setIsHelpful] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const postHref = useMemo(() => `/PostDetail/${post.id}`, [post.id]);

  async function handleHelpful() {
    if (isDeleting) {
      return;
    }

    const nextHelpful = !isHelpful;
    setIsHelpful(nextHelpful);
    setHelpfulCount((current) => Math.max(0, current + (nextHelpful ? 1 : -1)));

    const result = await markHelpfulPost(post.id, nextHelpful);
    if (!result.ok) {
      setIsHelpful(!nextHelpful);
      setHelpfulCount((current) =>
        Math.max(0, current + (nextHelpful ? -1 : 1)),
      );
    }
  }

  async function handleSave() {
    if (isDeleting) {
      return;
    }

    const nextSaved = !isSaved;
    setIsSaved(nextSaved);
    setSavesCount((current) => Math.max(0, current + (nextSaved ? 1 : -1)));

    const result = await savePost(post.id, nextSaved);
    if (!result.ok) {
      setIsSaved(!nextSaved);
      setSavesCount((current) => Math.max(0, current + (nextSaved ? -1 : 1)));
    }
  }

  async function handleDelete() {
    if (!post.isOwnPost || isDeleting) {
      return;
    }

    const confirmed = window.confirm("Delete this post?");
    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    const result = await deletePost(post.id);
    setIsDeleting(false);

    if (result.ok) {
      onDelete?.(post.id);
    }
  }

  async function handleReport() {
    if (isReported || isReporting || isDeleting) {
      return;
    }

    setIsReporting(true);
    const result = await reportPost(post.id);
    setIsReporting(false);

    if (result.ok) {
      setIsReported(true);
    }
  }

  async function handleCopyLink() {
    const absoluteLink =
      typeof window === "undefined"
        ? postHref
        : `${window.location.origin}${postHref}`;

    try {
      await navigator.clipboard.writeText(absoluteLink);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    window.setTimeout(() => {
      setCopyState("idle");
    }, 1400);
  }

  return (
    <PanelCard className={cn("p-4", className)}>
      <div className="mb-3 flex items-center justify-between">
        {showAuthor ? (
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500" />
            <div>
              <Link
                href={profileHrefFromHandle(post.handle)}
                className="text-sm font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-slate-100"
              >
                {post.name}
              </Link>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <Link
                  href={profileHrefFromHandle(post.handle)}
                  className="hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {post.handle}
                </Link>{" "}
                • {post.time}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {post.time}
          </p>
        )}

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${formatStyles(post.format)}`}
          >
            {post.format}
          </span>
        </div>
      </div>

      <div className="group">
        <h3 className="mb-2 hover:text-blue-600 dark:hover:text-blue-400 text-base font-semibold text-slate-900 dark:text-slate-100">
          {post.title}
        </h3>
        <p className="mb-3 hover:text-slate-900 dark:hover:text-slate-100 text-sm leading-6 text-slate-700 dark:text-slate-300">
          {post.content}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300">
          Public
        </span>
        {post.tags.map((tag) => (
          <span
            key={`${post.id}-${tag}`}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {post.imageUrl ? (
        <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
          <Image
            src={post.imageUrl}
            alt={`${post.title} visual`}
            width={700}
            height={700}
            className="h-64 w-full rounded-xl object-contain opacity-90"
          />
        </div>
      ) : null}

      <div className="mb-3 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-3 dark:border-slate-700">
        <button
          onClick={handleHelpful}
          className={cn(
            "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition",
            isHelpful
              ? "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
          )}
        >
          <BookOpenText className="h-4 w-4" />
          {helpfulCount} helpful
        </button>
        <button className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
          <MessageCircle className="h-4 w-4" />
          {post.replies} replies
        </button>
        <button
          onClick={handleSave}
          className={cn(
            "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm transition",
            isSaved
              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
          )}
        >
          <Bookmark className="h-4 w-4" />
          {savesCount} save
        </button>
        {showOpenThreadAction ? (
          <Link
            href={postHref}
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
            <Link
              href={`/create-post?edit=${post.id}`}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </Link>
            <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100">
              Move to Draft
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-300 dark:hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </>
        ) : (
          <button
            onClick={handleReport}
            disabled={isReporting || isReported}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-amber-300 dark:hover:bg-amber-500/10"
          >
            <Flag className="h-3.5 w-3.5" />
            {isReported
              ? "Reported"
              : isReporting
                ? "Reporting..."
                : "Report to Admin"}
          </button>
        )}
        <button
          onClick={handleCopyLink}
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        >
          <Copy className="h-3.5 w-3.5" />
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy Link"}
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
