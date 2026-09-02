import { getModel } from "../config/llmModel.js";
import{ generatePPT } from "../utils/generatePPT.js";
import { getFroms3 } from "../utils/getFromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const pptAgent = async (state) => {
    try {
        const llm = await getModel('ppt');
        const prompt = `You are a professional presentation designer.

Return ONLY valid JSON.

Format:

{
  "title": "",
  "subtitle": "",
  "slides": [
    {
      "title": "",
      "points": [
        "",
        "",
        "",
        ""
      ]
    }
  ]
}

Rules:

- Generate exactly 6 content slides.
- Each slide should have 4-6 concise bullet points.
- No markdown.
- No explanation.
- No code block.
- Return ONLY JSON.

Topic:

${state.prompt}`;
const res=await llm.invoke(prompt);
const data = JSON.parse(res.content);
console.log(data);
const ppt=await generatePPT(data);
const buffer=await ppt.write({
  outputType:"nodebuffer"
})
const fileName = `ppt-${Date.now()}.pptx`;
await uploadToS3(fileName,buffer,"application/vnd.openxmlformats-officedocument.presentationml.presentation")
const downloadUrl=await getFroms3(fileName,60*10)

return {
    ...state,
    aiResponse: `# ✅ Presentation Generated

**${data.title}**

📥 [Download PPT](${downloadUrl})

_Link expires in 10 minutes._
`,
    markDone: true
};

    } catch (err) {
     console.log(err);
    return {
      ...state,
      aiResponse: `❌ Failed to generate PPT.`
    }
  }
}