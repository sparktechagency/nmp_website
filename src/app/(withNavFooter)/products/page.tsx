/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import Search from "antd/es/input/Search";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useGetProductsQuery } from "@/redux/features/productsApi/productsApi";
import {
  useGetBrandDropDownQuery,
  useGetCatDropDownQuery,
  useGetFlavourDropDownQuery,
} from "@/redux/features/categoryApi/categoryApi";

// ---------------- Filter Section ----------------
const FilterSection: React.FC<{
  title: string;
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ title, options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleChange = (item: string) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((c) => c !== item) : [...prev, item]
    );
  };

  return (
    <div className="bg-gray-50 rounded-lg shadow-sm border mb-4">
      <div
        className="flex justify-between items-center cursor-pointer mb-3 border-b px-4 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h2 className="text-gray-800 font-bold">{title}</h2>
        {isOpen ? (
          <MdKeyboardArrowUp className="text-xl" />
        ) : (
          <MdKeyboardArrowDown className="text-xl" />
        )}
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 p-4">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                className="accent-blue-500"
                checked={selected.includes(option)}
                onChange={() => handleChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

// ---------------- Main Products Page ----------------
const ProductsPage = () => {
  // filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  // API calls
  const { data: productsData } = useGetProductsQuery(undefined);
  const { data: categoryDropdata } = useGetCatDropDownQuery(undefined);
  const { data: brandData } = useGetBrandDropDownQuery(undefined);
  const { data: flavourdata } = useGetFlavourDropDownQuery(undefined);

  const products = productsData?.data ?? [];
  const categories = categoryDropdata?.data?.map((c: any) => c.name) ?? [];
  const brands = brandData?.data?.map((b: any) => b.name) ?? [];
  const flavours = flavourdata?.data?.map((f: any) => f.name) ?? [];

  // ---------------- Filtering Logic ----------------
  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      const matchesFlavour =
        selectedFlavours.length === 0 ||
        selectedFlavours.includes(product.flavor);

      const matchesSearch =
        searchText === "" ||
        product.name.toLowerCase().includes(searchText.toLowerCase());

      return matchesCategory && matchesBrand && matchesFlavour && matchesSearch;
    });
  }, [products, selectedCategories, selectedBrands, selectedFlavours, searchText]);

  return (
    <div className="container mx-auto my-10">
      <div className="w-full flex justify-start items-start gap-10">
        {/* ---------------- Filters ---------------- */}
        <div className="w-full md:w-[30%]">
          <h1 className="text-lg font-semibold mb-2">Filter By</h1>

          <FilterSection
            title="Category"
            options={categories}
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />

          <FilterSection
            title="Brand"
            options={brands}
            selected={selectedBrands}
            setSelected={setSelectedBrands}
          />

          <FilterSection
            title="Flavour"
            options={flavours}
            selected={selectedFlavours}
            setSelected={setSelectedFlavours}
          />
        </div>

        {/* ---------------- Products ---------------- */}
        <div className="w-full md:w-[70%]">
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="mt-4 md:mt-0">
              <Search
                allowClear
                placeholder="Search products..."
                onSearch={(value) => setSearchText(value)}
                onChange={(e) => setSearchText(e.target.value)}
                enterButton
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <div
                  key={product._id}
                  className="relative bg-white shadow-lg rounded-lg p-4 text-blue-500"
                >
                  {/* Discount */}
                  {product?.discount && product.discount !== "" && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md">
                      {product.discount}%
                    </span>
                  )}

                  {/* Image */}
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

                  {/* Title */}
                  <h1 className="font-bold mt-4 text-blue-500 text-center text-xl my-2">
                    {product.name}
                  </h1>

                  {/* Extra info */}
                  <div className="text-gray-600 text-sm text-center space-y-1">
                    <p>Category: {product.category}</p>
                    <p>Brand: {product.brand}</p>
                    <p>Flavour: {product.flavor}</p>
                    <p>
                      Stock:{" "}
                      <span
                        className={
                          product.stockStatus === "in_stock"
                            ? "text-green-600 font-semibold"
                            : "text-red-500 font-semibold"
                        }
                      >
                        {product.stockStatus}
                      </span>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="flex justify-between items-center gap-5 mt-2">
                    <div className="flex justify-start items-center gap-3">
                      <p className="text-md font-semibold">
                        ${product.currentPrice}
                      </p>
                      {product.originalPrice > 0 && (
                        <p className="text-gray-500 line-through text-sm">
                          ${product.originalPrice}
                        </p>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 text-yellow-500">
                      {[...Array(product.ratings)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      <span className="text-gray-500 text-xs ml-1">
                        ({product.totalReview} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="mt-4 flex justify-between items-center gap-3">
                    <Link href="/cart">
                      <button className="px-4 py-2 border border-blue-500 rounded-md">
                        Add to Cart
                      </button>
                    </Link>
                    <Link href="/checkout">
                      <button className="px-4 py-2 border border-blue-500 rounded-md">
                        Buy Now
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
