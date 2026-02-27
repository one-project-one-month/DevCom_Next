"use client";

import { useEffect, useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyleKit } from "@tiptap/extension-text-style";
import { CommentEditor } from "@/components/ui/CommentEditor";
import { EditorContent, useEditor } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";

type CommentEditorSectionProps = {
  defaultExpanded?: boolean;
};

export default function CommentEditorSection({
  defaultExpanded = false,
}: CommentEditorSectionProps) {
  const [showButtonState, setShowButtonState] = useState(false);
  const [isFocusedState, setIsFocusedState] = useState(defaultExpanded);

  // Initialize editor with placeholder text
  const editor = useEditor({
    extensions: [
      TextStyleKit,
      StarterKit,
      Placeholder.configure({
        placeholder: defaultExpanded ? "Reply ..." : "Write a comment...",
      }),
      Highlight.configure({
        multicolor: false,
      }),
    ],
    content: "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "p-3 min-h-[100px] outline-none",
      },
    },
    onFocus: () => setIsFocusedState(true),
  });

  // Effect to update the button state based on editor content
  useEffect(() => {
    if (!editor) return;

    const updateHandler = () => {
      setShowButtonState(!editor.isEmpty);
    };

    editor.on("update", updateHandler);

    return () => {
      editor.off("update", updateHandler);
    };
  }, [editor]);

  // If editor is not initialized, return null to avoid errors
  if (!editor) return null;

  return (
    <div>
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all focus-within:border-blue-500 focus-within:shadow-[0_0_0_3px_rgba(59,130,246,0.15)] dark:border-slate-700 dark:bg-slate-900">
        <EditorContent className="tiptap" editor={editor} />

        {/* Always render CommentEditor, just hide it when not focused */}
        <div className={isFocusedState ? "block" : "hidden"}>
          <CommentEditor editor={editor} />
        </div>
      </div>

      {/* Show Post Comment button if editor is not empty */}
      {showButtonState && (
        <div className="mt-2 flex justify-end">
          <Button
            className="rounded-lg bg-linear-to-r from-blue-600 to-cyan-500 text-white hover:from-blue-700 hover:to-cyan-600"
            size="sm"
          >
            Post Comment
          </Button>
        </div>
      )}
    </div>
  );
}
