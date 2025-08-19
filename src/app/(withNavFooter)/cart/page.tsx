/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/redux/features/cartApi/cartApi";
import toast from "react-hot-toast";

const CartPage = () => {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const cartItems = cartData?.data || []; // API response items
  const [updateCart] = useUpdateCartMutation();

  if (isLoading) {
    return (
      <div className="container mx-auto p-5 text-center">
        <p>Loading your cart...</p>
      </div>
    );
  }

  const updateQuantity = async (
    id: string,
    type: "increase" | "decrease",
    currentQty: number
  ) => {
    const newQty = type === "increase" ? currentQty + 1 : currentQty - 1;

    if (newQty < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    try {
      const data = {
        quantity: newQty,
      };

      await updateCart({ _id: id, data }).unwrap();
      toast.success("Cart updated successfully");
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error("Failed to update cart");
    }
  };

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-lg font-bold">Your Cart</h1>
        <p className="text-gray-600 font-bold">{cartItems.length} Items</p>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-3 md:grid-cols-4 text-gray-400 font-medium border-b border-b-gray-400 pb-2 mb-3">
        <p>Products</p>
        <p className="text-center">Quantity</p>
        <p className="hidden md:block text-right col-span-2">Price</p>
      </div>

      {/* Cart Items */}
      {cartItems.map((item: any) => (
        <div
          key={item._id}
          className="md:grid grid-cols-3 md:grid-cols-4 md:items-center gap-4 border-b border-b-gray-400 py-4"
        >
          {/* Product Info */}
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
              </div>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex md:items-center justify-center gap-2">
            <button
              onClick={() =>
                updateQuantity(item._id, "decrease", item.quantity)
              }
              className="border px-2"
            >
              −
            </button>
            <span className="border px-3 py-1">{item.quantity}</span>
            <button
              onClick={() =>
                updateQuantity(item._id, "increase", item.quantity)
              }
              className="border px-2"
            >
              +
            </button>
          </div>

          {/* Price */}
          <div className="hidden md:block col-span-2 text-right font-medium">
            ${item.total}
          </div>
        </div>
      ))}

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        <Link href="/categories">
          <button className="text-[#3f67bc] font-bold">
            ← Continue shopping
          </button>
        </Link>
        <Link href="/checkout">
          <button className="bg-[#3f67bc] px-6 py-2 rounded-lg text-white">
            Checkout
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
