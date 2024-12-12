"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Button from "./button";
import SectionHeader from "./sectionHeader";
import { Product } from "../types/product";
import getProducts from "../controller/products";

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts: Product[] = await getProducts();
        const filteredProducts = allProducts.filter((product) => product.isNewArrival);
        setNewArrivals(filteredProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load new arrivals.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading new arrivals...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="my-10">
      <div className="w-full mx-auto">
        <SectionHeader title="Featured" />
        <div className="flex justify-between capitalize items-center">
          <h2 className="text-2xl font-bold align-middle">New Arrivals</h2>
          <Button cta="View All" link="/shop/newarrival" />
        </div>
        <div className="grid gap-4 justify-items-center grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
          {newArrivals.slice(0,Math.min(newArrivals.length - 1,10)).map((item) => (
            <ProductCard product={item} key={item.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
