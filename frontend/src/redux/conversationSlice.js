import { createSlice } from "@reduxjs/toolkit";


const conversationSlice= createSlice({
    name:"conversation",
    initialState:{
        conversations:[],
    },
    reducers:{
        setConversations:(state,action)=>{
            state.conversations=action.payload
        },
        addConversation:(state,action)=>{
            state.conversations.unshift(action.payload)
        // unshift insert element at first index of array
        }
    }
})

export const {setConversations,addConversation}=conversationSlice.actions
export default conversationSlice.reducer