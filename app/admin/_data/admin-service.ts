import { User, Post, Report } from "./admin";

type PaginatedResponse<T> = {
  data: T[];
  total: number;
  totalPages: number;
};

export async function getPaginatedData<T>(
  source: T[],
  page: number,
  limit: number,
  searchQuery: string,
  searchKeys: (keyof T)[],
): Promise<PaginatedResponse<T>> {
  await new Promise((r) => setTimeout(r, 400));

  const filtered = source.filter((item) => {
    if (!searchQuery) return true;
    return searchKeys.some((key) => {
      const value = String(item[key]).toLowerCase();
      return value.includes(searchQuery.toLowerCase());
    });
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * limit;
  const data = filtered.slice(start, start + limit);

  return { data, total, totalPages };
}

export const fetchUsers = (page: number, limit: number, search: string) =>
  getPaginatedData<User>([], page, limit, search, ["name", "email"]);

export const fetchPosts = (page: number, limit: number, search: string) =>
  getPaginatedData<Post>([], page, limit, search, ["title", "authorName"]);

export const fetchReports = (page: number, limit: number, search: string) =>
  getPaginatedData<Report>([], page, limit, search, [
    "targetTitle",
    "reporterName",
    "reason",
  ]);
