/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useGetAllReviewQuery } from "@/redux/features/reviewApi/reviewApi";
import defaultImage from "../../../assets/image/Ellipse 1.png";
import { useParams } from "next/navigation";

const Reviews = () => {
  const { productId } = useParams();

  console.log("productId from URL:", productId); // should log actual ID now

  const {
    data: reviewData,
    isLoading,
    isError,
  } = useGetAllReviewQuery(productId as string);
  const reviews = reviewData?.data ?? [];

  if (isLoading) {
    return <p className="text-center">Loading reviews...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Failed to load reviews.</p>;
  }

  return (
    <div className="container mx-auto my-20">
      <h1 className="text-3xl font-bold text-center pb-20">
        Ratings & Reviews
      </h1>

      {reviews.length > 0 ? (
        <div className="flex flex-col gap-10">
          {reviews.map((review: any) => (
            <div
              key={review._id}
              className="w-full flex flex-col md:flex-row items-center gap-5 border-b border-b-neutral-200 pb-5"
            >
              <div className="w-full md:w-[20%] flex justify-center">
                <Image
                  src={review.img ? review.img : defaultImage}
                  alt={review.fullName || "Reviewer"}
                  height={100}
                  width={100}
                  className="rounded-full"
                />
              </div>

              <div className="w-full md:w-[80%]">
                <div className="flex items-center gap-1 text-yellow-500 mb-2">
                  {[...Array(review.star)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <h2 className="text-lg font-semibold">{review.fullName}</h2>
                <h3 className="text-sm text-gray-500">{review.email}</h3>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No reviews for this product yet.
        </p>
      )}

      <div className="flex justify-center items-center my-20 text-white">
        <Link href="/products">
          <button className="flex justify-center items-center gap-2 px-4 py-2 bg-orange-400 rounded-md cursor-pointer">
            See More
            <MdKeyboardDoubleArrowRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Reviews;
