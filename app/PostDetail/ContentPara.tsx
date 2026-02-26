"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type ContentParaProps = {
  data?: string;
};

export default function ContentPara({ data }: ContentParaProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
    editable: false,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && data) {
      editor.commands.setContent(data);
    }
  }, [editor, data]);

  return (
    <div className="post-content">
      <EditorContent editor={editor} />
    </div>
  );
}
