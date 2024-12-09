"use client"
import { faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAccount } from "../layout";

const Header = () => {
  const [searchterm,setSearchterm]=useState("")
  const path=usePathname()
  const router=useRouter()
  const {account,dispatch}=useAccount()
  const search=()=>{
    if(searchterm.length<1)return
   router.push("/shop/search/"+searchterm) 
  }
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-xl font-bold">Ice Gadgets</h1>
        <nav className="space-x-6 hidden md:flex">
          <Link  href="/homepage" className={path=='/homepage' ?" text-red-500":"text-gray-700 hover:text-red-500"}>Home</Link>
          <Link href="/shop" className={path=='/shop' ?" text-red-500":"text-gray-700 hover:text-red-500"}>Store</Link>
          <Link href="/contact" className={path=='/contact' ?" text-red-500":"text-gray-700 hover:text-red-500"}>Contact</Link>
          <Link href="/about" className={path=='/about' ?" text-red-500":"text-gray-700 hover:text-red-500"}>About</Link>
          <Link href="/signup" className={path=='/signup' ?" text-red-500":"text-gray-700 hover:text-red-500"}>Sign Up</Link>
        </nav>
        <div className="flex gap-2 items-center space-x-4">
       <div
            className="border flex items-center align-middle rounded border-slate-500 bg-slate-50 placeholder:text-slate-500 py-1 px-3 "
            >
        
           <input
           onChange={(e)=>setSearchterm(e.target.value)}
            type="text"
            value={searchterm}
            placeholder="What are you looking for?"
            className="border-none text-sm w-fit active:border-none active:outline-none focus:border-none focus:outline-none  border-slate-500 bg-slate-50 placeholder:text-slate-500 py-1 pr-3  "
          />
          <FontAwesomeIcon icon={faSearch} width={20} className="cursor-pointer hover:scale-90 hover:text-red-500" onClick={search} />
        </div>
        {account.name &&
          <Link href="/wishlist">
          
          <button className={path=='/wishlist' ?" text-red-500":"text-gray-700 hover:text-red-500"}>
            <i className="fas fa-heart"></i>
          </button>
          </Link>
          }
          {account.name &&
          <Link href="/account">
          <button className={path=='/account' ?" text-red-500":"text-gray-700 hover:text-red-500"}>
          <FontAwesomeIcon icon={faUser} width={20}  />

          </button>
          </Link>}
          <Link href="/cart">
          
          <button className={path=='/cart' ?" text-red-500":"text-gray-700 hover:text-red-500"}>
            <i className="fas fa-shopping-cart"></i>
          </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
