import { useState } from "react";
import "./BloqueCodigoForm.css";
import MonacoEditor from "../MonacoEditor/MonacoEditor";
import Boton from "../../../shared/Boton/Boton";

const LENGUAJES = [
	{ valor: "javascript", monaco: "javascript", nombre: "JavaScript" },
	{ valor: "typescript", monaco: "typescript", nombre: "TypeScript" },
	{ valor: "python", monaco: "python", nombre: "Python" },
	{ valor: "java", monaco: "java", nombre: "Java" },
	{ valor: "c++", monaco: "cpp", nombre: "C++" },
	{ valor: "csharp", monaco: "csharp", nombre: "C#" },
	{ valor: "php", monaco: "php", nombre: "PHP" },
	{ valor: "ruby", monaco: "ruby", nombre: "Ruby" },
	{ valor: "go", monaco: "go", nombre: "Go" },
	{ valor: "rust", monaco: "rust", nombre: "Rust" },
	{ valor: "sql", monaco: "sql", nombre: "SQL" },
	{ valor: "html", monaco: "html", nombre: "HTML" },
	{ valor: "css", monaco: "css", nombre: "CSS" },
	{ valor: "json", monaco: "json", nombre: "JSON" },
	{ valor: "bash", monaco: "shell", nombre: "Bash" },
];

const lenguajeMonaco = (valor) =>
	LENGUAJES.find((lenguaje) => lenguaje.valor === valor)?.monaco || "plaintext";

const BloqueCodigoForm = ({ plugin, modo = "crear", onSubmit, onChange }) => {
	const [form, setForm] = useState(() => ({
		nombre_plugin: plugin?.nombre_plugin || "",
		descripcion_plugin: plugin?.descripcion_plugin || "",
		lenguaje_programacion: plugin?.lenguaje_programacion || "python",
		contenido_codigo: plugin?.contenido_codigo || "",
	}));

	const handleChange = (event) => {
		const { name, value } = event.target;
		const actualizado = { ...form, [name]: value };
		setForm(actualizado);
		onChange?.(actualizado);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmit?.(form, event);
	};

	return (
		<div className="contenedor-formulario">
			<form
				className={`bloque-codigo-form bloque-codigo-form--${modo}`}
				onSubmit={handleSubmit}
			>
				<div className="campo-formulario">
					<label className="label-campo" htmlFor="nombre_plugin">
						Nombre del bloque de código
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
						Descripción del bloque de código
					</label>
					<textarea
						className="input-campo input-descripcion"
						id="descripcion_plugin"
						name="descripcion_plugin"
						rows="3"
						value={form.descripcion_plugin}
						onChange={handleChange}
						placeholder="Escribe una descripción para el bloque de código"
					/>
				</div>

				<div className="campo-formulario">
					<label className="label-campo" htmlFor="lenguaje_programacion">
						Lenguaje de programación
					</label>
					<div className="select-wrapper">
						<select
							className="input-campo input-select"
							id="lenguaje_programacion"
							name="lenguaje_programacion"
							value={form.lenguaje_programacion}
							onChange={handleChange}
						>
							{LENGUAJES.map((lenguaje) => (
								<option key={lenguaje.valor} value={lenguaje.valor}>
									{lenguaje.nombre}
								</option>
							))}
						</select>
						<i className="ti ti-chevron-down select-wrapper__flecha" aria-hidden="true" />
					</div>
				</div>

				<div className="campo-formulario">
					<label className="label-campo">Contenido del código</label>
					<MonacoEditor
						lenguaje={lenguajeMonaco(form.lenguaje_programacion)}
						valor={form.contenido_codigo}
						onChange={(codigo) => {
							const actualizado = { ...form, contenido_codigo: codigo };
							setForm(actualizado);
							onChange?.(actualizado);
						}}
					/>
				</div>

				<div className="campo-formulario acciones-formulario">
					<Boton label="Suprimir" variant="form_action" type="submit" />
				</div>
			</form>
		</div>
	);
};

export default BloqueCodigoForm;