import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleprovider } from '../utils/firebase.js'
import api from '../utils/axios.js'


const App = () => {
const handleLogin=async (token)=>{
try{
const {data}=await api.post("/auth/login",{token})
console.log(data);
}catch(err){
console.log(err?.response?.data);
}
}

  const googleLogin=async()=>{
  const data= await signInWithPopup(auth,googleprovider)
    const token=await data.user.getIdToken()
    console.log(token)
    console.log(data);  
  await handleLogin(token)
// console.log(data);  
}
  return (
    <div className='w-full h-screen flex justify-center items-center'>
       <button className="w-5xl h-24 bg-amber-400" onClick={googleLogin}>
        continue with google
       </button>
    </div>
  )
}

export default App
