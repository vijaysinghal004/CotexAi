import { getModel } from "../config/llmModel.js"
import { generatePDF } from "../utils/generatePdf.js";
import { getFroms3 } from "../utils/getFromS3.js";
import { uploadToS3 } from "../utils/uploadToS3.js";

export const pdfAgent = async (state) => {
    try {
        const llm = await getModel("pdf");
        const prompt = `
You are an expert document writer.

Return ONLY valid JSON.

Do NOT return markdown.

Do NOT return explanations.

Structure:

{
  "title": "",
  "subtitle": "",
  "sections": [
    {
      "heading": "",
      "points": []
    }
  ]
}

Generate 4-8 sections.

Each section should have 3-6 concise bullet points.

Topic:

${state.prompt}`;

        const res = await llm.invoke(prompt);
        console.log(JSON.parse(res.content))

        const data = JSON.parse(res.content);

        const pdfBuffer = await generatePDF(data);

        const fileName = `pdf-${Date.now()}.pdf`
        //upload pdf to s3
        await uploadToS3(fileName, pdfBuffer, "application/pdf");

        //dowload or get pdf from s3

        const downloadUrl = await getFroms3(fileName, 60 * 10)

        return {
            ...state,
            aiResponse: [
                `# PDF Generated`,
                ``,
                `**${data.title}**`,
                ``,
                `📥 [Download PDF](${downloadUrl})`,
                ``,
                `_Link expires in 10 minutes._`
            ].join('\n')
        };
    } catch (error) {
        console.log(error);
        return {
            ...state,
            aiResponse: `❌ Failed to generate PDF.`
        }
    }
};