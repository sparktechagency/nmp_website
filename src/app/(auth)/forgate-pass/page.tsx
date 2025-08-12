"use client";

import React from "react";
import { Form, Input } from "antd";
import Link from "next/link";
import Image from "next/image";
import { IoMdKey } from "react-icons/io";
import forgatePass from "../../../assets/image/forgate.png";

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const ForgatePassword: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row p-6 md:p-12">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-gray-900">Forgot Password</h2>
            {/* <div className="bg-[#ffc071] px-4 py-2 rounded-md">
              <IoMdKey className="text-white h-8 w-8" />
            </div> */}
          </div>

          <p className="text-center text-lg text-gray-600 mb-6">
            No worries, we will send you reset instructions.
          </p>

          <div className="border-t-2 border-gray-200 pt-4">
            <Form<LoginFormValues>
              name="forgot-password"
              initialValues={{ remember: true }}
              style={{ maxWidth: 450 }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input
                  className="p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Enter Your Email Address"
                />
              </Form.Item>

              <Form.Item className="text-center mt-8">
                <Link href="/verify-otp">
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
                  >
                    Submit
                  </button>
                </Link>
              </Form.Item>
            </Form>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 p-6">
          <Image src={forgatePass} alt="Forgot Password" className="rounded-xl shadow-lg" height={500} width={500} />
        </div>
      </div>
    </div>
  );
};

export default ForgatePassword;
