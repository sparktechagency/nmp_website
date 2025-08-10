"use client";
import React from "react";
import { ConfigProvider, Form, Input } from "antd";
import type { FormProps } from "antd";
import Link from "next/link";

interface ContactFormValues {
  name: string;
  email: string;
  contact: string;
  message?: string;
}

const CheckoutPage: React.FC = () => {
  const onFinish: FormProps<ContactFormValues>["onFinish"] = (values) => {
    console.log("Form Submitted:", values);
  };

  return (
    <div className="container mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
        <div>
          <h1 className="text-2xl font-bold text-neutral-600">Order Summery</h1>
          <div className="border-b-2 border-b-neutral-300 pb-5">
            <div className="text-neutral-400 flex justify-between items-center gap-5">
              <h1 className="">SUBTOTAL</h1>
              <p>$190</p>
            </div>
            <div className="text-neutral-400 flex justify-between items-center gap-5">
              <h1>SHIPPING</h1>
              <p>$80</p>
            </div>
          </div>
          <div className="text-neutral-400 flex justify-between items-center gap-5 mt-5">
            <h1>TOTAL</h1>
            <p>$200</p>
          </div>
        </div>
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
            onFinish={onFinish}
            layout="vertical"
            className="py-10 mx-4 md:mx-0 px-6 md:px-10 "
          >
            <div className="mb-4 text-center">
              <h2 className="text-neutral-700 text-xl md:text-2xl lg:text-3xl font-bold mb-6 uppercase">
                Checkout
              </h2>
              <p className="text-neutral-400 lg:text-lg font-bold">
                Shipping Information
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
              <div className="text-white">
                <Link href="/order-confirmed">
                  <button
                    type="submit"
                    className="w-full py-3 font-bold text-2xl bg-[#3f67bc]   rounded-md shadow-lg"
                  >
                    Pay with stipes
                  </button>
                </Link>
              </div>
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default CheckoutPage;
