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
  useGetCatDropDownQuery,
  useGetFilterDropdownByIdQuery,
} from "@/redux/features/categoryApi/categoryApi";
import { Pagination, ConfigProvider } from "antd";
import { useParams } from "next/navigation";

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
    <div className="bg-gray-50 rounded-lg shadow-sm border border-neutral-200 mb-4">
      <div
        className="flex justify-between items-center cursor-pointer mb-3 border-b border-neutral-200 px-4 py-2"
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

const SelectedType = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFlavours, setSelectedFlavours] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [pageSize, setPageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useParams();
  const id = params.id;
  console.log("id from selected type", id);

  const { data: productsData, isLoading } = useGetProductsQuery({
    page: currentPage,
    limit: pageSize,
    searchTerm: searchText,
    id: id,
  });

  const { data: categoryDropdata } = useGetCatDropDownQuery(undefined);

  const { data: filterData } = useGetFilterDropdownByIdQuery(id);
  console.log("filterData from selected type", filterData?.data);
  const products = productsData?.data ?? [];
  const total = productsData?.meta?.total ?? 0;
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const categories = categoryDropdata?.data?.map((c: any) => c.name) ?? [];

  const filteredProducts = useMemo(() => {
    return products.filter((product: any) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);

      const matchesBrand =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);

      const matchesFlavour =
        selectedFlavours.length === 0 ||
        selectedFlavours.includes(product.flavor);

      const matchesSearch =
        searchText === "" ||
        product.name.toLowerCase().includes(searchText.toLowerCase());

      return matchesCategory && matchesBrand && matchesFlavour && matchesSearch;
    });
  }, [
    products,
    selectedCategories,
    selectedBrands,
    selectedFlavours,
    searchText,
  ]);

  return (
    <div className="container mx-auto my-10 min-h-screen">
      <div className="w-full flex flex-col md:flex-row justify-start items-start gap-10 px-2 md:px-0 ">
        <div className="w-full md:w-[20%]">
          <h1 className="text-lg font-semibold mb-2">Filter By</h1>

          {filterData?.data?.categoryDropDown?.length > 0 && (
            <FilterSection
              title="Category"
              options={filterData.data.categoryDropDown.map((b: any) => b.name)}
              selected={selectedBrands}
              setSelected={setSelectedBrands}
            />
          )}
          {filterData?.data?.brandDropDown?.length > 0 && (
            <FilterSection
              title="Brand"
              options={filterData.data.brandDropDown.map((b: any) => b.name)}
              selected={selectedBrands}
              setSelected={setSelectedBrands}
            />
          )}

          {filterData?.data?.flavorDropDown?.length > 0 && (
            <FilterSection
              title="Flavour"
              options={filterData.data.flavorDropDown.map((f: any) => f.name)}
              selected={selectedFlavours}
              setSelected={setSelectedFlavours}
            />
          )}
        </div>

        <div className="w-full md:w-[80%]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <h1 className="text-2xl font-bold">Selected product</h1>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 justify-center items-center">
            {isLoading ? (
              <p className="text-gray-500">Loading...</p>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => (
                <div
                  key={product._id}
                  className="relative bg-white shadow-lg rounded-lg p-4 text-blue-500"
                >
                  {product?.discount && product.discount !== "" && (
                    <span className="absolute top-5 left-10 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md">
                      {product.discount}
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

                  <div className="text-gray-600 text-sm text-center space-y-1 h-20">
                    <p>Category: {product.category}</p>
                    <p>Brand: {product.brand}</p>
                    <p>Flavour: {product.flavor}</p>
                  </div>

                  <div className=" flex justify-between items-baseline p-2 mt-5">
                    <div className=" flex gap-3 items-baseline">
                      <p className="text-lg font-semibold">
                        ${product.currentPrice}
                      </p>
                      {product.originalPrice > 0 && (
                        <p className="text-gray-500 line-through text-sm">
                          ${product.originalPrice}
                        </p>
                      )}
                    </div>

                    <div className=" flex items-baseline gap-1 text-yellow-500">
                      {[...Array(Math.floor(product?.ratings ?? 0))].map(
                        (_, i) => (
                          <FaStar key={i} />
                        )
                      )}
                      <span className="text-gray-500 text-sm ml-1">
                        ({product.totalReview} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products found</p>
            )}
          </div>

          <div className="flex justify-center items-center my-6">
            <ConfigProvider
              theme={{
                components: {
                  Pagination: {
                    itemActiveBg: "rgb(105,112,77)",
                    colorPrimary: "rgb(255,255,255)",
                    colorPrimaryHover: "rgb(255,255,255)",
                  },
                },
              }}
            >
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={total}
                onChange={handlePageChange}
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedType;
