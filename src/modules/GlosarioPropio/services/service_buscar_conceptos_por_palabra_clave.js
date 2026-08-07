import api from "../../../api/axiosInstance";

const buscarConceptosPorPalabraClave = async ({ page = 1, glosario = 1, palabra_clave } = {}) => {
    const response = await api.get("negocio/busqueda/conceptos/palabra_clave/", {
        params: {
            page,
            glosario,
            palabra_clave,
        },
    });

    return response.data;
};

export default buscarConceptosPorPalabraClave;
