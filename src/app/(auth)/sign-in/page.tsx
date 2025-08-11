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
    <div className=" h-[100vh]   container mx-auto flex items-center justify-center gap-20">
      <div className="w-full md:w-[50%]">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-[#ffc071]  text-4xl font-bold mb-6">LogIn</h2>
          <p className="text-xl font-bold text-neutral-500">OR</p>
          <div className="text-white cursor-pointer">
            <Link href="/sign-up">
              <button className="px-4 py-2 rounded-md  bg-[#ffc071]  font-bold text-lg">
                Register
              </button>
            </Link>
          </div>
        </div>
        <div className=" border-4 p-5 rounded-md border-orange-100 flex justify-center items-center">
          <Form<LoginFormValues>
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 550 }}
            onFinish={onFinish}
            layout="vertical"
            className=" py-10 mx-4 md:mx-0 px-6 md:px-10 rounded-2xl w-[450px]"
          >
            <Form.Item
              name="email"
              label={<p className="text-md">Email</p>}
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                style={{ padding: "6px" }}
                className="text-md"
                placeholder="Your Email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<p className="text-md">Password</p>}
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                style={{ padding: "6px" }}
                className="text-md"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <div className="flex items-center justify-between">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox className=" text-md hover:">Remember</Checkbox>
                </Form.Item>
                <p className="">
                  <Link href="/forgate-pass">Forgot Password</Link>
                </p>
              </div>
            </Form.Item>

            <Form.Item className="text-center">
              <Link href="/">
                <div className="text-white">
                  <button
                    type="submit"
                    className="text-center w-full font-bold text-2xl bg-[#ffc071]  px-10 py-2 rounded-md shadow-lg"
                  >
                    Log In
                  </button>
                </div>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="w-full md:w-[50%]">
        <Image src={image} alt="image" height={500} width={500}></Image>
      </div>
    </div>
  );
};

export default SignIn;
