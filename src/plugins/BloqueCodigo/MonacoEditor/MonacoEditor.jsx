import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import "./MonacoEditor.css";

loader.config({ monaco });

const ALTO_LINEA = 21;
const PADDING = 12;
const ALTO_MINIMO = 88;

const alturaPara = (codigo) => {
	const lineas = codigo ? codigo.split("\n").length : 1;
	return Math.max(ALTO_MINIMO, lineas * ALTO_LINEA + PADDING);
};

const MonacoEditor = ({ lenguaje = "plaintext", valor = "", onChange }) => {
	return (
		<div className="monaco-editor">
			<Editor
				height={alturaPara(valor)}
				language={lenguaje}
				value={valor}
				onChange={onChange}
				theme="vs-dark"
				options={{
					minimap: { enabled: false },
					fontSize: 14,
					scrollBeyondLastLine: false,
					automaticLayout: true,
					tabSize: 4,
				}}
			/>
		</div>
	);
};

export default MonacoEditor;