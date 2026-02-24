"use client";

import { useState } from "react";
import {
  BookOpenText,
  CircleHelp,
  FileText,
  NotebookPen,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

import { FeedPostCard } from "@/components/dashboard/feed-post-card";
import { feedPosts } from "@/components/dashboard/data";
import { PanelCard } from "@/components/dashboard/shared";

function PostCreatorCard() {
  return (
    <PanelCard className="p-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Create Hub</p>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
          Use /create-post
        </span>
      </div>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
        Create detailed posts in the dedicated editor with validation, tags, attachments, and draft/publish flow.
      </p>

      <div className="mb-4 grid gap-2 sm:grid-cols-3">
        <Link
          href="/create-post"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <CircleHelp className="h-4 w-4 text-blue-600" />
          New Question
        </Link>
        <Link
          href="/create-post"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <BookOpenText className="h-4 w-4 text-emerald-600" />
          New Guide
        </Link>
        <Link
          href="/create-post"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <NotebookPen className="h-4 w-4 text-amber-500" />
          New RFC
        </Link>
      </div>

      <div className="mb-3 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
        <p className="mb-1 font-medium text-slate-800 dark:text-slate-200">Posting tips</p>
        <p>Use specific title, add 1-5 tags, and include what you already tried to get higher quality answers.</p>
      </div>

      <div className="flex items-center justify-end gap-2">
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
