/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Form, Input, Checkbox, message } from "antd";
// import image from "../../../assets/image/Rectangle 29 (1).png";
import image from "../../../assets/image/logo.png";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
interface SignUpValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  remember?: boolean;
}

const SignUpPage: React.FC = () => {
  const router = useRouter();

  const [form] = Form.useForm<SignUpValues>();
  const [register] = useRegisterMutation();

  const onFinish = async (values: SignUpValues) => {
    try {
      const data = {
        fullName: values.name,
        email: values.email,
        password: values.password,
      };

      const res = await register(data).unwrap();
      // console.log("Register Response:", res);

      if (res?.success || res?.statusCode === 200) {
        toast.success(res.message || "Registration successful!");
        router.push(`/verify-otp?email=${values.email}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/70">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mx-auto mb-5 h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                <span className="text-white font-semibold">C</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center">
                Create an account
              </h2>
              <p className="mt-1 text-center text-sm text-gray-500">
                Enter your details to get started.
              </p>

              <div className="mt-6 border-top border-gray-200 pt-6">
                <Form<SignUpValues>
                  form={form}
                  name="signup"
                  layout="vertical"
                  requiredMark={false}
                  size="large"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                >
                  <Form.Item
                    name="name"
                    label={<span className="text-gray-700">Your Name</span>}
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                  >
                    <Input
                      placeholder="Jane Doe"
                      className="rounded-xl border-gray-200 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
                      autoComplete="name"
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={<span className="text-gray-700">Email</span>}
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Enter a valid email" },
                    ]}
                  >
                    <Input
                      placeholder="you@example.com"
                      className="rounded-xl border-gray-200 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
                      autoComplete="email"
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={<span className="text-gray-700">Password</span>}
                    rules={[
                      { required: true, message: "Please enter a password" },
                    ]}
                  >
                    <Input.Password
                      placeholder="••••••••"
                      className="rounded-xl border-gray-200 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
                      autoComplete="new-password"
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    label={
                      <span className="text-gray-700">Confirm Password</span>
                    }
                    dependencies={["password"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Passwords do not match")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      placeholder="••••••••"
                      className="rounded-xl border-gray-200 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
                      autoComplete="new-password"
                    />
                  </Form.Item>

                  <div className="flex items-center justify-between -mt-2 mb-4">
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      className="mb-0"
                    >
                      <Checkbox>Keep me logged in</Checkbox>
                    </Form.Item>
                  </div>

                  <Form.Item className="mb-0">
                    <div className="text-white">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-white font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700"
                      >
                        Sign Up
                      </button>
                    </div>
                  </Form.Item>
                </Form>

                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
            <div className="absolute inset-0 p-8 sm:p-10 md:p-12 flex flex-col">
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={image}
                  alt="Illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-auto text-white/95">
                <div className="h-1 w-10 bg-white/70 rounded mb-4" />
                <h3 className="text-3xl font-semibold leading-tight">
                  Welcome to <br />
                   E-Com Online Corner Store
                </h3>
                <p className="mt-3 text-white/80 max-w-md text-sm">
                 Sign in or create an account to explore our latest 
                  collections and member-only discounts.
                  Your Online Shopping journey starts here.
                </p>
              </div>
            </div>
            <div className="absolute inset-3 rounded-[22px] ring-1 ring-white/60 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
