import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const VistaTextoEnriquecido = ({ contenido }) => {

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: contenido,
        editable: false
    });

    if (!editor) return null;

    return <EditorContent editor={editor} />;
};

export default VistaTextoEnriquecido;