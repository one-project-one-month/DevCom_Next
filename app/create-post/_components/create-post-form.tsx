"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { LoaderCircle, Sparkles } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { ImageInput } from "@/app/create-post/_components/image-input";
import { TagInput } from "@/app/create-post/_components/tag-input";
import type {
  CreatePostFormData,
  CreatePostValidationErrors,
  PostStatus,
} from "@/app/create-post/_types";
import { PanelCard } from "@/components/dashboard/shared";
import { ApiError, apiFetch } from "@/lib/api/fetcher";
import Image from "next/image";

const INITIAL_FORM: CreatePostFormData = {
  title: "",
  postType: "Post",
  body: "",
  tags: [],
  communityId: "",
  notifyReplies: true,
  notifyMentions: true,
  image: null,
};

function validateForm(
  form: CreatePostFormData,
  mode: PostStatus,
): CreatePostValidationErrors {
  const errors: CreatePostValidationErrors = {};

  if (form.title.trim().length < 3 || form.title.trim().length > 100) {
    errors.title = "Title must be between 3 and 100 characters.";
  }

  if (mode === "Publish") {
    if (form.tags.length < 1 || form.tags.length > 5) {
      errors.tags = "Add between 1 and 5 tags.";
    }
  }

  return errors;
}

type CreatePostFormProps = {
  editId: string | null;
};

export function CreatePostForm({ editId }: CreatePostFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<CreatePostFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<CreatePostValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);

  const previewImageUrl = useMemo(() => {
    if (!form.image) return null;
    try {
      return URL.createObjectURL(form.image);
    } catch {
      return null;
    }
  }, [form.image]);

  const bodyCount = useMemo(() => form.body.length, [form.body]);

  const editQuery = useQuery<
    {
      post: { title: string; body: string; tags: string[]; imageUrl?: string };
    },
    ApiError
  >({
    queryKey: ["post", editId, "edit"],
    queryFn: () =>
      apiFetch<{
        post: {
          title: string;
          body: string;
          tags: string[];
          imageUrl?: string;
        };
      }>(`/api/posts/${editId}`),
    enabled: Boolean(editId),
    retry: false,
  });

  useEffect(() => {
    if (!editId) return;
    if (editQuery.isLoading) {
      setStatusMessage("Loading post...");
      return;
    }
    if (editQuery.isError) {
      setStatusMessage("Unable to load post for editing.");
      return;
    }
    if (editQuery.data?.post) {
      const post = editQuery.data.post;
      setForm((prev) => ({
        ...prev,
        title: post.title ?? "",
        body: post.body ?? "",
        tags: post.tags ?? [],
        image: null,
      }));
      setExistingImageUrl(post.imageUrl ?? null);
      setStatusMessage("");
    }
  }, [editId, editQuery.data?.post, editQuery.isError, editQuery.isLoading]);
  useEffect(() => {
    const url = previewImageUrl;
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [previewImageUrl]);

  const submitForm = async (mode: PostStatus) => {
    const nextErrors = validateForm(form, mode);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatusMessage("Please fix validation errors before continuing.");
      return;
    }

    setIsSubmitting(true);
    setStatusMessage("");

    try {
      let imageUrl: string | undefined;
      if (form.image) {
        const formData = new FormData();
        formData.append("file", form.image);
        const upload = await apiFetch<{ imageUrl: string }>(
          "/api/uploads/image",
          {
            method: "POST",
            body: formData,
          },
        );
        imageUrl = upload.imageUrl;
      } else if (existingImageUrl) {
        imageUrl = existingImageUrl;
      }

      if (editId) {
        await apiFetch<{ post: { id: string } }>(`/api/posts/${editId}`, {
          method: "PATCH",
          body: {
            title: form.title.trim(),
            body: form.body.trim(),
            tags: form.tags,
            imageUrl,
          },
        });
      } else {
        await apiFetch<{ post: { id: string } }>("/api/posts", {
          method: "POST",
          body: {
            title: form.title.trim(),
            body: form.body.trim(),
            tags: form.tags,
            imageUrl,
            status: "published",
          },
        });
      }

      await queryClient.invalidateQueries({ queryKey: ["feed"] });
      router.push("/");
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : editId
            ? "Unable to update post."
            : "Unable to publish post.";
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative space-y-6 pb-10">
      {isSubmitting ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm dark:bg-slate-950/70">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-lg dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            Publishing...
          </div>
        </div>
      ) : null}
      <div className="space-y-6">
        <PanelCard className="p-6">
          <div className="space-y-5">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Title
              </span>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                disabled={isSubmitting}
                className="h-12 rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900"
                placeholder="Write a clear, searchable title"
              />
              {errors.title ? (
                <span className="text-xs text-red-600 dark:text-red-300">
                  {errors.title}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Body
              </span>
              <textarea
                value={form.body}
                maxLength={5000}
                onChange={(event) =>
                  setForm({ ...form, body: event.target.value })
                }
                disabled={isSubmitting}
                className="min-h-64 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900"
                placeholder="Start with context. Add what you tried, current behavior, and desired outcome."
              />
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {errors.body ??
                    "Clear context and constraints make faster replies."}
                </span>
                <span>{bodyCount}/5000</span>
              </div>
            </label>
          </div>
        </PanelCard>

        <PanelCard className="p-6">
          <div className="grid gap-5">
            <div className="grid gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Tags
              </span>
              <div
                className={isSubmitting ? "pointer-events-none opacity-60" : ""}
              >
                <TagInput
                  tags={form.tags}
                  onChange={(tags) => setForm({ ...form, tags })}
                />
              </div>
              {errors.tags ? (
                <span className="text-xs text-red-600 dark:text-red-300">
                  {errors.tags}
                </span>
              ) : null}
            </div>

            <div className="grid gap-2">
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Attachment
              </span>
              <div
                className={isSubmitting ? "pointer-events-none opacity-60" : ""}
              >
                <ImageInput
                  image={form.image}
                  onChange={(image) => {
                    setForm({ ...form, image });
                    if (!image) {
                      setExistingImageUrl(null);
                    }
                  }}
                />
              </div>
              {!form.image && existingImageUrl ? (
                <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
                  <Image
                    width={1200}
                    height={1200}
                    src={existingImageUrl}
                    alt="Existing upload"
                    className="max-h-115 w-full rounded-xl object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </PanelCard>
      </div>

      <div className="flex items-center justify-end ">
        <button
          type="button"
          onClick={() => submitForm("Publish")}
          className="mt-3 inline-flex w-50 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          disabled={isSubmitting}
        >
          <Sparkles className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Publish"}
        </button>
      </div>
    </div>
  );
}
