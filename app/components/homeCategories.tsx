// "use client";

// import React, { useEffect, useState } from "react";
import SectionHeader from "./sectionHeader";
import Button from "./button";
import Link from "next/link";
// import getProducts from "../controller/products";
// import { Product } from "../types/product";

const HomeCategories = ({categories}:{categories:{ name: string; link: string }[]}) => {
  // const [categories, setCategories] = useState<{ name: string; link: string }[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const allProducts: Product[] = await getProducts();
  //       const uniqueCategories = Array.from(
  //         new Set(allProducts.map((product) => product.category))
  //       ).map((category) => ({
  //         name: category,
  //         link: `/shop/${category}`,
  //       }));

  //       setCategories(uniqueCategories.slice(0, Math.min(uniqueCategories.length, 5)));
  //     } catch (err) {
  //       console.error("Error fetching categories:", err);
  //       setError("Failed to load categories.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[200px]">
  //       <p>Loading categories...</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[200px]">
  //       <p>{error}</p>
  //     </div>
  //   );
  // }

  return (
    <section className="my-10">
      <div className="w-full mx-auto">
        <SectionHeader title="Categories" />
        <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>
        <div className="flex justify-evenly gap-4 align-middle w-full flex-wrap md:flex-nowrap">
          {categories && categories.length>0 && categories.map(({ name, link }) => (
            <Link
              href={link}
              key={name}
              className="flex flex-col items-center justify-evenly border-2 p-7 gap-4 w-full hover:bg-primary hover:text-header hover:strokeheader"
            >
              <div className="capitalize font-bold text-center">{name}</div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center align-middle mt-4 w-full">
          <Button cta="View All Categories" link="/shop" />
        </div>
      </div>
    </section>
  );
};

export default HomeCategories;
