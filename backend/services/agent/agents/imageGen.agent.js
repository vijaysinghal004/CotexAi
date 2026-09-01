import { getModel } from "../config/llmModel.js"
import axios from "axios"
import { uploadToS3 } from "../utils/uploadToS3.js";
import { getFroms3 } from "../utils/getFromS3.js";

export const imageGenAgent = async (state) => {
    try{
    const llm = await getModel("image");
    const res = await llm.invoke(`
    You are an elite AI image prompt engineer.

    Convert the user request into a highly detailed image generation prompt.

    Requirements:
    - Cinematic lighting
    - Professional composition
    - Ultra realistic
    - High detail
    - Beautiful color palette
    - Sharp focus
    - 8K quality
    - Photorealistic
    - Depth of field
    - Professional photography
    - Stunning visuals

    Return only the image prompt.

    User Request:
    ${state.prompt}
`);

    const prompt = res.content.trim()
    // console.log(prompt);

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`

    const imageRes = await axios.get(imageUrl,
        { responseType: "arraybuffer" }
    );
    console.log(imageRes)
    const buffer = Buffer.from(imageRes.data);
    const fileName = `image-${Date.now()}.png`

    await uploadToS3(fileName, buffer, "image/png")
    const downloadUrl = await getFroms3(fileName,  60 * 10)

    // return {
    //     ...state,
    //     aiResponse:`### 🖼️ Image Generated Successfully

    //         ![Generated Image](${downloadUrl})

    //         📥 [Download Image](${downloadUrl})

    //         ⏳ Link expires in 10 minutes.`
    // };
    return {
  ...state,
  aiResponse: [
    "### 🖼️ Image Generated Successfully",
    "",
    `![Generated Image](${downloadUrl})`,
    "",
    `📥 [Download Image](${downloadUrl})`,
    "",
    "⏳ Link expires in 10 minutes."
  ].join("\n")
};
    }catch(err){
        console.log(err);
      return {
        ...state,
        aiResponse:`❌ Failed to generate image .`
      }   
    }
}