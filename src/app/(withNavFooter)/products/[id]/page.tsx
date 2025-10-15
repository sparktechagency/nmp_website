/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { IoIosCart } from "react-icons/io";
import { useGetSingleProductQuery } from "@/redux/features/productsApi/productsApi";
import { useAddToCartMutation } from "@/redux/features/cartApi/cartApi";
import toast from "react-hot-toast";
import { useGetAllReviewQuery } from "@/redux/features/reviewApi/reviewApi";

import { userCurrentToken } from "@/redux/features/auth/authSlice";

const ProductDetails = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const token = useSelector(userCurrentToken);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [addToCart] = useAddToCartMutation();
  const { data: singleProduct } = useGetSingleProductQuery(id);
  const { data: reviewData } = useGetAllReviewQuery(id as string);
  const [quantity, setQuantity] = useState(1);
  const totalQuantityOfProduct = singleProduct?.data?.quantity;
  localStorage.setItem("totalQuantity", totalQuantityOfProduct);

  const increaseQty = () => {
    if (quantity < totalQuantityOfProduct) {
      setQuantity((prev) => prev + 1);
    } else {
      toast("Stock not available! You cannot add more of this product.");
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  if (!singleProduct?.data) {
    return (
      <div className="container mx-auto my-20 animate-pulse">
        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[40%] h-96 bg-gray-200 rounded-lg"></div>

          <div className="w-full md:w-[60%] flex flex-col gap-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>{" "}
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
            <div className="flex gap-2 mt-2">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-6 w-6 bg-gray-200 rounded-full"
                  ></div>
                ))}
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mt-4"></div>{" "}
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>{" "}
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-24 bg-gray-200 rounded mt-2"></div>{" "}
            <div className="flex items-center gap-3 mt-4">
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
              <div className="h-8 w-8 bg-gray-200 rounded"></div>
            </div>
            <div className="h-10 bg-gray-200 rounded w-1/3 mt-6"></div>{" "}
          </div>
        </div>
      </div>
    );
  }

  const product = singleProduct.data;

  // const handleAddToCart = async () => {
  //   // if (!token) {
  //   //   router.push("/sign-in");
  //   //   return;
  //   // }
  //   try {
  //     const data = {
  //       productId: id,
  //       quantity: quantity,
  //     };
  //     const res = await addToCart(data).unwrap();
  //     router.push("/cart");
  //     toast(res?.message);
  //   } catch (error: any) {
  //     toast(error?.data?.message);
  //   }
  // };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (totalQuantityOfProduct != 0) {
      const existingItem = cart.find((item: any) => item._id === product._id);
      if (existingItem) {
        // existingItem.quantity += quantity;
        toast.error("Product already in cart");
        return;
      } else {
        cart.push({
          _id: product._id,
          name: product.name,
          image: product.image,
          price: product.currentPrice,
          quantity: quantity,
          totalQty: product?.quantity,
        });
        localStorage.setItem("cart", JSON.stringify(cart));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success("Product added to cart");
      }
    } else {
      toast.error("This product is out of Stock");
    }
  };

  const reviews = reviewData?.data ?? [];
  return (
    <div className="container mx-auto my-20 px-2 md:px-0 min-h-screen">
      <div className="w-full flex flex-col md:flex-row justify-start items-center gap-5">
        <div className="w-full md:w-[40%]">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="rounded"
          />
          <p
            className="pt-5"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>

        <div className="w-full md:w-[60%]">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-xl text-orange-400 mt-2">
            ${product.currentPrice}
            <span className="text-sm line-through text-gray-400 ml-2">
              ${product.originalPrice}
            </span>
          </p>

          <div className="flex items-center gap-2 mt-2">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < product.ratings ? "text-orange-400" : "text-gray-300"
                  }`}
                />
              ))}
            <span className="text-neutral-400">
              {product.totalReview} Reviews
            </span>
          </div>

          <div className="mt-4">
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            {product?.brand ? (
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            ) : (
              ""
            )}

            {product?.flavor ? (
              <p>
                <strong>Flavor:</strong> {product.flavor}
              </p>
            ) : (
              ""
            )}
            {/* <p>
              <strong>Flavor:</strong> {product.flavor}
            </p> */}

            <p className="mt-2">
              <strong>Stock Status:</strong>{" "}
              <span
                className={`${
                  product.stockStatus === "In Stock"
                    ? "text-green-500"
                    : product.stockStatus === "Limited Stock"
                    ? "text-yellow-500"
                    : product.stockStatus === "Out of Stock"
                    ? "text-red-500"
                    : ""
                }`}
              >
                {product.stockStatus.replace("_", " ")}
              </span>
            </p>
            <p className="mt-2">
              <strong>Total Quantity:</strong>
              {product.quantity}
            </p>
          </div>

          <div className="mt-4">
            <h2 className="mb-2 font-semibold">Quantity</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={decreaseQty}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                -
              </button>
              <span className="min-w-[30px] text-center">{quantity}</span>
              <button
                onClick={increaseQty}
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={handleAddToCart}
              className="flex justify-center items-center gap-2 bg-blue-100 px-4 py-2 text-blue-600 hover:bg-blue-200 rounded"
            >
              Add to cart <IoIosCart />
            </button>
          </div>
        </div>
      </div>

      {reviews.length > 0 && (
        <div className="container mx-auto my-20">
          <h1 className="text-3xl font-bold text-center pb-20">
            Ratings & Reviews
          </h1>

          <div className="flex flex-col gap-10">
            {reviews.map((review: any) => (
              <div
                key={review._id}
                className="w-full flex flex-col md:flex-row items-center gap-5 border-b border-b-neutral-200 pb-5"
              >
                <div className="w-full md:w-[20%] flex justify-center">
                  <Image
                    src={review.profile_img}
                    alt={review.fullName || "Reviewer"}
                    height={100}
                    width={100}
                    className="rounded-full"
                  />
                </div>

                <div className="w-full md:w-[80%]">
                  <div className="flex items-center gap-2 mt-2">
                    {Array(5)
                      .fill(null)
                      .map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < product.ratings
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                  </div>

                  <h2 className="text-lg font-semibold">{review.fullName}</h2>
                  <h3 className="text-sm text-gray-500">{review.email}</h3>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
