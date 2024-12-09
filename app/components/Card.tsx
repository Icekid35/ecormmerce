"use client"
import React, {  memo, MouseEvent } from "react";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faEye,
  faHeart,
  faNairaSign,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
// import { DataContext } from "../controller/state";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: { name: string };
  creationAt: string;
  quantity?: number;
}

interface CardProps {
  product: Product;
  dispatch: React.Dispatch<any>;
  selectedColor?: string;
  selectedSize?: string;
}

export const Card = memo(function Card({
  product,
  dispatch,
  selectedColor,
  selectedSize,
}: CardProps) {
  const { id, images, title, price } = product;

  const addToCart = (product: Product, e: MouseEvent<HTMLDivElement>) => {
    confetti({
      particleCount: 100,
      spread: 10,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      startVelocity: 30,
      shapes: ["star"],
    });

    toast.promise(
      new Promise((resolve, reject) => {
        try {
          dispatch({
            type: "add-to-cart",
            payload: product,
            color: selectedColor,
            size: selectedSize,
          });
          resolve("done");
        } catch {
          reject("error occurred");
        }
      }),
      {
        loading: `Adding ${product.title} to Cart`,
        success: `Added ${product.title} to Cart`,
        error: "Error occurred",
      }
    );
  };

  const addToWishlist = (product: Product, e: MouseEvent<HTMLDivElement>) => {
    confetti({
      particleCount: 50,
      spread: 10,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      startVelocity: 30,
      shapes: ["circle"],
      colors: ["#FF5733"],
    });

    toast.promise(
      new Promise((resolve, reject) => {
        try {
          dispatch({ type: "add-to-wishlist", payload: product });
          resolve("done");
        } catch {
          reject("error occurred");
        }
      }),
      {
        loading: `Adding ${product.title} to Wishlist`,
        success: `Added ${product.title} to Wishlist`,
        error: "Error occurred",
      }
    );
  };

  return (
    <div className="card border rounded-md shadow-sm p-4 relative">
      <div className="relative">
        <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
          Hot
        </span>
        <img
          className="w-full h-40 object-cover rounded-md"
          src={images[0]}
          alt={title}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition">
          <div
            className="p-2 bg-red-500 text-white rounded-full cursor-pointer"
            onClick={(e) => addToWishlist(product, e)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div
            className="p-2 bg-green-500 text-white rounded-full cursor-pointer"
            onClick={(e) => addToCart(product, e)}
          >
            <FontAwesomeIcon icon={faCartPlus} />
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-green-600 font-semibold">
          <FontAwesomeIcon icon={faNairaSign} /> {price}
        </p>
      </div>
    </div>
  );
});

export const ListCard = memo(function ListCard({
  product,
  dispatch,
  selectedColor,
  selectedSize,
}: CardProps) {
  const { id, images, title, price, description } = product;

  const addToCart = (product: Product, e: MouseEvent<HTMLDivElement>) => {
    confetti({
      particleCount: 100,
      spread: 10,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      startVelocity: 30,
      shapes: ["star"],
    });

    toast.promise(
      new Promise((resolve, reject) => {
        try {
          dispatch({
            type: "add-to-cart",
            payload: product,
            color: selectedColor,
            size: selectedSize,
          });
          resolve("done");
        } catch {
          reject("error occurred");
        }
      }),
      {
        loading: `Adding ${product.title} to Cart`,
        success: `Added ${product.title} to Cart`,
        error: "Error occurred",
      }
    );
  };

  return (
    <div className="list-card grid grid-cols-2 gap-4 p-4 border rounded-md shadow-sm">
      <div className="relative">
        <span className="absolute top-2 left-2 bg-gray-700 text-white text-xs px-2 py-1 rounded-full">
          Hot
        </span>
        <img
          className="w-full h-40 object-cover rounded-md"
        //   src={images[0]}
          alt={title}
        />
      </div>
      <div>
        <h3 className="font-bold text-gray-800">{title}</h3>
        <p className="text-green-600 font-semibold">
          <FontAwesomeIcon icon={faNairaSign} /> {price}
        </p>
        <p className="text-gray-500 mt-2">{description}</p>
        <div className="flex items-center justify-between mt-4">
          <div
            className="px-4 py-2 bg-green-500 text-white rounded-full cursor-pointer"
            onClick={(e) => addToCart(product, e)}
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
          </div>
        </div>
      </div>
    </div>
  );
});
