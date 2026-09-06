import { useRef, useState } from "react";

import "./ListaPlugins.css";
import OpcionesPlugins from "../OpcionesPlugins/OpcionesPlugins";
import PluginCard from "../../../plugins/Plugin/PluginCard/PluginCard";
import Boton from "../../Boton/Boton";

const normalizarItems = (lista) =>
	lista.map((plugin, index) => ({ ...plugin, posicion: plugin.posicion ?? index }));

const quitarId = (objeto) => {
	const copia = { ...objeto };
	delete copia.id;
	return copia;
};

const ListaPlugins = ({ plugins = [], opciones = [], onAgregar, onActualizar, onEliminar, onCambioOrden }) => {
	const [items, setItems] = useState(() => normalizarItems(plugins));
	const [pluginsAnteriores, setPluginsAnteriores] = useState(plugins);
	const [activo, setActivo] = useState(null);
	const formRef = useRef(null);

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
		setActivo({ id: nuevo.id, modo: "crear" });
	};

	const manejarEditar = (plugin) => {
		setActivo({ id: plugin.id, modo: "editar" });
	};

	const manejarGuardar = (datos) => {
		if (!activo) return;

		const plugin = items.find((item) => item.id === activo.id);
		if (!plugin) return;

		if (activo.modo === "crear") {
			onAgregar?.(quitarId({ ...plugin, ...datos }));
			setItems((prev) => prev.filter((item) => item.id !== activo.id));
		} else {
			onActualizar?.({ ...plugin, ...datos });
		}

		setActivo(null);
	};

	const cerrarFormulario = () => {
		if (activo?.modo === "crear") {
			setItems((prev) => prev.filter((item) => item.id !== activo.id));
		}
		setActivo(null);
	};

	return (
		<div className="lista-plugins">
			<div className="lista-plugins__items">
				{items.map((plugin, index) => {
					const esActivo = activo?.id === plugin.id;
					const Formulario = encontrarFormulario(plugin.tipo);

					return (
						<div className="lista-plugins__fila" key={plugin.id}>
							<div className="lista-plugins__contenido">
								{esActivo && Formulario ? (
									<div className="lista-plugins__form">
										<Formulario
											plugin={plugin}
											modo={activo.modo}
											onSubmit={manejarGuardar}
											formRef={formRef}
										/>
										<div className="lista-plugins__form-acciones">
											<Boton
												label={activo.modo === "crear" ? "Guardar plugin" : "Guardar cambios"}
												variant="form_action"
												type="button"
												onClick={() => formRef.current?.requestSubmit()}
											/>
											<Boton
												label="Cancelar"
												variant="form_action"
												type="button"
												onClick={cerrarFormulario}
											/>
										</div>
									</div>
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