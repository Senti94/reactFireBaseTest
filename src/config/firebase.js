// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2BDyodiM3SC4WENobmSmEOIrsWBaIpBA",
  authDomain: "todolist-14825.firebaseapp.com",
  projectId: "todolist-14825",
  storageBucket: "todolist-14825.appspot.com",
  messagingSenderId: "981491927894",
  appId: "1:981491927894:web:49dea5420dbcbce09664f7",
  measurementId: "G-PTYTJN9Z78"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage =getStorage(app);