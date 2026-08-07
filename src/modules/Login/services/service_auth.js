import api from "../../../api/axiosInstance";

const loginUsuario = async ({ username, password }) => {
    const response = await api.post("usuarios/autenticacion/", {
        username,
        password,
    });

    return response.data;
};

const guardarSesion = ({ access, refresh, rol, permisos = [] }) => {
    sessionStorage.setItem("accessToken", access ?? "");
    sessionStorage.setItem("refreshToken", refresh ?? "");
    sessionStorage.setItem("userRole", rol ?? "");
    sessionStorage.setItem("userPermissions", JSON.stringify(permisos));
};

const limpiarSesion = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("userPermissions");
};

const obtenerSesion = () => ({
    accessToken: sessionStorage.getItem("accessToken"),
    refreshToken: sessionStorage.getItem("refreshToken"),
    rol: sessionStorage.getItem("userRole"),
    permisos: JSON.parse(sessionStorage.getItem("userPermissions") || "[]")
});

export { loginUsuario, guardarSesion, limpiarSesion, obtenerSesion };
export default loginUsuario;