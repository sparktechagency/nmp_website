/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Form, Input, Spin } from "antd";
import type { FormProps } from "antd";
import {
  useCreateOrderMutation,
  useGetShippingCostQuery,
} from "@/redux/features/ordersApi/ordersApi";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

/** ===== Types ===== */
type Mode = "guest" | "logged-in";

interface CartItem {
  _id: string;       // productId
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface UserLike {
  fullName?: string;
  email?: string;
}

interface ContactFormValues {
  // guest-only contact fields
  fullName?: string;
  email?: string;

  // address
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
}

/** ===== Helpers ===== */
const safeParse = <T,>(val: string | null, fallback: T): T => {
  try {
    return val ? (JSON.parse(val) as T) : fallback;
  } catch {
    return fallback;
  }
};

const getCartFromStorage = (): CartItem[] =>
  typeof window !== "undefined" ? safeParse<CartItem[]>(localStorage.getItem("cart"), []) : [];

const getUserFromStorage = (): UserLike | null =>
  typeof window !== "undefined" ? safeParse<UserLike | null>(localStorage.getItem("user"), null) : null;

const buildCartProducts = (items: CartItem[]) =>
  items
    .filter((i) => i && i._id && Number.isFinite(i.quantity) && i.quantity > 0)
    .map((i) => ({ productId: i._id, quantity: i.quantity }));

/** ===== Component ===== */
const CheckoutPage: React.FC = () => {
  const searchParams = useSearchParams();
  // you used ?total before; we'll recompute from cart for safety (no trust in URL)
  const _ignoredTotal = searchParams.get("total");

  const [mode, setMode] = useState<Mode>("guest");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [storedUser, setStoredUser] = useState<UserLike | null>(null);

  const [createOrder] = useCreateOrderMutation();
  const [loading, setLoading] = useState(false);

  // Load cart and stored user on mount
  useEffect(() => {
    const c = getCartFromStorage();
    setCart(c);
    const u = getUserFromStorage();
    setStoredUser(u);
    if (u?.email || u?.fullName) setMode("logged-in"); // default to logged-in if we have a user
  }, []);

  // Subtotal computed from cart
  const subTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const qty = Math.max(0, Number(item.quantity) || 0);
        const price = Number(item.price) || 0;
        return sum + qty * price;
      }, 0),
    [cart]
  );

  // Shipping API (expects subTotal)
  const { data: shippingData } = useGetShippingCostQuery(
    { subTotal: String(subTotal) },
    { skip: !Number.isFinite(subTotal) }
  );

  const shippingCost = Number(shippingData?.data?.shippingCost ?? 0);
  const total = subTotal + shippingCost;

  const onFinish: FormProps<ContactFormValues>["onFinish"] = async (values) => {
    try {
      setLoading(true);

      // Build cart products
      const cartProducts = buildCartProducts(cart);
      if (cartProducts.length === 0) {
        toast.error("Your cart is empty or quantities are invalid.");
        return;
      }

      // Pick user info based on mode
      const fullName =
        mode === "guest" ? (values.fullName || "").trim() : (storedUser?.fullName || "").trim();
      const email =
        mode === "guest" ? (values.email || "").trim() : (storedUser?.email || "").trim();

      if (!fullName || !email) {
        toast.error(
          mode === "guest"
            ? "Please enter your full name and email."
            : "No saved name/email found. Switch to Guest or log in again."
        );
        return;
      }

      const payload = {
        userData: { fullName, email },
        shippingAddress: {
          streetAddress: values.streetAddress,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
        },
        cartProducts,
      };

      const res = await createOrder(payload).unwrap();

      if (res?.success && res?.data?.url) {
        toast.success(res?.message || "Redirecting to payment…");
        window.location.href = res.data.url;
      } else {
        toast.error(res?.message || "Payment link not found!");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
        {/* ===== Left: Order Summary ===== */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-600">Order Summary</h1>

          {/* Cart items (simple list) */}
          <div className="mt-4 space-y-3">
            {cart.length === 0 ? (
              <p className="text-neutral-400">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border border-neutral-200 rounded-md p-3"
                >
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={20}
                        width={20}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-neutral-200 rounded-md" />
                    )}
                    <div>
                      <p className="text-neutral-700 font-medium">{item.name}</p>
                      <p className="text-neutral-400 text-sm">
                        Qty: {item.quantity} • ${Number(item.price).toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="text-neutral-700 font-semibold">
                    ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Totals */}
          <div className="border-b-2 border-b-neutral-300 pb-5 mt-6">
            <div className="text-neutral-400 flex justify-between items-center gap-5">
              <h1>SUBTOTAL</h1>
              <p>${subTotal.toFixed(2)}</p>
            </div>
            <div className="text-neutral-400 flex justify-between items-center gap-5">
              <h1>SHIPPING</h1>
              <p>${shippingCost.toFixed(2)}</p>
            </div>
          </div>
          <div className="text-neutral-600 flex justify-between items-center gap-5 mt-5">
            <h1 className="font-semibold">TOTAL</h1>
            <p className="font-semibold">${total.toFixed(2)}</p>
          </div>
        </div>

        {/* ===== Right: Checkout Form (pure divs, no Card) ===== */}
        <ConfigProvider
          theme={{
            components: {
              Form: { borderRadius: 0 },
              Input: { borderRadius: 5 },
            },
          }}
        >
          <div className="py-10 mx-4 md:mx-0 px-6 md:px-10 border border-neutral-200 rounded-lg">
            <div className="mb-4 text-center">
              <h2 className="text-neutral-700 text-xl md:text-2xl lg:text-3xl font-bold mb-2 uppercase">
                Checkout
              </h2>
              <p className="text-neutral-400 lg:text-lg font-bold">Shipping Information</p>
            </div>

            {/* Mode Switch (div buttons, no Card) */}
            <div className="flex justify-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => setMode("guest")}
                className={`px-4 py-2 rounded-md border ${
                  mode === "guest"
                    ? "bg-[#3f67bc] text-white border-[#3f67bc]"
                    : "bg-white text-neutral-700 border-neutral-300"
                }`}
              >
                Guest checkout
              </button>
              <button
                type="button"
                onClick={() => setMode("logged-in")}
                className={`px-4 py-2 rounded-md border ${
                  mode === "logged-in"
                    ? "bg-[#3f67bc] text-white border-[#3f67bc]"
                    : "bg-white text-neutral-700 border-neutral-300"
                }`}
              >
                I’m logged in
              </button>
            </div>

            {/* Logged-in info banner (div) */}
            {mode === "logged-in" && (
              <div className="mb-6 rounded-md border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                <p className="font-semibold">Using saved account details</p>
                <p className="mt-1">
                  <span className="font-medium">Name:</span>{" "}
                  {storedUser?.fullName || "— not found —"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {storedUser?.email || "— not found —"}
                </p>
                {!storedUser?.email && (
                  <p className="mt-1 text-green-900">
                    We couldn’t find your saved details. Switch to Guest checkout or log in again.
                  </p>
                )}
              </div>
            )}

            <Form<ContactFormValues>
              name="checkout"
              initialValues={{
                fullName: storedUser?.fullName,
                email: storedUser?.email,
              }}
              onFinish={onFinish}
              layout="vertical"
              className=""
            >
              {/* Guest-only fields */}
              {mode === "guest" && (
                <>
                  <Form.Item
                    name="fullName"
                    label={<p className="text-md">Full Name</p>}
                    rules={[
                      { required: true, message: "Please enter your full name" },
                      { min: 2, message: "Name looks too short" },
                    ]}
                  >
                    <Input placeholder="Your full name" style={{ padding: "6px" }} />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={<p className="text-md">Email</p>}
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email" as const, message: "Enter a valid email" },
                    ]}
                  >
                    <Input placeholder="you@example.com" style={{ padding: "6px" }} />
                  </Form.Item>
                </>
              )}

              {/* Shipping fields (always) */}
              <Form.Item
                name="streetAddress"
                label={<p className="text-md">Street Address</p>}
                rules={[{ required: true, message: "Please enter your Street Address" }]}
              >
                <Input placeholder="Your Street Address" style={{ padding: "6px" }} />
              </Form.Item>

              <Form.Item
                name="city"
                label={<p className="text-md">City</p>}
                rules={[{ required: true, message: "Please enter your city" }]}
              >
                <Input placeholder="Your city" style={{ padding: "6px" }} />
              </Form.Item>

              <Form.Item
                name="state"
                label={<p className="text-md">State</p>}
                rules={[{ required: true, message: "Please enter your state" }]}
              >
                <Input placeholder="State" style={{ padding: "6px" }} />
              </Form.Item>

              <Form.Item
                name="zipCode"
                label={<p className="text-md">Zip Code</p>}
                rules={[
                  { required: true, message: "Please enter your zip code" },
                  { min: 4, message: "Zip looks too short" },
                ]}
              >
                <Input placeholder="zipCode" className="w-full rounded-md" />
              </Form.Item>

              <Form.Item className="text-center">
                <div className="text-white">
                  <button
                    type="submit"
                    className="w-full py-3 font-bold text-2xl bg-[#3f67bc] rounded-md shadow-lg disabled:opacity-70"
                    disabled={loading || cart.length === 0}
                  >
                    {loading ? <Spin size="small" /> : "Pay with Stripe"}
                  </button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default CheckoutPage;
