"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpenText,
  Copy,
  FileCode2,
  Flag,
  PencilLine,
  Trash2,
} from "lucide-react";

import { PanelCard } from "@/components/dashboard/shared";
import type { FeedPost } from "@/components/dashboard/types";
import {
  deletePost,
  markHelpfulPost,
  reportPost,
} from "@/components/dashboard/post-actions";
import { apiFetch } from "@/lib/api/fetcher";
import { cn } from "@/lib/utils";
import { PostDetailDialog } from "@/components/post-detail/post-detail-dialog";

type FeedPostCardProps = {
  post: FeedPost;
  className?: string;
  showAuthor?: boolean;
  showOpenThreadAction?: boolean;
  highlightQuery?: string;
  onDelete?: (postId: string) => void;
  onStatusChange?: (postId: string, status: "published" | "private") => void;
};

function profileHrefFromHandle(handle: string, isOwnPost?: boolean) {
  const slug = handle.replace(/^@/, "");
  if (isOwnPost) {
    return "/profile";
  }
  return `/profile/${slug}`;
}

function initialsFromName(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function statusToLabel(status?: string) {
  return status === "published" ? "Public" : "Private";
}

function statusBadgeClass(status?: string) {
  return status === "published"
    ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/15 dark:text-emerald-300"
    : "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-500/40 dark:bg-purple-500/15 dark:text-purple-200";
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query?: string) {
  const trimmed = query?.trim();
  if (!trimmed) return text;

  const regex = new RegExp(`(${escapeRegExp(trimmed)})`, "ig");
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (part.toLowerCase() === trimmed.toLowerCase()) {
      return (
        <span
          key={`${part}-${index}`}
          className="rounded bg-amber-200/70 px-1 text-slate-900 dark:bg-amber-500/30 dark:text-amber-100"
        >
          {part}
        </span>
      );
    }
    return part;
  });
}

export function FeedPostCard({
  post,
  className,
  showAuthor = true,
  showOpenThreadAction = true,
  highlightQuery,
  onDelete,
  onStatusChange,
}: FeedPostCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(post.helpful);
  const [isHelpful, setIsHelpful] = useState(post.hasHelpful ?? false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [isReported, setIsReported] = useState(post.hasReported ?? false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [status, setStatus] = useState<"published" | "private">(
    post.status === "published" ? "published" : "private",
  );
  const [isTogglingStatus, setIsTogglingStatus] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const postHref = useMemo(() => `/?post=${post.id}`, [post.id]);
  const shouldTruncate = post.content.length > 260;
  const visibleContent =
    shouldTruncate && !isExpanded
      ? `${post.content.slice(0, 260)}...`
      : post.content;

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

  async function handleTogglePrivacy() {
    if (!post.isOwnPost || isTogglingStatus) return;

    const nextStatus = status === "published" ? "private" : "published";
    setIsTogglingStatus(true);

    try {
      await apiFetch(`/api/posts/${post.id}`, {
        method: "PATCH",
        body: { status: nextStatus === "private" ? "draft" : "published" },
      });
      setStatus(nextStatus);
      onStatusChange?.(post.id, nextStatus);
    } catch {
      // ignore; keep current state
    } finally {
      setIsTogglingStatus(false);
    }
  }

  return (
    <PanelCard className={cn("p-6", className)}>
      <div className="mb-5 flex items-center justify-between">
        {showAuthor ? (
          <div className="flex items-center gap-3">
            {post.avatarUrl ? (
              <Image
                src={post.avatarUrl}
                alt={`${post.name} avatar`}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-slate-200 object-cover dark:border-slate-700"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white">
                {initialsFromName(post.name)}
              </div>
            )}
            <div>
              <Link
                href={profileHrefFromHandle(post.handle, post.isOwnPost)}
                className="text-base font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-slate-100"
              >
                {highlightText(post.name, highlightQuery)}
              </Link>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                <Link
                  href={profileHrefFromHandle(post.handle, post.isOwnPost)}
                  className="hover:text-slate-700 dark:hover:text-slate-200"
                >
                  {highlightText(post.handle, highlightQuery)}
                </Link>{" "}
                • {post.time}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {post.time}
          </p>
        )}
      </div>

      <div className="my-5 flex flex-wrap items-center gap-2.5">
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[11px] font-medium",
            statusBadgeClass(status),
          )}
        >
          {statusToLabel(status)}
        </span>
        {post.tags.map((tag) => (
          <span
            key={`${post.id}-${tag}`}
            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="group">
        <h3 className="mb-3 text-lg font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400">
          {highlightText(post.title, highlightQuery)}
        </h3>
        <p className="mb-3 text-base leading-7 text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100">
          {visibleContent}
        </p>
        {shouldTruncate ? (
          <button
            type="button"
            onClick={() => setIsExpanded((current) => !current)}
            className="mb-5 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
          >
            {isExpanded ? "See less" : "See more"}
          </button>
        ) : (
          <div className="mb-5" />
        )}
      </div>

      {post.imageUrl ? (
        <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50  dark:border-slate-700 dark:bg-slate-800">
          <Image
            src={post.imageUrl}
            alt={`${post.title} visual`}
            width={1200}
            height={1200}
            className="max-h-115 w-full rounded-xl object-contain opacity-90"
          />
        </div>
      ) : null}

      <div className="mb-4 flex flex-wrap justify-between items-center gap-2.5 border-t border-slate-200 pt-4 dark:border-slate-700">
        <div className="flex items-center gap-4">
          <button
            onClick={handleHelpful}
            className={cn(
              "inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-sm transition",
              isHelpful
                ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-200"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100",
            )}
          >
            <BookOpenText className="h-4 w-4" />
            {helpfulCount > 0 ? `${helpfulCount} helpful` : "Helpful"}
          </button>
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            {post.replies > 0 ? `${post.replies} replies` : "Replies"}
          </button>
        </div>
        {showOpenThreadAction ? (
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <FileCode2 className="h-4 w-4" />
            Open Detail
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-700 dark:bg-slate-800">
        {post.isOwnPost ? (
          <>
            <Link
              href={`/create-post?edit=${post.id}`}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            >
              <PencilLine className="h-3.5 w-3.5" />
              Edit
            </Link>
            <button
              onClick={handleTogglePrivacy}
              disabled={isTogglingStatus}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-white hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
            >
              {isTogglingStatus
                ? "Updating..."
                : status === "published"
                  ? "Make Private"
                  : "Make Public"}
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-300 dark:hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </>
        ) : (
          <button
            onClick={handleReport}
            disabled={isReporting || isReported}
            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-amber-700 transition hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-amber-300 dark:hover:bg-amber-500/10"
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
          className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm text-slate-600 transition hover:bg-white hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-slate-100"
        >
          <Copy className="h-3.5 w-3.5" />
          {copyState === "copied"
            ? "Copied"
            : copyState === "failed"
              ? "Copy failed"
              : "Copy Link"}
        </button>
      </div>

      <PostDetailDialog
        postId={post.id}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </PanelCard>
  );
}
