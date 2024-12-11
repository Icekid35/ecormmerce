"use client"
import React from "react";

import SectionHeader from "../components/sectionHeader";
import ProductCard from "../components/ProductCard";
import { useAccount } from "../layout";
import getProducts from "../controller/products";


 const fake=await getProducts()
const Wishlist = () => {
const {account,dispatch}=useAccount()
const wishlists=account.wishlist.map(wid=>fake.find(({id})=>id==wid))
  return (
    <section className="my-10 mx-2 md:mx-10">
      <div className="w-full mx-auto mb-24">
        <SectionHeader title="My choices" />
        <div className="flex justify-between capitalize items-center"><h2 className="text-2xl font-bold align-middle ">
          my wishlist
          </h2>
          </div>
        <div className="grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] grid auto-rows-auto auto-cols-auto   items-center justify-center gap-1">
          {wishlists.length>0 ? wishlists.reverse().map((item) => {
            if(item){
                return(

                  <ProductCard product={item}  key={item.id} isWishlist={()=>{dispatch({type:"REMOVE_FROM_WISHLIST",payload:item.id})}}/>
                )
            }
          }): 
 <div className='text-center text-2xl capitalize p-4'> Nothing to see here</div>
}
        </div>
        
             </div>
      <div className="w-full mx-auto">
        <div className="flex justify-between capitalize items-center"><h2 className="text-2xl font-bold aliggn-middle ">
          Just for you
          </h2>

          </div>
        <div className="grid auto-rows-auto auto-cols-auto grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]  items-center justify-center gap-1">
          {fake.filter(s=>s.isFeatured).slice(0,fake.filter(s=>s.isFeatured).length<4? fake.filter(s=>s.isFeatured).length - 1 : 4).map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
        
             </div>
    </section>
  );
};

export default Wishlist;
