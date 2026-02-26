"use client";
import { ChevronsUpDown, Filter } from "lucide-react";
import { FilterComment } from "./FilterComment";
import { Avatar } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PostComments from "./PostComments";

export default function CommentSection() {
  const [showButton, setShowButton] = useState(false);
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

      <div className="flex gap-4 mt-5 mb-5">
        <Avatar className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 mb-2">
          <img
            src="https://avatars.githubusercontent.com/u/12345678?v=4"
            alt="User Avatar"
          />
        </Avatar>
        <Field>
          <Textarea
            id="textarea-invalid"
            placeholder="Type your message here."
            onFocus={() => setShowButton(true)}
            onBlur={() => setShowButton(false)}
          />
          {showButton && (
            <div>
              <Button
                className="mt-2 self-end bg-blue-600 hover:bg-blue-700"
                size="sm"
              >
                Post Comment
              </Button>
            </div>
          )}
        </Field>
      </div>
      <PostComments />
    </div>
  );
}
