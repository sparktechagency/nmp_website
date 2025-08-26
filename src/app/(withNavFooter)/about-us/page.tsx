"use client";

import Image from "next/image";
import React from "react";
import { FaLeaf, FaCloud, FaRegSmile } from "react-icons/fa";
import image from "../../../assets/image/image 19.png";
import Facts from "@/components/pages/AboutUs/Facts";
import { useAboutUsQuery } from "@/redux/features/subscribeApi/subscribeApi";

const AboutUs = () => {
  const { data: aboutUsData } = useAboutUsQuery(undefined);
  const rawHtml = aboutUsData?.data?.content || "";
  const plainText = rawHtml.replace(/<[^>]*>/g, "");
  // console.log(plainText);

  return (
    <div className="container mx-auto my-20">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <Image
            src={image}
            alt="About Vape"
            height={500}
            width={500}
            className="rounded-xl"
          />
        </div>

        {/* Right: Text + Icons */}
        <div>
          <h1 className="text-4xl font-bold mb-6 text-gray-800">About Us</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">{plainText}</p>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full text-red-500">
                <FaLeaf size={20} />
              </div>
              <p className="text-gray-700">
                Made with carefully selected, safe ingredients.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-500">
                <FaCloud size={20} />
              </div>
              <p className="text-gray-700">
                Smooth, flavorful clouds every time.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-full text-green-500">
                <FaRegSmile size={20} />
              </div>
              <p className="text-gray-700">
                Designed for comfort, style, and satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Facts></Facts>
      {/* <Reviews /> */}
    </div>
  );
};

export default AboutUs;
