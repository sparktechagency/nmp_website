/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { ConfigProvider, Form, Input, Spin } from "antd";
import type { FormProps } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCreateOrderMutation } from "@/redux/features/ordersApi/ordersApi";
import toast from "react-hot-toast";

interface ContactFormValues {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  const quantity = searchParams.get("quantity");
  const router = useRouter();
  // console.log(total, quantity);

  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);
  const onFinish: FormProps<ContactFormValues>["onFinish"] = async (values) => {
    // console.log("Form Submitted:", values);

    try {
      setLoading(true); // show loader
      const data = {
        streetAddress: values.streetAddress,
        city: values?.city,
        state: values.state,
        zipCode: values.zipCode,
      };

      const res = await createOrder(data).unwrap();

      if (res?.success && res?.data?.url) {
        toast.success(res?.message);
        window.location.href = res.data.url; // redirect to Stripe
      } else {
        toast.error("Payment link not found!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setLoading(false); // hide loader if error
    }
  };

  return (
    <div className="container mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
        <div>
          <h1 className="text-2xl font-bold text-neutral-600">Order Summery</h1>
          <div className="border-b-2 border-b-neutral-300 pb-5">
            <div className="text-neutral-400 flex justify-between items-center gap-5">
              <h1 className="">SUBTOTAL</h1>
              <p>${total}</p>
            </div>
            {/* <div className="text-neutral-400 flex justify-between items-center gap-5">
              <h1>SHIPPING</h1>
              <p>$80</p>
            </div> */}
          </div>
          <div className="text-neutral-400 flex justify-between items-center gap-5 mt-5">
            <h1>TOTAL</h1>
            <p>${total}</p>
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
              name="streetAddress"
              label={<p className="text-md">Street Address</p>}
              rules={[
                { message: "Please enter your Street Address" },
              ]}
            >
              <Input
                placeholder="Your Street Address"
                style={{ padding: "6px" }}
              />
            </Form.Item>

            <Form.Item
              name="city"
              label={<p className="text-md">City</p>}
              rules={[{ message: "Please enter your city" }]}
            >
              <Input placeholder="Your city" style={{ padding: "6px" }} />
            </Form.Item>

            <Form.Item
              name="state"
              label={<p className="text-md">state</p>}
              rules={[{ message: "Please enter your state" }]}
            >
              <Input placeholder="State" style={{ padding: "6px" }} />
            </Form.Item>

            <Form.Item
              name="zipCode"
              label={<p className="text-md">Zip Code</p>}
              rules={[{ message: "Please enter your state" }]}
            >
              <Input placeholder="zipCode" className="w-full rounded-md" />
            </Form.Item>

            <Form.Item className="text-center">
              {/* <Link href="/order-confirmed"> */}
              <div className="text-white">
                <button
                  type="submit"
                  className="w-full py-3 font-bold text-2xl bg-[#3f67bc]   rounded-md shadow-lg"
                >
                  {loading ? <Spin size="small" /> : "Pay with Stripe"}
                </button>
              </div>
              {/* </Link> */}
            </Form.Item>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default CheckoutPage;
