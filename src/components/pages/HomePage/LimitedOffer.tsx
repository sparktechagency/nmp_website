"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import productImg from "../../../assets/image/Rectangle 161.png";
import Link from "next/link";
import { useGetBannerQuery } from "@/redux/features/heroApi/heroApi";

const LimitedOffer: React.FC = () => {
  const { data: infoData } = useGetBannerQuery(undefined);

  const targetDate = infoData?.data?.countDownDate
    ? new Date(infoData.data.countDownDate).getTime()
    : null;

  const calculateTimeLeft = () => {
    if (!targetDate) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      ),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(
        2,
        "0"
      ),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
        2,
        "0"
      ),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-8 rounded-lg shadow-lg">
        <div className="mb-6 md:mb-0">
          <h1 className="text-4xl font-bold mb-6">Offer Ends Soon</h1>

          <div className="flex flex-col md:flex-row gap-4 my-16">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div
                key={label}
                className="bg-blue-50 text-center px-6 py-4 rounded-lg min-w-[80px]"
              >
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm capitalize">{label}</p>
              </div>
            ))}
          </div>
          <div className="text-white">
            <Link href="/products">
              <button className="bg-[#3f67bc] px-6 py-2 rounded-md transition">
                Shop Now
              </button>
            </Link>
          </div>
        </div>

        <div className="w-[325px] h-[450px] relative">
          <Image
            src={productImg}
            alt="Product"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default LimitedOffer;
