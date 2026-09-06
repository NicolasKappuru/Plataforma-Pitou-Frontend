import "./OpcionesPlugins.css";

const OpcionesPlugins = ({ opciones = [], onAgregar }) => {
	return (
		<div className="opciones-plugins">
			<span className="opciones-plugins__titulo"> Agregar plugin </span>

			<div className="opciones-plugins__grid">
				{opciones.map((opcion) => (
					<button
						key={opcion.tipo}
						type="button"
						className="opciones-plugins__opcion"
						onClick={() => onAgregar?.(opcion.tipo)}
					>
						<i className={`ti ti-${opcion.icono}`} aria-hidden="true" />
						<span>{opcion.nombre}</span>
					</button>
				))}
			</div>
		</div>
	);
};

export default OpcionesPlugins;