"use client";

import { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import { motion } from "framer-motion";
import { useBlogStudioStore } from "@/lib/blogStudioStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function BlogStudioEditor() {
  const {
    title,
    setTitle,
    content,
    setContent,
    recomputeStats,
    markSaving,
    markSaved,
  } = useBlogStudioStore();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Link.configure({
        openOnClick: false,
      }),
      Image.configure({
        allowBase64: true,
      }),
      Placeholder.configure({
        placeholder:
          "Type / for commands · Start with an idea, and let AI help you shape it...",
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          "prose prose-slate prose-invert max-w-none focus:outline-none min-h-[480px]",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      markSaving();
      setContent(html);
      recomputeStats();
      // Fake async save
      window.setTimeout(() => {
        markSaved();
      }, 600);
    },
  });

  // Keep TipTap content in sync when store changes (e.g., AI actions later)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      <div className="flex-1 border-r border-white/5 px-6 py-5 space-y-4 overflow-y-auto">
        <div className="space-y-3">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your story a legendary title..."
            className="bg-white/5 border-white/10 text-lg font-semibold placeholder:text-slate-500"
          />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Press / for AI and layout commands</span>
            <span>CMD+S to save · CMD+SHIFT+P to publish (coming soon)</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2"
        >
          {editor && (
            <EditorContent editor={editor} className="cursor-text" />
          )}
        </motion.div>
      </div>

      {/* Simple live preview placeholder on the right half of center panel */}
      <div className="hidden lg:flex w-[40%] flex-col border-l border-white/5 bg-slate-950/60 px-5 py-5 overflow-y-auto">
        <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
          <span>Live Preview</span>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 border-white/10 bg-white/5"
            >
              M
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-7 w-7 border-white/10 bg-white/5"
            >
              📱
            </Button>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/95 p-4 space-y-3">
          <h1 className="text-xl font-semibold">
            {title || "Your revolutionary blog title appears here"}
          </h1>
          <div
            className="prose prose-slate prose-invert max-w-none text-sm"
            dangerouslySetInnerHTML={{
              __html:
                content ||
                "<p class='text-slate-500'>Start typing in the editor to see a live preview of your story. Headings, lists, quotes, code, and more will render beautifully here.</p>",
            }}
          />
        </div>
      </div>
    </div>
  );
}

