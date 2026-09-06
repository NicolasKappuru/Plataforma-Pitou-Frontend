import api from "../../../api/axiosInstance";

const crearBloqueCodigo = async ({ bloques_codigo }) => {
    const response = await api.post("gestor_bloques_codigo/bloque_codigo/", {
        bloques_codigo,
    });

    return response.data;
};

export default crearBloqueCodigo;