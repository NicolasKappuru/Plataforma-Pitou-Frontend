import api from "../../../api/axiosInstance";

const actualizarPosicionesConceptos = async (posiciones) => {
  const response = await api.put(
    "negocio/concepto/posiciones/",
    posiciones
  );

  return response.data;
};

export default actualizarPosicionesConceptos;