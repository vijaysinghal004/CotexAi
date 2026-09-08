import axios from "axios"
import dotenv from "dotenv"
import { graph } from "../graph/graph.js";
import { addMessages } from "../config/memeory.js";
import redis from "../../../shared/redis/redis.js";
dotenv.config();

export const agent = async (req, res,next) => {
    try {
        const { prompt, conversationId,agent } = req.body
        const file=req.file
    const userId = req.headers["x-user-id"]
        // await redis.del(`messages-${conversationId}`)

        const result = await graph.invoke({
            prompt, conversationId,agent,userId,file
        })
        
        const response = result.aiResponse

        await addMessages(conversationId, "user", prompt)
        await addMessages(conversationId, "assistant", response)

        await axios.post(`${process.env.CHAT_SERVICES}/save-message`,
            { conversationId, role: "user", content: prompt })
        await axios.post(`${process.env.CHAT_SERVICES}/save-message`,
            { conversationId, role: "assistant", content: response, images:result.images ,artifacts:result.artifacts})
        // return res.status(200).json(response)
        return res.status(200).json({
            answer:response,
            images:result?.images,
            artifacts:result?.artifacts
        })
    } catch (err) {
       return next(err);
        // return res.status(500).json({ message: `agent error ${err}` })
    }
}