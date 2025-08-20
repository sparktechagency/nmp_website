/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useDeleteCartMutation,
  useGetCartQuery,
  useUpdateCartMutation,
} from "@/redux/features/cartApi/cartApi";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";

const CartPage = () => {
  const { data: cartData, isLoading } = useGetCartQuery(undefined);
  const cartItems = cartData?.data || [];
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const router = useRouter();

  // Calculate totals
  const totalQuantity = cartItems.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (sum: number, item: any) => sum + item.total,
    0
  );

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteCart({ _id: id }).unwrap();
          toast.success(res?.message || "Item removed from cart");
          Swal.fire("Deleted!", "The item has been removed.", "success");
        } catch (error: any) {
          toast.error(error?.data?.message || "Failed to remove item");
        }
      }
    });
  };

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
      const data = { quantity: newQty };
      await updateCart({ _id: id, data }).unwrap();
      toast.success("Cart updated successfully");
    } catch (error) {
      toast.error("Failed to update cart");
    }
  };

  const handleCheckout = () => {
    // send total + quantity + price to checkout page
    router.push(`/checkout?total=${totalPrice}&quantity=${totalQuantity}`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-5 text-center">
        <p>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5">
      <div className="flex justify-between items-center my-5">
        <h1 className="text-lg font-bold">Your Cart</h1>
        <p className="text-gray-600 font-bold">{cartItems.length} Items</p>
      </div>

      {/* Header Row */}
      <div className="grid grid-cols-3 md:grid-cols-5 text-gray-400 font-medium border-b border-b-gray-400 pb-2 mb-3">
        <p>Products</p>
        <p className="text-center">Quantity</p>
        <p className="hidden md:block text-right col-span-2">Price</p>
        <p className="text-center">Action</p>
      </div>

      {/* Cart Items */}
      {cartItems.map((item: any) => (
        <div
          key={item._id}
          className="md:grid grid-cols-3 md:grid-cols-5 md:items-center gap-4 border-b border-b-gray-400 py-4"
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

          {/* Delete Button */}
          <div className="flex justify-center">
            <button
              onClick={() => handleDelete(item._id)}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash />
            </button>
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

        <button
          onClick={handleCheckout}
          className="bg-[#3f67bc] px-6 py-2 rounded-lg text-white"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
