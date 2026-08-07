import api from "../../../api/axiosInstance";

const crearConcepto = async ({ titulo_concepto, descripcion_concepto, categoria_id }) => {
    const response = await api.post("negocio/concepto/", {
        titulo_concepto,
        descripcion_concepto,
        categoria_id,
    });

    return response.data;
};

export default crearConcepto;