/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetDelivaryInformationQuery,
  usePrivacyPolicyQuery,
  useSentSbuscribeMutation,
  useTermsAndConditionQuery,
} from "@/redux/features/subscribeApi/subscribeApi";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import toast from "react-hot-toast";
import { Modal, Spin } from "antd";
import Link from "next/link";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [sentSbuscribe, { isLoading }] = useSentSbuscribeMutation();

  const { data: privacyData, isLoading: privacyLoading } =
    usePrivacyPolicyQuery(undefined);
  const { data: termsData, isLoading: termsLoading } =
    useTermsAndConditionQuery(undefined);
  const { data: delivaryData, isLoading: deliveryLoading } =
    useGetDelivaryInformationQuery(undefined);

  // console.log(privacyData?.data?.content);

  // Separate modal states
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await sentSbuscribe({ email }).unwrap();
      toast.success(res?.message || "Subscribed successfully!");
      setEmail("");
    } catch (error: any) {
      toast.error(error?.data?.message || "Subscription failed");
    }
  };

  return (
    <>
      <Modal
        open={isPrivacyOpen}
        onCancel={() => setIsPrivacyOpen(false)}
        footer={null}
        centered
        className="rounded-2xl"
      >
        {privacyLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Privacy Policy</h2>
            <div
              className="text-gray-700 leading-relaxed max-h-[400px] overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: privacyData?.data?.content || "No information found.",
              }}
            />
          </div>
        )}
      </Modal>

      <Modal
        open={isTermsOpen}
        onCancel={() => setIsTermsOpen(false)}
        footer={null}
        centered
        className="rounded-2xl"
      >
        {termsLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Terms & Conditions</h2>
            <div
              className="text-gray-700 leading-relaxed max-h-[400px] overflow-y-auto"
              dangerouslySetInnerHTML={{
                __html: termsData?.data?.content || "No information found.",
              }}
            />
          </div>
        )}
      </Modal>

      <Modal
        open={isDeliveryOpen}
        onCancel={() => setIsDeliveryOpen(false)}
        footer={null}
        centered
        className="rounded-2xl"
      >
        {deliveryLoading ? (
          <div className="flex justify-center items-center py-10">
            <Spin size="large" />
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Delivery Information</h2>
            <div className="text-gray-700 leading-relaxed space-y-2">
              <p>
                <strong>Address:</strong> {delivaryData?.data?.address}
              </p>
              <p>
                <strong>Email:</strong> {delivaryData?.data?.email}
              </p>
              <p>
                <strong>Phone:</strong> {delivaryData?.data?.phone}
              </p>
              <p>
                <strong>Instagram:</strong>{" "}
                <a
                  href={delivaryData?.data?.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {delivaryData?.data?.instagram}
                </a>
              </p>
              <p>
                <strong>Telegram:</strong>{" "}
                <a
                  href={delivaryData?.data?.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {delivaryData?.data?.telegram}
                </a>
              </p>
            </div>
          </div>
        )}
      </Modal>

      <footer className="bg-blue-100 py-10">
        <div className="text-center mb-8">
          <h2 className="text-lg md:text-3xl font-bold mb-4">
            Subscribe to our newsletters
          </h2>
          <div className="flex justify-center">
            <div className="bg-blue-300 flex rounded-md overflow-hidden w-[90%] max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-grow px-4 py-2 outline-none bg-transparent"
              />
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left px-4">
          <div>
            <h3 className="font-semibold mb-4">COMPANY & LEGAL</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <Link href="/about-us">
                <li>About Us</li>
              </Link>
              <li
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsPrivacyOpen(true)}
              >
                Privacy Policy
              </li>
              <Link href="/products">
                <li>Brands</li>
              </Link>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsDeliveryOpen(true)}
              >
                Delivery Information
              </li>
              <li
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setIsTermsOpen(true)}
              >
                Terms & Conditions
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">CONTACT US</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex justify-center md:justify-start items-center gap-2">
                <FiMail /> Ecommerce@gmail.com
              </li>
              <li className="flex justify-center md:justify-start items-center gap-2">
                <FiPhone /> 1122007
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">FOLLOW US</h3>
            <div className="flex justify-center md:justify-start gap-4 text-xl">
              <Link href="https://www.facebook.com/">
                <FaFacebookF className="cursor-pointer hover:text-blue-600" />
              </Link>
              <Link href="https://www.instagram.com">
                <FaInstagram className="cursor-pointer hover:text-pink-500" />
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          © 2025 E-Com | All rights reserved
        </div>
      </footer>
    </>
  );
};

export default Footer;
