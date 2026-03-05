"use client";

import { useEffect, useState } from "react";
import { Search, Eye, Flag, Trash2, ExternalLink } from "lucide-react";

import { Post } from "../_data/admin";
import { fetchPosts } from "../_data/admin-service";

import { DataTable, Column, Action } from "../_components/data-table";
import Pagination from "../_components/pagination";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const loadPosts = async () => {
    const res = await fetchPosts(page, limit, search);
    setPosts(res.data);
    setTotalPages(res.totalPages);
  };

  useEffect(() => {
    loadPosts();
  }, [page, search]);

  const columns: Column<Post>[] = [
    {
      header: "Post Title",
      accessor: (post) => (
        <div className="flex flex-col gap-1 max-w-xs">
          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
            {post.title}
          </span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            by {post.authorName} <ExternalLink size={10} />
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessor: (post) => (
        <Badge
          variant="secondary"
          className={cn(
            "font-medium",
            post.status === "PUBLISHED" &&
              "bg-green-50 text-green-700 border-green-200",
            post.status === "DRAFT" && "bg-slate-100 text-slate-600",
            post.status === "FLAGGED" &&
              "bg-amber-50 text-amber-700 border-amber-200",
          )}
        >
          {post.status}
        </Badge>
      ),
    },
    {
      header: "Reports",
      accessor: (post) => (
        <div className="flex items-center gap-2">
          <Badge
            className={cn(
              "rounded-full px-2",
              post.reportsCount > 0
                ? "bg-red-100 text-red-700 border-red-200 hover:bg-red-200"
                : "bg-slate-100 text-slate-400 border-transparent",
            )}
          >
            {post.reportsCount}
          </Badge>
          {post.reportsCount > 5 && (
            <span className="text-tiny text-red-500 font-bold uppercase animate-pulse">
              Critical
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Created At",
      accessor: (post) => (
        <span className="text-slate-500 text-sm">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      ),
    },
  ];

  const actions: Action<Post>[] = [
    {
      label: "View Post",
      icon: <Eye className="w-4 h-4" />,
      onClick: (row) => window.open(`/posts/${row.id}`, "_blank"),
    },
    {
      label: "Flag Content",
      icon: <Flag className="w-4 h-4 text-amber-500" />,
      onClick: (row) => console.log("Flagging post", row.id),
    },
    {
      label: "Delete Post",
      icon: <Trash2 className="w-4 h-4" />,
      variant: "destructive",
      onClick: (row) =>
        confirm("Are you sure you want to delete this post?") &&
        console.log("Deleting", row.id),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border shadow-sm">
        <div className="relative w-full md:max-w-half">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search posts..."
            className="pl-10 h-10 border-slate-200 focus-visible:ring-primary transition-all"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-950 rounded-xl border shadow-sm overflow-hidden">
        <DataTable<Post> data={posts} columns={columns} actions={actions} />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Page {page} of {totalPages}
        </span>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </div>
  );
}