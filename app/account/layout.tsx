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
    if(!account.name) router.push('/login')
  return (
    
      <div
        className={`md:flex p-2 md:p-8 gap-8  `}
      >
        <div  className="md:hidden">

        <FontAwesomeIcon icon={hidden ? faHamburger : faX} onClick={()=>{setHidden(!hidden)}} />
        </div>
      {!hidden &&  <div className="rounded  absolute md:relative flex flex-col gap-3 pl-4 p-8 capitalize text-sm bg-white shadow-lg w-[250px]">
            <h2 className="font-semibold ">Manage My Account</h2>
            <div  className="flex flex-col gap-2 pl-4 capitalize ">
                    <Link href="/account" className={path=='/account' ?" text-red-500":"text-gray-700 hover:text-red-500"}>
                    My profile</Link>
                    <Link href="/account/orders" className={path=='/account/orders' ?" text-red-500":"text-gray-700 hover:text-red-500"}>
                    my orders</Link>
                    <Link href="/account/reviews" className={path=='/account/reviews' ?" text-red-500":"text-gray-700 hover:text-red-500"}>
                    my reviews</Link>
            </div>
            <h2 className="font-semibold ">my orders</h2>

            <div  className="flex flex-col gap-2 pl-4 capitalize">
                    <Link href="/cart" className="text-slate-500 text-sm hover:text-red-500">
                    My cart</Link>
                    <Link href="/wishlist" className="text-slate-500 text-sm hover:text-red-500">
                    my wishlist</Link>
                
            </div>
        </div>}
        {children}
      </div>
  );
}
