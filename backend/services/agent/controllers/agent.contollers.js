import axios from "axios"
import dotenv from "dotenv"
import { graph } from "../graph/graph.js";
import { addMessages } from "../config/memeory.js";
import redis from "../../../shared/redis/redis.js";
dotenv.config();

export const agent = async (req, res) => {
    try {
        const { prompt, conversationId,agent } = req.body
        // await redis.del(`messages-${conversationId}`)

        const result = await graph.invoke({
            prompt, conversationId,agent
        })
        
        const response = result.aiResponse

        await addMessages(conversationId, "user", prompt)
        await addMessages(conversationId, "assistant", response)

        await axios.post(`${process.env.CHAT_SERVICES}/save-message`,
            { conversationId, role: "user", content: prompt })
        await axios.post(`${process.env.CHAT_SERVICES}/save-message`,
            { conversationId, role: "assistant", content: response, images:result.images })
        // return res.status(200).json(response)
        return res.status(200).json({
            answer:response,
            images:result.images
        })
    } catch (err) {
        return res.status(500).json({ message: `agent error ${err}` })
    }
}