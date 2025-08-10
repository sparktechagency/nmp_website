import React from "react";
import user1 from "../../../assets/image/Ellipse 1.png";
import user2 from "../../../assets/image/Ellipse 1 (1).png";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      text: "Absolutely love this vape! The flavor is smooth, the design is sleek, and it lasts for hours. Definitely my go-to product now.",
      img: user1,
    },
    {
      id: 2,
      name: "Sarah Williams",
      rating: 4,
      text: "Great flavor and smooth draw. The only reason I gave it 4 stars is because I wish it came in more flavor options.",
      img: user2,
    },
  ];

  return (
    <div className="container mx-auto my-20">
      <h1 className="text-3xl font-bold text-center pb-20">Reviews</h1>

      <div className="flex flex-col gap-10">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="w-full flex flex-col md:flex-row items-center gap-5 border-b border-b-neutral-200 pb-5"
          >
            <div className="w-full md:w-[20%] flex justify-center">
              <Image
                src={review.img}
                alt={review.name}
                height={100}
                width={100}
                className="rounded-full"
              />
            </div>

            <div className="w-full md:w-[80%]">
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <h2 className="text-lg font-semibold">{review.name}</h2>
              <p className="text-gray-600">{review.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
