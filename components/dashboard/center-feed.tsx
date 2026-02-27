"use client";

import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";

import { FeedPostCard } from "@/components/dashboard/feed-post-card";
import { feedPosts } from "@/components/dashboard/data";
import { PanelCard } from "@/components/dashboard/shared";

function PostCreatorCard() {
  return (
    <PanelCard className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
          Create Hub
        </p>
      </div>
      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Create detailed posts in the dedicated editor with validation, tags,
        attachments, and draft/publish flow.
      </p>

      <div className="mt-6 flex items-center justify-end gap-2">
        <Link
          href="/create-post"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400"
        >
          <FileText className="h-3.5 w-3.5" />
          Open Editor
        </Link>
        <Link
          href="/create-post"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Create Post
        </Link>
      </div>
    </PanelCard>
  );
}

export function CenterFeed() {
  const [posts, setPosts] = useState(feedPosts);
  function handleDeletePost(postId: string) {
    setPosts((current) => current.filter((item) => item.id !== postId));
  }

  return (
    <section className="space-y-5">
      <PostCreatorCard />
      {posts.map((post) => (
        <FeedPostCard key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
    </section>
  );
}
