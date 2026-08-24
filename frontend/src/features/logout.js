import api from "../../utils/axios";

export const logout=async(req,res)=>{
    try{
   const data=await api.post("/api/auth/logout");
   console.log(data);
    }catch(err){
        console.log(err);
    }
}