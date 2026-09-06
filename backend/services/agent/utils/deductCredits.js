import axios from "axios"

export const deductCredits=async(userId,agent)=>{
    try{
const {data}=await axios.post(`${process.env.AUTH_SERVICES}/deduct-credits`,{userId,agent})
console.log(data);
return data
    }catch(err){
        console.log(err);
        return;

    }
}