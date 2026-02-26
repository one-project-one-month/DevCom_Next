"use client";

import { useState } from "react";
import {
    BookOpenText,
    MessageCircle,
    Bookmark,
    UserPlus,
    UserCheck,
    TrendingUp,
    Hash,
    X,
    FileCode2,
    Flame,
    Users,
    SlidersHorizontal,
    ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

import { PanelCard, AvatarCircle } from "@/components/dashboard/shared";
import { cn } from "@/lib/utils";
import { feedPosts, suggestions, knowledgeTopics } from "@/components/dashboard/data";
import type { FeedPost, SuggestedUser } from "@/components/dashboard/types";

// ─── Sidebar data ─────────────────────────────────────────────────────────────

const popularTags = [
    "TypeScript", "Next.js", "React", "Backend", "DevOps", "CI/CD",
    "Performance", "Security", "Database", "API Design",
    "Design Systems", "Observability", "Reliability", "DX", "Distributed Systems",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

type Tab = "posts" | "people";

function formatStyles(format: FeedPost["format"]) {
    if (format === "Question")
        return "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200";
    if (format === "Guide")
        return "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200";
    if (format === "RFC")
        return "bg-amber-50 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200";
    return "bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200";
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: FeedPost }) {
    return (
        <PanelCard className="p-4 transition hover:shadow-md">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500" />
                    <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{post.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {post.handle} · {post.time}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${formatStyles(post.format)}`}>
                        {post.format}
                    </span>
                    {post.status && (
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                            {post.status}
                        </span>
                    )}
                </div>
            </div>

            <h3 className="mb-1.5 text-base font-semibold text-slate-900 dark:text-slate-100">
                {post.title}
            </h3>
            <p className="mb-3 line-clamp-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {post.content}
            </p>

            <div className="mb-3 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-1 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                    <BookOpenText className="h-3.5 w-3.5" /> {post.helpful} helpful
                </button>
                <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                    <MessageCircle className="h-3.5 w-3.5" /> {post.replies} replies
                </button>
                <button className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100">
                    <Bookmark className="h-3.5 w-3.5" /> {post.saves} saves
                </button>
                <Link
                    href={`/posts/${post.id}`}
                    className="ml-auto inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                    <FileCode2 className="h-3.5 w-3.5" /> Open thread
                </Link>
            </div>
        </PanelCard>
    );
}

// ─── People Card ──────────────────────────────────────────────────────────────

function PeopleCard({ person }: { person: SuggestedUser }) {
    const [following, setFollowing] = useState(false);

    return (
        <PanelCard className="p-4 transition hover:shadow-md">
            <div className="flex items-center gap-4">
                <AvatarCircle className="h-12 w-12 shrink-0" />
                <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{person.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{person.handle}</p>
                    <p className="mt-0.5 text-xs font-medium text-blue-600 dark:text-blue-400">{person.focus}</p>
                </div>
                <button
                    onClick={() => setFollowing((f) => !f)}
                    className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition",
                        following
                            ? "border-blue-200 bg-blue-50 text-blue-700 hover:border-red-200 hover:bg-red-50 hover:text-red-600 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                            : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
                    )}
                >
                    {following ? (
                        <><UserCheck className="h-3.5 w-3.5" /> Following</>
                    ) : (
                        <><UserPlus className="h-3.5 w-3.5" /> Connect</>
                    )}
                </button>
            </div>
        </PanelCard>
    );
}

// ─── Main ExploreClient ───────────────────────────────────────────────────────

export function ExploreClient({
    activeTag,
    onTagClick,
}: {
    activeTag: string | null;
    onTagClick: (tag: string) => void;
}) {
    const [tab, setTab] = useState<Tab>("posts");
    const [formatFilter, setFormatFilter] = useState<string | null>(null);

    // Filter feedPosts by format and/or active tag
    const filteredPosts = feedPosts.filter((p) => {
        if (formatFilter && p.format !== formatFilter) return false;
        if (activeTag && !p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase())) return false;
        return true;
    });

    // Filter suggestions by active tag (suggestions have no tags, so tag filter shows all)
    const filteredPeople = suggestions;

    const hasActiveFilters = Boolean(activeTag || formatFilter);
    const formats: FeedPost["format"][] = ["Question", "Guide", "RFC", "Build Log"];

    return (
        <section className="space-y-5">
            {/* Tabs */}
            <div className="flex items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_10px_28px_rgba(15,23,42,0.06)] dark:border-slate-700 dark:bg-slate-900">
                {(
                    [
                        { id: "posts" as Tab, label: "Posts", icon: FileCode2 },
                        { id: "people" as Tab, label: "People", icon: Users },
                    ] as const
                ).map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => setTab(id)}
                        className={cn(
                            "flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition",
                            tab === id
                                ? "bg-blue-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100",
                        )}
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <SlidersHorizontal className="h-3.5 w-3.5" /> Filters:
                    </span>
                    {activeTag && (
                        <button
                            onClick={() => onTagClick(activeTag)}
                            className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs text-blue-700 transition hover:bg-blue-100 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                        >
                            #{activeTag} <X className="h-3 w-3" />
                        </button>
                    )}
                    {formatFilter && (
                        <button
                            onClick={() => setFormatFilter(null)}
                            className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs text-amber-700 transition hover:bg-amber-100 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300"
                        >
                            {formatFilter} <X className="h-3 w-3" />
                        </button>
                    )}
                    <button
                        onClick={() => { if (activeTag) onTagClick(activeTag); setFormatFilter(null); }}
                        className="ml-auto text-xs text-slate-500 underline underline-offset-2 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    >
                        Clear all
                    </button>
                </div>
            )}

            {/* Format pills — posts only */}
            {tab === "posts" && (
                <div className="flex flex-wrap gap-2">
                    {formats.map((f) => (
                        <button
                            key={f}
                            onClick={() => setFormatFilter((prev) => (prev === f ? null : f))}
                            className={cn(
                                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                                formatFilter === f
                                    ? "border-transparent bg-blue-600 text-white"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800",
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            )}

            {/* Results */}
            {tab === "posts" ? (
                filteredPosts.length > 0 ? (
                    <div className="space-y-4">
                        {filteredPosts.map((post) => <PostCard key={post.id} post={post} />)}
                    </div>
                ) : (
                    <PanelCard className="py-16 text-center">
                        <p className="text-sm text-slate-500 dark:text-slate-400">No posts match this filter.</p>
                    </PanelCard>
                )
            ) : (
                <div className="space-y-4">
                    {filteredPeople.map((person) => <PeopleCard key={person.handle} person={person} />)}
                </div>
            )}
        </section>
    );
}

// ─── Right Sidebar ────────────────────────────────────────────────────────────

export function ExploreRightSidebar({
    activeTag,
    onTagClick,
}: {
    activeTag: string | null;
    onTagClick: (tag: string) => void;
}) {
    return (
        <aside className="space-y-5">
            {/* Trending Topics — from data.ts */}
            <PanelCard className="p-4">
                <div className="mb-3 flex items-center gap-2">
                    <Flame className="h-4 w-4 text-rose-500" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Trending Topics</p>
                </div>
                <ul className="space-y-2">
                    {knowledgeTopics.map((topic) => (
                        <li key={topic.label}>
                            <button
                                onClick={() => onTagClick(topic.label)}
                                className={cn(
                                    "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
                                    activeTag === topic.label
                                        ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/30 dark:bg-blue-500/10 dark:text-blue-300"
                                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
                                )}
                            >
                                <span className="flex items-center gap-1.5">
                                    <Hash className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                                    {topic.label}
                                </span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{topic.threads}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </PanelCard>

            {/* Popular Tags */}
            <PanelCard className="p-4">
                <div className="mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Popular Tags</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                    {popularTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => onTagClick(tag)}
                            className={cn(
                                "rounded-full border px-2.5 py-1 text-xs transition",
                                activeTag === tag
                                    ? "border-blue-300 bg-blue-100 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/20 dark:text-blue-300"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-blue-500/30 dark:hover:bg-blue-500/10 dark:hover:text-blue-300",
                            )}
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </PanelCard>

            {/* Create CTA */}
            <PanelCard className="p-4">
                <p className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-100">Share Knowledge</p>
                <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                    Post a question, guide, or RFC to help the community.
                </p>
                <Link
                    href="/create-post"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    <ArrowUpRight className="h-4 w-4" /> Create Post
                </Link>
            </PanelCard>
        </aside>
    );
}
