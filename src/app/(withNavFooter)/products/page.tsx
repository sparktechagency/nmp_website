"use client";
import Search from "antd/es/input/Search";
import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import product from "../../../assets/image/Rectangle 161.png";
import { Dropdown, Select } from "antd";
import Link from "next/link";
const ProductsPage = () => {
  const products = [
    {
      id: 1,
      name: "GeekVape",
      description:
        "Sleek design, powerful performance, and unmatched flavor delivery — perfect for everyday vaping.",
      price: 190,
      originalPrice: 255,
      discount: "50% OFF",
      rating: 5,
      image: product,
    },
    {
      id: 2,
      name: "VapeMaster Pro",
      description:
        "Advanced chipset with adjustable airflow, providing a smooth and customizable vaping experience.",
      price: 220,
      originalPrice: 300,
      discount: "27% OFF",
      rating: 4,
      image: product,
    },
    {
      id: 3,
      name: "CloudChaser X",
      description:
        "Designed for cloud enthusiasts, delivering massive vapor output with a sleek ergonomic body.",
      price: 180,
      originalPrice: 250,
      discount: "28% OFF",
      rating: 4,
      image: product,
    },
    {
      id: 4,
      name: "NanoVape",
      description:
        "Compact and portable, perfect for on-the-go vaping without sacrificing power or flavor.",
      price: 150,
      originalPrice: 200,
      discount: "25% OFF",
      rating: 3,
      image: product,
    },
    {
      id: 5,
      name: "VaporKing Elite",
      description:
        "Premium build quality with a powerful battery and advanced temperature control features.",
      price: 300,
      originalPrice: 375,
      discount: "20% OFF",
      rating: 5,
      image: product,
    },
    {
      id: 6,
      name: "VaporKing Elite",
      description:
        "Premium build quality with a powerful battery and advanced temperature control features.",
      price: 300,
      originalPrice: 375,
      discount: "20% OFF",
      rating: 5,
      image: product,
    },
  ];
  const { Option } = Select;
  return (
    <div className="container mx-auto my-10">
      <div className=" w-full flex justify-start items-start gap-10">
        <div className=" w-full md:w-[30%]">
          <h1>Filter By</h1>

          <div style={{ width: "100%" }}>
            <Select
              mode="multiple"
              placeholder="Select Brand(s)"
              defaultOpen
              style={{ width: "100%" }}
              dropdownStyle={{ maxHeight: 240, overflowY: "auto" }}
              onChange={(values) => console.log("Selected brands:", values)}
            >
              {/* List your brands here */}
              <Option value="geekvape">Geek Vape</Option>
              <Option value="vaporesso">Vaporesso</Option>
              <Option value="smok">SMOK</Option>
              <Option value="uwell">Uwell</Option>
              <Option value="smok2">SMOK2</Option>
              <Option value="smok3">SMOK3</Option>
              <Option value="smok4">SMOK4</Option>
              <Option value="smok5">SMOK5</Option>
              {/* add more brands */}
            </Select>
          </div>
        </div>
        <div className=" w-full md:w-[70%]">
          <div className="flex justify-between items-center gap-5">
            <h1>All Products</h1>
            <div className="mt-4 md:mt-0">
              <Search
                allowClear
                placeholder="input search text"
                // onSearch={onSearch}
                enterButton
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative bg-white shadow-lg rounded-lg p-4 text-blue-500"
              >
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md">
                  {product.discount}
                </span>

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
                  <button className="px-4 py-2 border border-blue-500 rounded-md ">
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
