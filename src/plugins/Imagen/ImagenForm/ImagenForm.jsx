import { useState } from "react";
import "./ImagenForm.css";

const ImagenForm = ({ plugin, modo = "crear", onSubmit, formRef }) => {
	const [form, setForm] = useState(() => ({
		nombre_plugin: plugin?.nombre_plugin || "",
	}));

	const [pluginAnterior, setPluginAnterior] = useState(plugin);

	if (plugin !== pluginAnterior) {
		setPluginAnterior(plugin);
		setForm({
			nombre_plugin: plugin?.nombre_plugin || "",
		});
	}

	const handleChange = (event) => {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit?.(form, event);
	};

	return (
		<div className="contenedor-formulario">
			<form
				ref={formRef}
				className={`imagen-form imagen-form--${modo}`}
				onSubmit={handleSubmit}
			>
				<div className="nombre-plugin">
					<label className="label-nombre"> Nombre del plugin </label>
					<input
						className="input-nombre"
						type="text"
						name="nombre_plugin"
						value={form.nombre_plugin}
						onChange={handleChange}
						autoComplete="off"
						autoCorrect="off"
						spellCheck={false}
						data-form-type="other"
					/>
				</div>
			</form>
		</div>
	);
};

export default ImagenForm;