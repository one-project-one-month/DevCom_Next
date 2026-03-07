"use client";

import { useMemo } from "react";
import Link from "next/link";
import { BookOpenText, MessageCircle } from "lucide-react";
import { PanelCard } from "@/components/dashboard/shared";
import { SavedPost } from "@/app/saved-posts/_types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

type SavedPostCardProps = {
  post: SavedPost;
  className?: string;
  isSelected?: boolean;
  onSelect?: (postId: string, selected: boolean) => void;
};

export function SavedPostCard({
  post,
  className,
  isSelected = false,
  onSelect,
}: SavedPostCardProps) {
  const postHref = useMemo(() => `/PostDetail/${post.id}`, [post.id]);

  function handleCheckboxChange(next: CheckedState) {
    onSelect?.(post.id, next === true);
  }

  return (
    <PanelCard className={cn(
      "relative p-4 transition-all",
      isSelected && "ring-2 ring-indigo-500 dark:ring-indigo-400",
      className
    )}>
      <div className="absolute right-4 top-4">
        <Checkbox checked={isSelected} onCheckedChange={handleCheckboxChange} />
      </div>

      <div className="pr-8">
        <div className="mb-2 flex flex-wrap items-center gap-1.5">
          <Badge variant={"outline"} className="text-[11px] px-2 py-0.5">
            {post.postType}
          </Badge>
          {post.status && (
            <Badge variant={"outline"} className="text-[11px] px-2 py-0.5">
              {post.status}
            </Badge>
          )}
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={`${post.id}-${tag.id}`}
              className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
            >
              {tag.name}
            </span>
          ))}
          {post.tags.length > 2 && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              +{post.tags.length - 2}
            </span>
          )}
        </div>

        <div className="w-fit">
          <Link href={postHref}>
            <h3 className="w-fit mb-1.5 line-clamp-2 text-lg font-semibold text-slate-900 hover:text-blue-600 dark:text-slate-100 dark:hover:text-blue-400">
              {post.title}
            </h3>
          </Link>
        </div>

        <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium">{post.author.name}</span>
          <span>•</span>
          <span>{post.time}</span>
          <span>•</span>
          <span>Saved {post.savedDate}</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
          <div className="inline-flex items-center gap-1">
            <BookOpenText className="h-3.5 w-3.5" />
            <span>{post.stats.helpful}</span>
          </div>
          <div className="inline-flex items-center gap-1">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{post.stats.replies}</span>
          </div>
        </div>
      </div>
    </PanelCard>
  );
}
