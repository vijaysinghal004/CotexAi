import api from "../../utils/axios"

export const getmessage=async(id)=>{
try{
const {data}=await api.get(`/api/chat/get-messages/${id}`)
console.log(data);
return data;
}catch(err){
console.log(err);
return [];
}
}