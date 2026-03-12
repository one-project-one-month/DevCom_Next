import { Users, FileText, MessageSquare, Flag } from "lucide-react";

import StatCard from "./stat-card";
import PostsChart from "./posts-chart";
import RecentPosts from "./recent-posts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const EMPTY_STATS = {
  totalDevelopers: 0,
  activePosts: 0,
  newComments: 0,
  totalReports: 0,
};

const EMPTY_SIGNUPS: { day: string; count: number }[] = [];
const EMPTY_POSTS: { id: string; title: string; authorName: string; status: string; reportsCount: number; createdAt: string }[] = [];

export function AdminPageView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Developers"
          value={EMPTY_STATS.totalDevelopers}
          icon={<Users className="h-5 w-5 text-primary" />}
          color="bg-primary-dull/20"
        />
        <StatCard
          title="Active Posts"
          value={EMPTY_STATS.activePosts}
          icon={<FileText className="h-5 w-5 text-emerald-600" />}
          color="bg-emerald-100 dark:bg-emerald-500/20"
        />
        <StatCard
          title="New Comments"
          value={EMPTY_STATS.newComments}
          icon={<MessageSquare className="h-5 w-5 text-sky-600" />}
          color="bg-sky-100 dark:bg-sky-500/20"
        />
        <StatCard
          title="Open Reports"
          value={EMPTY_STATS.totalReports}
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
            <PostsChart data={EMPTY_SIGNUPS} />
          </CardContent>
        </Card>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
            Recent Posts
          </h2>
          <RecentPosts posts={EMPTY_POSTS} />
        </div>
      </section>
    </div>
  );
}
