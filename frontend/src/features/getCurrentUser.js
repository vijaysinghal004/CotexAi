import api from "../../utils/axios"

export const getcurrentuser = async () => {
    try {
        const { data } = await api.get("/api/me");
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
}