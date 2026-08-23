import { ChatGroq } from "@langchain/groq"

const groq = new ChatGroq({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
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
            return groq;
        default:
            return groq;    
    }
}