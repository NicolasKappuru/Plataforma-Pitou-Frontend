import api from "../../../api/axiosInstance";

const actualizarFormula = async ({ formulas }) => {
    const response = await api.put("gestor_formulas/formula/", { formulas });

    return response.data;
};

export default actualizarFormula;