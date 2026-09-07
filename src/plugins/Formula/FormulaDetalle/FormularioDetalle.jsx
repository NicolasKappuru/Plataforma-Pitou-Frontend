import { useMemo } from "react";
import katex from "katex";

import "katex/dist/katex.min.css";
import "./FormularioDetalle.css";

const FormularioDetalle = ({ plugin }) => {
	const formulaHtml = useMemo(() => {
		if (!plugin.expresion_formula?.trim()) return "";

		try {
			return katex.renderToString(plugin.expresion_formula, {
				throwOnError: false,
				displayMode: true,
			});
		} catch (error) {
			console.error("No se pudo renderizar la fórmula del plugin:", error);
			return "";
		}
	}, [plugin.expresion_formula]);

	return (
		<article className="formula-detalle">
			<h3 className="formula-detalle__titulo">{plugin.nombre_plugin}</h3>
			{plugin.descripcion_plugin && (
				<p className="formula-detalle__descripcion">{plugin.descripcion_plugin}</p>
			)}
			<div className="formula-detalle__expresion">
				{formulaHtml ? (
					<div dangerouslySetInnerHTML={{ __html: formulaHtml }} />
				) : (
					<span>Sin expresión disponible</span>
				)}
			</div>
		</article>
	);
};

export default FormularioDetalle;
