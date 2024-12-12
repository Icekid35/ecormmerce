"use client";
import React, { useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import Button from "../components/button";
import Link from "next/link";
import { signup } from "../controller/account";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function SignupPage() {
  // State for form inputs
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
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
      const register= signup(`${formData.fname.toLowerCase()} ${formData.lname.toLowerCase()}`,formData.email.toLowerCase(),false,formData.password)
      toast.promise(
        register,
        {
          loading: 'Loading',
          success: () => {
            setTimeout(() => {
              
              router.push('/shop')
            }, 1000);
            return `Signup sucessful, Welcome`},
          error: (err) => `${err.toString()}`,
        },
        
      );

    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error creating account");
    }
  };

  const googlesu=(cred:{email:string,name:string})=>{
    try {
      const register= signup(cred.name.toLowerCase(),cred.email.toLowerCase(),true,)
      toast.promise(
        register,
        {
          loading: 'Loading',
          success: () => {
            setTimeout(() => {
              
              router.push('/shop')
            }, 1000);
            return `Signup sucessful, Welcome`},
          error: (err) => `${err.toString()}`,
        },
        
      );

    } catch (error) {
      console.error("Error signing up:", error);
      alert( "Error creating account");
    }
  }
  return (
    <div className="flex gap-x-8 p-10">
            <GoogleOAuthProvider
        clientId={'145842574317-u05jd1fnqru3ogfuc25tgcqh6gp6btv9.apps.googleusercontent.com'}
        onScriptLoadError={() => {
     
        }}
        onScriptLoadSuccess={() => {
        }}
      >
      <div className="w-full min-w-[300px] h-[400px] bg-secondary rounded md:flex hidden"></div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h2 className="text-3xl capitalize font-semibold">Create an account</h2>

        <h3>Enter your details below</h3>
        <input
          type="text"
          name="fname"
          className="outline-none p-2 bg-inherit border-b-2 border-secondary"
          placeholder="First Name"
          value={formData.fname}
          onChange={handleChange}
          required
          minLength={3}
        />
        <input
          type="text"
          name="lname"
          className="outline-none p-2 bg-inherit border-b-2 border-secondary"
          placeholder="Last Name"
          value={formData.lname}
          onChange={handleChange}
          required
          minLength={3}
        />
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
        <Button cta="signup" />
        <div className="text-sm text-secondary text-center capitalize">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Login here
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
              toast.error("Signup Failed");
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

export default SignupPage;
