import {
  Users,
  FileText,
  AlertCircle,
  MessageSquare,
  TrendingUp
} from "lucide-react";

import StatCard from "./stat-card";
import PostsChart from "./posts-chart";
import RecentPosts from "./recent-posts";

import { MOCK_STATS, SIGNUPS_CHART_DATA, MOCK_POSTS } from "../_data/mock-data";

export function AdminPageView() {

  const top5Posts = MOCK_POSTS.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Developers"
          value={MOCK_STATS.totalDevelopers}
          icon={<Users size={18} />}
          color="bg-[var(--color-primary-dull)] text-[var(--color-primary)]"
        />

        <StatCard
          title="Active Posts"
          value={MOCK_STATS.activePosts}
          icon={<FileText size={18} />}
          color="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        />

        <StatCard
          title="New Comments"
          value={MOCK_STATS.newComments}
          icon={<MessageSquare size={18} />}
          color="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
        />

        <StatCard
          title="Total Reports"
          value={MOCK_STATS.totalReports}
          icon={<AlertCircle size={18} />}
          color={MOCK_STATS.totalReports > 0 
            ? "bg-red-50 text-red-600 border border-red-100" 
            : "bg-slate-100 text-slate-600"
          }
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className="xl:col-span-2 bg-card border rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b flex items-center gap-2">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
              New Signups (Last 7 Days)
            </h3>
          </div>
         <div className="p-6 flex-1 min-h-chart">
            <PostsChart data={SIGNUPS_CHART_DATA} />
          </div>
        </div>

        <div className="bg-card border rounded-xl shadow-sm flex flex-col">
          <div className="p-5 border-b">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
              Recent 5 Posts
            </h3>
          </div>
          <div className="flex-1">
            <RecentPosts posts={top5Posts} />
          </div>
        </div>

      </div>
    </div>
  );
}