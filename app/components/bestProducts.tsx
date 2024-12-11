"use client"
import React from "react";
import ProductCard from "./ProductCard";
import Button from "./button";
import SectionHeader from "./sectionHeader";
import getProducts from "../controller/products";


const allproducts = await getProducts()
const bestProducts = allproducts.filter(pro=>pro.isFeatured)



const BestProducts = () => {

  return (
    <section className="my-10">
      <div className="w-full mx-auto">
        <SectionHeader title="Top Products" />
        <div className="flex justify-between capitalize items-center"><h2 className="text-2xl font-bold align-middle ">
          best selling product
          </h2>
       <Button cta="View All" link="/shop/featured"/>

          </div>
        <div className="embla">
        <div className=" justify-center w-full flex">
        <div className="embla__container w-full items-center justify-center gap-4">
          {bestProducts.slice(0,3).map((item) => (
            <ProductCard product={item} key={item.id}/>
          ))}
          </div>
          </div>
        </div>
        <div className="flex justify-center align-middle mt-4 w-full">

        </div>
             </div>
    </section>
  );
};

export default BestProducts;
