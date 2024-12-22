"use client"
import React, { useEffect, useState } from "react";
import SectionHeader from "../components/sectionHeader";
import ProductCard from "../components/ProductCard";
import { useAccount } from "../layout";
import getProducts from "../controller/products";
import { Product } from "../types/product";

const Wishlist: React.FC = () => {
  const { account, dispatch } = useAccount();
  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<(Product |undefined)[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fake = await getProducts();
      setProducts(fake);
      const wishlist = account.wishlist.map((wid) => fake.find(({ id }) => id === wid));
      setWishlistItems(wishlist);
    };

    fetchProducts();
  }, [account.wishlist]);

  return (
    <section className="my-10 mx-2 md:mx-10">
      <div className="w-full mx-auto mb-24">
        <SectionHeader title="My choices" />
        <div className="flex justify-between capitalize items-center">
          <h2 className="text-2xl font-bold align-middle">my wishlist</h2>
        </div>
        <div className="grid auto-rows-auto auto-cols-auto grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-center justify-center gap-1">
          {wishlistItems.length > 0 ? (
            wishlistItems.reverse().map((item) =>
              item ? (
                <ProductCard
                  product={item}
                  key={item.id}
                  isWishlist={() =>
                    dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item.id })
                  }
                />
              ) : null
            )
          ) : (
            <div className="text-center text-2xl capitalize p-4">Nothing to see here</div>
          )}
        </div>
      </div>
      <div className="w-full mx-auto">
        <div className="flex justify-between capitalize items-center">
          <h2 className="text-2xl font-bold align-middle">Just for you</h2>
        </div>
        <div className="grid auto-rows-auto auto-cols-auto grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] items-center justify-center gap-1">
          {
            products.sort((a, b) => b.reviewCount - a.reviewCount).sort((a, b) => b.rating - a.rating).slice(0,Math.min(products.sort((a, b) => b.reviewCount - a.reviewCount).sort((a, b) => b.rating - a.rating).length,4))
            .map((item) => (
              <ProductCard product={item} key={item.id} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
