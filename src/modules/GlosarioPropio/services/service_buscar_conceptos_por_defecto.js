import api from "../../../api/axiosInstance";

const buscarConceptosPorDefecto = async ({ page = 1, glosario = 1 } = {}) => {
    const response = await api.get("negocio/busqueda/conceptos/defecto/", {
        params: {
            page,
            glosario,
        },
    });

    return response.data;
};

export default buscarConceptosPorDefecto;