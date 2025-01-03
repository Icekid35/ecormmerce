"use client"
import Link from "next/link";
import React from "react";
import Rating from "./rating";
import { Product } from "../types/product";
import { Order } from "../types/account";
import { useAccount } from "../layout";
import toast from "react-hot-toast";
import { updating } from "../controller/account";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import Image from "next/image";

// Define the TypeScript type for the product card props
type ProductCardProps = {
  product:Product;
isWishlist?:()=>void;
forUser?:boolean
};

const ProductCard: React.FC<ProductCardProps> = ({product,isWishlist,forUser}) => {
  
  const {
    id,
    title,
    price,
    discountPrice,
    images,
    rating,
    reviewCount,
    isNewArrival,
    
  }=product
  const router=useRouter()
 const onAddToCart= ( ) => {

  if(updating)return toast.custom("Pls wait")
if(!account.name) {
  toast.error("Pls signup to comtinue")
  return router.push("/signup")
}
  dispatch({type:"ADD_TO_CART",payload:{id,title,price:discountPrice ? Math.round(price-((discountPrice/100)*price)):price,quantity:1,image:images[0],sizes:[""],colors:[""]}})
// toast.success("Sucessfully added to cart") 
}
 const onWishlist= () => {
if(updating)return toast.custom("Pls wait")
  if(!account.name) {
    toast.error("Pls signup to comtinue")
    return router.push("/signup")
  }
  dispatch({type:"ADD_TO_WISHLIST",payload:product.id})
  // toast.success("Sucessfully added to your wishlist") 
  
 }
 const onPreview= () => {}
 const {account,dispatch}=useAccount()
  return (
    <div className="embla__slide  w-[150px] max-w-[150px] md:max-w-[220px]  md:w-[220px]  m-3 pb-3 rounded-lg shadow-shadow shadow-lg  flex flex-col items-center gap-1 relative hoverable">
      {/* Discount Badge */} 
      <div className="flex items-center justify-center w-full bg-hover2 relative min-h-40 max-h-40 md:max-h-64 md:min-h-64 transition-all">
      {(discountPrice && !isNewArrival) && (
        <span className="border border-secondary absolute top-2 left-2 bg-primary text-header text-xs font-bold px-2 py-1 rounded">
          -{discountPrice}%
        </span>
      )}
      {(isNewArrival && !forUser) && (
        <span className="border border-secondary absolute top-2 left-2 bg-green text-header text-xs font-bold px-2 py-1 rounded">
          New
        </span>
      )}

      {/* Product Image */}
      <div className=" w-full max-h-40 md:max-h-64 overflow-hidden rounded-lg flex items-center justify-center ">
        <Image src={images[0]}  
        alt={title}
                style={{width:"100%",height:"100%"}}
                loading="lazy" className=" w-full object-cover" />
      </div>

      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 show-on-hover">
      {isWishlist &&  <button
          onClick={isWishlist}
          className="bg-accent items-center flex rounded-full hover:bg-hover2 p-2"
        >
          <i className="fas fa-trash"></i>
        </button>}
        {!isWishlist && <button
          onClick={onWishlist}
          className="border border-hover bg-accent items-center flex rounded-full hover:bg-hover2 p-2"
        >
          <i className="fas fa-heart"></i>
        </button>}
        <Link href={"/products/"+id}>
        
        <button
          onClick={onPreview}
          className="border border-hover bg-accent items-center flex rounded-full hover:bg-hover2 p-2"
        >
          <i className="fas fa-eye"></i>
        </button>
        </Link>
      </div>
      {/* Add to Cart Button */}
      {!forUser && <button
        onClick={onAddToCart}
        className="show-on-hover w-full py-2 bg-addcart text-header font-semibold  hover:bg-gray-800 absolute bottom-0"
      >
        Add To Cart
      </button>}
      </div>
<Link href={"/products/"+id} className="capitalize text-center font-bold text-sm md:text-base]">{title}</Link>

      {/* Price and Rating */}
      <div className="text-center space-y-2 ">
        <p className="text-primary text-sm"> <FontAwesomeIcon icon={faNairaSign} />{discountPrice ? (<>{Math.round(price - (price*((discountPrice||0)/100))).toLocaleString('en-US')} <span className="text-secondary line-through italic">N{price.toLocaleString('en-US')}</span></>):price.toLocaleString('en-US')}</p>
      <Rating rating={rating} ratingCount={reviewCount}  />
      </div>
    </div>
  );
};
interface extOrder extends Order{
  onDelete?:()=>void
}
const OrderProductCard: React.FC<extOrder> = ({ 
  id,
  image,
  discountPercentage,
  title,
  quantity,
  price,
  colors,
  sizes,
  // status,
  // isCancellable,
  // onDelete
}) => {

   
    
  return (
    <div className="embla__slide  w-[150px] max-w-[150px] md:max-w-[220px]  md:w-[220px]  m-3 pb-3 rounded-lg shadow-lg  shadow-shadow  flex flex-col items-center gap-1 relative hoverable">
       {/* Discount Badge */} 
       <div className="flex items-center justify-center w-full bg-hover2 relative min-h-40 max-h-40 md:max-h-64 md:min-h-64 transition-all">
       {(discountPercentage) && (
        <span className="absolute top-2 left-2 bg-primary text-header text-xs font-bold px-2 py-1 rounded">
          -{discountPercentage}%
        </span>
      )}
     

      {/* Product Image */}
      <div className=" w-full max-h-40 md:max-h-64 overflow-hidden rounded-lg flex items-center justify-center ">
        <img src={image} loading="lazy" alt="Product" className="h-full object-contain" />
      </div>


      {/* Action Buttons */}
      <div className="absolute top-2 right-2 flex flex-col space-y-2 show-on-hover">
      {/* {status=="active" && isCancellable &&  <button
          onClick={onDelete}
          className="bg-accent items-center flex rounded-full hover:bg-hover2 p-2"
        >
          <i className="fas fa-trash"></i>
        </button>} */}
     
        <Link href={"/products/"+id}>
        
        <button
          className="bg-accent items-center flex rounded-full hover:bg-hover2 p-2"
        >
          <i className="fas fa-eye"></i>
        </button>
        </Link>
      </div>
   
      </div>
<Link href={"/products/"+id} className="capitalize text-center font-bold">{quantity} {title}</Link>
{colors && colors.filter(c=>c!="").length>0 && <div className="text-xs text-left w-full capitalize">color: {colors?.join(" ,")}</div>}
{sizes && sizes.filter(c=>c!="").length>0 && <div className="text-xs text-left w-full capitalize">sizes: {sizes?.join(",")}</div>}
      {/* Price and Rating */}
      <div className="text-center space-y-2 ">
        <p className="text-primary text-sm"> <FontAwesomeIcon icon={faNairaSign} />{discountPercentage ? (<>{((price - (price*((discountPercentage||0)/100))) *quantity).toLocaleString('en-US')} <span className="text-secondary line-through italic">N{(price*quantity).toLocaleString('en-US')}</span></>):price.toLocaleString('en-US')}</p>
      </div>
    </div>
  );
};

export default ProductCard;
export {OrderProductCard}