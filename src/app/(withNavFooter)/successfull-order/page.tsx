"use client";

import { useRouter} from "next/navigation";
import Link from "next/link";
import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
const SuccessfullOrder = () => {
  const token = localStorage.getItem("token");
  const router = useRouter();

  const handleShowOrder = () => {
    if (token) {
      router.push("/orders");
    } else {
      router.push("/sign-in");
    }
  };





  return (
    <div className="container mx-auto my-20 min-h-screen px-2">
      <div className="flex flex-col justify-center items-center gap-3">
        <FaRegCheckCircle className="h-40 w-40 text-green-500" />
        <h1 className="text-4xl font-bold my-3">Order Successful!</h1>
        <p className="text-neutral-700">
          Thank you for your Order. Your order has been received.
        </p>
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 ">
          <div className="text-white">
            <Link href="/">
              <button className= "w-52 px-6 py-3 font-bold text-2xl bg-[#3f67bc] rounded-md">
                Go to Homepage
              </button>
            </Link>
          </div>
          <button
            onClick={handleShowOrder}
            className="w-52 border px-6 py-3 rounded-md"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullOrder;
