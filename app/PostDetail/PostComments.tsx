import CommentCard from "./CommentCard";
import type { CommentItem } from "./comment-types";

export default function PostComments({
  comments,
  onReply,
}: {
  comments: CommentItem[];
  onReply?: (commentId: string, body: string) => void | Promise<void>;
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </div>
  );
}
