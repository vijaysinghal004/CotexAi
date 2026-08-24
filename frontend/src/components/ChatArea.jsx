import React, { useEffect } from 'react'
import Nav from './Nav'
import MessageList from './MessageList'
import ChatInput from './ChatInput'
import { useDispatch, useSelector } from 'react-redux'
import { getmessage } from '../features/getMessage'
import { setMessages } from '../redux/messageSlice.js'

const ChatArea = () => {
      const {selectedConversation}=useSelector(state=>state.conversation)
      const dispatch=useDispatch();
      useEffect(()=>{
const getMesg=async()=>{
  if(selectedConversation){
    const data=await getmessage(selectedConversation?._id);
    dispatch(setMessages(data));
  }

}
getMesg();
      },[selectedConversation])

  return (
    
    <div className='flex flex-1 flex-col'>
      <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea
