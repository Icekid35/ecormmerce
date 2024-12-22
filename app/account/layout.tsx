"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAccount } from "../layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHamburger, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";



export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const path=usePathname()
    const {account}=useAccount()
    const [hidden,setHidden]=useState(false)
    const router=useRouter()
    if(!account.name && account.isLoaded) router.push('/login')
      if(!account.isLoaded) return(
        <div className="text-center text-3xl font-semibold py-[30vh] text-text">LOADING...</div>
      )
  return (
    
      <div
        className={`md:flex p-2 md:p-8 gap-8  `}
      >
        <div  className="md:hidden">

        <FontAwesomeIcon icon={hidden ? faHamburger : faX} onClick={()=>{setHidden(!hidden)}} />
        </div>
      {!hidden &&  <div className="rounded z-50 absolute md:relative flex flex-col gap-3 pl-4 p-8 capitalize text-sm bg-accent  shadow-shadow shadow-lg w-[250px]">
            <h2 className="font-semibold ">Manage My Account</h2>
            <div  className="flex flex-col gap-2 pl-4 capitalize ">
                    <Link href="/account" className={path=='/account' ?" text-primary":"text-gray-700 hover:text-primary"}>
                    My profile</Link>
                    <Link href="/account/orders" className={path=='/account/orders' ?" text-primary":"text-gray-700 hover:text-primary"}>
                    my orders</Link>
                    <Link href="/account/reviews" className={path=='/account/reviews' ?" text-primary":"text-gray-700 hover:text-primary"}>
                    my reviews</Link>
            </div>
            <h2 className="font-semibold ">my orders</h2>

            <div  className="flex flex-col gap-2 pl-4 capitalize">
                    <Link href="/cart" className="text-secondary text-sm hover:text-primary">
                    My cart</Link>
                    <Link href="/wishlist" className="text-secondary text-sm hover:text-primary">
                    my wishlist</Link>
                    <Link href="/logout" className="text-red-500 text-sm hover:text-primary">
                    Logout</Link>
                
            </div>
        </div>}
        {children}
      </div>
  );
}
