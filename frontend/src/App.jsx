import { signInWithPopup } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth, googleprovider } from '../utils/firebase.js'
import api from '../utils/axios.js'
import { getcurrentuser } from './features/getCurrentUser.js'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSclice.js'
import Home from './pages/Home.jsx'


const App = () => {

  const dispatch=useDispatch();

  useEffect(() => {
    const getUser = async () => {
    const data=  await getcurrentuser();
    dispatch(setUserData(data));
    }
    getUser();
  }, [])
  return (
    <Home />
  )
}

export default App
