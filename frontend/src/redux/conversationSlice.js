import { createSlice } from "@reduxjs/toolkit";


const conversationSlice= createSlice({
    name:"conversation",
    initialState:{
        conversations:[],
        selectedConversation:null
    },
    reducers:{
        setConversations:(state,action)=>{
            state.conversations=action.payload
        },
        addConversation:(state,action)=>{
            state.conversations.unshift(action.payload)
        // unshift insert element at first index of array
        },
        setSelectConversation:(state,action)=>{
            state.selectedConversation=action.payload
        },
        setConvTittle:(state,action)=>{
             const {tittle,conversationId}=action.payload
             state.conversations=state.conversations.map((conv)=>(
                conv._id==conversationId ? ({...conv,tittle}):conv
             ))

             if(state.selectedConversation?.id==conversationId){
                state.selectedConversation(...state.selectedConversation,tittle)
             }

        }
    }
})

export const {setConversations,addConversation,setSelectConversation,setConvTittle}=conversationSlice.actions
export default conversationSlice.reducer