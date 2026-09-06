import { useMemo, useRef } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

import "./ToolbarFormula.css";

const ESTRUCTURAS = [
	{ icono: "a/b", etiqueta: "Fracción", tex: "\\frac{}{}", caret: 6 },
	{ icono: "√x", etiqueta: "Raíz cuadrada", tex: "\\sqrt{}", caret: 6 },
	{ icono: "xᵢ", etiqueta: "Subíndice", tex: "_{}", caret: 2 },
	{ icono: "x²", etiqueta: "Superíndice", tex: "^{}", caret: 2 },
	{ icono: "∫ab", etiqueta: "Integral", tex: "\\int_{}^{}", caret: 6 },
	{ icono: "( )", etiqueta: "Paréntesis", tex: "()", caret: 1 },
	{ icono: "[ ]", etiqueta: "Corchetes", tex: "[]", caret: 1 },
	{ icono: "| |", etiqueta: "Valor absoluto", tex: "||", caret: 1 },
];

const OPERADORES = [
	{ icono: "+", etiqueta: "Más", tex: "+" },
	{ icono: "−", etiqueta: "Menos", tex: "-" },
	{ icono: "×", etiqueta: "Multiplicación", tex: "\\times" },
	{ icono: "÷", etiqueta: "División", tex: "\\div" },
	{ icono: "·", etiqueta: "Producto punto", tex: "\\cdot" },
	{ icono: "=", etiqueta: "Igual", tex: "=" },
	{ icono: "±", etiqueta: "Más menos", tex: "\\pm" },
	{ icono: "∓", etiqueta: "Menos más", tex: "\\mp" },
];

const GRIEGAS = [
	{ icono: "α", etiqueta: "Alfa", tex: "\\alpha" },
	{ icono: "β", etiqueta: "Beta", tex: "\\beta" },
	{ icono: "θ", etiqueta: "Theta", tex: "\\theta" },
	{ icono: "π", etiqueta: "Pi", tex: "\\pi" },
	{ icono: "λ", etiqueta: "Lambda", tex: "\\lambda" },
	{ icono: "μ", etiqueta: "Mu", tex: "\\mu" },
	{ icono: "σ", etiqueta: "Sigma", tex: "\\sigma" },
	{ icono: "φ", etiqueta: "Phi", tex: "\\phi" },
	{ icono: "ω", etiqueta: "Omega", tex: "\\omega" },
	{ icono: "Δ", etiqueta: "Delta", tex: "\\Delta" },
];

const RELACIONES = [
	{ icono: "≠", etiqueta: "Diferente", tex: "\\neq" },
	{ icono: "≈", etiqueta: "Aproximado", tex: "\\approx" },
	{ icono: "≤", etiqueta: "Menor o igual", tex: "\\leq" },
	{ icono: "≥", etiqueta: "Mayor o igual", tex: "\\geq" },
	{ icono: "≡", etiqueta: "Equivalente", tex: "\\equiv" },
	{ icono: "∝", etiqueta: "Proporcional", tex: "\\propto" },
];

const SIMBOLOS = [
	{ icono: "∞", etiqueta: "Infinito", tex: "\\infty" },
	{ icono: "∑", etiqueta: "Sumatoria", tex: "\\sum" },
	{ icono: "∏", etiqueta: "Producto", tex: "\\prod" },
	{ icono: "∪", etiqueta: "Unión", tex: "\\cup" },
	{ icono: "∩", etiqueta: "Intersección", tex: "\\cap" },
	{ icono: "∈", etiqueta: "Pertenece", tex: "\\in" },
	{ icono: "→", etiqueta: "Flecha", tex: "\\to" },
	{ icono: "|", etiqueta: "Tal que", tex: "|" },
];

const CATEGORIAS = [
	{ nombre: "Estructuras", botones: ESTRUCTURAS },
	{ nombre: "Operadores", botones: OPERADORES },
	{ nombre: "Letras griegas", botones: GRIEGAS },
	{ nombre: "Relaciones", botones: RELACIONES },
	{ nombre: "Símbolos", botones: SIMBOLOS },
];

const ToolbarFormula = ({ valor = "", onChange }) => {
	const areaRef = useRef(null);

	const insertarTex = (tex, caret) => {
		const campo = areaRef.current;
		const inicio = campo?.selectionStart ?? valor.length;
		const fin = campo?.selectionEnd ?? valor.length;

		const nuevo = valor.slice(0, inicio) + tex + valor.slice(fin);
		const posicion = inicio + (caret ?? tex.length);

		onChange?.(nuevo);

		requestAnimationFrame(() => {
			const area = areaRef.current;
			if (area) {
				area.focus();
				area.setSelectionRange(posicion, posicion);
			}
		});
	};

	const preview = useMemo(() => {
		if (!valor.trim()) return "";
		try {
			return katex.renderToString(valor, {
				throwOnError: false,
				displayMode: true,
			});
		} catch {
			return "";
		}
	}, [valor]);

	return (
		<div className="toolbar-formula">
			<div className="toolbar-formula__barra">
				{CATEGORIAS.map((categoria) => (
					<div className="toolbar-formula__grupo" key={categoria.nombre}>
						{categoria.botones.map((boton) => (
							<button
								key={boton.etiqueta}
								type="button"
								className="toolbar-formula__boton"
								title={boton.etiqueta}
								onClick={() => insertarTex(boton.tex, boton.caret)}
							>
								{boton.icono}
							</button>
						))}
					</div>
				))}
			</div>

			<textarea
				ref={areaRef}
				className="toolbar-formula__area"
				value={valor}
				onChange={(event) => onChange?.(event.target.value)}
				rows="3"
				spellCheck={false}
				placeholder="Escribe LaTeX o usa la barra para insertar fórmulas"
			/>

			<div
				className={`toolbar-formula__preview${
					preview ? "" : " toolbar-formula__preview--vacio"
				}`}
			>
				{preview ? (
					<div dangerouslySetInnerHTML={{ __html: preview }} />
				) : (
					<span>Vista previa de la fórmula</span>
				)}
			</div>
		</div>
	);
};

export default ToolbarFormula;