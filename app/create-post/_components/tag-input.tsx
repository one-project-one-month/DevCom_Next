"use client";

import { useState } from "react";
import { X } from "lucide-react";

type TagInputProps = {
  tags: string[];
  onChange: (nextTags: string[]) => void;
  maxTags?: number;
};

export function TagInput({ tags, onChange, maxTags = 5 }: TagInputProps) {
  const [value, setValue] = useState("");

  const addTag = () => {
    const normalized = value.trim().toLowerCase();
    if (!normalized || tags.includes(normalized) || tags.length >= maxTags) {
      return;
    }

    onChange([...tags, normalized]);
    setValue("");
  };

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {tag}
            <button
              type="button"
              onClick={() => onChange(tags.filter((item) => item !== tag))}
              className="rounded p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label={`Remove ${tag}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addTag();
            }
          }}
          className="h-10 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          placeholder="Add a tag and press Enter"
          disabled={tags.length >= maxTags}
        />
        <button
          type="button"
          onClick={addTag}
          className="rounded-xl border border-slate-200 px-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          disabled={tags.length >= maxTags}
        >
          Add
        </button>
      </div>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tags.length}/{maxTags} tags</p>
    </div>
  );
}
