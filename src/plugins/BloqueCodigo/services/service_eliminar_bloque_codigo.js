import api from "../../../api/axiosInstance";

const eliminarBloqueCodigo = async ({ ids }) => {
    const response = await api.delete("gestor_bloques_codigo/bloque_codigo/", {
        data: { ids },
    });

    return response.data;
};

export default eliminarBloqueCodigo;