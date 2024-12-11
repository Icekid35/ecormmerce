"use client"
import React from "react";
import ProductCard from "./ProductCard";
import Button from "./button";
import SectionHeader from "./sectionHeader";

import { Product } from "../types/product";
import getProducts from "../controller/products";


const allproducts:Product[] = await getProducts()
const newArrivals = allproducts.filter(pro=>pro.isNewArrival)

const NewArrivals = () => {

  return (
    <section className="my-10">
      <div className="w-full mx-auto">
        <SectionHeader title="Featured" />  <div className="flex justify-between capitalize items-center"><h2 className="text-2xl font-bold align-middle ">
     New arrivals
          </h2>
       <Button cta="View All " link="/shop/newarrival"/>

          </div>
        <div className="grid gap-2 auto-rows-auto justify-items-center justify-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] " >
          {newArrivals.map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
          </div>
        </div>
        <div className="flex justify-center align-middle mt-4 w-full">

        </div>
    </section>
  );
};

export default NewArrivals;
