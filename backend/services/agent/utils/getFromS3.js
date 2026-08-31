import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../config/s3.js";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv"
dotenv.config()
export const getFroms3 = async (fileName, expiresIn = 600) => {
    try {
        const signedUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName
            }),
            ( expiresIn )
        )
            console.error("Get S3 successfully");
        return signedUrl;
    }
    catch (err) {
        console.error("Get S3 URL Error:", err);
        throw err;
    }


}