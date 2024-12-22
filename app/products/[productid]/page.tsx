"use client";

import React, {  useEffect, useState } from "react";
import Rating from "../../components/rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNairaSign } from "@fortawesome/free-solid-svg-icons";
import SectionHeader from "../../components/sectionHeader";
import ProductCard from "../../components/ProductCard";
import { useAccount } from "@/app/layout";
import toast from "react-hot-toast";
import { Product } from "@/app/types/product";
import Image from "next/image";
import getProducts from "@/app/controller/products";
import { updating } from "@/app/controller/account";

const Products = ({ params }: { params: Promise<{ productid: string }> }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [selectSize, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const { dispatch } = useAccount();
const productid=React.use(params).productid
  // Fetch products client-side
  useEffect(() => {
    const fetchProducts = async () => {
 
        try{
          setLoading(true)
        const data: Product[] = await getProducts()
        setProducts(data);

        const selectedProduct = data.find(({ id }) => id === productid) || null;
        setProduct(selectedProduct);
        if (selectedProduct?.images?.length) {
          setImage(selectedProduct.images[0]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Unable to load products.");
      }finally{
        setLoading(false)
      }
    };

    fetchProducts();
  }, [productid]);

  const addQuantity = () => setQuantity(quantity + 1);

  const reduceQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const changeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const addToCart = ( ) => {
    if (!product) return;
    if(updating)return toast.custom("Pls wait")


    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: product.id,
        title: product.title,
        price: product.discountPrice
          ? product.price - product.price * (product.discountPrice / 100)
          : product.price,
        image: product.images[0],
        quantity,
        colors:Array(quantity).fill(color),
        sizes: Array(quantity).fill(selectSize),
      },
    });
    // toast.success("Added to cart successfully");
  };

  const addToWishlist = () => {
    if (product) {
if(updating)return toast.custom("Pls wait")

      dispatch({ type: "ADD_TO_WISHLIST", payload: product.id });
      // toast.success("Added to wishlist successfully");
    }
  };

  if(loading)return(
    <div className="text-center text-3xl font-semibold py-[30vh] text-text">LOADING...</div>
  
  )
  if (!product) {
    return (
      <div className="flex w-full min-h-[80vh] justify-center items-center">
        <h1 className="text-4xl text-center">PRODUCT NOT AVAILABLE</h1>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8 p-2 md:px-8">
      <div className="flex md:flex-row flex-col md:p-8 pt-4 gap-4">
        <div className="w-full grid md:grid-cols-3 gap-2 md:p-8">
          <div className="md:col-span-1 flex md:flex-col order-2 md:order-1 gap-4 w-full max-h-[500px] h-full justify-center md:justify-start">
            {product.images.map((img, index) => (
              <div
                key={index}
                onClick={() => setImage(img)}
                className={`w-[50px] md:w-[150px] overflow-hidden border border-secondary hover:scale-110 bg-secondary h-full md:max-h-[150px] max-h-[50px] ${
                  image === img ? "scale-110" : ""
                }`}
              >
                <Image
                  src={img}
                  className="object-fill h-[150px] w-full"
                  alt="Product Thumbnail"
                  width={150}
                  height={150}
                  style={{width:"100%",height:"100%"}}
                />
              </div>
            ))}
          </div>
          <div className="w-full md:col-span-2 md:order-1">
            <div className="min-w-[150px] border m-auto border-secondary overflow-hidden aspect-square md:min-h-80 md:h-[400px] h-[300px] bg-secondary">
              <Image
                src={image}
                className="object-fill w-full h-[300px] md:h-[400px]"
                alt="Product Image"
                width={400}
                height={400}
                style={{width:"100%",height:"100%"}}

              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-8">
          <h2 className="capitalize font-bold text-3xl">{product.title}</h2>
          <div className="flex">
            <Rating rating={product.rating} ratingCount={product.reviewCount} />
          </div>
          <div className="text-xl">
            <FontAwesomeIcon icon={faNairaSign} />
            {product.discountPrice ? (<>{Math.round(product.price - (product.price*((product.discountPrice||0)/100))).toLocaleString('en-US')} <span className="text-secondary line-through italic">N{product.price.toLocaleString('en-US')}</span></>):"N"+product.price.toLocaleString('en-US')}
          </div>
          <div className="capitalize">{product.description}</div>
          <div className="w-full h-[0.5px] bg-secondary"></div>
          {product.colors.length > 0 && (
            <div className="flex gap-6 items-center">
              <div className="text-2xl capitalize">Colours:</div>
              <div className="flex gap-4 items-center">
                {product.colors.map((cl, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer border rounded-full w-[20px] h-[20px] hover:border-2 ${
                      color === cl ? "border-black" : ""
                    }`}
                    style={{ backgroundColor: cl }}
                    onClick={() => setColor(cl)}
                  ></div>
                ))}
              </div>
            </div>
          )}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex gap-6 items-center">
              <div className="text-2xl capitalize">Size:</div>
              <div className="flex gap-4 items-center">
                {product.sizes.map((size, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer hover:bg-primary hover:text-header border-[1px] border-addcart p-1 px-2 font-semibold rounded uppercase text-sm ${
                      selectSize === size ? "text-header border-primary" : ""
                    }`}
                    onClick={() => setSize(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex w-full justify-between gap-6 items-center">
            <div className="flex border-secondary font-semibold border-[1px] text-center text-xl rounded">
              <button
                onClick={reduceQuantity}
                className="w-full px-2 md:px-4 rounded-s-sm hover:text-header hover:bg-primary text-4xl flex justify-center items-center"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={changeQuantity}
                className="outline-none w-14 border-x-[1px] pl-3 border-secondary bg-inherit"
                max={99}
                min={1}
              />
              <button
                onClick={addQuantity}
                className="w-full text-header bg-primary text-3xl px-2 md:px-4 flex justify-center items-center"
              >
                +
              </button>
            </div>
            <button
              onClick={addToCart}
              className="h-[40px] w-full bg-primary min-w-[70px] rounded-sm px-1 text-xs text-header font-bold capitalize"
            >
              Add to Cart
            </button>
            <div
              onClick={addToWishlist}
              className="h-fit cursor-pointer p-2 md:p-4 flex justify-center items-center border-[1px] hover:bg-primary hover:text-header border-secondary rounded"
            >
              <i className="fas fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    {products
            .filter((p) =>( p.category === product.category) && p.id!=product.id).length>0 &&   <div className="w-full my-24 md:mx-6">
        <SectionHeader title="Related Products" />
        <div className="grid row-auto w-full col-auto md:grid-cols-[repeat(auto-fit,minmax(230px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] mb-16 gap-3 justify-center">
          {products
            .filter((p) =>( p.category === product.category) && p.id!=product.id)
            .slice(0, 4)
            .map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
        </div>
      </div>}
    </div>
  );
};


export default Products