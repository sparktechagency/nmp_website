"use client";

import Link from "next/link";
import { FaCircleXmark } from "react-icons/fa6";

const Cancel = () => {
  return (
    <div className="container mx-auto my-20 min-h-screen">
      <div className="flex md:flex-col justify-center items-center gap-3 text-center">
        <FaCircleXmark className="h-40 w-40 text-red-500" />
        <h1 className="text-4xl font-bold my-3 text-gray-800">
          Payment Cancelled
        </h1>
        <p className="text-neutral-700 max-w-md">
          Your payment was cancelled. Don’t worry — no money has been deducted.  
          You can try again or return to the homepage.
        </p>

        <div className="flex justify-between items-center gap-5 mt-5">
          <div className="text-white">
            <Link href="/">
              <button className="px-6 py-3 font-bold text-2xl bg-[#3f67bc] rounded-md">
                Go to Homepage
              </button>
            </Link>
          </div>

          <Link href="/checkout">
            <button className="border px-6 py-3 rounded-md text-gray-800">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
