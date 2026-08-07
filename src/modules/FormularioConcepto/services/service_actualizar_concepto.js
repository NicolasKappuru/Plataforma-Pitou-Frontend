import api from "../../../api/axiosInstance";

const actualizarConcepto = async ({ id, titulo_concepto, descripcion_concepto, categoria_id }) => {
    const response = await api.put(`negocio/concepto/${id}/`, {
        titulo_concepto,
        descripcion_concepto,
        categoria_id,
    });

    return response.data;
};

export default actualizarConcepto;