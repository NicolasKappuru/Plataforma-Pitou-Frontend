import { useState } from "react";

import "./ListaPlugins.css";
import OpcionesPlugins from "../OpcionesPlugins/OpcionesPlugins";
import PluginCard from "../../../plugins/Plugin/PluginCard/PluginCard";

const claveDe = (plugin) => `${plugin?.tipo}-${plugin?.id}`;

const normalizarItems = (lista) =>
	lista.map((plugin, index) => ({ ...plugin, posicion: index }));

const quitarId = (objeto) => {
	const copia = { ...objeto };
	delete copia.id;
	return copia;
};

const quitarTipo = (objeto) => {
	const copia = { ...objeto };
	delete copia.tipo;
	return copia;
};

const ListaPlugins = ({ plugins = [], opciones = [], onAgregar, onActualizar, onEliminar, onCambioOrden }) => {
	const [items, setItems] = useState(() => normalizarItems(plugins));
	const [pluginsAnteriores, setPluginsAnteriores] = useState(plugins);
	const [activo, setActivo] = useState(null);

	if (plugins !== pluginsAnteriores) {
		setPluginsAnteriores(plugins);
		setItems(normalizarItems(plugins));
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

	const manejarGuardar = (datos) => {
		if (!activo) return;

		const plugin = items.find((item) => claveDe(item) === activo.clave);
		if (!plugin) return;

		if (activo.modo === "crear") {
			const datosNuevos = quitarId({ ...plugin, ...datos });
			onAgregar?.(datosNuevos);
			setItems((prev) => prev.filter((item) => claveDe(item) !== activo.clave));
			console.log("JSON a enviar (crear):", JSON.stringify(quitarTipo(datosNuevos), null, 2));
		} else {
			const datosActualizados = { ...plugin, ...datos };
			onActualizar?.(datosActualizados);
			console.log("JSON a enviar (editar):", JSON.stringify(quitarTipo(datosActualizados), null, 2));
		}

		setActivo(null);
	};

	const cerrarFormulario = () => {
		if (activo?.modo === "crear") {
			setItems((prev) => prev.filter((item) => claveDe(item) !== activo.clave));
		}
		setActivo(null);
	};

	return (
		<div className="lista-plugins">
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
										onSubmit={manejarGuardar}
										onCancelar={cerrarFormulario}
									/>
								) : (
									<PluginCard
										plugin={plugin}
										icono={opcionDe(plugin.tipo)?.icono}
										onEditar={() => manejarEditar(plugin)}
										onEliminar={() => onEliminar?.(plugin)}
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