import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConceptoForm from "../../shared/Concepto/ConceptoForm/ConceptoForm";
import Boton from "../../shared/Boton/Boton";
import MensajeAlerta from "../../shared/MensajeAlerta/MensajeAlerta";
import crearConcepto from "./services/service_crear_concepto";
import actualizarConcepto from "./services/service_actualizar_concepto";
import listarPluginsConcepto from "../../plugins/services/service_listar_plugins_concepto";
import guardarPluginsConcepto from "../../plugins/services/service_guardar_plugins_concepto";

import "./FormularioConcepto.css";

const FormularioConcepto = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const isSubmittingRef = useRef(false);
    const pluginsRef = useRef([]);
    const [alerta, setAlerta] = useState({ visible: false, message: "", color: "#16a34a" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [plugins, setPlugins] = useState([]);
    const [pluginsIniciales, setPluginsIniciales] = useState([]);
    const modo = location.state?.modo || "crear";
    const valoresIniciales = modo === "editar" ? location.state?.concepto : undefined;

    useEffect(() => {
        if (modo !== "editar" || !valoresIniciales?.id) return undefined;

        let cancelado = false;
        const cargarPlugins = async () => {
            try {
                const pluginsCargados = await listarPluginsConcepto(valoresIniciales.id);
                if (!cancelado) {
                    pluginsRef.current = pluginsCargados;
                    setPlugins(pluginsCargados);
                    setPluginsIniciales(pluginsCargados);
                }
            } catch (error) {
                console.error("Error al cargar plugins del concepto:", error);
                if (!cancelado) {
                    setAlerta({ visible: true, message: "No se pudieron cargar los plugins del concepto", color: "#dc2626" });
                }
            }
        };

        cargarPlugins();
        return () => {
            cancelado = true;
        };
    }, [modo, valoresIniciales?.id]);

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

    const actualizarPluginEnEstado = (plugin) => {
        setPlugins((previos) => {
            const actualizados = previos.map((item) => (
                `${item.tipo}-${item.id}` === `${plugin.tipo}-${plugin.id}` ? plugin : item
            ));
            pluginsRef.current = actualizados;
            return actualizados;
        });
    };

    const agregarPluginAlEstado = (plugin) => {
        setPlugins((previos) => {
            const indice = previos.findIndex((item) => `${item.tipo}-${item.id}` === `${plugin.tipo}-${plugin.id}`);
            const actualizados = indice === -1
                ? [...previos, plugin]
                : previos.map((item, itemIndex) => itemIndex === indice ? plugin : item);
            pluginsRef.current = actualizados;
            return actualizados;
        });
    };

    const eliminarPluginDelEstado = (plugin) => {
        setPlugins((previos) => {
            const actualizados = previos.filter((item) => `${item.tipo}-${item.id}` !== `${plugin.tipo}-${plugin.id}`);
            pluginsRef.current = actualizados;
            return actualizados;
        });
    };

    const cambiarOrdenPlugins = (ordenados) => {
        pluginsRef.current = ordenados;
        setPlugins(ordenados);
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
                console.info("[Plugins] Guardando plugins del concepto", {
                    concepto: valoresIniciales?.id,
                    cantidad: pluginsRef.current.length,
                    tipos: pluginsRef.current.map((plugin) => plugin.tipo),
                });
                await guardarPluginsConcepto({
                    concepto: valoresIniciales?.id,
                    plugins: pluginsRef.current,
                    pluginsIniciales,
                });
                setAlerta({ visible: true, message: "Concepto actualizado correctamente", color: "#16a34a" });
            } else {
                const conceptoCreado = await crearConcepto(payload);
                const conceptoId = conceptoCreado?.id || conceptoCreado?.concepto?.id;
                if (!conceptoId) {
                    throw new Error("El backend no devolvió el id del concepto creado");
                }
                console.info("[Plugins] Guardando plugins del concepto", {
                    concepto: conceptoId,
                    cantidad: pluginsRef.current.length,
                    tipos: pluginsRef.current.map((plugin) => plugin.tipo),
                });
                await guardarPluginsConcepto({ concepto: conceptoId, plugins: pluginsRef.current });
                setAlerta({ visible: true, message: "Concepto creado correctamente", color: "#16a34a" });
            }

            window.setTimeout(() => {
                finalizarEnvio();
                navigate(location.state?.returnTo || "/glosario/propio");
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
            <ConceptoForm
                key={valoresIniciales?.id || "nuevo"}
                valoresIniciales={valoresIniciales}
                modo={modo}
                onSubmit={handleSubmit}
                formRef={formRef}
                plugins={plugins}
                pluginsIniciales={pluginsIniciales}
                onAgregarPlugin={agregarPluginAlEstado}
                onActualizarPlugin={actualizarPluginEnEstado}
                onEliminarPlugin={eliminarPluginDelEstado}
                onCambioOrdenPlugins={cambiarOrdenPlugins}
            />
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
                    onClick={() => navigate(location.state?.returnTo || "/glosario/propio")}
                    type="button"
                />
            </div>
        </div>
    );
};

export default FormularioConcepto;

