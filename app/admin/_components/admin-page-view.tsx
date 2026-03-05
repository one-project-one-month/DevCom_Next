import { Users, FileText, MessageSquare, Flag } from "lucide-react";

import StatCard from "./stat-card";
import PostsChart from "./posts-chart";
import RecentPosts from "./recent-posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_POSTS, MOCK_STATS, SIGNUPS_CHART_DATA } from "../_data/mock-data";

export function AdminPageView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Developers"
          value={MOCK_STATS.totalDevelopers}
          icon={<Users className="h-5 w-5 text-primary" />}
          color="bg-primary-dull/20"
        />
        <StatCard
          title="Active Posts"
          value={MOCK_STATS.activePosts}
          icon={<FileText className="h-5 w-5 text-emerald-600" />}
          color="bg-emerald-100 dark:bg-emerald-500/20"
        />
        <StatCard
          title="New Comments"
          value={MOCK_STATS.newComments}
          icon={<MessageSquare className="h-5 w-5 text-sky-600" />}
          color="bg-sky-100 dark:bg-sky-500/20"
        />
        <StatCard
          title="Open Reports"
          value={MOCK_STATS.totalReports}
          icon={<Flag className="h-5 w-5 text-amber-600" />}
          color="bg-amber-100 dark:bg-amber-500/20"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold">
              Weekly Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <PostsChart data={SIGNUPS_CHART_DATA} />
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Recent Posts
          </h2>
          <RecentPosts posts={MOCK_POSTS.slice(0, 6)} />
        </div>
      </section>
    </div>
  );
}
