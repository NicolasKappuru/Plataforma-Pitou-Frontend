import "./PluginCard.css";
import Boton from "../../../shared/Boton/Boton";

const PluginCard = ({ plugin, icono, onEditar, onEliminar }) => {
	return (
		<div className="plugin-card">
			<div className="plugin-card__nombre">
				{icono && (
					<i className={`ti ti-${icono}`} aria-hidden="true" />
				)}
				<span className="plugin-card__texto">{plugin?.nombre_plugin}</span>
			</div>

			<div className="plugin-card__acciones">
				<Boton
					label="Editar"
					icon="pencil"
					variant="action"
					type="button"
					onClick={() => onEditar?.(plugin)}
				/>
				<Boton
					label="Eliminar"
					icon="trash"
					variant="action"
					type="button"
					onClick={() => onEliminar?.(plugin)}
				/>
			</div>
		</div>
	);
};

export default PluginCard;