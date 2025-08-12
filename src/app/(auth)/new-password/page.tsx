"use client";

import React from "react";
import { Form, Input, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import image from "../../../assets/image/Rectangle 29 (1).png";
import { IoMdKey } from "react-icons/io";

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const NewPassword: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
    message.success("Password reset successfully!");
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row p-6 md:p-12">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Set New Password
            </h2>
            {/* <div className="bg-[#ffc071] px-4 py-2 rounded-md">
              <IoMdKey className="text-white h-8 w-8" />
            </div> */}
          </div>

          <p className="text-center text-lg text-gray-600 mb-6">
            Your new password must be different from previously used passwords.
          </p>

          <Form<LoginFormValues>
            name="new-password"
            initialValues={{ remember: true }}
            style={{ maxWidth: 450 }}
            onFinish={onFinish}
            layout="vertical"
          >
            <Form.Item
              name="password"
              label="New Password"
              rules={[
                { required: true, message: "Please enter your new password" },
              ]}
            >
              <Input.Password
                className="p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="New Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              rules={[
                { required: true, message: "Please confirm your password" },
              ]}
            >
              <Input.Password
                className="p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item className="text-center">
              <Link href="/">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
                >
                  Reset Password
                </button>
              </Link>
            </Form.Item>
          </Form>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 p-6">
          <Image
            src={image}
            alt="Password Reset Illustration"
            className="rounded-xl shadow-lg"
            height={500}
            width={500}
          />
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
