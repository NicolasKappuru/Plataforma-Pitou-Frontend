import { useEffect, useState } from "react";
import CategoriaSelector from "../../Categoria/CatogoriaSelector/CategoriaSelector";
import EditorTextoEnriquecido from "../../EditorTextoEnriquecido/EditorTextoEnriquecido";

import "./ConceptoForm.css";

const contenidoVacio = {
    type: "doc",
    content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
};

const normalizarCategoria = (categoria) => {
    if (!categoria) return null;

    if (typeof categoria === "object") {
        return {
            id: categoria.id,
            titulo: categoria.titulo_categoria || categoria.titulo || categoria.nombre || "",
            color: categoria.color || "#7b8fc0",
            glosario: categoria.glosario ?? 1,
        };
    }

    return {
        id: undefined,
        titulo: String(categoria),
        color: "#7b8fc0",
        glosario: 1,
    };
};

const ConceptoForm = ({ valoresIniciales, modo = "crear", onSubmit, formRef }) => {
    const [form, setForm] = useState(() => {
        const inicial = valoresIniciales || {};

        return {
            nombre: inicial.titulo || inicial.nombre || "",
            categoria: normalizarCategoria(inicial.categoria),
            descripcion: inicial.descripcion || contenidoVacio,
        };
    });

    useEffect(() => {
        const inicial = valoresIniciales || {};

        setForm({
            nombre: inicial.titulo || inicial.nombre || "",
            categoria: normalizarCategoria(inicial.categoria),
            descripcion: inicial.descripcion || contenidoVacio,
        });
    }, [valoresIniciales]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleCategoria = (categoria) => {
        setForm((prev) => ({ ...prev, categoria }));
    };

    const handleDescripcion = (descripcion) => {
        setForm((prev) => ({ ...prev, descripcion }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit?.(form, event);
    };

    return (
        <div className="contenedor-formulario">
            <form ref={formRef} className="concepto-form" onSubmit={handleSubmit}>
                <div className="nombre-concepto">
                    <label className="label-nombre"> Nombre del concepto </label>
                    <input
                        className="input-nombre"
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck={false}
                        data-form-type="other"
                    />
                </div>

                <div className="categoria-concepto-form">
                    <label className="label-categoria"> Categoría del concepto </label>
                    <CategoriaSelector value={form.categoria} onSelect={handleCategoria} />
                </div>

                <div className="descripcion-concepto">
                    <label className="label-descripcion"> Descripción del concepto </label>
                    <EditorTextoEnriquecido content={form.descripcion} onChange={handleDescripcion} />
                </div>
            </form>
        </div>
    );
};

export default ConceptoForm;