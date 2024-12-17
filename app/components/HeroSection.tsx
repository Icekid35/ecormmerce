"use client"

import React, { useEffect, useState } from "react";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from "embla-carousel-fade";
import Button from "./button";
import getBillboards from "../controller/billboard";
import { Billboard } from "../types/billboard";


// Dummy data for hero section slides
// const slides = [
//   {
//     id: 1,
//     image: "/images/slide2.jpg",
//     title: "iPhone 14 Series",
//     subtitle: "Up to 10% off Voucher",
//     cta: "Shop Now",
//   },
//   {
//     id: 2,
//     image: "/images/slide2.jpg",
//     title: "Smart Gadgets",
//     subtitle: "Discover the latest tech",
//     cta: "Explore Now",
//   },
//   {
//     id: 3,
//     image: "/images/slide3.jpg",
//     title: "Top Brands",
//     subtitle: "Exclusive deals on top brands",
//     cta: "View Offers",
//   },
// ];

const HeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [slides, setSlide] = useState<Billboard[] |[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const billboard: Billboard[] = await getBillboards();
        setSlide(billboard);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load billlboards");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const [emblaRef] = useEmblaCarousel({loop:true},[Autoplay(),Fade()])
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p>Loading Billboards...</p>
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
    <div className="relative w-full py-8 md:p-8 embla" ref={emblaRef}>
    
      
        <div className="embla__container gap-4 " style={{ textShadow: "2px 2px 4px black" }}        >

        {slides.map((slide, index) => (
           <div
           key={index}
           className="embla__slide bg-footer rounded-md"
         >
          <div
            key={slide.id}
            className={`w-full border flex items-center justify-between bg-cover bg-center h-[400px] text-header rounded-sm`}
            style={{ backgroundImage: ` linear-gradient(45deg, var(--footer) 0%, rgba(0, 0, 0, 0) 100%),url(${slide.image})`,backgroundRepeat:"no-repeat",backgroundSize:"100%",objectFit:"cover" }}
          >
            <div className="flex flex-col items-start px-10">
              <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg mb-6">{slide.subtitle}</p>
             <Button cta={slide.cta} pill={true} link={"/shop"}/>
            </div>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
