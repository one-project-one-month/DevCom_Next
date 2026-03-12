"use client";

import Image from "next/image";
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import type { CommentItem } from "./comment-types";
import CommentEditorSection from "./CommentEditorSection";

type CommentCardProps = {
  comment: CommentItem;
  onReply?: (commentId: string, body: string) => void | Promise<void>;
};

export default function CommentCard({ comment, onReply }: CommentCardProps) {
  const [isReplying, setIsReplying] = useState(false);
  const canReply = !comment.parentId;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-[0_4px_14px_rgba(15,23,42,0.04)] dark:border-slate-700 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <Avatar className="mb-1 h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700">
          {comment.authorAvatarUrl ? (
            <Image
              width={500}
              height={500}
              src={comment.authorAvatarUrl}
              alt={`${comment.authorName} Avatar`}
              style={{ width: "auto", height: "auto" }}
            />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-500 text-sm font-semibold text-white">
              {comment.authorName.charAt(0) || "U"}
            </div>
          )}
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

          {canReply ? (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsReplying((current) => !current)}
                className="inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              >
                <MessageSquare className="h-4 w-4" />
                Reply
              </button>
            </div>
          ) : null}

          {canReply && isReplying ? (
            <div className="mt-3">
              <CommentEditorSection
                defaultExpanded
                compact
                onSubmit={async (value) => {
                  await onReply?.(comment.id, value);
                  setIsReplying(false);
                }}
              />
            </div>
          ) : null}

          {comment.replies && comment.replies.length > 0 ? (
            <div className="mt-4 space-y-3 border-l border-slate-200 pl-4 dark:border-slate-700">
              {comment.replies.map((reply) => (
                <CommentCard key={reply.id} comment={reply} onReply={onReply} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
