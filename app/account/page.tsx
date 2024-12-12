"use client"
import React, { useState } from 'react'
import Button from '../components/button';
import { useAccount } from '../layout';
import { toast } from "react-hot-toast";


interface linput{
    title:string;
    placeholder:string;
    span2?:boolean;
    value:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}
const LabelledInput=({title,placeholder,span2,onChange,value}:linput)=>{
    return(
        <div className={`flex flex-col gap-2 capitalize mb-2 ${span2? "col-span-2":""}`} >
            <div className='font-semibold text-sm'>{title}</div>
            <input type="text" onChange={onChange} placeholder={placeholder} value={value} disabled={title=='email'} minLength={3} className='p-2 text-sm w-full rounded bg-neutral text-secondary '/>
        </div>
    )
}
function Page() {
    const { account,dispatch } = useAccount();
    const [fname,setfname]=useState(account.name ||"")
    const [phone,setphone]=useState(account.phone)
    const [email,setemail]=useState(account.email)
    const [address,setaddress]=useState(account.address)
    const [oldpassword,setoldpassword]=useState("")
    const [newpassword,setnewpassword]=useState("")
    const [confirmnewpassword,setconfirmnewpassword]=useState("")
    function updateAcc(){
        if(newpassword.length>1){
                if(oldpassword.length>1){
                    if(newpassword !==confirmnewpassword){
                        return toast.error("please ensure the confirm password is the same")
                    }

                    if(oldpassword !==account.password){
                        return toast.error("old passcode is incorrect")
                    }
                    if(newpassword.length<5 || newpassword.length>12){
                        return toast.error("passwor length must be between 5 and 12")
                    }
                }
            }
        if(account.isgoogle){
            if(email !==account.email){
                return toast.error("sorry you cannot change your email because you signed up with google")
            }
        }
        if(email.length <3 || fname.length<2 ){
            return toast.error(" Details is incomplete")
        }
        if(address==account.address && email==account.email && phone== account.phone && fname==account.name && !oldpassword ){
            return toast.error("nothing changed")
        }
        dispatch({ type: "UPDATE_ACCOUNT", payload: { name:fname,phone,email,password:newpassword,address} });
    toast.success("details changed")
    }
  return (
    <div className='p-6 w-full bg-header shadow-lg'>
        <h2 className='text-xl capitalize text-primary mb-4'> edit my profile</h2>
        <div className='grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]'>
            <LabelledInput  placeholder='Md' title='full Name' value={fname} onChange={(e)=>setfname(e.target.value)}/>
            <LabelledInput  placeholder='+234915xxxxx' title='phone'  value={phone||""} onChange={(e)=>setphone(e.target.value)}/>
            <LabelledInput  placeholder='Email' title='Email' value={email} onChange={(e)=>setemail(e.target.value)} />
            <LabelledInput  placeholder='Address' title='address' value={address} onChange={(e)=>setaddress(e.target.value)} />
            <LabelledInput  placeholder=' Old password' title='password change' span2={true} value={oldpassword} onChange={(e)=>setoldpassword(e.target.value)} />
            <LabelledInput  placeholder=' New password' title='new password' span2={true} value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} />
            <LabelledInput  placeholder='confirm New password' title='new password' span2={true} value={confirmnewpassword} onChange={(e)=>setconfirmnewpassword(e.target.value)} />
        </div>
        <div className='flex w-full justify-end mt-2'><Button action={updateAcc}  cta='Update' /></div>
    </div>
  )
}

export default Page