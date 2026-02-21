import type { FeedFilter, NewPostInput, Post } from "@/types/post";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let postsDb: Post[] = [
  {
    id: "1",
    author: "Maya Chen",
    handle: "@maya.dev",
    content: "Built a reusable markdown renderer with syntax highlighting for docs.",
    likes: 42,
    comments: 8,
    tags: ["react", "docs"],
    filter: "trending",
  },
  {
    id: "2",
    author: "Ibrahim Noor",
    handle: "@inoor",
    content: "Sharing a tiny script to automate release notes from conventional commits.",
    likes: 17,
    comments: 3,
    tags: ["tooling", "automation"],
    filter: "latest",
  },
  {
    id: "3",
    author: "Nina Park",
    handle: "@nina.codes",
    content: "Anyone using React Query + websockets for live issue feeds?",
    likes: 12,
    comments: 11,
    tags: ["react-query", "realtime"],
    filter: "following",
  },
];

export async function getPosts(filter: FeedFilter) {
  await wait(300);

  return postsDb.filter((post) => post.filter === filter);
}

export async function createPost(input: NewPostInput) {
  await wait(250);

  const post: Post = {
    id: crypto.randomUUID(),
    author: "You",
    handle: "@you",
    content: input.content,
    likes: 0,
    comments: 0,
    tags: ["intro"],
    filter: "latest",
  };

  postsDb = [post, ...postsDb];
  return post;
}
