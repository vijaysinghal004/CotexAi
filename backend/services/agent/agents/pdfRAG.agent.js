import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs"
import { PDFParse } from 'pdf-parse';
import { getModel } from "../config/llmModel.js";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { deductCredits } from "../utils/deductCredits.js";
import { vectorStore } from "../config/vectorDB.js";

export const pdfRAG = async (state) => {
    try {
        const buffer = fs.readFileSync(state.file.path);
        const pdf = new PDFParse({
            data: buffer
        })
        const result = await pdf.getText();
        const text = result.text

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200
        })
        const doc = await splitter.createDocuments([text])
        const collectionName = `pdf-${Date.now()}`;
        const store = await vectorStore(doc, collectionName)


        const relevantDocs = await store.similaritySearch(state.prompt, 5);
        const context = relevantDocs.map(d => d.pageContent).join("\n\n")

        const llm = await getModel("pdfRAG")

        const messages = [
            new SystemMessage(`You are CortexAI PDF Assistant.

                Rules:

                - Answer ONLY from the uploaded PDF.

                - Never make up information.

                - If the answer is not present in the PDF, reply:

                "I couldn't find this information in the uploaded PDF."

                - Use Markdown formatting.
            `),
            new HumanMessage(`
    Context:${context}
    Questions:${state.prompt}
    `)

        ]


        const response = await llm.invoke(messages)
        await deductCredits(state.userId,"pdf")
        return {
            ...state,
            aiResponse: response.content
        }
    }
    catch (err) {
        console.log(err);
        return {
            ...state,
            aiResponse: "Failed to Analyze pdf"
        }
    } finally {
        fs.unlinkSync(state.file.path)
    }

}