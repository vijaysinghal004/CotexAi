import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
dotenv.config();
import cors from "cors"
import cookieParser from "cookie-parser";
import { protect } from "./middleware/auth.middleware.js";
import { currentuser } from "./controller/userController.js";

const port=process.env.PORT || 8000;

const app=express();
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))

app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Gateway server is running")
})

app.use("/api/auth",proxy(process.env.AUTH_SERVICE));
app.get("/api/me",protect,currentuser);

app.listen(port,()=>{
console.log(`Gateway server is running on port ${port}`)
})