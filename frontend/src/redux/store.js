import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSclice.js" 
import conversationReducer from "./conversationSlice.js" 

export const store = configureStore({
  reducer: {
    user:userReducer,
    conversation:conversationReducer
  },
})