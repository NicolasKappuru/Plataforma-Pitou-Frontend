import { useState } from "react";
import "./ImagenForm.css";
import UploadOption from "../UploadOption/UploadOption";
import Boton from "../../../shared/Boton/Boton";

const ImagenForm = ({ plugin, modo = "crear", onSubmit, onCancelar }) => {
	const [form, setForm] = useState(() => ({
		nombre_plugin: plugin?.nombre_plugin || "",
		descripcion_plugin: plugin?.descripcion_plugin || "",
		url_imagen: plugin?.url_imagen || "",
	}));

	const [pluginAnterior, setPluginAnterior] = useState(plugin);

	if (plugin !== pluginAnterior) {
		setPluginAnterior(plugin);
		setForm({
			nombre_plugin: plugin?.nombre_plugin || "",
			descripcion_plugin: plugin?.descripcion_plugin || "",
			url_imagen: plugin?.url_imagen || "",
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
				className={`imagen-form imagen-form--${modo}`}
				onSubmit={handleSubmit}
			>
				<div className="campo-formulario">
					<label className="label-campo" htmlFor="nombre_plugin">
						Nombre de la imagen
					</label>
					<input
						className="input-campo"
						id="nombre_plugin"
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

				<div className="campo-formulario">
					<label className="label-campo" htmlFor="descripcion_plugin">
						Descripción de la imagen
					</label>
					<textarea
						className="input-campo input-descripcion"
						id="descripcion_plugin"
						name="descripcion_plugin"
						rows="3"
						value={form.descripcion_plugin}
						onChange={handleChange}
						placeholder="Escribe una descripción para la imagen"
					/>
				</div>

				<div className="campo-formulario">
					<label className="label-campo">Imagen</label>
					<UploadOption
						value={form.url_imagen}
						onChange={(url) =>
							setForm((prev) => ({ ...prev, url_imagen: url }))
						}
					/>
				</div>

				<div className="campo-formulario acciones-formulario">
					<Boton
						label={modo === "crear" ? "Guardar imagen" : "Guardar cambios"}
						variant="form_action"
						type="submit"
					/>
					<Boton
						label="Cancelar"
						variant="form_action"
						type="button"
						onClick={onCancelar}
					/>
				</div>
			</form>
		</div>
	);
};

export default ImagenForm;