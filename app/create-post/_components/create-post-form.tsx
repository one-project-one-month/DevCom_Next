"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, PenLine, Sparkles, Target } from "lucide-react";

import { ImageInput } from "@/app/create-post/_components/image-input";
import { TagInput } from "@/app/create-post/_components/tag-input";
import type {
  CreatePostFormData,
  CreatePostValidationErrors,
  PostStatus,
} from "@/app/create-post/_types";
import { feedPosts } from "@/components/dashboard/data";
import { PanelCard } from "@/components/dashboard/shared";

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
    if (form.body.trim().length < 30) {
      errors.body = "Body must be at least 30 characters for publish.";
    }

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
  const editingPost = useMemo(
    () =>
      editId ? (feedPosts.find((item) => item.id === editId) ?? null) : null,
    [editId],
  );
  const [form, setForm] = useState<CreatePostFormData>(() => {
    if (!editingPost) {
      return INITIAL_FORM;
    }

    return {
      title: editingPost.title,
      postType: editingPost.postType,
      body: editingPost.content,
      tags: [...editingPost.tags],
      communityId: "",
      notifyReplies: true,
      notifyMentions: true,
      image: null,
    };
  });
  const [errors, setErrors] = useState<CreatePostValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>(() => {
    if (!editId) {
      return "";
    }

    return editingPost
      ? "Editing existing post."
      : "Post not found for editing.";
  });
  const [showPreview, setShowPreview] = useState(false);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(
    editingPost?.imageUrl ?? null,
  );

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
      form.body.trim().length >= 30,
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
        done: form.body.trim().length >= 30,
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

    await new Promise((resolve) => setTimeout(resolve, 700));

    setIsSubmitting(false);
    setStatusMessage(
      mode === "Draft"
        ? "Draft saved successfully."
        : "Post published successfully.",
    );
  };

  return (
    <div className="space-y-5 pb-8">
      <PanelCard className="overflow-hidden">
        <div className="bg-linear-to-r from-sky-600 via-blue-600 to-cyan-600 p-5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h1 className="inline-flex items-center gap-2 text-lg font-semibold">
              <PenLine className="h-5 w-5" />
              {editId ? "Edit Knowledge Post" : "Create Knowledge Post"}
            </h1>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium">
              Completion {completion}%
            </span>
          </div>
          <p className="mt-1 text-sm text-blue-50">
            Write a high-signal post with clear context, useful tags, and
            publish checks.
          </p>
        </div>
      </PanelCard>

      <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <PanelCard className="p-5">
          <div className="grid gap-5">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                Core Post Details
              </p>

              <div className="grid gap-4">
                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Title *
                  </span>
                  <input
                    value={form.title}
                    onChange={(event) =>
                      setForm({ ...form, title: event.target.value })
                    }
                    className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                    placeholder="Write a clear, searchable title"
                  />
                  {errors.title ? (
                    <span className="text-xs text-red-600 dark:text-red-300">
                      {errors.title}
                    </span>
                  ) : null}
                </label>

                <label className="grid gap-1">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Content *
                  </span>
                  <textarea
                    value={form.body}
                    onChange={(event) =>
                      setForm({ ...form, body: event.target.value })
                    }
                    className="min-h-44 rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none dark:border-slate-700 dark:bg-slate-900"
                    placeholder="Write the main post content in markdown-friendly text"
                  />
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>
                      {errors.body ??
                        "Use clear context, constraints, and expected outcomes."}
                    </span>
                    <span>{bodyCount}/10000</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                Context & Metadata
              </p>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Tags *
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

                <div className="grid gap-1">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Attachments
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
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
              <p className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-100">
                Publishing Preferences
              </p>
              <div className="grid gap-4">
                <div className="grid gap-1">
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    Visibility
                  </span>
                  <p className="h-11 rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                    Public
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                <label className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.notifyReplies}
                    onChange={(event) =>
                      setForm({ ...form, notifyReplies: event.target.checked })
                    }
                  />
                  Notify me on replies
                </label>
                <label className="inline-flex items-center gap-2 text-slate-700 dark:text-slate-200">
                  <input
                    type="checkbox"
                    checked={form.notifyMentions}
                    onChange={(event) =>
                      setForm({ ...form, notifyMentions: event.target.checked })
                    }
                  />
                  Notify me on mentions
                </label>
              </div>
            </div>
          </div>
        </PanelCard>

        <div className="space-y-4 xl:sticky xl:top-4">
          <PanelCard className="p-4">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Target className="h-4 w-4" />
              Publish Panel
            </p>
            <div className="mb-3 h-2 rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className="h-2 rounded-full bg-linear-to-r from-sky-500 to-blue-600 transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              Complete required fields to publish with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => submitForm("Draft")}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                disabled={isSubmitting}
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => setShowPreview((prev) => !prev)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                {showPreview ? "Hide Preview" : "Preview"}
              </button>
              <button
                type="button"
                onClick={() => submitForm("Publish")}
                className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Publish"}
              </button>
            </div>

            {statusMessage ? (
              <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">
                {statusMessage}
              </p>
            ) : null}
          </PanelCard>

          <PanelCard className="p-4">
            <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Sparkles className="h-4 w-4" />
              Quality Checklist
            </p>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              {requiredChecks.map((check) => (
                <li
                  key={check.key}
                  className="flex items-center justify-between gap-2"
                >
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2
                      className={`h-3.5 w-3.5 ${check.done ? "text-emerald-600" : "text-slate-400"}`}
                    />
                    {check.label}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {check.public ? "Public" : "Optional"}
                  </span>
                </li>
              ))}
            </ul>
          </PanelCard>

          {showPreview ? (
            <PanelCard className="p-4">
              <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
                Live Preview
              </p>
              <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                {form.title || "Untitled post"}
              </h2>
              <span className="mt-2 inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {form.postType}
              </span>
              <p className="mt-2 whitespace-pre-wrap text-sm text-slate-700 dark:text-slate-300">
                {form.body || "No content yet."}
              </p>
              {previewImageUrl || existingImageUrl ? (
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-700 dark:bg-slate-900">
                  <Image
                    src={previewImageUrl ?? existingImageUrl ?? ""}
                    alt="Preview upload"
                    width={480}
                    height={280}
                    className="h-auto w-full rounded-lg object-cover"
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
      </div>
    </div>
  );
}
