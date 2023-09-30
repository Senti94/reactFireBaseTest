import React from 'react'
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from "firebase/auth";
import { useState } from 'react';
import {auth,googleProvider} from "../config/firebase"

const Auth = () => {
    const [email,setEmail]=useState("");
    const [pw,setPw]=useState("");
    console.log(auth?.currentUser?.email);
        const signIn=async ()=>{
          try{
            createUserWithEmailAndPassword(auth,email,pw);
            await signInWithPopup(auth,googleProvider);
             }
             catch(err)
             { console.error(err); }
               
                       }
const googleSign=async ()=>{
  try{
     await signInWithPopup(auth,googleProvider);
      }
      catch(err)
      { console.error(err); }
        
                }
                const logout=async ()=>{
                  try{
                    await signOut(auth);
                      }
                      catch(err)
                      { console.error(err); }
                        
                                }
               

              
  return (
    <div>
        <input onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
        <input onChange={(e)=>setPw(e.target.value)} placeholder='password'/>
        <button onClick={signIn}>Sign In</button>
        <button onClick={googleSign}>Google SignIn</button>
        <button onClick={logout}>LogOut</button>
        </div>
  )
}

export default Auth