import { getModel } from "../config/llmModel.js"

export const codingAgent = async (state) => {
    const intentLlm = await getModel("intent");
    const llm = await getModel("coding");

    const intentRes = await intentLlm.invoke(`
                            You are an intent classifier.

                    Return ONLY one of these values.

                    CODE_GENERATION
                    CODE_REVIEW
                    CODE_EXPLANATION
                    DEBUGGING
                    OPTIMIZATION
                    CONVERSATION
                    DOCUMENTATION

                    User Request:
${state.prompt}
    `)

    const intent = intentRes.content;
    console.log(intent);
    if (intent == "CODE_GENERATION") {
        const prompt = `
                        You are CortexAI Coding Agent.

                            Generate the requested project.

                            Default stack:
                            - HTML
                            - CSS
                            - JavaScript

                            Use React / Next.js / Vue ONLY if explicitly requested.

                            Rules:

                            - Responsive
                            - Modern UI
                            - CSS Variables
                            - Flexbox/Grid
                            - Smooth Scroll
                            - Hover Effects
                            - Beautiful spacing
                            - Single page unless user asks otherwise.
                            
                            IMAGES
                            ==========================

                            Use real Unsplash image URLs.

                            For every image:
                            - Use a valid https://images.unsplash.com/... URL.
                            - Never use placeholder.com.
                            - Never use via.placeholder.com.
                            - Never use data:image.
                            - Never create fake Unsplash photo IDs.
                            - Never use random URLs.
                            - Put images directly inside HTML <img> tags.
                            - Use descriptive alt text.

                            
                            Return ONLY valid JSON.

                                    Schema:
                                    {
                                    "files": [
                                    {
                                        "name": "index.html",
                                        "content": "..."
                                    },
                                    {
                                        "name": "style.css",
                                        "content": "..."
                                        },
                                        {
                                        "name": "script.js",
                                        "content": "..."
                                        }
                                    ]
                                    }

                                    Rules:

                                    - Output must start with {
                                    - Output must end with }
                                    - No markdown
                                    - No explanation
                                    - No extra text
                                    - No \`\`\`
                                    - Never mention intent

            User Request:
             ${state.prompt} 
        `
        const response = await llm.invoke(prompt);
        let content = response.content.trim();
if (content.startsWith("```")) {
    content = content
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
}
console.log("CLEAN JSON:", content);


        const data=JSON.parse(content);
        return {
            ...state, 
            aiResponse:"Code Generated successfully",
            artifacts:[
                {
                    id:Date.now(),
                    type:"project",
                    files:data.files || [],
                    title:state.prompt
                }
            ]
        }
    }

    const res=await llm.invoke(`
        The user's request is:

        ${intent}

        Return Markdown only

        Never generate project files.

        Use headings like:

        #Overview

        ## Explanation

        ## Problems

        ## Improvements

        ## Best Practices

        ## Optimized Code (if needed )

        User Request:

        ${state.prompt}

    `)

    const data=res.content
    return {
        ...state,
        aiResponse:data,
        artifacts:[]
    }


}