import CommentCard from "./CommentCard";
import { commentMockData } from "./comment-mock-data";

export default function PostComments() {
  return (
    <div className="space-y-4">
      {commentMockData.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
