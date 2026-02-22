import { api } from "@/lib/api/fetcher";

export type ExamplePost = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
};

export type CreatePostInput = {
  title: string;
  content: string;
};

export type UpdatePostInput = Partial<CreatePostInput>;

const POSTS_ENDPOINT = "/posts";

export async function getPosts() {
  return api.get<ExamplePost[]>(POSTS_ENDPOINT);
}

export async function createPost(input: CreatePostInput) {
  return api.post<ExamplePost>(POSTS_ENDPOINT, input);
}

export async function updatePost(id: string, input: UpdatePostInput) {
  return api.patch<ExamplePost>(`${POSTS_ENDPOINT}/${id}`, input);
}

export async function deletePost(id: string) {
  return api.delete<{ success: boolean; id: string }>(`${POSTS_ENDPOINT}/${id}`);
}
