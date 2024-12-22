import React from "react";
import Head from "next/head";
import HeroSection from "../components/HeroSection";
import FlashSales from "../components/FlashSales";
import HomeCategories from "../components/homeCategories";
import BestProducts from "../components/bestProducts";
import NewArrivals from "../components/newArrival";
import Trustie from "../components/trustie";
import getBillboards from "../controller/billboard";
import { Billboard } from "../types/billboard";
import getProducts from "../controller/products";
import { Product } from "../types/product";
import { appname } from "../controller/owner";



export const revalidate = 60
// false | 0 | number
const HomePage =async () => {
  const billboards: Billboard[] = await getBillboards();
  const products:Product[] = await getProducts();
  const uniqueCategories = Array.from(
    new Set(products.map((product) => product.category))
  ).map((category) => {return({
    name: category,
    link: `/shop/${category}`,
  })});
  return (
    <>
      <Head>
        <title>Home - Your Shop Name</title>
        <meta
          name="description"
          content="Discover the best deals on electronics, gadgets, and more at Your Shop Name. Limited-time offers and new arrivals. Shop now!"
        />
        <meta name="keywords" content="shop, gadgets, electronics, best deals, flash sales" />
        <meta name="author" content="iceadmin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={appname} />
        <meta property="og:description" content="Discover the best deals and new arrivals. Shop now!" />
        <meta property="og:image" content="/favicon.ico" />
        {/* <meta property="og:url" content="https://yourshop.com" /> */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
      </Head>
      <div className="flex flex-col gap-8 md:p-8 pt-0 p-2">
        <HeroSection slides={billboards}/>
        <FlashSales flashSales={products.filter((pro) => pro.discountPrice)}/>
        <HomeCategories categories={uniqueCategories.slice(0, Math.min(uniqueCategories.length, 5))} />
        <BestProducts bestProducts={products.sort((a, b) => b.reviewCount - a.reviewCount).sort((a, b) => b.rating - a.rating)}/>
        <NewArrivals newArrivals={products.filter((product) => product.isNewArrival)} />
        <Trustie />
      </div>
    </>
  );
};
export default HomePage;
