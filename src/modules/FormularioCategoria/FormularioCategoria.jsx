import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CategoriaForm from "../../shared/Categoria/CategoriaForm/CategoriaForm";
import MensajeAlerta from "../../shared/MensajeAlerta/MensajeAlerta";
import Boton from "../../shared/Boton/Boton";
import crearCategoria from "./services/service_crear_categoria";
import actualizarCategoria from "./services/service_actualizar_categoria";

import "./FormularioCategoria.css";

const FormularioCategoria = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const formValuesRef = useRef({ titulo: "", color: "#7b8fc0" });
	const isSubmittingRef = useRef(false);
	const modo = location.state?.modo || "crear";
	const valoresIniciales = modo === "editar" ? location.state?.categoria : undefined;
	const [alerta, setAlerta] = useState({ visible: false, message: "", color: "#16a34a" });
	const [isSubmitting, setIsSubmitting] = useState(false);

	const beginSubmit = () => {
		if (isSubmittingRef.current) return false;
		isSubmittingRef.current = true;
		setIsSubmitting(true);
		return true;
	};

	const finishSubmit = () => {
		isSubmittingRef.current = false;
		setIsSubmitting(false);
	};

	const handleSubmit = async (formData) => {
		if (!beginSubmit()) return;

		let completedSuccessfully = false;

		try {
			const payload = {
				titulo_categoria: formData.titulo,
				color: formData.color,
				glosario: 1,
			};

			if (modo === "editar") {
				await actualizarCategoria({
					id: valoresIniciales?.id,
					...payload,
				});
				setAlerta({ visible: true, message: "Categoría actualizada correctamente", color: "#16a34a" });
			} else {
				await crearCategoria(payload);
				setAlerta({ visible: true, message: "Categoría creada correctamente", color: "#16a34a" });
			}

			completedSuccessfully = true;
			await new Promise((resolve) => window.setTimeout(resolve, 900));
			navigate("/glosario/categorias");
		} catch (error) {
			console.error("Error al guardar categoría:", error);
			setAlerta({ visible: true, message: "No se pudo completar la operación", color: "#dc2626" });
		} finally {
			if (!completedSuccessfully) {
				finishSubmit();
			}
		}
	};

	const handleClickSubmit = () => {
		handleSubmit(formValuesRef.current);
	};

	return (
		<div className="contenedor-form-categoria">
			<h2 className="titulo-form-categoria">{modo === "editar" ? "Editar categoría" : "Crear categoría"}</h2>
			<MensajeAlerta visible={alerta.visible} message={alerta.message} color={alerta.color} />
			<CategoriaForm
				valoresIniciales={valoresIniciales}
				modo={modo}
				onSubmit={handleSubmit}
				isSubmitting={isSubmitting}
				onValuesChange={(values) => {
					formValuesRef.current = values;
				}}
			/>

			<div className="btn-crear-editar-categoria">
				<Boton
					label={isSubmitting ? (modo === "editar" ? "Guardando..." : "Creando...") : (modo === "editar" ? "Guardar categoría" : "Crear categoría")}
					variant="form_action"
					onClick={handleClickSubmit}
					type="button"
					disabled={isSubmitting}
				/>

				<Boton
                    label="Cancelar"
                    variant="form_action"
                    onClick={console.log("boton")}
                    type="button"
                />
			</div>
		</div>
	);
};

export default FormularioCategoria;
