
import React from "react";
import HeroSection from "../components/HeroSection";
import FlashSales from "../components/FlashSales";
import HomeCategories from '../components/homeCategories';
import BestProducts from "../components/bestProducts";
import NewArrivals from "../components/newArrival";
import Trustie from "../components/trustie";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-8 p-8 pt-0 ">
      <HeroSection />
      <FlashSales />
      <HomeCategories  />
      <BestProducts />
      <NewArrivals/>
      <Trustie />
    </div>
  );
};

export default HomePage;
