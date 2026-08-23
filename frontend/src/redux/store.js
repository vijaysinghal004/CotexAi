import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSclice.js" 

export const store = configureStore({
  reducer: {
    user:userReducer
  },
})