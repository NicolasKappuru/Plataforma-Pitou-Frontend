import api from "../../../api/axiosInstance";

const actualizarBloqueCodigo = async ({ bloques_codigo }) => {
    const response = await api.put("gestor_bloques_codigo/bloque_codigo/", {
        bloques_codigo,
    });

    return response.data;
};

export default actualizarBloqueCodigo;