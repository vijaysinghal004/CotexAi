import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Markdown from 'react-markdown'

const MessageBubble = ({role,content}) => {
  const dispatch=useDispatch();
         const {messages}=useSelector(state=>state.message);
 const isUser=role=="user"
  return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
    <div
      className={`max-w-[72%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
        isUser
          ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm"
          : "bg-white/[0.04] border border-white/[0.07] text-slate-200 rounded-tl-sm"
      }`}
    >
      <Markdown>
      {content}
      </Markdown>
    </div>
  </div>

  )
}

export default MessageBubble
