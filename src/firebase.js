// src/firebase.js
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArecxcXeSZHGNg1s0EDK5m_VFBC0qFstg",
  authDomain: "lockerbol-82b8d.firebaseapp.com",
  databaseURL: "https://lockerbol-82b8d-default-rtdb.firebaseio.com",
  projectId: "lockerbol-82b8d",
  storageBucket: "lockerbol-82b8d.firebasestorage.app",
  messagingSenderId: "821185997064",
  appId: "1:821185997064:web:2eb313adc957f0830524bd",
  measurementId: "G-G67T431WY1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
