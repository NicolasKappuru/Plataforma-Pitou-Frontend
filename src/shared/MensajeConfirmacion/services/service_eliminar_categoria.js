import api from "../../../api/axiosInstance";

const eliminarCategoria = async (id) => {
    const response = await api.delete(`negocio/categoria/${id}/`, {
        timeout: 10000,
    });

    return response.data;
};

export default eliminarCategoria;
