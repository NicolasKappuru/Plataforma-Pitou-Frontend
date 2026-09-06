import api from "../../../api/axiosInstance";

const crearFormula = async ({ formulas }) => {
    const response = await api.post("gestor_formulas/formula/", { formulas });

    return response.data;
};

export default crearFormula;