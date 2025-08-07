import Image from "next/image";
import React from "react";
import banner from "../../../assets/image/banner.png";

const Banner = () => {
  return (
    <div className="relative w-full h-screen">
      <Image
        src={banner}
        alt="banner"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
};

export default Banner;
