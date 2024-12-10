"use client"
import Link from "next/link";
import React, { MouseEvent } from "react";
import Rating from "./rating";
import { Product } from "../types/product";
import { Order } from "../types/account";
import { useAccount } from "../layout";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

// Define the TypeScript type for the product card props
type ProductCardProps = {
  product:Product;
isWishlist?:()=>void;
forUser?:boolean
};

const ProductCard: React.FC<ProductCardProps> = ({product,isWishlist,forUser}) => {
  let {
    id,
    title,
    price,
    discountPrice,
    brand,
    images,
    stock,

    rating,
    reviewCount,
    isFeatured,
    isNewArrival,
    
  }=product
 let onAddToCart:any= (e: MouseEvent<HTMLDivElement>) => {
  confetti({
    particleCount: 100,
    spread: 10,
    origin: {
      y: e.clientY / window.innerHeight,
      x: e.clientX / window.innerWidth,
    },
    startVelocity: 30,
    shapes: ["star"],
  });

  dispatch({type:"ADD_TO_CART",payload:{id,title,price:discountPrice ? Math.round(price-((discountPrice/100)*price)):price,quantity:1,image:images[0],sizes:[""],colors:[""]}})
toast.success("Sucessfully added to cart") 
}
 let onWishlist= () => {
  dispatch({type:"ADD_TO_WISHLIST",payload:product.id})
  toast.success("Sucessfully added to cart") 
  
 }
 let onPreview= () => {}
 let {account,dispatch}=useAccount()
  return (
    <div className="embla__slide  w-[150px] max-w-[150px] md:max-w-[220px]  md:w-[220px]  m-3 pb-3 rounded-lg shadow-lg flex flex-col items-center gap-1 relative hoverable">
      {/* Discount Badge */} 
      <div className="flex items-center justify-center w-full bg-gray-200 relative min-h-40 max-h-40 md:max-h-64 md:min-h-64 transition-all">
      {(discountPrice && !isNewArrival) && (
        <span className="border border-slate-500 absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPrice}%
        </span>
      )}
      {(isNewArrival && !forUser) && (
        <span className="border border-slate-500 absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          New
        </span>
      )}

      {/* Product Image */}
      <div className=" w-full max-h-40 md:max-h-64 overflow-hidden rounded-lg flex items-center justify-center ">
        <img src={images[0]} loading="lazy" alt="Product" className="h-full object-contain" />
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 show-on-hover">
      {isWishlist &&  <button
          onClick={isWishlist}
          className="bg-white items-center flex rounded-full hover:bg-gray-200 p-2"
        >
          <i className="fas fa-trash"></i>
        </button>}
        {!isWishlist && <button
          onClick={onWishlist}
          className="border border-slate-400 bg-white items-center flex rounded-full hover:bg-gray-200 p-2"
        >
          <i className="fas fa-heart"></i>
        </button>}
        <Link href={"/products/"+id}>
        
        <button
          onClick={onPreview}
          className="border border-slate-400 bg-white items-center flex rounded-full hover:bg-gray-200 p-2"
        >
          <i className="fas fa-eye"></i>
        </button>
        </Link>
      </div>
      {/* Add to Cart Button */}
      {!forUser && <button
        onClick={onAddToCart}
        className="show-on-hover w-full py-2 bg-black text-white font-semibold  hover:bg-gray-800 absolute bottom-0"
      >
        Add To Cart
      </button>}
      </div>
<Link href={"/products/"+id} className="capitalize text-center font-bold text-sm md:text-base]">{title}</Link>

      {/* Price and Rating */}
      <div className="text-center space-y-2 ">
        <p className="text-red-500 text-sm">{discountPrice ? (<>N{Math.round(price - (price*((discountPrice||0)/100)))} <span className="text-zinc-500 line-through italic">N{price}</span></>):"N"+price}</p>
      <Rating rating={rating} ratingCount={reviewCount}  />
      </div>
    </div>
  );
};
interface extOrder extends Order{
  onDelete?:()=>void
}
const OrderProductCard: React.FC<extOrder> = ({ 
  orderId,
  id,
  image,
  discountPercentage,
  title,
  quantity,
  price,
  total,
  status,
  isCancellable,
  placedAt,
  onDelete
}) => {

   
    
 let onPreview= () => {}
  return (
    <div className="embla__slide  w-[150px] max-w-[150px] md:max-w-[220px]  md:w-[220px]  m-3 pb-3 rounded-lg shadow-lg flex flex-col items-center gap-1 relative hoverable">
       {/* Discount Badge */} 
       <div className="flex items-center justify-center w-full bg-gray-200 relative min-h-40 max-h-40 md:max-h-64 md:min-h-64 transition-all">
       {(discountPercentage) && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </span>
      )}
     

      {/* Product Image */}
      <div className=" w-full max-h-40 md:max-h-64 overflow-hidden rounded-lg flex items-center justify-center ">
        <img src={image} loading="lazy" alt="Product" className="h-full object-contain" />
      </div>


      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 show-on-hover">
      {status=="active" && isCancellable &&  <button
          onClick={onDelete}
          className="bg-white items-center flex rounded-full hover:bg-gray-200 p-2"
        >
          <i className="fas fa-trash"></i>
        </button>}
     
        <Link href={"/products/"+id}>
        
        <button
          onClick={onPreview}
          className="bg-white items-center flex rounded-full hover:bg-gray-200 p-2"
        >
          <i className="fas fa-eye"></i>
        </button>
        </Link>
      </div>
   
      </div>
<Link href={"/products/"+id} className="capitalize text-center font-bold">{quantity} {title}</Link>

      {/* Price and Rating */}
      <div className="text-center space-y-2 ">
        <p className="text-red-500 text-sm">{discountPercentage ? (<>N{(price - (price*((discountPercentage||0)/100))) *quantity} <span className="text-zinc-500 line-through italic">N{price*quantity}</span></>):"N"+price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
export {OrderProductCard}