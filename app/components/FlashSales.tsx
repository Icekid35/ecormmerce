"use client"
import React from "react";
import ProductCard from "./ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from 'embla-carousel-auto-scroll'
import Button from "./button";
import SectionHeader from "./sectionHeader";
import getProducts from "../controller/products";
import { Product } from "../types/product";

const allproducts:Product[] = await getProducts()
const flashSales = allproducts.filter(pro=>pro.discountPrice)


const FlashSales = () => {
  const [emblaRef] = useEmblaCarousel({loop:true}, [
    AutoScroll({speed:.5,stopOnMouseEnter:true,stopOnInteraction:false})
  ])
  
  return (
    <section className="my-10">
      <div className="w-full mx-auto">
        <SectionHeader title="Limited offer" />
        <div className="flex justify-between items-center"><h2 className="text-2xl font-bold align-middle ">
          
          Flash Sales
          </h2>
       <Button cta="View All Product" link="/shop/discounts"/>

          </div>
        <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container gap-4 px-8">
          {flashSales.map((item) => (
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

export default FlashSales;
