import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { getModel } from "../config/llmModel.js"
import { getMemory } from "../config/memeory.js";

export const chatAgent = async (state) => {
    try{
    const llm = await getModel("chat")

    console.log(state?.conversationId);
    const history = await getMemory(state?.conversationId)
    console.log(history);
  const searchContext= state.searchResults ? ` 
  Web Search Results:
  ${JSON.stringify(state.searchResults)}
  Answer the user using only the above search results.    
  `:""


    const prompt = `
You are CortexAI, an intelligent AI assistant.

${searchContext}

if searchContext is exists:
-Use search Results to answer.
-Do not mention internal tools.

Rules:

- For simple questions, greetings, and short queries, respond naturally in plain text.
- For technical, educational, coding, or detailed topics, use clean Markdown.

Formatting:

- Use # for titles and ## for sections.
- Leave a blank line after headings.
- Use bullet points for lists.
- Use numbered lists for steps.
- Use fenced code blocks with language tags for code.
- Keep paragraphs short and readable.
- Never write headings and content on the same line.
- Never generate large walls of text.
`;
    const messages = [
        new SystemMessage(prompt),
    ];


    (history || []).forEach(msg => {
        if (msg?.role == "user") {
            messages.push(new HumanMessage(msg?.content))
        } else {
            messages.push(new AIMessage(msg?.content))
        }
    })
    messages.push(new HumanMessage(state.prompt))

    // console.log(messages);

    const response = await llm.invoke(messages)
    // const response={content:"hii"}

    // const response=await llm.invoke([
    //         {
    //             "role":"system",
    //             "content":prompt
    //         },
    //         {
    //             "role":"human",
    //             "content":state.prompt
    //         }
    //     ]);

    return {
        ...state,
        aiResponse: response.content
    }
    
    
    }    catch(err){
   return {
    ...state,
    aiResponse:"Failed to generate Response"
   }
        }
} 