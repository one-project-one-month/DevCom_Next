import { feedPosts } from "@/components/dashboard/data";
import type { FeedPost } from "@/components/dashboard/types";
import type { ProfilePageData } from "@/app/profile/_types";

type PublicProfileMeta = {
  id: string;
  name: string;
  handle: string;
  role: string;
  location: string;
  bio: string;
  expertise: string[];
};

const PUBLIC_PROFILE_META: Record<string, PublicProfileMeta> = {
  "nina.codes": {
    id: "usr_nina",
    name: "Nina Park",
    handle: "@nina.codes",
    role: "Backend Engineer",
    location: "Seoul, KR",
    bio: "Working on API contracts, service reliability, and practical backend patterns.",
    expertise: ["TypeScript", "API Design", "Distributed Systems"],
  },
  inoor: {
    id: "usr_inoor",
    name: "Ibrahim Noor",
    handle: "@inoor",
    role: "Platform Engineer",
    location: "Dubai, AE",
    bio: "Building CI/CD systems and safer release workflows for product teams.",
    expertise: ["CI/CD", "DevOps", "Automation"],
  },
  "maya.dev": {
    id: "usr_maya",
    name: "Maya Chen",
    handle: "@maya.dev",
    role: "Design Systems Engineer",
    location: "Taipei, TW",
    bio: "Focused on scalable design systems and frontend governance at scale.",
    expertise: ["Design Systems", "Frontend", "Governance"],
  },
  leocodes: {
    id: "usr_leo",
    name: "Leo Martinez",
    handle: "@leocodes",
    role: "Performance Engineer",
    location: "Madrid, ES",
    bio: "Investigating performance bottlenecks and sharing reproducible benchmarks.",
    expertise: ["Performance", "Benchmarking", "React Query"],
  },
  "ariana.dev": {
    id: "usr_ariana",
    name: "Ariana Wells",
    handle: "@ariana.dev",
    role: "Engineering Manager",
    location: "Toronto, CA",
    bio: "Leading teams on code quality, developer workflows, and predictable delivery.",
    expertise: ["Team Processes", "Code Review", "Leadership"],
  },
  "kaito.builds": {
    id: "usr_kaito",
    name: "Kaito Sato",
    handle: "@kaito.builds",
    role: "Frontend Performance Lead",
    location: "Tokyo, JP",
    bio: "Optimizing dashboard rendering and route-level performance patterns.",
    expertise: ["Next.js", "Web Perf", "Architecture"],
  },
  devweekly: {
    id: "usr_devweekly",
    name: "Dev Weekly",
    handle: "@devweekly",
    role: "Community Curator",
    location: "Remote",
    bio: "Curating practical engineering content and raising quality bar in developer communities.",
    expertise: ["Community", "OSS", "Developer Experience"],
  },
  "hhlaing.swan": {
    id: "usr_me",
    name: "H.Hlaing Swan",
    handle: "@hhlaing.swan",
    role: "Frontend Engineer",
    location: "Yangon, MM",
    bio: "Building knowledge-first developer experiences focused on maintainability.",
    expertise: ["React", "Next.js", "TypeScript"],
  },
};

function normalizeHandle(handle: string) {
  return handle.replace(/^@/, "").toLowerCase();
}

function summarizeTopTopics(posts: FeedPost[]) {
  const counter = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.tags) {
      counter.set(tag, (counter.get(tag) ?? 0) + 1);
    }
  }

  return [...counter.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([topic, count]) => ({ topic, count }));
}

export function getPublicProfilePageData(handleSlug: string): ProfilePageData | null {
  const slug = normalizeHandle(handleSlug);
  const meta = PUBLIC_PROFILE_META[slug];

  if (!meta) {
    return null;
  }

  const contributions = feedPosts.filter((post) => normalizeHandle(post.handle) === slug);

  return {
    profile: {
      ...meta,
      isOwnProfile: slug === "hhlaing.swan",
      stats: {
        threads: contributions.length,
        helpful: contributions.reduce((sum, post) => sum + post.helpful, 0),
        replies: contributions.reduce((sum, post) => sum + post.replies, 0),
        topTopics: summarizeTopTopics(contributions).length,
      },
    },
    contributions,
    topTopics: summarizeTopTopics(contributions),
  };
}
