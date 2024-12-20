"use client";
import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import Button from "../components/button";
import Link from "next/link";
import { login} from "../controller/account";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAccount } from "../layout";
import loginIcon from "../asset/login.svg";

import { config } from "dotenv";
import Image from "next/image";
config()

function LoginPage() {
  // State for form inputs
  const {dispatch}=useAccount()
  const [formData, setFormData] = useState({

    email: "",
    password: "",
  });
  const router=useRouter()

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const register= login(formData.email.toLowerCase(),false,formData.password)
      toast.promise(
        register,
        {
          loading: 'Loading',
          success: (acc) => {

            dispatch({type:"SET_ACCOUNT",payload:acc})
            setTimeout(() => {
              
              router.push('/shop')
            }, 1000);
            
            return `Login sucessful, Welcome`},
          error: (err) => ` ${err.toString()}`,
        },
        
      );

    } catch (error) {
      console.error("Error signing up:", error);
      alert(error || "Error creating account");
    }
  };

  const googlesu=(cred:{email:string,name:string})=>{
    try {
      const register= login(cred.email.toLowerCase(),true)
      toast.promise(
        register,
        {
          loading: 'Loading',
          success: (acc) => {
            dispatch({type:"SET_ACCOUNT",payload:acc})
            setTimeout(() => {
              
              router.push('/shop')
            }, 1000);
            return `Login sucessful, Welcome`},
          error: (err) => `${err.toString()}`,
        },
        
      );

    } catch (error) {
      console.error("Error signing up:", error);
      alert(error || "Error creating account");
    }
  }
  return (
    <div className="flex gap-x-8 p-10">
            <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENTID||""}
        onScriptLoadError={() => {
     
        }}
        onScriptLoadSuccess={() => {
        }}
      >
      <div className="w-full min-w-[300px] h-[400px]  rounded md:flex hidden">
      <Image alt="signup" src={loginIcon}/>

      </div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h2 className="text-3xl capitalize font-semibold">Welcome Back</h2>

        <h3>Enter your details below</h3>

        <input
          type="email"
          name="email"
          className="outline-none p-2 bg-inherit border-b-2 border-secondary"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="outline-none p-2 bg-inherit border-b-2 border-secondary"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={3}
        />
        <Button cta="Login" />
        <div className="text-sm text-secondary text-center capitalize">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary">
            Signup here
          </Link>
        </div>
        <div className="flex justify-center font-bold">OR</div>
        <div className="flex justify-center ">
        <GoogleLogin
            onSuccess={(credentialResponse) => {
              if(credentialResponse?.credential){
                googlesu(jwtDecode(credentialResponse?.credential))
                console.log(jwtDecode(credentialResponse?.credential));
                // signin(jwtDecode(credentialResponse.credential))
                // toast.success("Login sucessful");
              }

            }}
            onError={() => {
              console.log("Login Failed");
              toast.error("login failed");
            }}
                      useOneTap
                      size="large"
                      auto_select
                      theme="outline"
                      // width="300"
                      width={300}

          />
        </div>
      </form>
      </GoogleOAuthProvider>
    </div>
  );
}

export default LoginPage;
