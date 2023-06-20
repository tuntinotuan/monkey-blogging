// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmDRuPHUEUUtRmEnHozkimdWwJqSypmBA",
  authDomain: "monkey-blogging-7542b.firebaseapp.com",
  projectId: "monkey-blogging-7542b",
  storageBucket: "monkey-blogging-7542b.appspot.com",
  messagingSenderId: "516982656407",
  appId: "1:516982656407:web:a7945ed74a564aff5808d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
