/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import image from "../../../assets/image/Rectangle 161.png";
import Link from "next/link";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "GEEK VAPE H1 POD KIT 1000 MAH",
      price: 190,
      oldPrice: 255,
      quantity: 1,
      image: image, // replace with your actual image path
    },
    {
      id: 2,
      name: "GEEK VAPE H1 POD KIT 1000 MAH",
      price: 190,
      oldPrice: 255,
      quantity: 1,
      image: image,
    },
    {
      id: 3,
      name: "GEEK VAPE H1 POD KIT 1000 MAH",
      price: 190,
      oldPrice: 255,
      quantity: 1,
      image: image,
    },
  ]);

  const updateQuantity = (id: any, type: any) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  return (
    <div className="container mx-auto p-5 ">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-lg font-bold">Your Cart</h1>
        <p className="text-gray-600 font-bold">{cartItems.length} Items</p>
      </div>

      <div className="grid  grid-cols-3 md:grid-cols-4 text-gray-400 font-medium border-b border-b-gray-400 pb-2 mb-3">
        <p>Products</p>
        <p className="text-center">Quantity</p>
        <p className="hidden md:block text-right col-span-2">Price</p>
      </div>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="md:grid grid-cols-3 md:grid-cols-4 md:items-center gap-4 border-b border-b-gray-400 py-4"
        >
          <div className="flex items-center gap-3">
            <Image
              src={item.image}
              alt={item.name}
              width={60}
              height={60}
              className="rounded"
            />
            <div>
              <p className="font-medium">{item.name}</p>
              <div className="flex gap-2 items-center">
                <span className="text-orange-500 font-semibold">
                  ${item.price}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${item.oldPrice}
                </span>
              </div>
            </div>
          </div>

          <div className="flex md:items-center justify-center gap-2">
            <button
              onClick={() => updateQuantity(item.id, "decrease")}
              className="border px-2"
            >
              −
            </button>
            <span className="border px-3 py-1">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, "increase")}
              className="border px-2"
            >
              +
            </button>
          </div>

          <div className="hidden md:block col-span-2 text-right font-medium">
            ${item.price}
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center mt-5">
        <Link href="/categories">
          <div className="text-[#3f67bc] font-bold">
            <button className=" ">← Continue shopping</button>
          </div>
        </Link>
        <Link href="/checkout">
          <div className="text-white">
            <button className="bg-[#3f67bc] px-6 py-2 rounded-lg">
              Checkout
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
