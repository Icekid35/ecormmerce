"use client"
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Button from "./button";
import SectionHeader from "./sectionHeader";
import getProducts from "../controller/products";
import { Product } from "../types/product";


const BestProducts = () => {
  const [bestProducts, setBestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allproducts = await getProducts();
        setBestProducts(allproducts.filter((pro) => pro.isFeatured));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

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
