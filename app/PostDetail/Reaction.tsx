"use client";
import { Bookmark, Copy, Flag, Heart, MessageSquare } from "lucide-react";
import { useState } from "react";
import type { FeedPost } from "@/components/dashboard/types";
import { reportPost } from "@/components/dashboard/post-actions";

type ReactionProps = {
  post: FeedPost;
};

export default function Reaction({ post }: ReactionProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(post.helpful);
  const [saved, setSaved] = useState(false);
  const [savedCount, setSavedCount] = useState(post.saves);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle",
  );
  const [isReporting, setIsReporting] = useState(false);
  const [isReported, setIsReported] = useState(false);

  const handleHelpful = () => {
    const next = !isHelpful;
    setIsHelpful(next);
    setHelpfulCount((current) => Math.max(0, current + (next ? 1 : -1)));
  };

  const handleSave = () => {
    const next = !saved;
    setSaved(next);
    setSavedCount((current) => Math.max(0, current + (next ? 1 : -1)));
  };

  const handleCopy = async () => {
    const href =
      typeof window === "undefined"
        ? `/PostDetail/${post.id}`
        : `${window.location.origin}/PostDetail/${post.id}`;

    try {
      await navigator.clipboard.writeText(href);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }

    window.setTimeout(() => setCopyState("idle"), 1400);
  };

  const handleReport = async () => {
    if (isReported || isReporting) {
      return;
    }

    setIsReporting(true);
    const result = await reportPost(post.id);
    setIsReporting(false);
    if (result.ok) {
      setIsReported(true);
    }
  };

  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-2.5">
      <button
        type="button"
        aria-label="Mark helpful"
        onClick={handleHelpful}
        className={`group flex w-14 flex-col items-center rounded-xl border bg-white px-2 py-2 text-slate-600 transition dark:bg-slate-900 ${isHelpful ? "border-blue-300 text-blue-700 shadow-[0_10px_20px_rgba(37,99,235,0.18)] dark:border-blue-500/60 dark:text-blue-300" : "border-slate-200 shadow-[0_8px_16px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"}`}
      >
        <Heart className={`h-5 w-5 ${isHelpful ? "fill-current" : ""}`} />
        <span className="mt-1 text-xs font-semibold">{helpfulCount}</span>
      </button>

      <a
        href="#comment-editor"
        aria-label="Jump to comments"
        className="group flex w-14 flex-col items-center rounded-xl border border-slate-200 bg-white px-2 py-2 text-slate-600 shadow-[0_8px_16px_rgba(15,23,42,0.08)] transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"
      >
        <MessageSquare className="h-5 w-5" />
        <span className="mt-1 text-xs font-semibold">{post.replies}</span>
      </a>

      <button
        type="button"
        aria-label="Save post"
        onClick={handleSave}
        className={`group flex w-14 flex-col items-center rounded-xl border bg-white px-2 py-2 text-slate-600 transition dark:bg-slate-900 ${saved ? "border-emerald-300 text-emerald-700 shadow-[0_10px_20px_rgba(16,185,129,0.18)] dark:border-emerald-500/60 dark:text-emerald-300" : "border-slate-200 shadow-[0_8px_16px_rgba(15,23,42,0.08)] hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"}`}
      >
        <Bookmark className={`h-5 w-5 ${saved ? "fill-current" : ""}`} />
        <span className="mt-1 text-xs font-semibold">{savedCount}</span>
      </button>

      <button
        type="button"
        aria-label="Copy post link"
        onClick={handleCopy}
        className="group flex w-14 flex-col items-center rounded-xl border border-slate-200 bg-white px-2 py-2 text-slate-600 shadow-[0_8px_16px_rgba(15,23,42,0.08)] transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-slate-100"
      >
        <Copy className="h-5 w-5" />
        <span className="mt-1 text-[10px] font-semibold">
          {copyState === "copied"
            ? "Done"
            : copyState === "failed"
              ? "Fail"
              : "Copy"}
        </span>
      </button>

      <button
        type="button"
        aria-label="Report post"
        onClick={handleReport}
        disabled={isReporting || isReported}
        className={`group flex w-14 flex-col items-center rounded-xl border bg-white px-2 py-2 transition disabled:cursor-not-allowed disabled:opacity-70 dark:bg-slate-900 ${
          isReported
            ? "border-amber-300 text-amber-700 dark:border-amber-500/60 dark:text-amber-300"
            : "border-slate-200 text-slate-600 shadow-[0_8px_16px_rgba(15,23,42,0.08)] hover:border-amber-300 hover:text-amber-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-amber-500/60 dark:hover:text-amber-300"
        }`}
      >
        <Flag className="h-5 w-5" />
        <span className="mt-1 text-[10px] font-semibold">
          {isReported ? "Sent" : isReporting ? "..." : "Report"}
        </span>
      </button>
    </div>
  );
}
