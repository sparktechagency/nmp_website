import Image from "next/image";
import React from "react";
import img1 from "../../../assets/image/Frame.png";
import img2 from "../../../assets/image/Frame (1).png";
import img3 from "../../../assets/image/Frame (2).png";
import img4 from "../../../assets/image/Layer_1.png";
const Facts = () => {
  return (
    <div className="container mx-auto mt-40">
      <h1 className="text-3xl font-bold text-center pb-20 underli">Facts</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 pb-40">
        <div className="flex flex-col justify-center items-center">
          <Image src={img1} alt="img" height={200} width={200}></Image>
          <p className=" font-bold">Free Delivery</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src={img2} alt="img" height={200} width={200}></Image>
          <p className=" font-bold">Easy Return</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src={img3} alt="img" height={200} width={200}></Image>
          <p className=" font-bold">Secure Payment</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src={img4} alt="img" height={200} width={200}></Image>
          <p className=" font-bold">Brunches</p>
        </div>
      </div>
    </div>
  );
};

export default Facts;
