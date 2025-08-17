"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import Link from "next/link";
import Reviews from "@/components/pages/AboutUs/Reviews";
import { useGetSingleProductQuery } from "@/redux/features/productsApi/productsApi";

const ProductDetails = () => {
  const params = useParams();
  const id = params?.id;

  const { data: singleProduct } = useGetSingleProductQuery(id);

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((prev) => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (!singleProduct?.data) {
    return (
      <div className="container mx-auto my-20 animate-pulse">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[40%] h-96 bg-gray-200 rounded-lg"></div>

          <div className="w-full md:w-[60%] flex flex-col gap-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>{" "}
            <div className="h-6 bg-gray-200 rounded w-1/4"></div> {/* Price */}
            <div className="flex gap-2 mt-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 bg-gray-200 rounded-full"
                  ></div>
                ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>{" "}
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>{" "}
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded mt-2"></div>{" "}
            <div className="flex items-center gap-3 mt-4">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mt-6"></div>{" "}
          </div>
        </div>
      </div>
    );
  }

  const product = singleProduct.data;

  return (
    <div className="container mx-auto my-20">
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-5">
        {/* Product Image */}
        <div className="w-full md:w-[40%]">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-[60%]">
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-xl text-orange-400 mt-2">
            ${product.currentPrice}
            {product.discount && (
              <span className="text-sm line-through text-gray-400 ml-2">
                ${product.originalPrice}
              </span>
            )}
          </p>

          {/* Ratings */}
          <div className="flex items-center gap-2 mt-2">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < product.ratings ? "text-orange-400" : "text-gray-300"
                  }`}
                />
              ))}
            <span className="text-neutral-400">
              {product.totalReview} Reviews
            </span>
          </div>

          {/* Product Details */}
          <div className="mt-4">
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Flavor:</strong> {product.flavor}
            </p>
            <p
              className="mt-2"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <p className="mt-2">
              <strong>Stock Status:</strong>{" "}
              <span
                className={`${
                  product.stockStatus === "in_stock"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {product.stockStatus.replace("_", " ")}
              </span>
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4">
            <h2 className="mb-2 font-semibold">Quantity</h2>
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

      {/* Reviews Section */}
      <Reviews />
    </div>
  );
};

export default ProductDetails;
