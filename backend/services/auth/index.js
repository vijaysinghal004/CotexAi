import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
dotenv.config();


const port=process.env.PORT || 8001;

const app=express();

app.get("/",(req,res)=>{
    res.send("Auth server is running")
})

app.listen(port,()=>{
    connectDB();
console.log(`Auth server is running on port ${port}`)
})