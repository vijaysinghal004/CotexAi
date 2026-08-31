import { PutObjectCommand } from "@aws-sdk/client-s3"
import { s3 } from "../config/s3.js"
import dotenv from "dotenv"
dotenv.config()

export const uploadToS3=async(fileName,buffer,contentType)=>{
    try{
await s3.send(
    new PutObjectCommand({
        Bucket:process.env.AWS_BUCKET_NAME,
        Body:buffer,
        Key:fileName,
        ContentType:contentType
    })
)
        console.log("S3 Upload Success:", fileName);
return fileName
    }catch(err){
        console.error("S3 Upload Error:", err);
     throw err;
    }

}