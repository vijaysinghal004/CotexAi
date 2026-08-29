import React, { useEffect, useState } from 'react'
import { Coins, LogOut, MessageSquare, PanelLeftIcon, PanelRight, PenBoxIcon, PenSquare, Plus, User } from 'lucide-react'
import { getConversation } from '../features/getConversation';
import { useDispatch, useSelector } from 'react-redux';
import { addConversation, setConversations, setSelectConversation } from '../redux/conversationSlice';
import { createConversation } from '../features/createConversation';
import { logout } from '../features/logout';
import { setUserData } from '../redux/userSclice';

const SideBar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [imageError, setImageError] = useState(false);
    const { conversations, selectedConversation } = useSelector(state => state.conversation);
    const { userData } = useSelector(state => state.user)
    const dispatch = useDispatch();
    useEffect(() => {
        const getConv = async () => {
            const data = await getConversation();
            console.log(data);
            dispatch(setConversations(data));
        }
        getConv();
    }, [userData?._id])

    const handleConversation = async () => {
        try {
            const data = await createConversation();
            dispatch(addConversation(data));
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }
if (collapsed) {
  return (
    <div className='hidden lg:flex flex-col items-center w-[56px] h-screen bg-[#0d0f14] border-r border-white/[0.06] py-4 gap-1 shrink-0'>
      <button 
        className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer mb-1'
        onClick={() => setCollapsed(false)}
      >
        <PanelRight />
      </button>

      <button
        className='flex items-center justify-center w-9 h-9 rounded-xl text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
        // onClick={handleConversation}
        onClick={()=>dispatch(setSelectConversation(null))}
      >
        <Plus size={17} />
      </button>

<div className="flex-1 overflow-y-auto pt-5 px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {conversations.map((conv, i) => {
                            const isActive = selectedConversation?._id === conv?._id;

                            return (
                                <div
                                    key={conv?._id || i}
                                    onClick={() => dispatch(setSelectConversation(conv))}
                                    className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 
                                        ${isActive
                                            ? "bg-indigo-500/10 border-indigo-500/18"
                                            : "bg-transparent border-transparent "
                                        }`}
                                >
                                    <div className={`flex items-center justify-center shrink-0 w-[20px] h-[20px] ${isActive ? "bg-indigo-500/10 text-indigo-400"
                                        : "bg-transparent border-transparent  bg-white/[0.05] text-slate-500"} `}>
                                        <MessageSquare size={13} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                        <div className='relative shrink-0'>
                                {
                                    (userData?.avtar && !imageError) ?
                                        <img className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25 ' src={userData?.avtar} alt={"image"} onError={() => setImageError(true)} /> :
                                        <div className='w-9 h-9 rounded-[10px] flex justify-center items-center border-2 border-indigo-500/25'>
                                            <User className='text-slate-400' size={15} />
                                        </div>
                                }
                            </div>

    </div>

  )
}

    return (
        <div className='fixed lg:static inset-y-0 left-0 z-50 w-[270px] h-screen shrink-0 bg-[#0d0f14] border-r border-white/[0.06] '>
            <div className='flex flex-col h-full'>
                <div className=" shrink-0 flex items-center  gap-2.5 px-4 py-4 border-b border-white/[0.06]  ">
                    <div className='hidden lg:flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer'
                        onClick={() => setCollapsed(true)}
                    >
                        <PanelLeftIcon />
                    </div>

                    <span className="text-[16px] font-semibold text-slate-100 tracking-tight flex-1">
                        CortexAI
                    </span>

                    <span className="text-[10px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-full tracking-wide">
                        free
                    </span>

                    <button 
                            onClick={()=>dispatch(setSelectConversation(null))}
                    // onClick={handleConversation}
                     className="flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.05] transition-colors duration-150 bg-transparent border-none cursor-pointer">
                        <PenSquare size={14} />
                    </button>
                </div>
                <div className='px-4 pt-4 pb-1'>
                    <div 
                            onClick={()=>dispatch(setSelectConversation(null))}
                    // onClick={handleConversation} 
                    className='flex w-full items-center justify-center gap-2 text-sm font-medium text-white bg-linear-to-br from-indigo-500 to-violet-700 rounded-xl py-[10px] border-none cursor-pointer hover:opacity-90 transition-opacity duration-150'>
                        <Plus size={15} /> New Chat
                    </div>
                </div>
                {/* /conversation part */}
                <div className='flex flex-col flex-1 min-h-0'>
                    {conversations.length == 0 ?
                        <div className='px-5 py-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600' >No Recent Conversations</div> :
                        <div className='px-5 py-4 pb-1.5 text-[10.5px] font-semibold uppercase tracking-widest text-slate-600'>Recents</div>
                    }
                    <div className="flex-1 overflow-y-auto px-2.5 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {conversations.map((conv, i) => {
                            const isActive = selectedConversation?._id === conv?._id;

                            return (
                                <div
                                    key={conv?._id || i}
                                    onClick={() => dispatch(setSelectConversation(conv))}
                                    className={`flex items-center gap-2.5 cursor-pointer mb-0.5 px-3 py-2.5 rounded-[10px] border transition-colors duration-150 
                                        ${isActive
                                            ? "bg-indigo-500/10 border-indigo-500/18"
                                            : "bg-transparent border-transparent "
                                        }`}
                                >
                                    <div className={`flex items-center justify-center shrink-0 w-[28px] h-[28px] ${isActive ? "bg-indigo-500/10 text-indigo-400"
                                        : "bg-transparent border-transparent  bg-white/[0.05] text-slate-500"} `}>
                                        <MessageSquare size={13} />
                                    </div>
                                    <span className={`text-[13px] font-medium truncate ${isActive ? "text-slate-100" : "text-slate-300"} `}>{conv?.tittle || "New Chat"}</span>
                                </div>
                            );
                        })}
                    </div>

                </div>
                {/* //footer */}
                <div className=' shrink-0 mx-2.5 h-px bg-white/[0.06]' />
                <div className='px-3.5 py-3.5'>
                    {userData ? (
                        <div className='flex items-center gap-2.5 cursor-pointer rounded-xl px-3 py-2.5 hover:bg-white/[0.05] transition-colors duration-150'>

                            <div className='relative shrink-0'>
                                {
                                    (userData?.avtar && !imageError) ?
                                        <img className='w-9 h-9 rounded-[10px] object-cover border-2 border-indigo-500/25 ' src={userData?.avtar} alt={"image"} onError={() => setImageError(true)} /> :
                                        <div className='w-9 h-9 rounded-[10px] flex justify-center items-center border-2 border-indigo-500/25'>
                                            <User className='text-slate-400' size={15} />
                                        </div>
                                }
                            </div>
                            <div className='flex-1 min-w-0'>
                                <p className='text-[13.5px] font-semibold text-slate-100 truncate'>{userData?.name || "user"}</p>
                                <p className='text-[11px] text-slate-600 mt-px'>{"Free Plan"}</p>
                            </div>
                            <div className="flex gap-1">
                                <button className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-yellow-500 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150">
                                    <Coins size={16} />
                                </button>

                                <button className="flex items-center justify-center w-7 h-7 rounded-[7px] border-none bg-transparent text-slate-500 cursor-pointer hover:bg-white/[0.08] hover:text-slate-400 transition-all duration-150"
                                onClick={()=>{
                                    logout();
                                    dispatch(setUserData(null));
                                }}
                                >
                                    <LogOut size={16} />
                                </button>
                            </div>

                        </div>) : (<button>login</button>)}

                </div>

            </div>



        </div>
    )
}

export default SideBar
