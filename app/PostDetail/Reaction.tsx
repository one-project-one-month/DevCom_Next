"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { useState } from "react";
const data = [
  {
    title: "Like",
    icon: "heart",
    count: 120,
    description: "Add reaction",
  },
  {
    title: "Comment",
    icon: "message-square",
    count: 45,
    description: "Jump to comments",
  },
  {
    title: "Save",
    icon: "bookmark",
    count: 30,
    description: "Save to library",
  },
];

export default function Reaction() {
  const [liked, setLiked] = useState(false);
  const [likeState, setLikeState] = useState(data[0].count);

  const toggleLike = () => {
    setLiked(!liked);
    setLikeState(liked ? likeState - 1 : likeState + 1);
  };
  return (
    <div className="lg:sticky lg:top-10 flex flex-col gap-5 items-end">
      {data.map((item, idx) => (
        <Tooltip key={idx}>
          <TooltipTrigger asChild>
            <div className="mt-12 mr-10 flex flex-col items-center gap-1 hover:text-blue-500 transition-colors">
              <div>
                <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  {item.icon === "heart" && (
                    <Heart
                      className={`h-6 w-6 ${liked ? "fill-red-500 text-red-500" : ""}`}
                      onClick={toggleLike}
                    />
                  )}
                  {item.icon === "message-square" && (
                    <a href="#comment-editor" className="hover:text-blue-500">
                      <MessageSquare className="h-6 w-6" />
                    </a>
                  )}
                  {item.icon === "bookmark" && <Bookmark className="h-6 w-6" />}
                </div>
                <div className="text-sm mt-3">
                  {item.title === "Like" ? likeState : item.count}
                </div>
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-400 text-white shadow-lg">
            <p>{item.description}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
