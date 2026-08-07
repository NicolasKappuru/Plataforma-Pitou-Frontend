import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import "./EditorTextoEnriquecido.css";

const contenidoVacio = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [{ type: "text", text: "" }],
    },
  ],
};

const EditorTextoEnriquecido = ({ onChange, content }) => {
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content || contenidoVacio,
    editorProps: {
      attributes: {
        class: "editor",
        "data-placeholder": "Escribe aquí...",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      onChange?.(json);
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (content) {
      const contenidoActual = editor.getJSON();
      const contenidoNuevo = content;

      if (JSON.stringify(contenidoActual) !== JSON.stringify(contenidoNuevo)) {
        editor.commands.setContent(contenidoNuevo, { emitUpdate: true });
      }
    }
  }, [editor, content]);

  useEffect(() => {
    if (!editor) return;

    const updateToolbarState = () => {
      setActiveFormats({
        bold: editor.isActive("bold"),
        italic: editor.isActive("italic"),
        underline: editor.isActive("underline"),
      });
    };

    updateToolbarState();
    editor.on("transaction", updateToolbarState);

    return () => {
      editor.off("transaction", updateToolbarState);
    };
  }, [editor]);

  if (!editor) return null;

  return (
    <div className="editor-wrapper">
      <div className="toolbar">
        <button
          type="button"
          className={activeFormats.bold ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>

        <button
          type="button"
          className={activeFormats.italic ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>

        <button
          type="button"
          className={activeFormats.underline ? "is-active" : ""}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          U
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};

export default EditorTextoEnriquecido;