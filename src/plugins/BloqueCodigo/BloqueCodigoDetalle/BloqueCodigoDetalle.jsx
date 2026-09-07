import { useState } from "react";

import "./BloqueCodigoDetalle.css";

const BloqueCodigoDetalle = ({ plugin }) => {
	const [copiado, setCopiado] = useState(false);

	const copiarCodigo = async () => {
		try {
			await navigator.clipboard.writeText(plugin.contenido_codigo || "");
			setCopiado(true);
			window.setTimeout(() => setCopiado(false), 1800);
		} catch (error) {
			console.error("No se pudo copiar el código del plugin:", error);
		}
	};

	return (
		<article className="bloque-codigo-detalle">
			<div className="bloque-codigo-detalle__encabezado">
				<div>
					<h3 className="bloque-codigo-detalle__titulo">{plugin.nombre_plugin}</h3>
					{plugin.descripcion_plugin && (
						<p className="bloque-codigo-detalle__descripcion">{plugin.descripcion_plugin}</p>
					)}
				</div>
				<span className="bloque-codigo-detalle__lenguaje">
					{plugin.lenguaje_programacion || "Texto plano"}
				</span>
			</div>
			<div className="bloque-codigo-detalle__codigo">
				<button type="button" className="bloque-codigo-detalle__copiar" onClick={copiarCodigo}>
					<i className={`ti ${copiado ? "ti-check" : "ti-copy"}`} aria-hidden="true" />
					{copiado ? "Copiado" : "Copiar código"}
				</button>
				<pre><code>{plugin.contenido_codigo || ""}</code></pre>
			</div>
		</article>
	);
};

export default BloqueCodigoDetalle;
