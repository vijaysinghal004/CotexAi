import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
dotenv.config();


const port=process.env.PORT || 8003;

const app=express();
app.use(express.json());

// app.use("/",router)

app.get("/",(req,res)=>{
    res.send("Agent server is running")
})

app.listen(port,()=>{
    connectDB();
console.log(`Agent server is running on port ${port}`)
})