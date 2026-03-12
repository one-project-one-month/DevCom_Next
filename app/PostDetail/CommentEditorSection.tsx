"use client";

import { useMemo, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type CommentEditorSectionProps = {
  defaultExpanded?: boolean;
  onSubmit: (value: string) => void | Promise<void>;
  isSubmitting?: boolean;
  compact?: boolean;
};

export default function CommentEditorSection({
  onSubmit,
  isSubmitting = false,
  compact = false,
}: CommentEditorSectionProps) {
  const [value, setValue] = useState("");
  const trimmed = useMemo(() => value.trim(), [value]);
  const canSubmit = trimmed.length > 0 && !isSubmitting;

  const handleSubmit = async () => {
    if (!trimmed) return;
    await onSubmit(trimmed);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2">
      <Textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write a comment..."
        rows={compact ? 2 : 4}
        className={compact ? "min-h-[44px] resize-none" : "min-h-[100px] resize-none"}
      />

      <Button
        aria-label={isSubmitting ? "Posting" : "Send comment"}
        className="rounded-full bg-linear-to-r from-blue-600 to-cyan-500 p-2 text-white hover:from-blue-700 hover:to-cyan-600"
        size="icon"
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
