import api from "../../utils/axios"

export const verifyPayment = async (payload) => {
    try {
        console.log(payload);
        const { data } = await api.post("/api/billing/verify-order",payload)
        console.log(data);
        return data
    } catch (err) {
        console.log(err);
        return [];
    }
}