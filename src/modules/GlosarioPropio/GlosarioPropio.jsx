import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ConceptoList from '../../shared/Concepto/ConceptoList/ConceptoList'
import SearchBar from '../../shared/SeachBar/SearchBar'
import Boton from '../../shared/Boton/Boton'

import buscarConceptosPorDefecto from "./services/service_buscar_conceptos_por_defecto";
import buscarConceptosPorCategoria from "./services/service_buscar_conceptos_por_categoria";
import buscarConceptosPorPalabraClave from "./services/service_buscar_conceptos_por_palabra_clave";

import "./GlosarioPropio.css"


const GlosarioPropio = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const path_categorias = "/glosario/categorias";
    const path_crear_concepto = "/formulario/concepto";

    const TAMANIO_PAGINA = 10;

    const [conceptos, setConceptos] = useState([]);

    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const [error, setError] = useState("");

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [palabraClave, setPalabraClave] = useState(null);

    const handleNav = (path, state) => {
        navigate(path, { state });
    };

    /* Sincroniza estados visuales con la URL */
    useEffect(() => {

        const params = new URLSearchParams(location.search);

        const categoria = params.get("categoria");
        const palabra = params.get("palabra_clave");
        const pagina = Number(params.get("page")) || 1;


        setCategoriaSeleccionada(categoria);
        setPalabraClave(palabra);

        setPaginaActual(pagina);


    }, [location.search]);

    /* Carga conceptos dependiendo del filtro actual */
    useEffect(() => {
        const cargarConceptos = async () => {

            setLoading(true);
            setError("");

            try {
                const params = new URLSearchParams(location.search);

                const categoria = params.get("categoria");
                const palabra = params.get("palabra_clave");
                const pagina = Number(params.get("page")) || 1;

                let data;

                if (palabra) {
                    data = await buscarConceptosPorPalabraClave({
                        page: pagina,
                        glosario: 1,
                        palabra_clave: palabra
                    });

                } else if (categoria) {
                    data = await buscarConceptosPorCategoria({
                        page: pagina,
                        glosario: 1,
                        categoria
                    });

                } else {
                    data = await buscarConceptosPorDefecto({
                        page: pagina,
                        glosario: 1
                    });
                }

                const conceptosNormalizados = (data.results || [])
                    .map((concepto) => ({

                        id: concepto.id,

                        titulo: concepto.titulo_concepto,

                        descripcion: concepto.descripcion_concepto,

                        categoria:
                            concepto.categoria?.titulo_categoria
                            || "Sin categoría",

                        color:
                            concepto.categoria?.color
                            || "#7b8fc0",

                        autor:
                            concepto.autor
                            || "",
                    }));

                const totalPaginasCalculado = Math.max(1, Math.ceil((data.count || 0) / TAMANIO_PAGINA));

                if (pagina > totalPaginasCalculado) {
                    const params = new URLSearchParams(location.search);
                    params.set( "page", totalPaginasCalculado);
                    navigate( `${location.pathname}?${params.toString()}`);
                    return;
                }

                setConceptos(conceptosNormalizados);
                setTotalPaginas(totalPaginasCalculado);

            } catch (err) {
                console.error(err);
                setConceptos([]);
                setError(
                    "No se pudieron cargar los conceptos."
                );
            } finally {
                setLoading(false);
            }
        };
        cargarConceptos();
    }, [location.search, refreshKey]);

    const handleCambioPagina = (pagina) => {
        const params = new URLSearchParams(location.search);
        params.set("page", pagina);
        navigate( `${location.pathname}?${params.toString()}` );
    };

    const refrescarConceptos = () => {
        setRefreshKey((prev) => prev + 1);
    };

    const handleBusquedaTexto = (texto) => {
        navigate(
            `${location.pathname}?palabra_clave=${texto}&page=1`
        );
    };

    const tituloVista =
        palabraClave
            ? "Conceptos con la palabra"
            : categoriaSeleccionada
                ? "Conceptos por categoría"
                : "Glosario propio";

    return (
        <div>
            <h2 className="titulo-glosario-propio">
                {tituloVista}
            </h2>
            <div className="acciones">
                <div className="space-search-bar">
                    <SearchBar
                        onSearch={handleBusquedaTexto}
                    />
                </div>
                <Boton
                    className="btn-categoria"
                    label="Categorias"
                    variant="action"
                    onClick={() =>handleNav(path_categorias)}
                />
                <Boton
                    className="btn-crear-concepto"
                    label="Crear Concepto"
                    variant="action"
                    onClick={() => handleNav(path_crear_concepto, {modo:"crear"})}
                />
            </div>
            {loading && (
                <p>Cargando conceptos...</p>
            )}
            {error && (
                <p>{error}</p>
            )}
            {!loading && !error && (
                <ConceptoList
                    conceptos={conceptos}
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onCambioPagina={handleCambioPagina}
                    onEliminar={refrescarConceptos}
                />
            )}
        </div>
    );
};


export default GlosarioPropio;