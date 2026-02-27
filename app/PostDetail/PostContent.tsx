import { Separator } from "@/components/ui/separator";
import ContentPara from "./ContentPara";

const data = `
   <h1>Introduction to Tiptap</h1>
<p>
  Tiptap is a <strong>headless</strong> rich text editor built on top of ProseMirror. It is designed to be highly extensible, allowing developers to customize it for a variety of use cases. Whether you're building a content management system (CMS), a blogging platform, or just a text editor for your website, Tiptap can serve as the core editing component.
</p>

<h2>What Makes Tiptap Special?</h2>
<p>
  Unlike traditional WYSIWYG (What You See Is What You Get) editors, Tiptap is built to be a headless editor. This means that it provides an API that allows developers to control every aspect of the editing experience. The core of Tiptap is the <code>ProseMirror</code> library, which is a robust toolkit for building rich text editors. However, Tiptap makes working with ProseMirror much easier by abstracting many complexities.
</p>

<h2>Features of Tiptap</h2>
<p>
  Tiptap comes with a range of features out of the box, such as <strong>bold</strong>, <strong>italic</strong>, <strong>headings</strong>, and <strong>lists</strong>. However, one of the key features of Tiptap is its extensibility. Developers can add custom nodes, marks, and extensions to the editor. This makes Tiptap suitable for a wide range of applications, from simple text editing to more advanced functionality like collaborative editing and document-based workflows.
</p>

<p>
  In addition to built-in features, Tiptap supports <code>custom commands</code>, which give you the ability to extend the editor even further. These commands can modify the editor's state, change its behavior, or trigger specific actions based on user input.
</p>

<h2>How to Use Tiptap in Your Project</h2>
<p>
  Getting started with Tiptap is easy. First, you need to install the necessary packages. You can do this using <code>npm</code> or <code>yarn</code>:
</p>

<pre>
<code>npm install @tiptap/core @tiptap/starter-kit</code>
</pre>

<p>
  After installation, you can create an editor instance and configure it according to your needs. Here’s a simple example of initializing Tiptap with the <code>StarterKit</code> extension:
</p>

<pre>
<code>
import { Editor } from '@tiptap/core';
import { StarterKit } from '@tiptap/starter-kit';

const editor = new Editor({
  extensions: [StarterKit],
});
</code>
</pre>

<h2>Conclusion</h2>
<p>
  Tiptap is an extremely powerful and flexible editor that can be tailored to suit any use case. Whether you need a simple text editor or a complex content management system, Tiptap provides the foundation to build exactly what you need. Its headless design, combined with its extensibility, makes it one of the best options available for modern web applications.
</p>
  `;

export default function PostContent() {
  return (
    <div className="mt-4">
      <div className="mb-2  text-2xl font-bold text-slate-900 dark:text-slate-100">
        Loream:2023-09-15: How to implement a new feature in our product?
      </div>
      <div className="mb-8">
        <div className="space-x-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
            # fun
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
            # http
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
            # webdev
          </span>
        </div>
      </div>

      <ContentPara data={data} />
      <Separator className="mt-5 mb-5" />
    </div>
  );
}
