# API Examples (Axios + React Query)

This folder shows beginner-friendly `GET`, `POST`, `PATCH`, `DELETE` examples.

Use these simple helpers from `lib/api/fetcher.ts`:

- `api.get(path)`
- `api.post(path, body)`
- `api.patch(path, body)`
- `api.delete(path)`

## Files

- `posts-api-example.ts`
  - `getPosts()` -> `GET /posts`
  - `createPost(input)` -> `POST /posts`
  - `updatePost(id, input)` -> `PATCH /posts/:id`
  - `deletePost(id)` -> `DELETE /posts/:id`

- `use-posts-api-example.ts`
  - `useGetPosts()` (query)
  - `useCreatePost()` (mutation)
  - `useUpdatePost()` (mutation)
  - `useDeletePost()` (mutation)

Update `POSTS_ENDPOINT` if your backend route differs.
