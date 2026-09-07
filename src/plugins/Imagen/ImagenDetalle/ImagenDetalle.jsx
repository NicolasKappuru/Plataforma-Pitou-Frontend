import "./ImagenDetalle.css";

const ImagenDetalle = ({ plugin }) => (
	<article className="imagen-detalle">
		<div className="imagen-detalle__encabezado">
			<h3 className="imagen-detalle__titulo">{plugin.nombre_plugin}</h3>
			{plugin.descripcion_plugin && (
				<p className="imagen-detalle__descripcion">{plugin.descripcion_plugin}</p>
			)}
		</div>
		<div className="imagen-detalle__marco">
			<img
				className="imagen-detalle__imagen"
				src={plugin.url_imagen}
				alt={plugin.nombre_plugin || "Imagen del plugin"}
			/>
		</div>
	</article>
);

export default ImagenDetalle;
