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
    if(selectedConversation.tittle=="New Chat") return ;
    const data=await getmessage(selectedConversation?._id);
    dispatch(setMessages(data));
  }

}
getMesg();
      },[selectedConversation?._id])

  return (
    
    <div className='flex flex-1 flex-col'>
      <Nav/>
      <MessageList/>
      <ChatInput/>
    </div>
  )
}

export default ChatArea






// import React, { useEffect } from 'react'
// import Nav from './Nav'
// import MessageList from './MessageList'
// import ChatInput from './ChatInput'
// import { useDispatch, useSelector } from 'react-redux'
// import { getmessage } from '../features/getMessage'
// import { setMessages } from '../redux/messageSlice.js'

// const ChatArea = () => {
//       const {selectedConversation}=useSelector(state=>state.conversation)
//       const dispatch=useDispatch();
//       useEffect(()=>{
// const getMesg=async()=>{
//   if(selectedConversation){
//     if(selectedConversation.tittle=="New Chat") return ;
//     const data=await getmessage(selectedConversation?._id);
//     dispatch(setMessages(data));
//   }

// }
// getMesg();
//       },[selectedConversation?._id])

//   return (
    
//     <div className='flex flex-1 flex-col min-w-0 overflow-hidden'>
//         <div className="shrink-0">
//                 <Nav />
//             </div>

//             {/* Messages - ONLY THIS SCROLLS */}
//             <div className="flex-1 min-h-0 overflow-y-auto  
//             [scrollbar-width:none]
//              [-ms-overflow-style:none]
//             [&::-webkit-scrollbar]:hidden
//             ">
//                 <MessageList />
//             </div>

//             {/* Input - fixed at bottom */}
//             <div className="shrink-0">
//                 <ChatInput />
//             </div>
//     </div>
//   )
// }

// export default ChatArea

