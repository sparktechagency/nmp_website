"use client";

import React from "react";
import { Checkbox, Form, Input } from "antd";
import Link from "next/link";
import Image from "next/image";
import image from "../../../assets/image/Rectangle 29 (1).png";
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
    <div className=" h-[100vh] container mx-auto flex items-center justify-center gap-20">
      <div className="w-full md:w-[50%]">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-[#ffc071]  text-4xl font-bold mb-6">
            Forgot Password
          </h2>
          <div className="bg-[#ffc071] px-4 py-2 rounded-md cursor-pointer">
            <IoMdKey className="text-white h-8 w-10" />
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
            <p className="text-center my-10 text-xl">
              No worries, we will send you reset instructions.
            </p>
            <Form.Item
              name="email"
              label={<p className="text-md">Email</p>}
              rules={[{ required: true, message: "Enter Your Email Address" }]}
            >
              <Input
                style={{ padding: "6px" }}
                className="text-md"
                placeholder="Enter Your Email Address"
              />
            </Form.Item>

            <Form.Item className="text-center">
              <Link href="/verify-otp">
                <div className="text-white">
                  <button
                    type="submit"
                    className="text-center w-full font-bold text-2xl bg-[#ffc071]  px-10 py-2 rounded-md shadow-lg"
                  >
              Submit
                  </button>
                </div>
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="w-full md:w-[50%]">
        <Image src={forgatePass} alt="image" height={500} width={500}></Image>
      </div>
    </div>
  );
};

export default ForgatePassword;
