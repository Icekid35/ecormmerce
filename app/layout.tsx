"use client"
// import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css"

import React, { createContext, useContext, useReducer,  Dispatch, useEffect, useState } from "react";
import { Account, CartItem, Review} from "./types/account"; 
import toast, { Toaster } from "react-hot-toast";
import { getAccountById, updateAccount } from "./controller/account";
// import { uploadReview } from "./controller/products";


// export const metadata: Metadata = {
//   title: "hb collections",
//   description: "by hb ",
// };

// Example initial account state
const initialAccount: Account = {
  id:"",
  address:"",
  createdAt:"",
  email:"",
  isActive:false,
  name:null,
  orders:[],
  reviews:[],
  isgoogle:false,
  cart: [],
  wishlist: [],
  isLoaded:false
  // orders: [
  //   { 
  //     orderId:"1",
  //     id:"1",
  //     image:"",
  //     discountPercentage:20,
  //     title:"prince game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"active",
  //     isCancellable:true,
  //     placedAt:"friday",
  //   },
  //   { 
  //     orderId:"2",
  //     id:"2",
  //     image:"",
  //     discountPercentage:20,
  //     title:"prince game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"active",
  //     isCancellable:true,
  //     placedAt:"friday",
  //   },
  //   { 
  //     orderId:"3",
  //     id:"3",
  //     image:"",
  //     discountPercentage:20,
  //     title:"queen game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"active",
  //     isCancellable:true,
  //     placedAt:"friday",
  //   },
  //   { 
  //     orderId:"4",
  //     id:"4",
  //     image:"",
  //     discountPercentage:10,
  //     title:"king game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"delivered",
  //     isCancellable:true,
  //     placedAt:"friday",
  //   },
  //   { 
  //     orderId:"1",
  //     id:"1",
  //     image:"",
  //     discountPercentage:20,
  //     title:"prince game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"active",
  //     isCancellable:false,
  //     placedAt:"friday",
  //   },
  //   { 
  //     orderId:"2",
  //     id:"2",
  //     image:"",
  //     title:"prince game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"active",
  //     isCancellable:true,
  //     placedAt:"friday",
  //   },
  //   { 
  //     orderId:"3",
  //     id:"3",
  //     image:"",
  //     discountPercentage:20,
  //     title:"queen game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"active",
  //     isCancellable:true,
  //     placedAt:"friday",
  //   },
  //   { 
  //     orderId:"4",
  //     id:"4",
  //     image:"",
  //     discountPercentage:10,
  //     title:"king game",
  //     quantity:3,
  //     price:2000,
  //     total:6000,
  //     status:"delivered",
  //     isCancellable:true,
  //     placedAt:"friday",
  //   },
  // ],
  // reviews:[
  //   {id:"1",image:"",title:"HAUT HF-969",reviewedAt:"s",rating:4},
  //   {id:"2",image:"",title:"xsx HF-969",reviewedAt:"s",rating:5},
  //   {id:"3",image:"",title:"wsw HF-969",reviewedAt:"s",rating:3},
  //   {id:"4",image:"",title:"zQSQQ HF-969",reviewedAt:"s",},
  //   {id:"5",image:"",title:"SQQS HF-969",reviewedAt:"s",rating:3},
  //   {id:"6",image:"",title:"SAASD HF-969",reviewedAt:"s",},
  // ] ,
  // createdAt: "2023-03-15T09:30:00Z",
  // isActive: true,
  // isgoogle:true
};

// let user:Account
// //  localStorage=localStorage || {}
// const localUser=localStorage?.getItem?.("email")
// if(localUser){
//  user=await getAccountByEmail(localUser) || initialAccount
// }else{
//   user=initialAccount
// }
// // Define account actions
 export type AccountAction =
  | { type: "UPDATE_ACCOUNT"; payload: Partial<Account> }
  | { type: "SET_ACCOUNT"; payload: Account }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "ADD_REVIEW"; payload: Review }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "REMOVE_FROM_ORDER"; payload: string }
  | { type: "ADD_TO_WISHLIST"; payload: string }
  | { type: "REMOVE_FROM_WISHLIST"; payload: string };

// Reducer function
// Reducer function
const accountReducer =  (state: Account, action: AccountAction): Account => {
  let newState: Account; // Variable to store the updated state

  switch (action.type) {
    case "UPDATE_ACCOUNT":
      newState = { ...state, ...action.payload };
      break;

    case "SET_ACCOUNT":
      if (state.cart?.length<1|| state.wishlist?.length<1) {
        newState = { ...action.payload };
        // console.log("active..",state,action)
      } else {
        console.log("inactive..",state,action)
        newState = {
          ...action.payload,
          cart: [...state.cart,...action.payload.cart],
          wishlist: [...state.wishlist,...action.payload.wishlist],
        };
      }
      break;

    case "ADD_TO_CART":
      const prevcart = state.cart?.find?.(({ id }) => id == action.payload.id);
      if (prevcart) {
        const ncart: CartItem = {
          ...prevcart,
          quantity:
            action.payload.quantity == 1
              ? prevcart?.quantity + 1
              : action.payload.quantity,
          sizes: [...prevcart.sizes, ...action.payload.sizes.filter(s=>s!=" ")],
          colors: [...prevcart.colors, ...action.payload.colors.filter(s=>s!=" ")],
        };
        newState = {
          ...state,
          cart: [
            ...state.cart?.filter?.((r) => r.id != action.payload.id)||{},
            ncart,
          ],
          wishlist: [
            ...state.wishlist?.filter?.((id) => action.payload.id !== id)||{},
          ],
        };
      } else {
        newState = {
          ...state,
          cart: [
            ...state.cart,
            {
              ...action.payload,
              sizes: action.payload.sizes || "",
              colors: action.payload.colors || "",
            },
          ],
        };
      }
      break;

    case "ADD_REVIEW":
      try{
        newState = {
          ...state,
          reviews: [
            ...state.reviews?.filter?.((r) => r.id != action.payload.id),
            action.payload,
          ],
        };
      }catch(err){
        console.log(err)
        newState = {
          ...state
        };
        toast.error("error uploading rating..")
      }
      break;

    case "REMOVE_FROM_CART":
      newState = {
        ...state,
        cart: state.cart?.filter?.((item) => item.id !== action.payload),
      };
      break;

    case "REMOVE_FROM_ORDER":
      newState = {
        ...state,
        orders: state.orders?.filter?.((item) => item.id !== action.payload),
      };
      break;

    case "ADD_TO_WISHLIST":
      newState = {
        ...state,
        wishlist: [
          ...state.wishlist?.filter?.((id) => action.payload !== id),
          action.payload,
        ],
      };
      break;

    case "REMOVE_FROM_WISHLIST":
      newState = {
        ...state,
        wishlist: state.wishlist?.filter?.((item) => item !== action.payload),
      };
      break;

    default:
      newState = state;
      break;
  }
  if(newState.email){
    try{

      // alert("updating")
      updateAccount(newState.email,newState); // Call the external function with the updated state
      // alert("finished updating")
    }catch(err){
      console.log(err)
    }

  }
  return newState; // Return the updated state
};

// Example of the updateAccount function



// Create context
const AccountContext = createContext<{
  account: Account;
  dispatch: Dispatch<AccountAction>;
} | null>(null);



// export const revalidate = 60
// false | 0 | number
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [user,setUser]=useState(initialAccount)
  const [state, dispatch] = useReducer(accountReducer, user);
  useEffect(() => {
    const fetchUser = async () => {
      const localUser = localStorage.getItem("id");
      if (localUser) {
        console.log(localUser)
        const account = await getAccountById(localUser);
        setUser(account || initialAccount);
        dispatch({ type: "SET_ACCOUNT", payload:(account && {...account,isLoaded:true}) || {...initialAccount,isLoaded:true} });
      }
    };
    fetchUser();
  }, []);

  return (
    <html lang="en">
      <body
        className={`md:text-base text:sm antialiased text-text bg-background `}
      >
        <AccountContext.Provider value={{ account: state, dispatch }}>
        <Header />
        <Toaster  />
      {children}
        <Footer />
    </AccountContext.Provider>
      </body>
    </html>
  );
}
// Custom hook to use the Account context
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("useAccount must be used within an AccountProvider");
  return context;
};
