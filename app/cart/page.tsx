// pages/cart.tsx
"use client"
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
// import Title from "../components/Title";
// import Seo from "../components/Seo";
// import { DataContext } from "../context/State";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown, faMoneyBill1Wave, faNairaSign } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import { CartItem } from "../types/account";
import { useAccount } from "../layout";

// interface cart {
//   id: string;
//   images: string[];
//   title: string;
//   price: number;
//   quantity: number;
//   colors?: string[];
//   sizes?: string[];
// }
// let cart:CartItem[]=[{
//   id: "string",
//   image: "string",
//   title: "string",
//   price: 500,
//   quantity: 10,
//   colors: ["red"],
//   sizes:["string"],
// },
// {
//   id: "string",
//   image: "string",
//   title: "string",
//   price: 500,
//   quantity: 10,
//   colors: ["red"],
//   sizes:["string"],
// },
// {
//   id: "string",
//   images: ["string"],
//   title: "string",
//   price: 500,
//   quantity: 10,
//   colors: ["red"],
//   sizes:["string"],
// }]
interface TbodyProps {
  product: CartItem;
  dispatch: React.Dispatch<any>;
}

const Tbody = ({ product, dispatch }: TbodyProps) => {
  const { image, title, id, price, quantity, colors = [], sizes = [] } = product;

  return (
    <tr className="hover:bg-gray-100 ">
      <td
        className="cursor-pointer text-red-500 font-bold"
        onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product.id })}
      >
        X
      </td>
      <td>
        <img src={image} alt={title} className="w-24 h-24 object-cover" />
      </td>
      <td className="text-start">
        <div>
          {title}
          </div>
          <div className="text-xs">{[...new Set(colors)].filter(c=>c!="").length>0 ? <>Colors:<span className="opacity-90 text-sm ">{[...new Set(colors)].filter(c=>c!="").join(", ")}</span></>:<></>}</div>
          <div className="text-xs">{[...new Set(sizes)].filter(c=>c!="").length>0 ? <>Sizes:<span className="opacity-90 text-sm ">{[...new Set(sizes)].filter(c=>c!="").join(", ")}</span></>:<></>}</div>
        </td>
      <td>
        <FontAwesomeIcon icon={faNairaSign} /> {price}
      </td>
      <td>
        <input
          type="number"
          min={1}
          className="w-16 p-2 border rounded"
          value={quantity}
          onChange={(e) =>
            dispatch({
              type: "ADD_TO_CART",
              payload: {...product, quantity: Number(e.target.value),},
             
            })
          }
        />
      </td>
      <td>
        <FontAwesomeIcon icon={faNairaSign} /> {price * quantity}
      </td>
    </tr>
  );
};

const Cart = () => {
  // let dispatch=()=>{}
  const { account, dispatch } =useAccount();
  let cart=account.cart
  const [off, setOff] = useState(0);
  const couponRef = useRef<HTMLInputElement>(null);
  // const router = useRouter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sumCart = (arr: CartItem[]) =>
    arr.reduce((total, item) => Math.round(item.price * item.quantity + total), 0);

  const cartTotal = sumCart(cart);

  const applyCoupon = async () => {
    const coupon = couponRef.current?.value.trim();
    if (!coupon) {
      toast.error("Please input a coupon");
      return;
    }
    toast("Coupons are not currently available");
  };

  return (
    <>
   
      {cart.length < 1 ? (
        <div className="text-center flex justify-center items-center py-10 text-sm min-h-[80vh] ">
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        </div>
      ) : (
        <div className="container mx-auto p-4 md:text-base text-xs">
          <h1 className="text-3xl font-bold mb-6  ">Cart</h1>
          <div className=" overflow-x-scroll max-w-[99vw]">

          <table className="table-auto w-full border-collapse align-middle border  border-gray-200">
            <thead className="bg-gray-100">
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
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Apply Coupon <FontAwesomeIcon icon={faMoneyBill1Wave} />
              </button>
            </div>
            {/* <button className="bg-red-500 text-white px-4 py-2 rounded mt-4 md:mt-0">
              Update Cart
            </button> */}
          </div>
          <div className="mt-8 flex justify-end">
            <div className="border p-4 rounded md:w-1/3">
              <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>
                  <FontAwesomeIcon icon={faNairaSign} /> {cartTotal}
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
                  {Math.round(cartTotal - (cartTotal * off) / 100)}
                </span>
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                onClick={() => {
                  // Simulate proceedToCheckout logic
                  toast.success("Proceeding to checkout...");
                  // router.push("/checkout");
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
