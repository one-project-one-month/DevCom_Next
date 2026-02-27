export type CommentItem = {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  createdAtLabel: string;
  body: string;
  helpfulCount: number;
  replies?: CommentItem[];
};

export const commentMockData: CommentItem[] = [
  {
    id: "c-1",
    authorName: "John Doe",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/12345678?v=4",
    createdAtLabel: "Feb 25, 2024 at 3:45 PM",
    body: "This approach works well for teams that want to keep shipping often. Break the feature into small milestones, keep rollout behind a flag, and validate each step with measurable impact.",
    helpfulCount: 12,
    replies: [
      {
        id: "c-1-r-1",
        authorName: "Mia Wong",
        authorAvatarUrl: "https://avatars.githubusercontent.com/u/1024025?v=4",
        createdAtLabel: "Feb 25, 2024 at 4:02 PM",
        body: "Agree. We split by risk level too. Low-risk tasks ship first, high-risk follow with extra monitoring.",
        helpfulCount: 4,
      },
      {
        id: "c-1-r-2",
        authorName: "Dev Kumar",
        authorAvatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4",
        createdAtLabel: "Feb 25, 2024 at 4:15 PM",
        body: "Feature flags + release checklist gave us much fewer rollback events.",
        helpfulCount: 3,
      },
    ],
  },
  {
    id: "c-2",
    authorName: "Anna Lin",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/9919?v=4",
    createdAtLabel: "Feb 25, 2024 at 5:10 PM",
    body: "One more tip: keep your migration and release notes in the same PR so reviewers can assess risk quickly. It improves confidence before merge.",
    helpfulCount: 7,
    replies: [
      {
        id: "c-2-r-1",
        authorName: "Noah Park",
        authorAvatarUrl: "https://avatars.githubusercontent.com/u/3626078?v=4",
        createdAtLabel: "Feb 25, 2024 at 5:33 PM",
        body: "Great point. We now block merge if release note section is empty.",
        helpfulCount: 2,
      },
    ],
  },
  {
    id: "c-3",
    authorName: "Ko Min",
    authorAvatarUrl: "https://avatars.githubusercontent.com/u/583231?v=4",
    createdAtLabel: "Feb 26, 2024 at 9:22 AM",
    body: "Feature flag + staged rollout worked for us too. We also attach one dashboard screenshot in the ticket so non-dev stakeholders can verify behavior after release.",
    helpfulCount: 5,
  },
];
