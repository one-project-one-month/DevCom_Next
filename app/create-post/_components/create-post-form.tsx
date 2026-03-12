"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { ImageInput } from "@/app/create-post/_components/image-input";
import { TagInput } from "@/app/create-post/_components/tag-input";
import type {
  CreatePostFormData,
  CreatePostValidationErrors,
  PostStatus,
} from "@/app/create-post/_types";
import { PanelCard } from "@/components/dashboard/shared";
import { ApiError, apiFetch } from "@/lib/api/fetcher";

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

  if (form.title.trim().length < 8 || form.title.trim().length > 120) {
    errors.title = "Title must be between 8 and 120 characters.";
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
  const [statusMessage, setStatusMessage] = useState<string>(() => {
    if (!editId) {
      return "";
    }

    return "Editing requires server data.";
  });
  const [showPreview, setShowPreview] = useState(false);
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
  const completion = useMemo(() => {
    const required: boolean[] = [
      form.title.trim().length >= 8,
      form.body.trim().length > 0,
      form.tags.length >= 1,
    ];
    const done = required.filter(Boolean).length;
    return Math.round((done / required.length) * 100);
  }, [form]);

  const requiredChecks = useMemo(() => {
    const checks = [
      {
        key: "title",
        label: "Title (required)",
        done: form.title.trim().length >= 8,
        public: true,
      },
      {
        key: "body",
        label: "Body content (required)",
        done: form.body.trim().length > 0,
        public: true,
      },
      {
        key: "tags",
        label: "At least 1 tag (required)",
        done: form.tags.length >= 1,
        public: true,
      },
      {
        key: "visibility",
        label: "Visibility is Public (always)",
        done: true,
        public: true,
      },
    ];

    return checks;
  }, [form]);

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
      await apiFetch<{ post: { id: string } }>("/api/posts", {
        method: "POST",
        body: {
          title: form.title.trim(),
          body: form.body.trim(),
          tags: form.tags,
          status: "published",
        },
      });

      await queryClient.invalidateQueries({ queryKey: ["feed"] });
      router.push("/");
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : "Unable to publish post.";
      setStatusMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <PanelCard className="overflow-hidden">
        <div className="bg-linear-to-r from-emerald-500/15 via-sky-500/10 to-blue-500/15 p-6 dark:from-emerald-500/20 dark:via-sky-500/15 dark:to-blue-500/20">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Publish Flow
              </p>
              <h1 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {editId ? "Edit Knowledge Post" : "Create a Knowledge Post"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
                Focus on clarity. Share context, what you tried, and the outcome
                you want.
              </p>
            </div>
            <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
              Completion {completion}%
            </div>
          </div>
        </div>
      </PanelCard>

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
                onChange={(event) =>
                  setForm({ ...form, body: event.target.value })
                }
                className="min-h-64 rounded-2xl border border-slate-200 bg-white p-4 text-sm leading-7 outline-none transition focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900"
                placeholder="Start with context. Add what you tried, current behavior, and desired outcome."
              />
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {errors.body ??
                    "Clear context and constraints make faster replies."}
                </span>
                <span>{bodyCount}/10000</span>
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
              <TagInput
                tags={form.tags}
                onChange={(tags) => setForm({ ...form, tags })}
              />
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
          </div>
        </PanelCard>

        {showPreview ? (
          <PanelCard className="p-6">
            <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
              Live Preview
            </p>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {form.title || "Untitled post"}
            </h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
              {form.body || "No content yet."}
            </p>
            {previewImageUrl || existingImageUrl ? (
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
                <Image
                  src={previewImageUrl ?? existingImageUrl ?? ""}
                  alt="Preview upload"
                  width={480}
                  height={280}
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {form.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </PanelCard>
        ) : null}
      </div>

      <PanelCard className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            Publish
          </p>
          {statusMessage ? (
            <span className="text-xs text-slate-600 dark:text-slate-300">
              {statusMessage}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => submitForm("Publish")}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          disabled={isSubmitting}
        >
          <Sparkles className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Publish"}
        </button>
      </PanelCard>
    </div>
  );
}
