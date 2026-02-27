"use client";

import { FilterComment } from "./FilterComment";
import { Field } from "@/components/ui/field";
import PostComments from "./PostComments";
import CommentEditorSection from "./CommentEditorSection";
import Image from "next/image";
import { commentMockData } from "./comment-mock-data";

function getTotalRepliesCount() {
  return commentMockData.reduce(
    (total, item) => total + (item.replies?.length ?? 0),
    0,
  );
}

export default function CommentSection() {
  const totalReplies = getTotalRepliesCount();
  const totalComments = commentMockData.length + totalReplies;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-5">
      <div className="mt-1 flex items-center justify-between gap-3">
        <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Discussion ({totalComments})
        </div>
        <div>
          <FilterComment />
        </div>
      </div>

      <div
        className="mb-8 mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/60"
        id="comment-editor"
      >
        <div className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
          Add to the discussion
        </div>
        <div className="flex gap-3">
          <Image
            width={500}
            height={500}
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="User Avatar"
            className="mb-2 h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700"
          />
          <Field className="w-full">
            <CommentEditorSection />
          </Field>
        </div>
      </div>
      <PostComments />
    </div>
  );
}
