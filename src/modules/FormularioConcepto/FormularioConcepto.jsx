import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConceptoForm from "../../shared/Concepto/ConceptoForm/ConceptoForm";
import Boton from "../../shared/Boton/Boton";
import MensajeAlerta from "../../shared/MensajeAlerta/MensajeAlerta";
import crearConcepto from "./services/service_crear_concepto";
import actualizarConcepto from "./services/service_actualizar_concepto";

import "./FormularioConcepto.css";

const FormularioConcepto = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const isSubmittingRef = useRef(false);
    const [alerta, setAlerta] = useState({ visible: false, message: "", color: "#16a34a" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const modo = location.state?.modo || "crear";
    const valoresIniciales = modo === "editar" ? location.state?.concepto : undefined;

    const iniciarEnvio = () => {
        if (isSubmittingRef.current) return false;

        isSubmittingRef.current = true;
        setIsSubmitting(true);
        return true;
    };

    const finalizarEnvio = () => {
        isSubmittingRef.current = false;
        setIsSubmitting(false);
    };

    const handleSubmit = async (formData) => {
        if (!isSubmittingRef.current) {
            if (!iniciarEnvio()) return;
        }

        try {
            const payload = {
                titulo_concepto: formData.nombre,
                descripcion_concepto: formData.descripcion,
                categoria_id: formData.categoria?.id ?? null,
            };

            if (modo === "editar") {
                await actualizarConcepto({
                    id: valoresIniciales?.id,
                    ...payload,
                });
                setAlerta({ visible: true, message: "Concepto actualizado correctamente", color: "#16a34a" });
            } else {
                await crearConcepto(payload);
                setAlerta({ visible: true, message: "Concepto creado correctamente", color: "#16a34a" });
            }

            window.setTimeout(() => {
                finalizarEnvio();
                navigate("/glosario/propio");
            }, 900);
        } catch (error) {
            setAlerta({ visible: true, message: "No se pudo completar la operación", color: "#dc2626" });
            console.error("Error al guardar concepto:", error);
            finalizarEnvio();
        }
    };

    const handleClickSubmit = () => {
        if (!iniciarEnvio()) return;
        formRef.current?.requestSubmit();
    };

    return (
        <div>
            <div className="contenedor-form-concepto">
            <h2 className="titulo-form-concepto">
                {modo === "editar" ? "Editar concepto" : "Crear concepto"}
            </h2>
            <MensajeAlerta visible={alerta.visible} message={alerta.message} color={alerta.color} />
            <ConceptoForm valoresIniciales={valoresIniciales} modo={modo} onSubmit={handleSubmit} formRef={formRef} />
            </div>

            <div className="btn-editar-crear">
                <Boton
                    label={isSubmitting ? (modo === "editar" ? "Guardando..." : "Creando...") : (modo === "editar" ? "Guardar cambios" : "Crear concepto")}
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

export default FormularioConcepto;

