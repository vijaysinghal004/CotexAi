import { embeddings } from "./embedding";
import { QdrantVectorStore } from "@langchain/qdrant";
import dotenv from "dotenv"
dotenv.config();
const vectorStore=async(docs,collectionName)=>{
    return await QdrantVectorStore.fromExistingCollection(docs,embeddings, {
  url: process.env.QDRANT_URL,
  collectionName,
});

}