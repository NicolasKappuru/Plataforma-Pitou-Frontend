import api from "../../../api/axiosInstance";

const actualizarCategoria = async ({ id, titulo_categoria, color, glosario }) => {
    const payload = {};

    if (titulo_categoria !== undefined) payload.titulo_categoria = titulo_categoria;
    if (color !== undefined) payload.color = color;
    if (glosario !== undefined) payload.glosario = glosario;

    const response = await api.put(`negocio/categoria/${id}/`, payload, {
        timeout: 10000,
    });

    return response.data;
};

export default actualizarCategoria;
