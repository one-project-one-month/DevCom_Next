"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronsUpDown, Heart, MessageSquare } from "lucide-react";
import { useState } from "react";
import CommentEditorSection from "./CommentEditorSection";

export default function PostComments() {
  const [isOpen, setIsOpen] = useState(true);
  const [editorOpen, setEditorOpen] = useState(false);
  const [likes, setLikes] = useState(0);
  const [likeState, setLikeState] = useState(false);

  const handleLike = () => {
    if (likeState) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }

    setLikeState(!likeState);
  };
  return (
    <div className="space-y-8">
      {isOpen ? (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex-1 flex w-full  gap-2"
        >
          <div className=" items-center justify-between gap-4 ">
            <Avatar className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 mb-2">
              <img
                src="https://avatars.githubusercontent.com/u/12345678?v=4"
                alt="User Avatar"
              />
            </Avatar>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
                <span className="sr-only">Toggle details</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <CollapsibleContent className="flex flex-1 flex-col gap-2">
            <div>
              <div className="rounded-md border  px-4 py-2 text-sm">
                <div className="flex gap-5">
                  <div className="font-medium">John Doe</div>
                  <div className="text-muted-foreground">
                    Feb 25, 2024 at 3:45 PM
                  </div>
                </div>
                <div className="mt-3 text-base font-semibold text-slate-900 dark:text-slate-100">
                  Lorrem ipsum dolor sit amet, consectetur adipiscing
                  elit.Lorrem ipsum dolor sit amet, consectetur adipiscing elit.
                </div>
              </div>
              <div>
                <div className="flex gap-5 mt-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`text-sm ${likeState ? "text-red-500" : "text-slate-500 dark:text-slate-400"} p-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-1 cursor-pointer`}
                        onClick={handleLike}
                      >
                        <Heart
                          className={`w-4 h-4 mr-1 ${likeState ? "fill-current" : ""}`}
                        />
                        {likes} likes
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-gray-400 text-white shadow-lg"
                      side="bottom"
                    >
                      <p>Likes</p>
                    </TooltipContent>
                  </Tooltip>

                  <div
                    onClick={() => setEditorOpen(!editorOpen)}
                    className="text-sm p-1 rounded-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 flex items-center gap-1"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Reply
                  </div>
                </div>
              </div>
            </div>
            {editorOpen && <CommentEditorSection defaultExpanded={true} />}
          </CollapsibleContent>
        </Collapsible>
      ) : (
        <Collapsible
          open={isOpen}
          onOpenChange={setIsOpen}
          className="flex-1 flex w-full  gap-2 "
        >
          <div className=" flex items-center gap-2 bg-slate-100 dark:bg-slate-500 rounded-md w-full py-1 px-4">
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8">
                <ChevronsUpDown />
                <span className="sr-only">Toggle details</span>
              </Button>
            </CollapsibleTrigger>
            <div className="text-sm font-medium">John Doe</div>
          </div>
          <CollapsibleContent className="flex flex-1 flex-col gap-2">
            <p className="text-sm text-muted-foreground">
              This is a comment content. It can be expanded or collapsed.
            </p>
          </CollapsibleContent>
        </Collapsible>
      )}
    </div>
  );
}
