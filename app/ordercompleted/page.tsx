"use client"
import React, { Suspense } from 'react';
import Button from '../components/button';
import Link from 'next/link';
import {  useSearchParams } from 'next/navigation';

const Completed: React.FC = () => {

  const [router] = useSearchParams();
  const orderid  = router[1]; // Extract orderId from the query
// console.log(router)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="max-w-xl text-center bg-accent shadow-shadow shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-text mb-4">Order Completed!</h1>
        <p className="text-text mb-6">
          Thank you for your purchase! Your order has been placed successfully.Our agent will reachout to you soon via whatsapp
        </p>
        <div className='capitalize w-full text-left'>your orderID: {orderid}</div>
        <div className="flex justify-center gap-4 mt-6">
          <Link
          href={'/account/orders'}
            className="bg-accent text-text px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            View Orders
          </Link>
          <Button
            link="/shop"
            cta=" Continue Shopping"
          />
           
          
        </div>
      </div>
      {/* <div className="mt-8">
        <img
          src="/order-completed.svg" 
          alt="Order Completed"
          className="max-w-md"
        />
      </div> */}
    </div>
  );
};

function OrderCompleted() {
  return (
<>

   <Suspense>
      <Completed />
    </Suspense>
</> 
  )
}
export default OrderCompleted;
