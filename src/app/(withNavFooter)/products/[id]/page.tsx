"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import image from "../../../../assets/image/Rectangle 161.png";
import { FaStar } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import Link from "next/link";

const ProductDetails = () => {
  const params = useParams();
  const id = params?.id;
  console.log("id", id);

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <div className="container mx-auto my-20">
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-5">
        {/* Product Image */}
        <div className="w-full md:w-[40%]">
          <Image src={image} alt="image" width={400} height={400} />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-[60%]">
          <h1 className="text-4xl">Socialities Mango-20mg/ml nicotine</h1>
          <p className="text-orange-400 text-xl">$190</p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Array(5)
              .fill((null))
              .map((_, i) => (
                <FaStar key={i} className="text-orange-400" />
              ))}
            <h1 className="text-neutral-400">5 Reviews</h1>
          </div>

          {/* Description */}
          <p className="pt-5">
            Premium build quality with a powerful battery and advanced
            temperature control features.
          </p>

          {/* Quantity */}
          <div className="mt-4">
            <h1 className="mb-2">QTY</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="min-w-[30px] text-center">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="mt-10">
            <Link href="/cart">
              <button className="flex justify-center items-center gap-2 bg-blue-100 px-4 py-2 text-blue-600 hover:bg-blue-200 rounded">
                Add to cart <IoIosCart />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
