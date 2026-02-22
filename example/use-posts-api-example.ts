"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPost, deletePost, getPosts, updatePost } from "@/example/posts-api-example";

export const postsQueryKey = ["example", "posts"] as const;

export function useGetPosts() {
  return useQuery({
    queryKey: postsQueryKey,
    queryFn: getPosts,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: { title?: string; content?: string } }) =>
      updatePost(id, input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
    },
  });
}
