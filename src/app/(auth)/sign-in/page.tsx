/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Form, Input, Checkbox } from "antd";
// import image from "../../../assets/image/Rectangle 29 (1).png";
import image from "../../../assets/image/logo.png";
import { useLoginApiMutation } from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/auth/authSlice";
import { FaLock } from "react-icons/fa";
interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const SignIn: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginApi, { isLoading }] = useLoginApiMutation();
  const onFinish = async (values: LoginFormValues) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await loginApi(data).unwrap();
      // console.log(res);
      dispatch(
        setUser({
          user: res.data.user || { email: values.email },
          token: res.data.accessToken,
        })
      );
      toast.success(res?.message);
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-white/70">
        <div className="grid grid-cols-1 ">
          <div className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mx-auto mb-5 h-12 w-12 grid place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
                {/* <span className="text-white font-semibold"></span> */}
                <FaLock className="text-white font-semibold h-5 w-5"></FaLock>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-center">
                Login to your account
              </h2>
              <p className="mt-1 text-center text-sm text-gray-500">
                Enter your details to login.
              </p>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <Form<LoginFormValues>
                  form={form}
                  name="login"
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  layout="vertical"
                  requiredMark={false}
                  size="large"
                >
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
                      { required: true, message: "Please enter your password" },
                    ]}
                  >
                    <Input.Password
                      placeholder="••••••••"
                      className="rounded-xl border-gray-200 focus:border-indigo-500 focus:shadow-[0_0_0_3px_rgba(99,102,241,0.2)]"
                      autoComplete="current-password"
                    />
                  </Form.Item>

                  <div className="flex items-center justify-between -mt-2 mb-4 ">
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      className="mb-0"
                    >
                      <Checkbox>Keep me logged in</Checkbox>
                    </Form.Item>
                    <Link
                      href="/forgate-pass"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700 -mt-5"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Form.Item className="mb-0">
                    <div className="text-white">
                      <button
                        type="submit"
                        className="w-full py-3 rounded-xl  font-semibold shadow-lg transition focus:outline-none focus:ring-4 focus:ring-indigo-300 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700"
                      >
                        {isLoading ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </Form.Item>
                </Form>

                <p className="mt-4 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="font-semibold text-indigo-600 hover:text-indigo-700"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Section - Marketing panel with image and text */}
          {/* <div className="relative hidden lg:block">
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
                  Online Corner Store
                </h3>
                <p className="mt-3 text-white/80 max-w-md text-sm">
                  Sign in or create an account to explore our latest collections
                  and member-only discounts. Your Online Shopping journey starts
                  here.
                </p>
              </div>
            </div>
            <div className="absolute inset-3 rounded-[22px] ring-1 ring-white/60 pointer-events-none" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
