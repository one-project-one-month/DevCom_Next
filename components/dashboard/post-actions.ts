export type PostActionResult = {
  ok: boolean;
};

const ACTION_DELAY_MS = 250;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function markHelpfulPost(_postId: string, _nextHelpful: boolean): Promise<PostActionResult> {
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}

export async function savePost(_postId: string, _nextSaved: boolean): Promise<PostActionResult> {
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}

export async function deletePost(_postId: string): Promise<PostActionResult> {
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}

export async function reportPost(_postId: string): Promise<PostActionResult> {
  await wait(ACTION_DELAY_MS);
  return { ok: true };
}
