export const currentuser= async(req,res)=>{
  try{
   return res.status(200).json(req.user)
  }catch(err){
   return res.status(200).json({message:`get current user error ${err}`})
  }
}