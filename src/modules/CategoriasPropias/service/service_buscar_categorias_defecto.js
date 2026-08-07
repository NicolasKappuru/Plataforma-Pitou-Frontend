import api from "../../../api/axiosInstance";

const buscarCategoriasDefecto = async ({ page = 1, glosario = 1 } = {}) => {
    const response = await api.get("negocio/busqueda/categorias/defecto/", {
        params: {
            page,
            glosario,
        },
    });

    return response.data;
};

export default buscarCategoriasDefecto;
