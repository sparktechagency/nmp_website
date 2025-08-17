/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SectionTitle from "@/components/Shared/SectionTitle";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import { useGetProductsQuery } from "@/redux/features/productsApi/productsApi";
const FeatureProducts = () => {
  const { data: productsData } = useGetProductsQuery(undefined);
  console.log("productsData:", productsData?.data);
  const products = productsData?.data;

  console.log(products);

  return (
    <div className="container mx-auto">
      <SectionTitle heading={"Feature Products"} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {products?.map((product: any) => (
          <div
            key={product._id}
            className="relative bg-white shadow-lg rounded-lg p-4 text-blue-500"
          >
            {product?.discount > 0 && (
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md">
                {product.discount}%
              </span>
            )}

            <Link href={`/products/${product._id}`}>
              <div className="flex justify-center my-3">
                <Image
                  src={product.image}
                  height={200}
                  width={200}
                  alt={product.name}
                  className="rounded-md"
                />
              </div>
            </Link>
            <h1 className="font-bold mt-4 text-blue-500 text-center text-xl my-2">
              {product.name}
            </h1>
            <p className="text-gray-600 text-sm text-center">
              {product.description}
            </p>
            <div className="flex justify-between items-center gap-5 mt-2">
              <div className="flex justify-start items-center gap-3">
                <p className="text-md font-semibold">${product.currentPrice}</p>
                <p className="text-gray-500 line-through text-sm">
                  ${product.originalPrice}
                </p>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(product.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center gap-3">
              <Link href="/cart">
                <button className="px-4 py-2 border border-blue-500 rounded-md ">
                  Add to Cart
                </button>
              </Link>
              <Link href="/cart">
                <button className="px-4 py-2 border border-blue-500 rounded-md ">
                  Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center my-20 text-white">
        <Link href="/products">
          <button className="flex justify-center items-center gap-2 px-4 py-2  bg-orange-400  rounded-md  cursor-pointer">
            See More
            <MdKeyboardDoubleArrowRight className="" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureProducts;
