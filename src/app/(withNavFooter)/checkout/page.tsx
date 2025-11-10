/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ConfigProvider, Form, Input, Spin } from "antd";
import type { FormProps } from "antd";
import {
  useCashOnDelivaryMutation,
  useCreateOrderMutation,
  useGetShippingCostQuery,
} from "@/redux/features/ordersApi/ordersApi";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Mode = "guest" | "logged-in"; // used only for UI toggle

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface UserLike {
  fullName?: string;
  email?: string;
  phone?: string;
}

interface ContactFormValues {
  fullName?: string;
  email?: string;
  streetAddress: string;
  phone?: string;
  city: string;
  state: string;
  zipCode: string;
}

// ✅ Function to get coordinates using Nominatim API
async function getManhattanCoordinates(addressPart: string) {
  try {
    const fullAddress = `${addressPart}, Manhattan, NY 10016`;
    const encoded = encodeURIComponent(fullAddress);
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1`;

    const res = await fetch(url, {
      headers: { "User-Agent": "MyApp/1.0 (example@domain.com)" },
    });

    const data = await res.json();
    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } else {
      return { lat: null, lon: null };
    }
  } catch (err) {
    console.error("Geocoding error:", err);
    return { lat: null, lon: null };
  }
}

const safeParse = <T,>(val: string | null, fallback: T): T => {
  try {
    return val ? (JSON.parse(val) as T) : fallback;
  } catch {
    return fallback;
  }
};

const getCartFromStorage = (): CartItem[] =>
  typeof window !== "undefined"
    ? safeParse<CartItem[]>(localStorage.getItem("cart"), [])
    : [];

const buildCartProducts = (items: CartItem[]) =>
  items
    .filter((i) => i && i._id && Number.isFinite(i.quantity) && i.quantity > 0)
    .map((i) => ({ productId: i._id, quantity: i.quantity }));

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "===".slice((base64.length + 3) % 4);
    const json = atob(padded)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("");
    return JSON.parse(decodeURIComponent(json));
  } catch {
    return null;
  }
};

const extractUserFromToken = (
  claims: Record<string, unknown> | null
): UserLike | null => {
  if (!claims) return null;
  const email =
    (claims["email"] as string) || (claims["upn"] as string) || undefined;

  const fullName =
    (claims["fullName"] as string) ||
    (claims["name"] as string) ||
    (claims["given_name"] && claims["family_name"]
      ? `${claims["given_name"] as string} ${
          claims["family_name"] as string
        }`.trim()
      : undefined);

  if (!email && !fullName) return null;
  return { email, fullName };
};

const CheckoutPage: React.FC = () => {
  const [mode, setMode] = useState<Mode>("guest");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [tokenUser, setTokenUser] = useState<UserLike | null>(null);
  const [loading, setLoading] = useState(false);
  const [cashLoading, setCashLoading] = useState(false);
  const [form] = Form.useForm<ContactFormValues>();
  const [createOrder] = useCreateOrderMutation();
  const [cashOnDelivary] = useCashOnDelivaryMutation();
  const router = useRouter();

  // ✅ For coordinates display
  const [coordinates, setCoordinates] = useState<{
    lat: string | null;
    lon: string | null;
  }>({
    lat: null,
    lon: null,
  });
  console.log("coordinates", coordinates);
  const [geoLoading, setGeoLoading] = useState(false);

  // Load cart and decode token once on mount
  useEffect(() => {
    setCart(getCartFromStorage());
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const claims = decodeJwtPayload(token);
        const u = extractUserFromToken(claims);
        if (u) {
          setTokenUser(u);
          setMode("logged-in");
          form.setFieldsValue({ fullName: u.fullName, email: u.email });
        }
      }
    }
  }, [form]);

  const subTotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const qty = Math.max(0, Number(item.quantity) || 0);
        const price = Number(item.price) || 0;
        return sum + qty * price;
      }, 0),
    [cart]
  );

  const { data: shippingData } = useGetShippingCostQuery(
    { subTotal: String(subTotal) },
    { skip: !Number.isFinite(subTotal) }
  );

  const shippingCost = Number(shippingData?.data?.shippingCost ?? 0);
  const total = subTotal + shippingCost;

  // ✅ Fetch coordinates automatically when streetAddress changes
  const handleAddressChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    form.setFieldsValue({ streetAddress: value });
    if (!value.trim()) {
      setCoordinates({ lat: null, lon: null });
      return;
    }

    setGeoLoading(true);
    const result = await getManhattanCoordinates(value);
    setCoordinates(result);
    setGeoLoading(false);
  };

// 🔹 Fetch coordinates from OpenStreetMap (Nominatim)
const getCoordinates = async (address: string) => {
  try {
    // Clean up any trailing comma/spaces
    const cleanAddress = address.trim().replace(/,+$/, "");
    // Append Manhattan info
    const fullAddress = `${cleanAddress}, Manhattan, NY 10016`;
    const encodedAddress = encodeURIComponent(fullAddress);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "my-checkout-app/1.0 (example@email.com)", // required header
        },
      }
    );

    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      const { lat, lon } = data[0];
      return {
        lat: parseFloat(lat),
        lon: parseFloat(lon),
      };
    } else {
      console.warn("No coordinates found for:", fullAddress);
      return { lat: null, lon: null };
    }
  } catch (err) {
    console.error("Error fetching coordinates:", err);
    return { lat: null, lon: null };
  }
};



const onFinish: FormProps<ContactFormValues>["onFinish"] = async (values) => {
  try {
    setLoading(true);

    const cartProducts = buildCartProducts(cart);
    if (cartProducts.length === 0) {
      toast.error("Your cart is empty or quantities are invalid.");
      return;
    }

    const userData = tokenUser
      ? {
          fullName: (tokenUser.fullName || "").trim(),
          email: (tokenUser.email || "").trim(),
          phone: (values.phone || "").trim(),
        }
      : {
          fullName: (values.fullName || "").trim(),
          email: (values.email || "").trim(),
          phone: values.phone,
        };

    if (!userData.fullName || !userData.email) {
      toast.error("Please provide your full name and email.");
      return;
    }

    // ✅ Fetch coordinates before sending payload
 const cleanStreet = values.streetAddress.trim().replace(/,+$/, "");
const coordinates = await getCoordinates(cleanStreet);
console.log("Coordinates:", coordinates);


    const payload = {
      userData,
      shippingAddress: {
        streetAddress: values.streetAddress,
        city: "Manhattan",
        state: "NY",
        zipCode: "10016",
        latitude: coordinates.lat,
        longitude: coordinates.lon,
      },
      cartProducts,
    };

    console.log("payload", payload);

    // --- TEMP: You can test until coords are confirmed ---
    // return 0;

    const res = await createOrder(payload).unwrap();

    if (res?.success && res?.data?.url) {
      toast.success(res?.message || "Redirecting to payment…");
      window.location.href = res.data.url;
      localStorage.removeItem("cart");
    } else {
      toast.error(res?.message || "Payment link not found!");
    }
  } catch (error: any) {
    toast.error(error?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};


  const handleCashOndelivary = async (values: ContactFormValues) => {
    try {
      setCashLoading(true);
      const cartProducts = buildCartProducts(cart);

      if (cartProducts.length === 0) {
        toast.error("Your cart is empty or quantities are invalid.");
        return;
      }

      const userData = tokenUser
        ? {
            fullName: (tokenUser.fullName || "").trim(),
            email: (tokenUser.email || "").trim(),
            phone: (values.phone || "").trim(),
          }
        : {
            fullName: (values.fullName || "").trim(),
            email: (values.email || "").trim(),
            phone: values.phone,
          };

      if (!userData.fullName || !userData.email) {
        toast.error("Please provide your full name and email.");
        return;
      }

      const payload = {
        userData,
        shippingAddress: {
          streetAddress: values.streetAddress,
          phone: values.phone,
          city: "Manhattan",
          state: "NY",
          zipCode: "10016",
          latitude: coordinates.lat,
          longitude: coordinates.lon,
        },
        cartProducts,
      };

      const res = await cashOnDelivary(payload).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Order placed successfully!");
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        router.push("/successfull-order");
      } else {
        toast.error(res?.message || "Failed to place cash on delivery order.");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    } finally {
      setCashLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-28">
        {/* ===== Left: Order Summary ===== */}
        <div>
          <h1 className="text-2xl font-bold text-neutral-600">Order Summary</h1>
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
                      <p className="text-neutral-700 font-medium">
                        {item.name}
                      </p>
                      <p className="text-neutral-400 text-sm">
                        Qty: {item.quantity} • ${Number(item.price).toFixed(2)}{" "}
                        each
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

          <div className="border-b-2 border-b-neutral-300 pb-5 mt-6">
            <div className="text-neutral-400 flex justify-between">
              <h1>SUBTOTAL</h1>
              <p>${subTotal.toFixed(2)}</p>
            </div>
            <div className="text-neutral-400 flex justify-between">
              <h1>SHIPPING</h1>
              <p>${shippingCost.toFixed(2)}</p>
            </div>
          </div>
          <div className="text-neutral-600 flex justify-between mt-5 font-semibold">
            <h1>TOTAL</h1>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        {/* ===== Right: Checkout Form ===== */}
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
              <h2 className="text-neutral-700 text-2xl font-bold mb-2 uppercase">
                Checkout
              </h2>
              <p className="text-neutral-400 lg:text-lg font-bold">
                Shipping Information
              </p>
            </div>

            <Form<ContactFormValues>
              form={form}
              name="checkout"
              onFinish={onFinish}
              layout="vertical"
            >
              {mode === "guest" && !tokenUser && (
                <>
                  <Form.Item
                    name="fullName"
                    label={<p className="text-md">Full Name</p>}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your full name",
                      },
                    ]}
                  >
                    <Input placeholder="Your full name" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={<p className="text-md">Email</p>}
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Enter a valid email" },
                    ]}
                  >
                    <Input placeholder="you@example.com" />
                  </Form.Item>
                </>
              )}

              {/* Street Address Field with Live Coordinates */}
              <Form.Item
                name="streetAddress"
                label={<p className="text-md">Street Address</p>}
                rules={[
                  {
                    required: true,
                    message: "Please enter your Street Address",
                  },
                ]}
              >
                <Input
                  placeholder="e.g. Building 25, Room 304, 123 Lexington Ave"
                  onChange={handleAddressChange}
                />
              </Form.Item>

              {/* Show Coordinates */}
              {geoLoading ? (
                <p className="text-xs text-blue-500 mb-3">
                  Fetching coordinates...
                </p>
              ) : coordinates.lat ? (
                <p className="text-xs text-green-600 mb-3">
                  📍 Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
                </p>
              ) : null}

              <Form.Item
                name="phone"
                label={<p className="text-md">Phone Number</p>}
                rules={[
                  { required: true, message: "Please enter your Phone Number" },
                ]}
              >
                <Input placeholder="Phone Number" />
              </Form.Item>

              {/* City, State, ZIP fixed */}
              <Form.Item name="city" label="City" initialValue="Manhattan">
                <Input disabled />
              </Form.Item>
              <Form.Item name="state" label="State" initialValue="NY">
                <Input disabled />
              </Form.Item>
              <Form.Item name="zipCode" label="Zip Code" initialValue="10016">
                <Input disabled />
              </Form.Item>

              <Form.Item className="text-center">
                <button
                  type="submit"
                  className="w-full py-3 font-bold text-2xl bg-[#3f67bc] text-white rounded-md shadow-lg disabled:opacity-70"
                  disabled={loading || cart.length === 0}
                >
                  {loading ? <Spin size="small" /> : "Pay with Stripe"}
                </button>
              </Form.Item>
            </Form>

            <button
              onClick={() => handleCashOndelivary(form.getFieldsValue())}
              className="w-full mt-2 text-xs py-3 font-bold bg-[#3f67bc] text-white rounded-md shadow-lg disabled:opacity-70"
              disabled={cashLoading || cart.length === 0}
            >
              {cashLoading ? <Spin size="small" /> : "Cash On Delivery"}
            </button>
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
};

export default CheckoutPage;
