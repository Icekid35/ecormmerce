"use client"
import { faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAccount } from "../layout";
// import Image from "next/image";
// import favico from "../favicon.ico"

const Header = () => {
  const [searchterm,setSearchterm]=useState("")
  const path=usePathname()
  const router=useRouter()
  const {account}=useAccount()
  // alert(account.isLoaded)
  // alert(account.email )
  const search=()=>{
    if(searchterm.length<1)return
   router.push("/shop/search/"+searchterm) 
  }
  return (
    <header className="bg-accent  shadow-shadow shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link href={'/'} className="text-xl font-bold flex items-center  gap-2">{path!="/" && <FontAwesomeIcon icon={faHome} />}ICE </Link>
        <nav className="space-x-6 hidden md:flex">
          <Link  href="/homepage" className={path=='/homepage' ?" text-primary":"text-text hover:text-primary"}>Home</Link>
          <Link href="/shop" className={path=='/shop' ?" text-primary":"text-text hover:text-primary"}>Store</Link>
          <Link href="/contact" className={path=='/contact' ?" text-primary":"text-text hover:text-primary"}>Contact</Link>
          <Link href="/about" className={path=='/about' ?" text-primary":"text-text hover:text-primary"}>About</Link>
          {!account.name && account.isLoaded &&
          <Link href="/signup" className={path=='/signup' ?" text-primary":"text-text hover:text-primary"}>Sign Up</Link>
                  }
                          </nav>
        <div className="flex md:gap-2 items-center md:space-x-4 space-x-2">
       <div
            className="border flex items-center align-middle rounded border-secondary bg--background placeholder:text-secondary py-1 px-3 "
            >
        
           <input
           onChange={(e)=>setSearchterm(e.target.value)}
            type="text"
            value={searchterm}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
         search()
              }
            }}
            placeholder="What are you looking for?"
            className="border-none text-sm w-fit active:border-none active:outline-none focus:border-none focus:outline-none  border-secondary bg--background placeholder:text-secondary py-1 pr-3 bg-inherit "
          />
          <FontAwesomeIcon icon={faSearch} width={20} className="cursor-pointer hover:scale-90 hover:text-primary" onClick={search} />
        </div>
        {account.name &&
          <Link href="/wishlist" className="hidden md:block">
          
          <button className={path=='/wishlist' ?" text-primary":"text-text hover:text-primary"}>
            <i className="fas fa-heart"></i>
          </button>
          </Link>
          }
          {account.name &&
          <Link href="/account" className="hidden md:block">
          <button className={path=='/account' ?" text-primary":"text-text hover:text-primary"}>
          <FontAwesomeIcon icon={faUser} width={20}  />

          </button>
          </Link>}
          <Link href="/cart">
          
          <button className={path=='/cart' ?" text-primary":"text-text hover:text-primary"}>
            <i className="fas fa-shopping-cart"></i>
          </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
