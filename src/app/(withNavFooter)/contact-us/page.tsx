"use client";
import Image from "next/image";
import React from "react";
import image from "../../../assets/image/Rectangle 145.png";
import { ConfigProvider, Form, Input } from "antd";
import Link from "next/link";
interface ContactFormValues {
  name: string;
  email: string;
  contact: string;
  message?: string;
}
const ConatctUs = () => {
  return (
    <div className="container mx-auto my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Image src={image} alt="img" height={500} width={500}></Image>
        </div>
        <div>
          <ConfigProvider
            theme={{
              components: {
                Form: {
                  borderRadius: 0,
                },
                Input: {
                  borderRadius: 5,
                },
              },
            }}
          >
            <Form<ContactFormValues>
              name="checkout"
              initialValues={{}}
              // onFinish={onFinish}
              layout="vertical"
              className="py-10 mx-4 md:mx-0 px-6 md:px-10 "
            >
              <div className="mb-4 text-center">
                <h2 className="text-neutral-700 text-xl md:text-2xl lg:text-3xl font-bold mb-6 uppercase">
                  Contact Us
                </h2>
                <p className="text-neutral-400 lg:text-lg font-bold">
                  Feel Free to contact us
                </p>
              </div>

              <Form.Item
                name="name"
                label={<p className="text-md">Full Name</p>}
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Your Name" style={{ padding: "6px" }} />
              </Form.Item>

              <Form.Item
                name="email"
                label={<p className="text-md">Email</p>}
                rules={[
                  { required: true, message: "Please enter your email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input placeholder="Your Email" style={{ padding: "6px" }} />
              </Form.Item>

              <Form.Item
                name="contact"
                label={<p className="text-md">Phone Number</p>}
                rules={[
                  { required: true, message: "Please enter your Phone number" },
                ]}
              >
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  style={{ padding: "6px" }}
                />
              </Form.Item>

              <Form.Item
                name="address"
                label={<p className="text-md">Address</p>}
              >
                <Input.TextArea
                  placeholder="Your Address"
                  rows={3}
                  className="w-full rounded-md"
                />
              </Form.Item>

              <Form.Item className="text-center">
                <Link href="/order-confirmed">
                  <div className="text-white">
                    <button
                      type="submit"
                      className="w-full py-3 font-bold text-2xl bg-[#3f67bc]   rounded-md shadow-lg"
                    >
                      Send
                    </button>
                  </div>
                </Link>
              </Form.Item>
            </Form>
          </ConfigProvider>
        </div>
      </div>
    </div>
  );
};

export default ConatctUs;
