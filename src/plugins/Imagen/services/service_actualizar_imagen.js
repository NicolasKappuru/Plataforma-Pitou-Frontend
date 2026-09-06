import api from "../../../api/axiosInstance";

const actualizarImagen = async ({ imagenes }) => {
    const response = await api.put("gestor_imagenes/imagen/", { imagenes });

    return response.data;
};

export default actualizarImagen;