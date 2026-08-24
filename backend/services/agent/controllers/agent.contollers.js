import axios from "axios"
import dotenv from "dotenv"
import { graph } from "../graph/graph.js";
dotenv.config();

export const agent=async(req,res)=>{
    try{
  const {prompt,conversationId}=req.body
  await axios.post(`${process.env.CHAT_SERVICES}/save-message`,
    {conversationId, role:"user", content:prompt})
    const result=await graph.invoke({
        prompt,conversationId
    })
    const response=result.aiResponse
     await axios.post(`${process.env.CHAT_SERVICES}/save-message`,
    {conversationId, role:"assistant", content:response})

    return res.status(200).json(response)
    }catch(err){
    return res.status(500).json({message: `agent error ${err}`})

    }
}