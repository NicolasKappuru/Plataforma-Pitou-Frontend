import api from "../../../api/axiosInstance"


export const obtenerNombre = () => {
    return api.get("usuarios/");
};