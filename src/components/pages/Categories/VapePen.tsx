import Image from "next/image";
import React from "react";
import { FaStar } from "react-icons/fa";
import product from "../../../assets/image/banner.png";
const VapePen = () => {
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
    
  ];

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white shadow-lg rounded-lg p-4 text-blue-500"
          >
            {/* <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-md">
              {product.discount}
            </span> */}

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
              <button className="px-4 py-2 border border-blue-500 rounded-md ">
                Add to Cart
              </button>
              <button className="px-4 py-2 border border-blue-500 rounded-md ">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-center items-center my-20 text-white">
        <Link href="/products">
          <button className="flex justify-center items-center gap-2 px-4 py-2  bg-orange-400  rounded-md  cursor-pointer">
            See More
            <MdKeyboardDoubleArrowRight className="" />
          </button>
        </Link>
      </div> */}
    </div>
  );
};

export default VapePen;
