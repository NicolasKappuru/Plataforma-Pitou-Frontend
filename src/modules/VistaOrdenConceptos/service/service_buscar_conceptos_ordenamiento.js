import api from "../../../api/axiosInstance";

const buscarConceptosPorOrdenamiento = async ({ glosario = 1, categoria } = {}) => {
    const response = await api.get("negocio/busqueda/conceptos/ordenamiento/", {
        params: {
            glosario,
            categoria,
        },
    });

    return response.data;
};

export default buscarConceptosPorOrdenamiento;
