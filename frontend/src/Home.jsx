import React from 'react'
import { auth, googleprovider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";
import api from '../utils/axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './redux/userSclice';

const Home = () => {
    const dispatch= useDispatch();
    const { userData } = useSelector(state => state.user)
    // console.log(userData);
    const handleLogin = async (token) => {
        try {
            const { data } = await api.post("/api/auth/login", { token })
            dispatch(setUserData(data));
            console.log(data);
        } catch (err) {
            console.log(err?.response?.data);
        }
    }

    const googleLogin = async () => {
        const data = await signInWithPopup(auth, googleprovider)
        const token = await data.user.getIdToken()
        console.log(token)
        console.log(data);
        await handleLogin(token)
        // console.log(data);  
    }
    return (
        <div className='h-screen bg-[#0d0f14] flex text-white overflow-hidden '>
            <div className='fixed inset-0 z-50 flex  justify-center items-center bg-black/60 backdrop-blur'>
                {!userData &&    <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                 <div className='flex flex-col gap-1'>
                        {/* <div> */}
                        <h2 className='text-[17px] text-slate-100 font-bold tracking-tight'>Welcome to CotexAi</h2>
                        <p className='text-[13px] text-slate-500'> Please Login to Continue the app</p>

                    </div>
                    
                    <button className='w-full flex justify-center items-center gap-3 py-[11px] rounded-xl text-sm font-bold text-black/90 bg-white hover:bg-gray-200 transition-all duration-20 cursor-pointer' onClick={googleLogin}>
                        <FcGoogle size={15} className='text-white' />
                        Continue With Google
                    </button>

                </div>
                    }
            </div>
        </div>
    )
}

export default Home
Home