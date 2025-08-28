/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import SectionTitle from "@/components/Shared/SectionTitle";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Link from "next/link";
import { useGetFeatureProductsQuery } from "@/redux/features/productsApi/productsApi";
import { useAddToCartMutation } from "@/redux/features/cartApi/cartApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const FeatureProducts = () => {
  const { data: productsData } = useGetFeatureProductsQuery(undefined);
  const products = productsData?.data || [];
  const [addToCart] = useAddToCartMutation();
  const router = useRouter();

  const handleAddToCart = async (productId: string) => {
    try {
      const payload = {
        productId,
        quantity: 1,
      };
      const res = await addToCart(payload).unwrap();
      toast.success(res?.message || "Added to cart!");
      router.push("/cart");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="container mx-auto">
      <SectionTitle heading={"Featured Products"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
        {products.map((product: any) => (
          <div
            key={product._id}
            className="group relative bg-white shadow-lg rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            {/* Discount Badge */}
            {product?.discount > 0 && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md">
                -{product.discount}%
              </span>
            )}

            {/* Product Image */}
            <Link href={`/products/${product._id}`}>
              <div className="flex justify-center my-4">
                <Image
                  src={product.image}
                  height={220}
                  width={220}
                  alt={product.name}
                  className="rounded-lg group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Link>

            {/* Product Info */}
            <div className="text-center">
              <h2 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">
                {product.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {product.brand} • {product.category}
              </p>
              {product.flavor && (
                <p className="text-sm text-gray-400">Flavor: {product.flavor}</p>
              )}
            </div>

            {/* Price + Ratings */}
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <p className="text-lg font-bold text-blue-600">
                  ${product.currentPrice}
                </p>
                {product.originalPrice > 0 && (
                  <p className="text-gray-400 line-through text-sm">
                    ${product.originalPrice}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < product.ratings ? "fill-current" : "opacity-30"
                    }
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.totalReview})
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <p
              className={`mt-2 text-xs font-semibold ${
                product.stockStatus === "in_stock"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {product.stockStatus === "in_stock" ? "In Stock" : "Out of Stock"}
            </p>

            {/* Action Buttons */}
            <div className="mt-5 flex justify-between gap-3 text-blue-500">
              <button
                onClick={() => handleAddToCart(product._id)}
                disabled={product.stockStatus !== "in_stock"}
                className="cursor-pointer px-4 py-2 border border-blue-500 text-white rounded-md transition disabled:opacity-50"
              >
                Add to Cart
              </button>
              <Link href={`/products/${product._id}`}>
                <button className="cursor-pointer w-full px-4 py-2 border border-blue-500 rounded-md hover:bg-gray-100 transition">
                  Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center my-16 text-white ">
        <Link href="/products">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#ff8904] rounded-md hover:bg-orange-600 transition shadow-md">
            See More
            <MdKeyboardDoubleArrowRight className="text-xl" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeatureProducts;
