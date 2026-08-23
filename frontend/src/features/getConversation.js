import api from "../../utils/axios"

export const getConversation = async (req, res) => {
    try {
        const { data } = await api.get("/api/chat/get-conversation")
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
}