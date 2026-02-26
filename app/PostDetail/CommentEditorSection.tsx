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
      <div className="rounded-lg border bg-white dark:bg-gray-800 overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition-all">
        <EditorContent className="tiptap" editor={editor} />

        {/* Always render CommentEditor, just hide it when not focused */}
        <div className={isFocusedState ? "block" : "hidden"}>
          <CommentEditor editor={editor} />
        </div>
      </div>

      {/* Show Post Comment button if editor is not empty */}
      {showButtonState && (
        <div>
          <Button
            className="mt-2 self-end bg-blue-600 hover:bg-blue-700"
            size="sm"
          >
            Post Comment
          </Button>
        </div>
      )}
    </div>
  );
}
