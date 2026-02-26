import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { count } from "console";
import { Bookmark, Heart, MessageSquare } from "lucide-react";
import { title } from "process";
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
  return (
    <div className="flex flex-col gap-5 items-center space-y-10">
      {data.map((item) => (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline-none">
              <div>
                <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                  {item.icon === "heart" && <Heart className="h-9 w-9" />}
                  {item.icon === "message-square" && (
                    <MessageSquare className="h-9 w-9" />
                  )}
                  {item.icon === "bookmark" && <Bookmark className="h-9 w-9" />}
                </div>
                <div className="text-sm mt-5">{item.count}</div>
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-gray-400 text-white shadow-lg">
            <p>{item.description}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
