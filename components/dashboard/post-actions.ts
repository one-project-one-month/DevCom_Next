export type PostActionResult = {
  ok: boolean;
};

const ACTION_DELAY_MS = 250;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function markHelpfulPost(postId: string, nextHelpful: boolean): Promise<PostActionResult> {
  void postId; void nextHelpful;
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}

export async function savePost(postId: string, nextSaved: boolean): Promise<PostActionResult> {
  void postId; void nextSaved;
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}

export async function deletePost(postId: string): Promise<PostActionResult> {
  void postId;
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}

export async function reportPost(postId: string): Promise<PostActionResult> {
  void postId;
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}
