import { useRef } from "react";

import "./UploadOption.css";

const UploadOption = ({ value = "", onChange }) => {
	const inputRef = useRef(null);

	const manejarArchivo = (event) => {
		const archivo = event.target.files?.[0];
		if (!archivo) return;

		const lector = new FileReader();
		lector.onload = () => {
			onChange?.(lector.result);
		};
		lector.readAsDataURL(archivo);

		event.target.value = "";
	};

	const abrirSelector = () => {
		inputRef.current?.click();
	};

	const quitarImagen = (event) => {
		event.stopPropagation();
		onChange?.("");
	};

	return (
		<div className="upload-option">
			<input
				ref={inputRef}
				className="upload-option__input"
				type="file"
				accept="image/*"
				onChange={manejarArchivo}
			/>

			{value ? (
				<div className="upload-option__vista" onClick={abrirSelector}>
					<img
						className="upload-option__imagen"
						src={value}
						alt="Vista previa de la imagen"
					/>
					<div className="upload-option__capa">
						<i className="ti ti-refresh" aria-hidden="true" />
						<span>Haz clic para cambiar la imagen</span>
					</div>
					<button
						type="button"
						className="upload-option__quitar"
						aria-label="Quitar imagen"
						onClick={quitarImagen}
					>
						<i className="ti ti-trash" aria-hidden="true" />
					</button>
				</div>
			) : (
				<div className="upload-option__vacio" onClick={abrirSelector}>
					<i className="ti ti-photo-plus" aria-hidden="true" />
					<span>Haz clic para subir una imagen</span>
				</div>
			)}
		</div>
	);
};

export default UploadOption;