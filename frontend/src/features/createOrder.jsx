import api from "../../utils/axios"

export const createOrder = async (plan) => {
    try {
        console.log(plan);
        const { data } = await api.post("/api/billing/create-order",{plan})
        console.log(data);
        return data
    } catch (err) {
        console.log(err?.response?.data);
        return;
    }
}