import api from "../../../api/axiosInstance";

const crearImagen = async ({ concepto, imagenes = [], nombres = [], descripciones = [] }) => {
    const formData = new FormData();

    formData.append("concepto", concepto);

    imagenes.forEach((imagen, index) => {
        formData.append("imagenes", imagen);

        if (nombres[index]) {
            formData.append("nombre_plugin", nombres[index]);
        }

        if (descripciones[index]) {
            formData.append("descripcion_plugin", descripciones[index]);
        }
    });

    const response = await api.post("gestor_imagenes/imagen/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
};

export default crearImagen;