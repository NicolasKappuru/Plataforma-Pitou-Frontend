import api from "../../../../api/axiosInstance";

const buscarCategorias = async ({ palabra = "", glosario = 1 } = {}) => {
    const response = await api.get("negocio/busqueda/categorias/selector/", {
        params: {
            glosario,
            palabra,
        },
    });

    return response.data;
};

export default buscarCategorias;