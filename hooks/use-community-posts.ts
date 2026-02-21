"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createPost, getPosts } from "@/lib/api/posts";
import type { FeedFilter, NewPostInput } from "@/types/post";

export function useCommunityPosts(filter: FeedFilter) {
  return useQuery({
    queryKey: ["posts", filter],
    queryFn: () => getPosts(filter),
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: NewPostInput) => createPost(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
