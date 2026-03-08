"use client";

import Image from "next/image";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import type { CommentItem } from "./comment-mock-data";

type CommentCardProps = {
  comment: CommentItem;
};

export default function CommentCard({ comment }: CommentCardProps) {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(comment.helpfulCount);

  const handleHelpful = () => {
    const next = !isHelpful;
    setIsHelpful(next);
    setHelpfulCount((current) => Math.max(0, current + (next ? 1 : -1)));
  };

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900"
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
          </div>
        </div>
      </div>
    </div>
  );
}
