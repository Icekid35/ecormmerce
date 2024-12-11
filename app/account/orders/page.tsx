"use client"
import  { OrderProductCard } from '@/app/components/ProductCard';
import React from 'react'
import { useAccount } from '@/app/layout';


function Page() {
  const { account,dispatch } = useAccount();
 const activeOrders=account.orders.filter(order=>order.status=="active")
 const deliveredOrders=account.orders.filter(order=>order.status=="delivered")
  return (
    <div className='flex flex-col w-full'>
        <h2 className='font-semibold capitalize'>pending Orders</h2>
    <div className='grid md:p-4 p-1  auto-cols-auto justify-start md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] w-full'>
 {activeOrders.filter(ord=>ord.isCancellable).length>0 ? activeOrders.filter(ord=>ord.isCancellable).map(product=>{
    return(
        <OrderProductCard key={product.id} {...product} onDelete={()=>{
          dispatch({ type: "REMOVE_FROM_ORDER", payload:product.id });

        }}  />
    )
 }):
 <div className='text-center text-2xl capitalize p-4'> Nothing to see here</div>

}
    </div>
        <h2 className='font-semibold capitalize'>Active Orders</h2>
    <div className='grid md:p-4 p-1  auto-cols-auto  md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] w-full'>
 {activeOrders.filter(ord=>!ord.isCancellable).length>0 ? activeOrders.filter(ord=>!ord.isCancellable).map(product=>{
    return(
        <OrderProductCard key={product.id} {...product} />
    )
 }):
 <div className='text-center text-2xl capitalize p-4'> Nothing to see here</div>

}
    </div>
        <h2 className='font-semibold capitalize my-4'>fulfilled Orders</h2>
        <div className='grid md:p-4 p-1 auto-cols-auto  md:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] w-full'>
 {deliveredOrders.length>0 ? deliveredOrders.map(product=>{
    return(
        <OrderProductCard key={product.id} {...product} />
    )
 }):
 <div className='text-center text-2xl capitalize p-4'> Nothing to see here</div>

}
    </div>
   
    </div>
  )
}

export default Page