import api from "../../../api/axiosInstance";

const eliminarImagen = async ({ ids }) => {
    const response = await api.delete("gestor_imagenes/imagen/", {
        data: { ids },
    });

    return response.data;
};

export default eliminarImagen;