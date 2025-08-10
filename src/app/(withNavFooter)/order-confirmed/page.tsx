import Link from "next/link";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";

const OrderConfirmedPage = () => {
  return (
    <div className="container mx-auto my-20">
      <div className="flex md:flex-col justify-center items-center gap-3">
        <FaRegCheckCircle className="h-40 w-40 text-green-500" />
        <h1 className="text-4xl font-bold my-3">Payment Successful!</h1>
        <p className="text-neutral-700">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="flex justify-between items-center gap-5 ">
          <div className="text-white">
            <Link href="/">
              <button className="px-6 py-3 font-bold text-2xl bg-[#3f67bc]   rounded-md">
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
