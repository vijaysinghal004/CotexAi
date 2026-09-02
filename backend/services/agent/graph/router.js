import { getModel } from "../config/llmModel.js"

export const router = async (state) => {
    const llm = await getModel("router");

    if (state.agent && state.agent !== "auto") {
        return {
            ...state,
            agent:  state.agent
        }
    }

    const prompt = `You are an agent router.

    
    Available agents:
    
    - chat
    - search
    - coding 
    - pdf 
    - ppt
    - image
    
    Rules:
    
    chat:
    General conversation,
    explainations,
    learning,
    questions.
    
    search:
    Current events,
    latest information,
    news,
    recent developments,
    internet lookup.
    
    coding:
    Generate code,
    debug code,
    build projects,
    architecture,
    API design.
    
    pdf:
    Questions about generate PDFs
    or ppt context.
    
    ppt:
    Questions about generate ppt, ppts
    or ppt context.

    vision:
    Generte image,
    create image.

    Return ONLY one word:

    chat
    search
    coding
    pdf
    ppt
    vision
    
    User Query:
    ${state.prompt}
    `

    const response = await llm.invoke(prompt);
    console.log(response);
    return {
        ...state,
        agent: response.content
            .trim()
            .toLowerCase()
    }

}