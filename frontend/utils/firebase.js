// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
//   apiKey: "AIzaSyBnYU09fxfEf8kSg3PYzD4R6Hk8YHarqLA",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "contexai-e5a12.firebaseapp.com",
  projectId: "contexai-e5a12",
  storageBucket: "contexai-e5a12.firebasestorage.app",
  messagingSenderId: "759381228554",
  appId: "1:759381228554:web:ae75a683ccdb010ea773f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app);

const googleprovider=new GoogleAuthProvider();

export {auth,googleprovider}; 