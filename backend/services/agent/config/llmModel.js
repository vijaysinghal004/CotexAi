import { ChatGroq } from "@langchain/groq"
import { ChatOpenRouter } from "@langchain/openrouter";

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
})

const openRouter = new ChatOpenRouter({
  model: "deepseek/deepseek-chat",
  temperature: 0,
  maxTokens: 2500,
});



export const getModel = async (agent) => {
    switch (agent) {
        case "chat":
            return groq;
        case "search":
            return groq;
        case "ppt":
            return groq;
        case "pdf":
            return groq;
        case "vision":
            return groq;
        case "coding":
            return openRouter;
        default:
            return groq;    
    }
}