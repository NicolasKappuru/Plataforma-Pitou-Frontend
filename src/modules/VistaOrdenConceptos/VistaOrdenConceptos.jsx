import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TablaOrdenConceptos from "../../shared/TablaOrdenConceptos/TablaOrdenConceptos";
import Boton from "../../shared/Boton/Boton";
import MensajeAlerta from "../../shared/MensajeAlerta/MensajeAlerta";

import buscarConceptosPorOrdenamiento from "./service/service_buscar_conceptos_ordenamiento.js";
import actualizarPosicionesConceptos from "./service/service_actualizar_posiciones_conceptos";

import "./VistaOrdenConceptos.css";

const VistaOrdenConceptos = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const categoria = location.state?.categoria;
    const returnTo = location.state?.returnTo || "/glosario/categorias";

    const [conceptosOriginales, setConceptosOriginales] = useState([]);
    const [conceptosActuales, setConceptosActuales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [alerta, setAlerta] = useState({
        visible: false,
        message: "",
        color: "#16a34a"
    });


    if (!categoria) {
        return <p>Cargando categoría...</p>;
    }


    useEffect(() => {

        const cargarConceptos = async () => {

            setLoading(true);
            setError("");

            try {

                const data = await buscarConceptosPorOrdenamiento({
                    glosario: 1,
                    categoria: categoria.id
                });


                const conceptosNormalizados = (data || []).map((concepto) => ({
                    id: concepto.id,
                    titulo: concepto.titulo_concepto,
                    posicion: concepto.posicion
                }));


                setConceptosOriginales(conceptosNormalizados);
                setConceptosActuales(conceptosNormalizados);


            } catch (error) {

                console.error(
                    "Error cargando conceptos para ordenar:",
                    error
                );

                setError("No se pudieron cargar los conceptos.");

            } finally {

                setLoading(false);

            }

        };


        if (categoria?.id) {
            cargarConceptos();
        }


    }, [categoria]);


    const volver = () => {
        navigate(returnTo);
    };


    const handleActualizarPosiciones = async () => {

        const posicionesActualizadas = conceptosActuales
            .filter((conceptoActual) => {

                const conceptoOriginal = conceptosOriginales.find(
                    (concepto) => concepto.id === conceptoActual.id
                );

                return conceptoOriginal?.posicion !== conceptoActual.posicion;

            })
            .map((concepto) => ({
                id: concepto.id,
                posicion: concepto.posicion
            }));


        if (posicionesActualizadas.length === 0) {

            setAlerta({
                visible: true,
                message: "No hay cambios para actualizar",
                color: "#f59e0b"
            });

            return;
        }


        try {

            await actualizarPosicionesConceptos(
                posicionesActualizadas
            );


            setAlerta({
                visible: true,
                message: "Posiciones actualizadas correctamente",
                color: "#16a34a"
            });


            setConceptosOriginales(conceptosActuales);


            window.setTimeout(() => {
                volver();
            }, 900);


        } catch (error) {

            console.error(
                "Error actualizando posiciones:",
                error
            );


            setAlerta({
                visible: true,
                message: "No se pudieron actualizar las posiciones",
                color: "#dc2626"
            });

        }

    };


    const handleCancelar = () => {
        volver();
    };


    return (
        <div className="vista-orden-conceptos">

            <div className="vista-orden-conceptos__header">

                <span
                    className="vista-orden-conceptos__color"
                    style={{
                        backgroundColor: categoria.color
                    }}
                />

                <h1 className="vista-orden-conceptos__titulo">
                    {categoria.titulo}
                </h1>

            </div>


            <MensajeAlerta
                visible={alerta.visible}
                message={alerta.message}
                color={alerta.color}
            />


            {loading && (
                <p>Cargando conceptos...</p>
            )}


            {error && (
                <p>{error}</p>
            )}


            {!loading && !error && (
                <div className="tabla-ordenamiento-conceptos">

                    <TablaOrdenConceptos
                        conceptos={conceptosActuales}
                        onCambioOrden={setConceptosActuales}
                    />

                </div>
            )}


            <div className="vista-orden-conceptos__acciones">

                <Boton
                    label="Actualizar posiciones"
                    variant="form_action"
                    onClick={handleActualizarPosiciones}
                    type="button"
                />


                <Boton
                    label="Cancelar"
                    variant="form_action"
                    onClick={handleCancelar}
                    type="button"
                />

            </div>

        </div>
    );
};

export default VistaOrdenConceptos;