import api from "../../../api/axiosInstance";

const crearCategoria = async ({ titulo_categoria, color, glosario = 1 }) => {
    const response = await api.post("negocio/categoria/", {
        titulo_categoria,
        color,
        glosario,
    }, {
        timeout: 10000,
    });

    return response.data;
};

export default crearCategoria;
