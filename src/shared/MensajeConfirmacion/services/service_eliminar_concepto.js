import api from "../../../api/axiosInstance";

const eliminarConcepto = async (id) => {
    const response = await api.delete(`negocio/concepto/${id}/`);
    return response.data;
};

export default eliminarConcepto;
