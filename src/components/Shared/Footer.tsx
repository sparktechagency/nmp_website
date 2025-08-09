"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-100 py-10">
      {/* Newsletter */}
      <div className="text-center mb-8">
        <h2 className="text-lg md:text-3xl font-bold mb-4">
          Subscribe to our newsletters
        </h2>
        <div className="flex justify-center">
          <div className="bg-blue-300 flex rounded-md overflow-hidden w-[90%] max-w-md">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-grow px-4 py-2 outline-none bg-transparent"
            />
            <button className="bg-white px-4 py-2 text-sm font-medium hover:bg-gray-100">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left px-4">
        {/* Company & Legal */}
        <div>
          <h3 className="font-semibold mb-4">COMPANY & LEGAL</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>About Us</li>
            <li>Privacy Policy</li>
            <li>Brands</li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="font-semibold mb-4">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>Delivery Information</li>
            <li>Terms & Conditions</li>
            <li>Returns</li>
          </ul>
        </div>

        {/* Contact Us */}
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

        {/* Follow Us */}
        <div>
          <h3 className="font-semibold mb-4">FOLLOW US</h3>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <FaFacebookF className="cursor-pointer hover:text-blue-600" />
            <FaInstagram className="cursor-pointer hover:text-pink-500" />
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © 2025 E-Com | All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
