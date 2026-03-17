"use client";
import { Field } from "@/components/ui/field";
import PostComments from "./PostComments";
import CommentEditorSection from "./CommentEditorSection";
import Image from "next/image";
import type { CommentItem } from "./comment-types";

export default function CommentSection({
  comments,
  onSubmitComment,
  onSubmitReply,
  onDeleteComment,
  onHideComment,
  onDeleteReply,
  onLoadReplies,
  onHideReply,
  isSubmitting,
  avatarUrl,
  currentUserId,
  currentUserRole,
  fixedEditor = false,
  showEditor = true,
}: {
  comments: CommentItem[];
  onSubmitComment: (value: string) => void | Promise<void>;
  onSubmitReply?: (commentId: string, body: string) => void | Promise<void>;
  onDeleteComment?: (commentId: string) => void | Promise<void>;
  onHideComment?: (commentId: string) => void | Promise<void>;
  onDeleteReply?: (replyId: string) => void | Promise<void>;
  onLoadReplies?: (commentId: string) => void | Promise<void>;
  onHideReply?: (replyId: string) => void | Promise<void>;
  isSubmitting?: boolean;
  avatarUrl?: string;
  currentUserId?: string;
  currentUserRole?: string;
  fixedEditor?: boolean;
  showEditor?: boolean;
}) {
  return (
    <div className="relative">
      <div>
        <PostComments
          comments={comments}
          onReply={onSubmitReply}
          onDelete={onDeleteComment}
          onDeleteReply={onDeleteReply}
          onLoadReplies={onLoadReplies}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
          onHide={onHideComment}
          onHideReply={onHideReply}
        />
      </div>

      {showEditor ? (
        <div
          className={`${
            fixedEditor
              ? "sticky bottom-0 z-10 mb-0 border-t border-slate-200 bg-white/95 px-0 py-2 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90"
              : "mt-3 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60"
          }`}
          id="comment-editor"
        >
          <div className="flex items-center gap-2 px-2">
            {avatarUrl ? (
            <Image
              width={500}
              height={500}
              src={avatarUrl}
              alt="User Avatar"
              style={{ width: "auto", height: "auto" }}
              className="h-8 w-8 rounded-full bg-slate-200 object-cover dark:bg-slate-700"
            />
            ) : (
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700" />
            )}
            <Field className="w-full">
              <CommentEditorSection
                onSubmit={onSubmitComment}
                isSubmitting={isSubmitting}
                compact={fixedEditor}
              />
            </Field>
          </div>
        </div>
      ) : null}
    </div>
  );
}
