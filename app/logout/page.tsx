"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

function Logout() {
    const router=useRouter()
    useEffect(()=>{
       if(typeof localStorage !=undefined){
        localStorage.clear()
        router.push("/login")
       }
    },[])
  return (
    <div className="text-center text-3xl font-semibold py-[30vh] text-text">Logging out...</div>

  )
}

export default Logout