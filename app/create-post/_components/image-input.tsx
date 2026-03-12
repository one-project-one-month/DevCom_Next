"use client";

import Image from "next/image";
import { useEffect, useMemo } from "react";

type ImageInputProps = {
  image: File | null;
  onChange: (nextImage: File | null) => void;
};

export function ImageInput({ image, onChange }: ImageInputProps) {
  const previewUrl = useMemo(() => {
    if (!image) return null;
    try {
      return URL.createObjectURL(image);
    } catch {
      return null;
    }
  }, [image]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <div>
      <input
        type="file"
        accept="image/png,image/jpeg,image/webp"
        onChange={(event) => {
          const file = event.target.files?.[0] ?? null;
          onChange(file);
          event.currentTarget.value = "";
        }}
        className="block w-full rounded-xl border border-slate-200 bg-white p-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      />

      {previewUrl ? (
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={previewUrl}
              alt="Preview upload"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-slate-200 px-3 py-2 text-xs dark:border-slate-700">
            <span className="truncate text-slate-700 dark:text-slate-200">
              {image?.name}
            </span>
            <button
              type="button"
              onClick={() => onChange(null)}
              className="rounded px-2 py-1 text-slate-500 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              Remove
            </button>
          </div>
        </div>
      ) : null}

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        1 image only. PNG, JPG, WEBP.
      </p>
    </div>
  );
}
