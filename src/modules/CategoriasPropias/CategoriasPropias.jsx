import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SearchBar from "../../shared/SeachBar/SearchBar";
import CategoriaList from "../../shared/Categoria/CategoriaList/CategoriaList";
import Boton from "../../shared/Boton/Boton";

import buscarCategoriasDefecto from "./service/service_buscar_categorias_defecto";
import buscarCategoriasPorPalabraClave from "./service/service_buscar_categorias_por_palabra_clave";

import "./CategoriasPropias.css";


const CategoriasPropias = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const path_crear_categoria = "/formulario/categoria";

    const POR_PAGINA = 16;

    const [categorias, setCategorias] = useState([]);

    const [paginaActual, setPaginaActual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);

    const [palabraClave, setPalabraClave] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [refreshKey, setRefreshKey] = useState(0);

    const handleNav = (path, state) => {
        navigate(path, { state });
    };
    /*
        Leer filtros desde URL
    */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const palabraFromUrl = params.get("palabra_clave");
        if (palabraFromUrl) {
            setPalabraClave(palabraFromUrl);
        } else {

            setPalabraClave(null);
        }
        setPaginaActual(1);
    }, [location.search]);

    /*
        Cargar categorías
    */
    useEffect(() => {
        const cargarCategorias = async () => {
            setLoading(true);
            setError("");
            try {
                let data;
                if (palabraClave) {
                    data = await buscarCategoriasPorPalabraClave({
                        page: paginaActual,
                        glosario: 1,
                        palabra_clave: palabraClave

                    });
                } else {
                    data = await buscarCategoriasDefecto({
                        page: paginaActual,
                        glosario: 1
                    });
                }
                const categoriasNormalizadas = (data.results || []).map((categoria) => ({

                    id: categoria.id,
                    titulo: categoria.titulo_categoria,
                    color: categoria.color || "#7b8fc0",
                    conceptos: categoria.numero_conceptos ?? 0,
                    esMia: true

                }));
                const totalPaginasCalculado = Math.max(
                    1,
                    Math.ceil((data.count || 0) / POR_PAGINA)
                );
                if (
                    categoriasNormalizadas.length === 0 &&
                    paginaActual > 1
                ) {
                    setPaginaActual((prev) => Math.max(1, prev - 1));
                    return;
                }
                setCategorias(categoriasNormalizadas);
                setTotalPaginas(totalPaginasCalculado);
                setPaginaActual((prev) =>
                    Math.min(prev, totalPaginasCalculado)
                );
            } catch (err) {
                console.error(
                    "Error al cargar categorías:",
                    err
                );
                setCategorias([]);
                setError(
                    "No se pudieron cargar las categorías."
                );
            } finally {
                setLoading(false);
            }
        };
        cargarCategorias();
    }, [
        paginaActual,
        palabraClave,
        refreshKey
    ]);

    const handleBusquedaTexto = (texto) => {
        navigate(
            `${location.pathname}?palabra_clave=${texto}`
        );

    };

    const handleCambioPagina = (pagina) => {
        setPaginaActual(pagina);
    };

    const refrescarCategorias = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div>
            <h2 className="titulo-categorias-propias">
                Categorías
            </h2>

            <div className="acciones-categoria-propia">
                <div className="space-search-bar">
                    <SearchBar
                        onSearch={handleBusquedaTexto}
                    />
                </div>

                <Boton
                    className="btn-crear-categoria"
                    label="Crear Categoria"
                    variant="action"
                    onClick={() =>
                        handleNav(
                            path_crear_categoria,
                            { modo:"crear" }
                        )
                    }
                />
            </div>
            {loading && (
                <p>Cargando categorías...</p>
            )}
            {error && (
                <p>{error}</p>
            )}

            {!loading && !error && (
                <CategoriaList
                    categorias={categorias}
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onCambioPagina={handleCambioPagina}
                    onEliminar={refrescarCategorias}
                />
            )}
        </div>
    );
};

export default CategoriasPropias;