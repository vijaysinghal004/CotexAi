import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import router from "./routes/agent.route.js";
dotenv.config();


const port=process.env.PORT || 8003;

const app=express();
app.use(express.json());


app.use("/",router);

app.use((err,req,res,next)=>{
    console.log(err);
    if(err.status){
        return res.status(err.status).json(err.data)
    }
        return res.status(err.status).json({message:`agent error ${err}`})

})
app.get("/",(req,res)=>{
    res.send("Agent server is running")
})


app.listen(port,()=>{
    connectDB();
console.log(`Agent server is running on port ${port}`)
})