"use client"

import React from "react";
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Fade from "embla-carousel-fade";
import Button from "./button";


// Dummy data for hero section slides
const slides = [
  {
    id: 1,
    image: "/images/slide2.jpg",
    title: "iPhone 14 Series",
    subtitle: "Up to 10% off Voucher",
    cta: "Shop Now",
  },
  {
    id: 2,
    image: "/images/slide2.jpg",
    title: "Smart Gadgets",
    subtitle: "Discover the latest tech",
    cta: "Explore Now",
  },
  {
    id: 3,
    image: "/images/slide3.jpg",
    title: "Top Brands",
    subtitle: "Exclusive deals on top brands",
    cta: "View Offers",
  },
];

const HeroSection = () => {
  const [emblaRef] = useEmblaCarousel({loop:true},[Autoplay(),Fade()])
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
            style={{ backgroundImage: `url(${slide.image}) `,backgroundRepeat:"no-repeat",backgroundSize:"100%",objectFit:"cover" }}
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
