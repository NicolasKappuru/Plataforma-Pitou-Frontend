import { useState } from "react";

import "./ListaPlugins.css";
import OpcionesPlugins from "../OpcionesPlugins/OpcionesPlugins";
import PluginCard from "../../../plugins/Plugin/PluginCard/PluginCard";

const claveDe = (plugin) => `${plugin?.tipo}-${plugin?.id}`;

const normalizarItems = (lista) =>
	lista.map((plugin, index) => ({ ...plugin, posicion: index }));

const esVacio = (plugin) => {
	if (plugin.nombre_plugin?.trim()) return false;
	if (plugin.descripcion_plugin?.trim()) return false;
	if (plugin.tipo === "imagen") return !plugin.url_imagen;
	if (plugin.tipo === "bloque_codigo") return !plugin.contenido_codigo;
	if (plugin.tipo === "formula") return !plugin.expresion_formula;
	return true;
};

const ListaPlugins = ({ plugins = [], opciones = [], onAgregar, onActualizar, onEliminar, onCambioOrden }) => {
	const [items, setItems] = useState(() => normalizarItems(plugins));
	const [pluginsAnteriores, setPluginsAnteriores] = useState(plugins);
	const [activo, setActivo] = useState(null);

	if (plugins !== pluginsAnteriores) {
		setPluginsAnteriores(plugins);
		setItems(normalizarItems(plugins));
		if (activo && !plugins.some((plugin) => claveDe(plugin) === activo.clave)) {
			setActivo(null);
		}
	}

	const opcionDe = (tipo) => opciones.find((opcion) => opcion.tipo === tipo);

	const encontrarFormulario = (tipo) => opcionDe(tipo)?.Formulario || null;

	const manejarSubir = (index) => {
		if (index === 0) return;

		const nuevos = [...items];
		const [movido] = nuevos.splice(index, 1);
		nuevos.splice(index - 1, 0, movido);

		const ordenados = nuevos.map((plugin, indice) => ({ ...plugin, posicion: indice }));
		setItems(ordenados);
		onCambioOrden?.(ordenados);
	};

	const manejarBajar = (index) => {
		if (index >= items.length - 1) return;

		const nuevos = [...items];
		const [movido] = nuevos.splice(index, 1);
		nuevos.splice(index + 1, 0, movido);

		const ordenados = nuevos.map((plugin, indice) => ({ ...plugin, posicion: indice }));
		setItems(ordenados);
		onCambioOrden?.(ordenados);
	};

	const manejarAgregar = (tipo) => {
		const nuevo = {
			id: `nuevo-${Date.now()}`,
			tipo,
			nombre_plugin: "",
			posicion: items.length,
		};

		setItems((prev) => [...prev, nuevo]);
		setActivo({ clave: claveDe(nuevo), modo: "crear" });
	};

	const manejarEditar = (plugin) => {
		setActivo({ clave: claveDe(plugin), modo: "editar" });
	};

	const manejarCerrarFormulario = (datos) => {
		if (!activo) return;

		const plugin = items.find((item) => claveDe(item) === activo.clave);
		if (!plugin) return;

		const actualizado = { ...plugin, ...datos };

		if (activo.modo === "crear" && esVacio(actualizado)) {
			setItems((prev) => prev.filter((item) => claveDe(item) !== activo.clave));
			setActivo(null);
			return;
		}

		setItems((prev) =>
			prev.map((item) => (claveDe(item) === activo.clave ? actualizado : item))
		);

		if (activo.modo === "crear") {
			onAgregar?.(actualizado);
		} else {
			onActualizar?.(actualizado);
		}

		setActivo(null);
	};

	const manejarEliminar = (plugin) => {
		if (activo?.clave === claveDe(plugin)) setActivo(null);
		setItems((prev) => prev.filter((item) => claveDe(item) !== claveDe(plugin)));
		onEliminar?.(plugin);
	};

	return (
		<div className="lista-plugins">
			<span className="lista-plugins__subtitulo">Plugins</span>
			<div className="lista-plugins__items">
				{items.map((plugin, index) => {
					const esActivo = activo?.clave === claveDe(plugin);
					const Formulario = encontrarFormulario(plugin.tipo);

					return (
						<div className="lista-plugins__fila" key={claveDe(plugin)}>
							<div className="lista-plugins__contenido">
								{esActivo && Formulario ? (
									<Formulario
										plugin={plugin}
										modo={activo.modo}
										onSubmit={manejarCerrarFormulario}
									/>
								) : (
									<PluginCard
										plugin={plugin}
										icono={opcionDe(plugin.tipo)?.icono}
										onEditar={() => manejarEditar(plugin)}
										onEliminar={() => manejarEliminar(plugin)}
									/>
								)}
							</div>

							<div className="lista-plugins__orden">
								<button
									type="button"
									className="lista-plugins__flecha"
									disabled={index === 0}
									aria-label="Subir plugin"
									onClick={() => manejarSubir(index)}
								>
									<i className="ti ti-chevron-up" aria-hidden="true" />
								</button>
								<button
									type="button"
									className="lista-plugins__flecha"
									disabled={index === items.length - 1}
									aria-label="Bajar plugin"
									onClick={() => manejarBajar(index)}
								>
									<i className="ti ti-chevron-down" aria-hidden="true" />
								</button>
							</div>
						</div>
					);
				})}
			</div>

			<OpcionesPlugins opciones={opciones} onAgregar={manejarAgregar} />
		</div>
	);
};

export default ListaPlugins;