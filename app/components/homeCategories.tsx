'use client'
import React from "react";
import SectionHeader from "./sectionHeader";
import Button from "./button";
import Link from "next/link";
import getProducts from "../controller/products";
import { Product } from "../types/product";


const allproducts:Product[] = await getProducts()
const categories=allproducts.map(f=>{return({name:f.category,link:"/shop/"+f.category})}).splice(0,(allproducts.length - 1 )<5? allproducts.length - 1 : 5)
// const categories = [
//  {name:"phones",link:'',icon: 'fa-phone'},
//  {name:"headphones",link:'',icon: 'fa-headphones'},
//  {name:"computer",link:'',icon: 'fa-computer'},
//  {name:"wrist watches",link:'',icon: 'fa-stopwatch'},
//  {name:"camera",link:'',icon: 'fa-camera'},
//  {name:"jewery",link:'',icon: 'fa-glasses'},
// ];


const HomeCategories = () => {
 
  return (
    <section className="my-10">
      <div className="w-full mx-auto">
        <SectionHeader title="Categories" />
        <h2 className="text-2xl font-bold mb-6">Browse categories</h2>
    <div className="flex justify-evenly gap-4 align-middle  w-full flex-wrap md:flex-nowrap ">
{categories.map(({name,link,})=>{
    return(
<Link href={link} className="flex flex-col items-center justify-evenly border-2 p-7 gap-4 w-full hover:bg-red-500 hover:text-white hover:stroke-white">

<div className="capitalize font-bold text-center">{name}</div>
</Link>
    )
})}
    </div>
        <div className="flex justify-center align-middle mt-4 w-full">

       <Button cta="View All categories" link="/shop"/>
        </div>
        </div>
    </section>
  );
};

export default HomeCategories;
