"use client";

type ImageInputProps = {
  image: File | null;
  onChange: (nextImage: File | null) => void;
};

export function ImageInput({ image, onChange }: ImageInputProps) {
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

      {image ? (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs dark:border-slate-700 dark:bg-slate-800">
          <span className="truncate text-slate-700 dark:text-slate-200">{image.name}</span>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="rounded px-2 py-1 text-slate-500 hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Remove
          </button>
        </div>
      ) : null}

      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
        1 image only. PNG, JPG, WEBP.
      </p>
    </div>
  );
}
