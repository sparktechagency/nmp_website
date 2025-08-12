/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { Checkbox, Form, Input } from "antd";
import Link from "next/link";
import Image from "next/image";
import image from "../../../assets/image/Rectangle 29 (1).png";

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const SignIn: React.FC = () => {
  const onFinish = (values: LoginFormValues) => {
    console.log("Received values of form: ", values);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl flex flex-col md:flex-row p-6 md:p-12">
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Log In</h2>

          <div className="border-t-2 border-gray-200 pt-4">
            <Form<LoginFormValues>
              name="login"
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
                  placeholder="Your Email"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password
                  className="p-4 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="Password"
                />
              </Form.Item>

              <Form.Item>
                <div className="flex items-center justify-between">
                  <Form.Item name="remember" valuePropName="checked" noStyle>
                    <Checkbox className="text-md">Remember me</Checkbox>
                  </Form.Item>
                  <p>
                    <Link href="/forgate-pass" className="text-indigo-500">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
              </Form.Item>

              <Form.Item className="text-center mt-8">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300"
                >
                  Log In
                </button>
              </Form.Item>
            </Form>
            <p className="text-lg text-gray-600 mb-6">
              Don't have an account?{" "}
              <Link href="/sign-up" className="text-indigo-500 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 p-6">
          <Image
            src={image}
            alt="Illustration"
            className="rounded-xl shadow-lg"
            height={500}
            width={500}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
