import api from "../../../api/axiosInstance";

const buscarConceptosPorCategoria = async ({ page = 1, glosario = 1, categoria } = {}) => {
    const response = await api.get("negocio/busqueda/conceptos/categoria/", {
        params: {
            page,
            glosario,
            categoria,
        },
    });

    return response.data;
};

export default buscarConceptosPorCategoria;
