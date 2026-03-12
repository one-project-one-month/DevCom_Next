import { apiFetch } from "@/lib/api/fetcher";

export type PostActionResult = {
  ok: boolean;
};

export async function markHelpfulPost(
  postId: string,
  nextHelpful: boolean,
): Promise<PostActionResult> {
  try {
    if (nextHelpful) {
      await apiFetch("/api/reactions", {
        method: "POST",
        body: { targetType: "Post", targetId: postId },
      });
    } else {
      await apiFetch("/api/reactions", {
        method: "DELETE",
        body: { targetType: "Post", targetId: postId },
      });
    }
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function deletePost(postId: string): Promise<PostActionResult> {
  try {
    await apiFetch(`/api/posts/${postId}`, { method: "DELETE" });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export async function reportPost(_postId: string): Promise<PostActionResult> {
  return { ok: true };
}
