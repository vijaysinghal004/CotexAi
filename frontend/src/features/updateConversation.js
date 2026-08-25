import api from "../../utils/axios";

export const updatetittle=async(payload)=> {
    try{
   const { data } = await api.post("/api/chat/update-conversation",payload)
        console.log(data);
        return data
    }catch(err){
console.log(err);
return [];
    }
}