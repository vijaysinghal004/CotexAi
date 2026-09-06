import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import router from "./routes/billing.route.js";
dotenv.config();


const port=process.env.PORT || 8001;

const app=express();
app.use(express.json());

app.use("/",router)
app.get("/",(req,res)=>{
    res.send("billing server is running")
})


app.listen(port,()=>{
    connectDB();
console.log(`Auth server is running on port ${port}`)
})