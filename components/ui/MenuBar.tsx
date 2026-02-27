"use client";
import type { Editor } from "@tiptap/core";
import { useEditorState } from "@tiptap/react";
import { menuBarStateSelector } from "./menuBarState";

export const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,
    selector: menuBarStateSelector,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group border rounded-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
      <div className="button-group space-x-2 p-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editorState.canBold}
          className={
            editorState.isBold ? "bg-blue-500 text-white p-1 rounded-sm" : ""
          }
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editorState.canItalic}
          className={
            editorState.isItalic ? "bg-blue-500 text-white p-1 rounded-sm" : ""
          }
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editorState.canStrike}
          className={
            editorState.isStrike ? "bg-blue-500 text-white p-1 rounded-sm" : ""
          }
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editorState.canCode}
          className={
            editorState.isCode ? "bg-blue-500 text-white p-1 rounded-sm" : ""
          }
        >
          Code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          Clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={
            editorState.isParagraph
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          Paragraph
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editorState.isHeading1
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editorState.isHeading2
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editorState.isHeading3
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editorState.isHeading4
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editorState.isHeading5
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editorState.isHeading6
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editorState.isBulletList
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          Bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editorState.isOrderedList
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          Ordered list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={
            editorState.isCodeBlock
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          Code block
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editorState.isBlockquote
              ? "bg-blue-500 text-white p-1 rounded-sm"
              : ""
          }
        >
          Blockquote
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editorState.canUndo}
        >
          Undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editorState.canRedo}
        >
          Redo
        </button>
      </div>
    </div>
  );
};
