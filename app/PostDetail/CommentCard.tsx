"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import CommentEditorSection from "./CommentEditorSection";
import type { CommentItem } from "./comment-mock-data";

type CommentCardProps = {
  comment: CommentItem;
  depth?: number;
};

export default function CommentCard({ comment, depth = 0 }: CommentCardProps) {
  const [replyOpen, setReplyOpen] = useState(false);
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(comment.helpfulCount);
  const [showReplies, setShowReplies] = useState(true);
  const hasReplies = (comment.replies?.length ?? 0) > 0;
  const isReply = depth > 0;

  const handleHelpful = () => {
    const next = !isHelpful;
    setIsHelpful(next);
    setHelpfulCount((current) => Math.max(0, current + (next ? 1 : -1)));
  };

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 ${isReply ? "shadow-none" : "shadow-[0_4px_14px_rgba(15,23,42,0.04)]"}`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="mb-1 h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700">
          <Image
            width={500}
            height={500}
            src={comment.authorAvatarUrl}
            alt={`${comment.authorName} Avatar`}
          />
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {comment.authorName}
            </span>
            <span className="text-xs text-slate-500">{comment.createdAtLabel}</span>
          </div>

          <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-slate-300">
            {comment.body}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition ${isHelpful ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}
              onClick={handleHelpful}
            >
              <Heart className={`h-4 w-4 ${isHelpful ? "fill-current" : ""}`} />
              {helpfulCount} helpful
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              onClick={() => setReplyOpen((prev) => !prev)}
            >
              <MessageSquare className="h-4 w-4" />
              Reply
            </button>
            {hasReplies ? (
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                onClick={() => setShowReplies((prev) => !prev)}
              >
                {showReplies ? "Hide" : "Show"} {comment.replies?.length}{" "}
                repl{comment.replies?.length === 1 ? "y" : "ies"}
              </button>
            ) : null}
          </div>

          {replyOpen ? (
            <div className="mt-3 border-l border-slate-200 pl-3 dark:border-slate-700">
              <CommentEditorSection defaultExpanded={true} />
            </div>
          ) : null}

          {hasReplies && showReplies ? (
            <div className="mt-4 space-y-3 border-l border-slate-200 pl-4 dark:border-slate-700">
              {comment.replies?.map((reply) => (
                <CommentCard key={reply.id} comment={reply} depth={depth + 1} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
