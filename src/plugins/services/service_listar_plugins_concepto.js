import api from "../../api/axiosInstance";

const listarPluginsConcepto = async (conceptoId) => {
    if (!conceptoId) {
        throw new Error("Se requiere el id del concepto para listar sus plugins");
    }

    const response = await api.get(`plugins/concepto/${conceptoId}/plugins/`);
    const plugins = response.data?.plugins;

    if (!Array.isArray(plugins)) {
        throw new Error("La respuesta de plugins no contiene una lista válida");
    }

    return plugins.map((plugin) => ({
        ...plugin,
        tipo: plugin.tipo || plugin.tipo_plugin,
    }));
};

export default listarPluginsConcepto;
