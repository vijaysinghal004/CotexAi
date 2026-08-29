import { searchtool } from "../config/tavily.js"

export const searchAgent=async(state)=>{
    try{
        const results=await searchtool.invoke({
            query:state.prompt
        })
        console.log(results);
        return {
            ...state,
            searchResults:results,
            images:results.images
        }
    }catch(err){
  return {
            ...state,
            searchResults:[],
            images:[]
        }
    }
}