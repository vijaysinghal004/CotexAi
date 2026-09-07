import { VectorStore } from "@langchain/core/vectorstores";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs"
import { PDFparse } from "pdf-parse"
import { getModel } from "../config/llmModel.js";
import { HumanMessage } from "@langchain/core/messages";
import { deductCredits } from "../utils/deductCredits.js";

export const pdfRAG = async (state) => {
    try {
        const buffer = fs.readFileSync(state.file.path);
        const pdf = new PDFparse({
            data: buffer
        })
        const result = pdf.getText();
        const text = result.text

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 1000,
            chunkOverlap: 200
        })
        const doc = splitter.createDocuments([text])
        const collectionName = `pdf-${Date.now()}`;
        const store = await VectorStore(doc, collectionName)


        const relevantDocs = await store.similaritySearch(state.prompt, 5);
        const context = relevantDocs.map(d => d.pageContent).join("/n/n")

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


        const response = llm.invoke(messages)
        await deductCredits(state.userId,"pdf")
        return {
            ...state,
            aiResponse: response.context
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