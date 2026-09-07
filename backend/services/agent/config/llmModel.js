import { ChatGroq } from "@langchain/groq"
import { ChatOpenRouter } from "@langchain/openrouter";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"

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


const gemini = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-pro",
    temperature: 0,
    maxRetries: 2,
    
})


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
         case "imageAnalyzer":
            return gemini;
           
        default:
            return groq;    
    }
}