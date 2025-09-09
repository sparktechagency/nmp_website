"use client";
import Image from "next/image";
import React from "react";
// import banner from "../../../assets/image/banner.png";
import Link from "next/link";
import { useGetBannerQuery } from "@/redux/features/heroApi/heroApi";

const Banner = () => {
  const { data: bannerData } = useGetBannerQuery(undefined);
  console.log("bannerData:", bannerData?.data);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Image
        src={bannerData?.data?.heroImg}
        alt="banner"
        fill
        className="object-cover brightness-75"
        priority
      />

      <div className="container mx-auto h-full relative ">
        <div className="absolute top-1/2 left-0 md:left-0  -translate-y-1/2 max-w-2xl text-white drop-shadow-lg px-2 md:px-0">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6 tracking-wide uppercase ">
            {bannerData?.data?.title} <br />
            {/* <span className="text-indigo-400">Pure Satisfaction</span> */}
          </h1>
          <p className="text-lg md:text-xl font-medium mb-8 leading-relaxed opacity-90">
            {bannerData?.data?.subTitle}
          </p>
          <Link href="/product-type">
            <button className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 ease-in-out text-white font-bold text-lg md:text-xl px-8 py-3 rounded-xl shadow-lg shadow-indigo-500/50 hover:shadow-indigo-600/70 uppercase tracking-wide">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
