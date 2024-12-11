"use client"
import Button from '@/app/components/button';
import { useAccount } from '@/app/layout';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

function Page() {
  const { account,dispatch } = useAccount();
  const [rating,setRating]=useState([{id:"",rating:0}])

  return (
    <div className='flex flex-col w-full'>
    <h2 className='font-semibold capitalize'>Pending Reviews</h2>
<div className='flex flex-col p-4 w-full gap-4'>
    {account.reviews.filter(r=>r.rating).length>0 ? account.reviews.filter(r=>!r.rating).reverse().map(product=>{

        return(
            <div key={product.id} className='rounded w-full flex align-middle items-center  justify-between p-4 bg-white shadow-lg'>
               <div className='flex gap-2 items-center '> 
                <div className='w-[50px] h-[50px] bg-slate-500 rounded'></div>
                <div className='text-sm'>{product.title}</div>
                </div>
                <div className="flex justify-center items-center space-x-1 text-yellow-500">
    {Array.from({ length: 5 }, (_, i) =>{ 
      
      return(
      <i
        key={i}
        onClick={()=>{
          setRating([...rating.filter(r=>r.id !=product.id),{id:product.id,rating:i+1}])}}
        style={{transition:`all ${i*0.3}s ease-out  ${i*0.1}s`}}
        className={`fas fa-star  cursor-pointer ${i < (rating.find(({id})=>id==product.id)?.rating || 0) ? "text-yellow-500" : "text-gray-300"
          }`}
      ></i>
    )})}
  </div>
   <Button cta='Upload review' disabled={!rating.find(({id})=>id==product.id)} action={()=>{
    if(!rating.find(({id})=>id==product.id)?.rating) return toast.error('Please click a star to review')
    dispatch({ type: "ADD_REVIEW", payload:{...product,rating:(rating.find(({id})=>id==product.id)?.rating)} });
   toast.success("Thanks for the review")
   }}/>
            </div>
        )
    }): <div className='grid p-4 auto-cols-auto  grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full'>
    <div className='text-center text-2xl capitalize p-4'> Nothing to see here</div>
    
    </div> }
</div>
    <h2 className='font-semibold capitalize my-4'> Past reviews</h2>
{/* <div className='grid p-4 auto-cols-auto  grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full'>
<div className='text-center text-2xl capitalize p-4'> Nothing to see here</div>

</div> */}
  <div className='flex flex-col p-4 w-full gap-4'>
  {account.reviews.filter(r=>r.rating).length>0 ?account.reviews.filter(r=>r.rating).reverse().map(product=>{

        return(
            <div key={product.id} className='rounded w-full flex align-middle items-center  justify-between p-4 bg-white shadow-lg'>
               <div className='flex gap-2 items-center '> 
                <div className='w-[50px] h-[50px] bg-slate-500 rounded'></div>
                <div className='text-sm'>{product.title}</div>
                </div>
                <div className="flex justify-center items-center space-x-1 text-yellow-500">
    {Array.from({ length: 5 }, (_, i) =>{ 
      
      return(
      <i
        key={i}
        style={{transition:`all ${i*0.3}s ease-out  ${i*0.1}s`}}
        className={`fas fa-star  cursor-pointer ${product.rating && i < product.rating ? "text-yellow-500" : "text-gray-300"
          }`}
      ></i>
    )})}
  </div>
            </div>
        )
    }): <div className='grid p-4 auto-cols-auto  md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] w-full'>
    <div className='text-center text-2xl capitalize p-4'> Nothing to see here</div>
    
    </div> }
</div>
</div>
  )
}

export default Page