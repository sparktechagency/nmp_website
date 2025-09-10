/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { useVerifySessionQuery } from "@/redux/features/ordersApi/ordersApi";
import Link from "next/link";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const OrderConfirmedPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data: sessionData, isLoading } = useVerifySessionQuery(
    { session: sessionId },
    { skip: !sessionId }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!sessionData?.success) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-500">
        <h1 className="text-2xl font-bold">Payment Verification Failed!</h1>
        <Link href="/">
          <button className="mt-5 px-6 py-3 bg-gray-700 text-white rounded-md">
            Back to Homepage
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto my-20 min-h-screen">
      <div className="flex md:flex-col justify-center items-center gap-3">
        <FaRegCheckCircle className="h-40 w-40 text-green-500" />
        <h1 className="text-4xl font-bold my-3">Payment Successful!</h1>
        <p className="text-neutral-700">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="flex justify-between items-center gap-5 ">
          <div className="text-white">
            <Link href="/">
              <button className="px-6 py-3 font-bold text-2xl bg-[#3f67bc] rounded-md">
                Go to Homepage
              </button>
            </Link>
          </div>
          <Link href="/orders">
            <button className="border px-6 py-3 rounded-md">View Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmedPage;
