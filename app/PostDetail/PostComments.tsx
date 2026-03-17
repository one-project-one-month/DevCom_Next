import CommentCard from "./CommentCard";
import type { CommentItem } from "./comment-types";

export default function PostComments({
  comments,
  onReply,
  onDelete,
  currentUserId,
  currentUserRole,
  onHide,
}: {
  comments: CommentItem[];
  onReply?: (commentId: string, body: string) => void | Promise<void>;
  onDelete?: (commentId: string) => void | Promise<void>;
  currentUserId?: string;
  currentUserRole?: string;
  onHide?: (commentId: string) => void | Promise<void>;
}) {
  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          onReply={onReply}
          onDelete={onDelete}
          currentUserId={currentUserId}
          currentUserRole={currentUserRole}
          onHide={onHide}
        />
      ))}
    </div>
  );
}
