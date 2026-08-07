import api from "../../../api/axiosInstance";

const buscarCategoriasPorPalabraClave = async ({ page = 1, glosario = 1, palabra_clave } = {}) => {
    const response = await api.get("negocio/busqueda/categorias/palabra_clave/", {
        params: {
            page,
            glosario,
            palabra_clave,
        },
    });

    return response.data;
};

export default buscarCategoriasPorPalabraClave;
