import { useEffect, useState } from "react";
import ColorPicker from "../../ColorPicker/ColorPicker";
import "./CategoriaForm.css";

const CategoriaForm = ({ valoresIniciales, modo = "crear", onSubmit, isSubmitting = false, formRef, onValuesChange }) => {
	const [form, setForm] = useState({
		titulo: "",
		color: "#7b8fc0",
	});

	useEffect(() => {
		const inicial = valoresIniciales || {};
		const nextForm = {
			titulo: inicial.titulo || "",
			color: inicial.color || "#7b8fc0",
		};
		setForm(nextForm);
		onValuesChange?.(nextForm);
	}, [valoresIniciales, onValuesChange]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((p) => {
			const next = { ...p, [name]: value };
			onValuesChange?.(next);
			return next;
		});
	};

	const handleColor = (color) => {
		setForm((p) => {
			const next = { ...p, color };
			onValuesChange?.(next);
			return next;
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit?.({
			titulo: form.titulo,
			color: form.color,
		});
	};

	return (
		<div className="contenedor-formulario">
			<form ref={formRef} className="categoria-form" onSubmit={handleSubmit}>
				<div className="nombre-categoria">
					<label className="label-nombre"> Nombre de la categoría </label>
					<input
						className="input-nombre"
						type="text"
						name="titulo"
						value={form.titulo}
						onChange={handleChange}
					/>
				</div>

				<div className="color-categoria">
					<label className="label-categoria"> Color de la categoría </label>
					<ColorPicker value={form.color} onChange={handleColor} />
				</div>

				<div className="vista-previa">
					<span
						className="preview-tag"
						style={{ backgroundColor: `${form.color}22`, color: form.color, borderColor: `${form.color}44` }}
					>
						{form.titulo || "Nombre de categoría"}
					</span>
				</div>
			</form>
		</div>
	);
};

export default CategoriaForm;
