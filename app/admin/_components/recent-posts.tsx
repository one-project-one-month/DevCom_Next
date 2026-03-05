import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Post = {
  id: string
  title: string
  authorName: string
  status: string
  createdAt: string
}

export default function RecentPosts({ posts }: { posts: Post[] }) {
  return (
    <Card className=" rounded-none">
      <CardContent className="p-3">

        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col gap-1 border-b pb-3 last:border-none"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm line-clamp-1">
                  {post.title}
                </p>

                <Badge
                  variant="outline"
                  className={
                    post.status === "PUBLISHED"
                      ? "border-green-500 text-green-600 dark:text-green-400"
                      : "border-yellow-500 text-yellow-600 dark:text-yellow-400"
                  }
                >
                  {post.status}
                </Badge>
              </div>

              <p className="text-xs text-muted-foreground">
                {post.authorName} • {post.createdAt}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}