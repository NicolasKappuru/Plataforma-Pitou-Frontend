import api from "../../../api/axiosInstance";

const eliminarFormula = async ({ ids }) => {
    const response = await api.delete("gestor_formulas/formula/", {
        data: { ids },
    });

    return response.data;
};

export default eliminarFormula;