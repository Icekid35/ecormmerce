// pages/cart.tsx
"use client"
import React, { useEffect, useRef, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faMoneyBill1Wave, faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { CartItem } from "../types/account";
import { AccountAction, useAccount } from "../layout";
import Image from "next/image";
import {
  CompleteResponesProps,
  MonnifyProps,
  UserCancelledResponseProps,
  usePayWithMonnifyPayment,
} from 'react-monnify-ts'
import getProducts from "../controller/products";
import { Product } from "../types/product";
import { useRouter } from "next/navigation";
import { AddOrder, updating } from "../controller/account";
import { config } from "dotenv";
config()

interface TbodyProps {
  product: CartItem;
  dispatch:React.Dispatch<AccountAction>
}

const Tbody = ({ product, dispatch }: TbodyProps) => {
  const { image, title,  price, quantity, colors = [], sizes = [] } = product;
const [quantityy,setQuantity]=useState(quantity)
  return (
    <tr className=" bg-accent ">
      <td
        className="cursor-pointer text-primary font-bold"
        onClick={() =>{
if(updating)return toast.custom("Pls wait")
  dispatch({ type: "REMOVE_FROM_CART", payload: product.id })}}
      >
        X
      </td>
      <td>
        <Image src={image} alt={title} width={96} height={96} className="w-24 h-24 object-cover" />
      </td>
      <td className="text-start">
        <div>
          {title}
          </div>
          <div className="text-xs">{[...new Set(colors)].filter(c=>c!="").length>0 ? <>Colors:<span className="opacity-90 text-sm ">{[...new Set(colors)].filter(c=>c!="").join(", ")}</span></>:<></>}</div>
          <div className="text-xs">{[...new Set(sizes)].filter(c=>c!="").length>0 ? <>Sizes:<span className="opacity-90 text-sm ">{[...new Set(sizes)].filter(c=>c!="").join(", ")}</span></>:<></>}</div>
        </td>
      <td>
        <FontAwesomeIcon icon={faNairaSign} /> {price.toLocaleString('en-US')}
      </td>
      <td>
      <input
  type="number"
  min={1}
  className="w-16 p-2 border bg-inherit rounded"
  value={quantityy}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
if(updating)return toast.custom("Pls wait")
      setQuantity(Number(e.currentTarget.value) < 1 ? 1 :Number(e.currentTarget.value))
      dispatch({
        type: "ADD_TO_CART",
        payload: {
          ...product,
          quantity: Number(e.currentTarget.value),
        },
      });
    }
  }}
  onChange={(e) => setQuantity(Number(e.target.value))} // Optional: Keep quantity in state
/>

      </td>
      <td>
        <FontAwesomeIcon icon={faNairaSign} /> {(price * quantity).toLocaleString('en-US')}
      </td>
    </tr>
  );
};

const Cart = () => {
  // let dispatch=()=>{}
  const { account, dispatch } =useAccount();
  const [cart,setCart]=useState(account.cart)
  const [off] = useState(0);
  const [isLoading,setIsLoading] = useState(false);
  const couponRef = useRef<HTMLInputElement>(null);
  // const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [products, setProducts] = useState<Product[]>([]);



  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sumCart = (arr: CartItem[]) =>
    arr.reduce((total, item) => Math.round(item.price * item.quantity + total), 0);

  const cartTotal = sumCart(cart);
  const config: MonnifyProps = {
    amount: cartTotal,
    currency: 'NGN',
    reference: `${new String(new Date().getTime())}`,
    customerName:account.name||"",
    customerEmail: account.email,
    apiKey: process.env.MONNIFY_APIKEY|| process.env.NEXT_PUBLIC_MONNIFY_APIKEY||"",
    contractCode: process.env.MONNIFY_CONTRACTCODE||process.env.NEXT_PUBLIC_MONNIFY_CONTRACTCODE||'',
    paymentDescription: 'icecommerce',
    metadata: {},
    isTestMode: true,
    customerPhoneNumber: account.phone||"",
  }
  const initializePayment = usePayWithMonnifyPayment(config)

  const applyCoupon = async () => {
    const coupon = couponRef.current?.value.trim();
    if (!coupon) {
      toast.error("Please input a coupon");
      return;
    }
    toast("Coupons are not currently available");
  };
const router=useRouter()
  const proceedToCheckout=()=>{
    if(cartTotal<=0)return toast.error("invalid quanitity")
    if(!account.address||!account.phone){
      toast.error("You need to add your address and phone number")
      toast.loading("redirecting...",{duration:100})
    router.push("/account");

      return 
    }
    if(isLoading)return
    setIsLoading(true)


const paytoast=toast.loading("processing...")
    const onLoadStart = () => {
      console.log('loading has started')
    }
    const onLoadComplete = () => {
      console.log('SDK is UP')
      toast.success("",{id:paytoast})
    }
  
    const onComplete = (res: CompleteResponesProps) => {
      //Implement what happens when the transaction is completed.
      setIsLoading(false)
      console.log('response', res)
      if(res.status=="SUCCESS"){
        toast.success("payment sucessful")
        AddOrder(cart,res.transactionReference,account,dispatch,router)
        return
      }
      return
    }
    const onClose = (data: UserCancelledResponseProps) => {
      //Implement what should happen when the modal is closed here
      setIsLoading(false)
      // console.log('data', data)
      if(data.paymentStatus=='USER_CANCELLED'){
        toast.error("payment has been cancelled. pls try again")
        return
      }
    }
    initializePayment(onLoadStart, onLoadComplete, onComplete, onClose)


  // router.push("/checkout");

  }

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          if(account.cart.length<1 )return setCart([])
          // console.log("called",cart.length>0)
          // console.log("called",account.cart)
          const allProducts: Product[] =await getProducts();
          // setProducts(allProducts);
          const newcart=[]
          for (let i = 0; i <= account.cart.length - 1; i++) {
            const element = account.cart[i];
            // console.log(element)
            const currentc=allProducts.find(i=>i.id==element.id)
            if(!currentc) continue
            newcart.push({...element,price:currentc.price*(1- ((currentc.discountPrice||0)/100))})
          }
          setCart(newcart)
        } catch (err) {
          console.error("Error fetching products:", err);
          setError("Failed to load cart.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [account]);
  
    if (loading || !account.name ) {
      return (
        <div className="flex justify-center items-center min-h-[70vh]">
          <p>Loading cart...</p>
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
    <>
   
      {account.name && cart.length < 1 ? (
        <div className="text-center flex justify-center items-center py-10 text-sm min-h-[80vh] ">
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        </div>
      ) : (
        <div className="container mx-auto p-4 md:text-base text-xs">
          <h1 className="text-3xl font-bold mb-6  ">Cart</h1>
          <div className=" overflow-x-scroll md:overflow-hidden max-w-[99vw]">

          <table className="table-auto w-full border-collapse align-middle border  border-hover2">
            <thead className="bg-inherit">
              <tr>
                <th className="p-4">X</th>
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total</th>
              </tr>
            </thead>
            <tbody className="align-middle text-center">
              {cart.reverse().map((product: CartItem) => (
                <Tbody key={product.id} product={product} dispatch={dispatch} />
              ))}
            </tbody>
          </table>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center mt-6">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                ref={couponRef}
                placeholder="Coupon code"
                className="p-2 border rounded"
              />
              <button
                onClick={applyCoupon}
                className="bg-blue-500 text-header px-4 py-2 rounded"
              >
                Apply Coupon <FontAwesomeIcon icon={faMoneyBill1Wave} />
              </button>
            </div>
            {/* <button className="bg-primary text-header px-4 py-2 rounded mt-4 md:mt-0">
              Update Cart
            </button> */}
          </div>
          <div className="mt-8 flex justify-end">
            <div className="border p-4 rounded md:w-1/3">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  <FontAwesomeIcon icon={faNairaSign} /> {cartTotal.toLocaleString('en-US')}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Coupon</span>
                <span>{off}% off</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span>
                  <FontAwesomeIcon icon={faNairaSign} />{" "}
                  {Math.round(cartTotal - (cartTotal * off) / 100).toLocaleString('en-US')}
                </span>
              </div>
              <button
              disabled={isLoading}
                className="bg-blue-600 text-header px-4 py-2 disabled:cursor-not-allowed rounded w-full"
                onClick={async () => {
                  // Simulate proceedToCheckout logic
                  proceedToCheckout()

                }}
              >
                Proceed to Checkout <FontAwesomeIcon icon={faCartArrowDown} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
