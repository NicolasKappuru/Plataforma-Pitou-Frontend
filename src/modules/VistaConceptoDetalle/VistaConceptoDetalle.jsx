import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import VistaTextoEnriquecido from '../../shared/VistaTextoEnriquecido/VistaTextoEnriquecido';
import listarPluginsConcepto from "../../plugins/services/service_listar_plugins_concepto";
import ImagenDetalle from "../../plugins/Imagen/ImagenDetalle/ImagenDetalle";
import BloqueCodigoDetalle from "../../plugins/BloqueCodigo/BloqueCodigoDetalle/BloqueCodigoDetalle";
import FormularioDetalle from "../../plugins/Formula/FormulaDetalle/FormularioDetalle";

import "./VistaConceptoDetalle.css";



const VistaConceptoDetalle = () => {

    const location = useLocation();
    const concepto = location.state || {};
    const [plugins, setPlugins] = useState([]);
    const [cargandoPlugins, setCargandoPlugins] = useState(true);
    const [errorPlugins, setErrorPlugins] = useState("");

    useEffect(() => {
        let cancelado = false;

        const cargarPlugins = async () => {
            if (!concepto.id) {
                setCargandoPlugins(false);
                setErrorPlugins("No se encontró el concepto para consultar sus plugins.");
                return;
            }

            try {
                const pluginsCargados = await listarPluginsConcepto(concepto.id);
                if (!cancelado) {
                    setPlugins([...pluginsCargados].sort((a, b) => (a.posicion ?? 0) - (b.posicion ?? 0)));
                }
            } catch (error) {
                console.error("Error al cargar plugins del concepto:", error);
                if (!cancelado) setErrorPlugins("No se pudieron cargar los plugins de este concepto.");
            } finally {
                if (!cancelado) setCargandoPlugins(false);
            }
        };

        cargarPlugins();
        return () => {
            cancelado = true;
        };
    }, [concepto.id]);

    const detalleDe = {
        imagen: ImagenDetalle,
        bloque_codigo: BloqueCodigoDetalle,
        formula: FormularioDetalle,
    };


    return(
        <div className="pagina">
            <h1 className="titulo-concepto">
                {concepto.titulo}
            </h1>

            <div className="categoria-concepto" style={{ "--color-dinamico": concepto.color}}>
                {concepto.categoria} 
            </div>

            <hr className="separador"></hr>

            <h2 className="descripcion-label">Descripción</h2>

            <div className="descripcion">
                <VistaTextoEnriquecido 
                    contenido={concepto.descripcion}
                /> 
            </div>

            {!cargandoPlugins && (errorPlugins || plugins.length > 0) && (
                <section className="plugins-concepto">
                    {errorPlugins && (
                        <p className="plugins-concepto__estado plugins-concepto__estado--error">{errorPlugins}</p>
                    )}
                    {!errorPlugins && plugins.map((plugin) => {
                        const Detalle = detalleDe[plugin.tipo || plugin.tipo_plugin];
                        if (!Detalle) return null;

                        return (
                            <div className="plugin-concepto" key={`${plugin.tipo || plugin.tipo_plugin}-${plugin.id}`}>
                                <Detalle plugin={plugin} />
                            </div>
                        );
                    })}
                </section>
            )}
        </div>
    )
}

export default VistaConceptoDetalle;