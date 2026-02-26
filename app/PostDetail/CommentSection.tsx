"use client";

import { FilterComment } from "./FilterComment";
import { Avatar } from "@/components/ui/avatar";
import { Field } from "@/components/ui/field";
import PostComments from "./PostComments";
import CommentEditorSection from "./CommentEditorSection";

export default function CommentSection() {
  return (
    <div>
      <div className="mt-6 flex flex-start gap-2 items-center">
        <div className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
          Top comments (21)
        </div>
        <div className="mb-3">
          <FilterComment />
        </div>
      </div>

      <div className="flex gap-4 mt-5 mb-10">
        <Avatar className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 mb-2">
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="User Avatar"
          />
        </Avatar>
        <Field>
          <CommentEditorSection />
        </Field>
      </div>
      <PostComments />
    </div>
  );
}
