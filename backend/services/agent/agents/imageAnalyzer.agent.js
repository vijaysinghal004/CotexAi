import { getModel } from "../config/llmModel.js";
import fs from "fs"
import { deductCredits } from "../utils/deductCredits.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { checkAgentLimits } from "../config/agentlimit.js";
export const imageAnalyzer = async (state) => {
    try {
                await checkAgentLimits(state.userId,"image");
        const llm = await getModel("imageAnalyzer");
        const imageBuffer = await fs.readFileSync(state.file.path)
        const base64Image = await imageBuffer.toString("base64")
        const messages = [
            new SystemMessage(
                `You are CortexAI image analyzer Agent.

                Rules:

                - Analyze only the uploaded image.
                - Answer the user's question accurately.
                - If text exists in the image, extract it.
                - If charts or tables exist, explain them.
                - If something is unclear, say so.
                - Use Markdown when helpful.
                - Do not hallucinate.
                `
            ),
            new HumanMessage({
                content: [
                    {
                        type: "text",
                        text: state.prompt || "analyze the image"
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:${state.file.mimetype};base64,${base64Image}`
                        }
                    }
                ]
            })
        ];

        const response = await llm.invoke(messages)
        await deductCredits(state.userId,"vision")
        return {
            ...state,
            aiResponse: response.content
        }
    } catch (err) {
        // return {
        //     ...state,
        //     aiResponse: "Failed to analyze image"+err
        // }
          return {
      ...state,
      aiResponse: err?.data?.message || `❌ Failed to Analysis image.`
    }
    }finally{
        await fs.unlinkSync(state.file.path)
    }
}