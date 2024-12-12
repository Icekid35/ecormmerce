"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import Button from "./button";
import SectionHeader from "./sectionHeader";
import getProducts from "../controller/products";
import { Product } from "../types/product";

const FlashSales = () => {
  const [flashSales, setFlashSales] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [
      AutoScroll({
        speed: 0.5,
        stopOnMouseEnter: true,
        stopOnInteraction: false,
      }),
    ]
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allproducts = await getProducts();
        setFlashSales(allproducts.filter((pro) => pro.discountPrice));
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading flash sales...</p>
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
        <SectionHeader title="Limited Offer" />
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold align-middle">Flash Sales</h2>
          <Button cta="View All Products" link="/shop/discounts" />
        </div>
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
            <div className="embla__container gap-4 px-8">
              {flashSales.map((item) => (
                <ProductCard product={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center align-middle mt-4 w-full">
          {/* Optional Footer or Additional Elements */}
        </div>
      </div>
    </section>
  );
};

export default FlashSales;
