/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useGetCatDropDownQuery } from "@/redux/features/categoryApi/categoryApi";
import React, { useState, useEffect } from "react";

const CategoryPage = () => {
  const { data: categoryData } = useGetCatDropDownQuery(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  // Set default selected category
  useEffect(() => {
    if (categoryData?.data?.length) {
      setSelectedCategory(categoryData.data[0].name);
      setProducts(categoryData.data[0].products || []);
    }
  }, [categoryData]);

  // Update products when category changes
  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category.name);
    setProducts(category.products || []);
  };

  return (
    <div className="container mx-auto my-16">
      {/* Category Buttons */}
      <div className="flex flex-wrap justify-start items-center gap-5 mb-6">
        {categoryData?.data?.map((item: any) => (
          <button
            key={item._id}
            className={`px-4 py-2 rounded ${
              selectedCategory === item.name
                ? "text-orange-400 border-b-2 border-orange-400"
                : "text-black"
            }`}
            onClick={() => handleCategoryClick(item)}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Products */}
      {products?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product.id}
              className="relative bg-white shadow-lg rounded-lg p-4 text-blue-500"
            >
              <div className="flex justify-center my-3">
                <Image
                  src={product.image}
                  height={200}
                  width={200}
                  alt={product.name}
                  className="rounded-md"
                />
              </div>

              <h1 className="font-bold mt-4 text-blue-500 text-center text-xl my-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-sm text-center">
                {product.description}
              </p>

              <div className="flex justify-between items-center gap-5 mt-2">
                <div className="flex justify-start items-center gap-3">
                  <p className="text-md font-semibold">${product.price}</p>
                  {product.originalPrice && (
                    <p className="text-gray-500 line-through text-sm">
                      ${product.originalPrice}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  {[...Array(product.rating)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center gap-3">
                <button className="px-4 py-2 border border-blue-500 rounded-md">
                  Add to Cart
                </button>
                <button className="px-4 py-2 border border-blue-500 rounded-md">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-10">
          No products found for "{selectedCategory}"
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
