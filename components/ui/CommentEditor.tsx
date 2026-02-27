"use client";

import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { menuBarStateSelector } from "./menuBarState";
import {
  Bold,
  Italic,
  Code,
  Heading1,
  Heading2,
  Highlighter,
} from "lucide-react";

export const CommentEditor = ({ editor }: { editor: Editor}) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }

  const toggleHighlight = () => {
    if (editor.isActive("highlight")) {
      editor.chain().focus().unsetMark("highlight").run();
    } else {
      editor
        .chain()
        .focus()
        .setMark("highlight", { backgroundColor: "yellow" })
        .run();
    }
  };

  const btn =
    "p-2 rounded-md transition-colors duration-150 hover:bg-gray-200 dark:hover:bg-gray-700";

  const active = "bg-black text-white dark:bg-white dark:text-black";

  return (
    <div className="flex items-center gap-1 border-t px-2 py-2 bg-gray-50 dark:bg-gray-900">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={`${btn} ${editorState.isBold ? active : ""}`}
      >
        <Bold size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={`${btn} ${editorState.isItalic ? active : ""}`}
      >
        <Italic size={16} />
      </button>

      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${btn} ${editorState.isParagraph ? active : ""}`}
      >
        <span className="text-sm font-semibold">P</span>
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${btn} ${editorState.isHeading2 ? active : ""}`}
      >
        <Heading1 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${btn} ${editorState.isHeading3 ? active : ""}`}
      >
        <Heading2 size={18} />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${btn} ${editorState.isCodeBlock ? active : ""}`}
      >
        <Code size={18} />
      </button>

      <button
        onClick={toggleHighlight}
        className={`${btn} ${editor.isActive("highlight") ? active : ""}`}
      >
        <Highlighter size={18} />
      </button>
    </div>
  );
};
