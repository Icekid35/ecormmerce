import { Dispatch } from "react";
import { Account, CartItem } from '../types/account';
// import getProducts from "./products";
import { AccountAction } from "../layout";
import toast from "react-hot-toast";
import { ownerStoreid } from "./owner";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const API_BASE_URL = "/api/account";

/**
 * Fetches all accounts from the API.
 */
export const fetchAllAccounts = async (): Promise<Account[]> => {
  const response = await fetch(API_BASE_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return response.json();
};
// let fetching=false
/**
 * Fetches a specific account by email.
 * @param email - The email of the account to fetch.
 */
export const getAccountById = async (id: string): Promise<Account | null> => {
  //  fetching=true
  const response = await fetch(`${API_BASE_URL}?id=${id}`, {
    method: "GET",
  });

  if (response.status === 404) {
    return null; // Account not found
  }

  if (!response.ok) {
    throw new Error("Failed to fetch account");
  }

  return response.json();
};

/**
 * Signs up a new account.
 * @param name - The name of the user.
 * @param email - The email of the user.
 * @param password - The password for the account.
 */
export const signup = async (name: string, email: string, isgoogle?: boolean, password?: string): Promise<Account> => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, isgoogle,}),
  });

  if (response.status == 400) {
    const error = await response.json();
    throw new Error(error.error || "email already exists");
  }
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to sign up");
  }
  const ans = await response.json()
  localStorage.setItem("id", ans.id)

  return {...ans,isLoaded:true};
};

/**
 * Logs in an account.
 * @param email - The email of the user.
 * @param password - The password for the account.
 */
export const login = async (email: string, isgoogle?: boolean, password?: string): Promise<Account> => {

  const response = await fetch(API_BASE_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, isgoogle }),
  });

  if (response.status === 401) {
    throw new Error("Invalid email or password");
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to log in");
  }

  const ans = await response.json()
  localStorage.setItem("id", ans.id)

  return {...ans,isLoaded:true};

};

/**
 * Deletes an account by ID (optional utility function).
 * @param id - The ID of the account to delete.
 */
export const deleteAccountById = async (id: string): Promise<void> => {
  const response = await fetch(API_BASE_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete account");
  }
  localStorage.clear()

};

let updating = false
export async function updateAccount(
  email: string,
  updates: Partial<Account>,
  toaster?:string
): Promise<Account | { error: string }> {
  const endpoint = "/api/account"; // Replace with the actual API route if different.
  if (updating){
    return { error: "" }}
  updating = true
  if (!email || !updates) {
    throw new Error("Email and updates are required.");
  }
  const toastid=toaster || toast.loading("")

  try {
    
    // const products = await getProducts()
    // alert("doing...")
    const response = await fetch(endpoint, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updates}),
    });
    // alert("done")
    if (!response.ok) {
      const error = await response.json();
      return { error: error.error || "Failed to update the account." };
    }
// console.log("first")
    const updatedAccount = await response.json();
    // console.log("secoun",updatedAccount)
    updating = false
    toast.success("",{id:toastid})
    return updatedAccount;
  } catch (error) {
    toast.error("",{id:toastid})
    // alert("error occured")
    console.error("Error updating account:", error);
    updating = false
    return { error: "An unexpected error occurred." };
  }
}
const adminhost=process.env.NODE_ENV =="production"? "https://iceadmin.vercel.app/api/"+ownerStoreid:"http://localhost:3001/api/"+ownerStoreid

export async function AddOrder(orders: CartItem[], orderId: string, account: Account, dispatch: Dispatch<AccountAction>,router:AppRouterInstance) {
  const toastid=toast.loading("Adding to Que")
  const  orderItems= orders.map(or => { 
    return ({ ...or,id:Date.now().toString(),productId:or.id, isCancellable: false, orderId, placedAt: (new Date(Date.now())), status: "active",sizes:or.sizes ||[],colors:or.colors||[], total: or.price * or.quantity }) }) 

try {
    dispatch({type:"UPDATE_ACCOUNT",payload:{ ...account,
       cart: [], 
       orders:[...account.orders,...orderItems],
       reviews:[...account.reviews,...orders.map(product=> {return({ id:Date.now().toString(),productId:product.id,title:product.title,image:product.image})})],
  }})
  await fetch(`${adminhost}/checkout`,{method:"POST",body:JSON.stringify({
    orders:orderItems,
    phone:account.phone,
    email:account.email,
    address:account.address,
    name:account.name,
  
  })})
  router.push('/ordercompleted?orderid='+orderId)
  toast.success("Added to que",{id:toastid})
} catch (error) {
  console.log(error)
  toast.error("error occured, pls try again",{id:toastid})
}
}

export {updating}