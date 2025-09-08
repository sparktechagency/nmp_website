"use client";
import SectionTitle from "@/components/Shared/SectionTitle";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useGetProductTypeQuery } from "@/redux/features/productsApi/productsApi";
import React from "react";

const ProductType = () => {
  const { data: typeData, isLoading } = useGetProductTypeQuery(undefined);

  // Skeleton Card
  const SkeletonCard = () => (
    <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center animate-pulse">
      <div className="w-20 h-20 bg-gray-300 rounded-full mb-4"></div>
      <div className="h-6 w-32 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 w-24 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="min-h-screen  bg-gray-100 flex flex-col items-center py-10">
      <div className="container mx-auto">
        <SectionTitle heading="Select Product Type"></SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full px-4 md:px-0">
          {isLoading
            ? // Show 3 skeleton cards while loading
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))
            : typeData?.data?.map((type: any) => (
                <div
                  key={type._id}
                  className="cursor-pointer bg-white shadow-lg rounded-xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <span className="text-xl font-semibold text-indigo-600">
                      {type.name[0]}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {type.name}
                  </h2>
                  <p className="text-gray-500 text-sm mt-2">Click to select</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default ProductType;
