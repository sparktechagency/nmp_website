"use client";
import React from "react";
import Image from "next/image";
import image from "../../../assets/image/download (1).jpeg";
import SectionTitle from "@/components/Shared/SectionTitle";

interface Order {
  id: number;
  date: string;
  productImage: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
  status: string;
  paymentStatus: string;
}

const orders: Order[] = [
  {
    id: 525672,
    date: "8/10/2025",
    productImage:
      "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png",
    productName: "Vape 1",
    quantity: 1,
    price: 80,
    total: 80,
    status: "Processing",
    paymentStatus: "Paid",
  },
  {
    id: 663501,
    date: "8/9/2025",
    productImage:
      "https://upload.wikimedia.org/wikipedia/commons/3/36/Cricket_bat.jpg",
    productName: "Vape 2",
    quantity: 1,
    price: 50,
    total: 50,
    status: "Processing",
    paymentStatus: "Paid",
  },
];

const OrderPage = () => {
  return (
    <div className="container mx-auto mb-20">
      <SectionTitle heading="All Orders" />
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2">Order ID</th>
            <th className="py-2">Date</th>
            <th className="py-2">Products</th>
            <th className="py-2">Total</th>
            <th className="py-2">Status</th>
            <th className="py-2">Payment Status</th>
            <th className="py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-3 font-semibold text-blue-700">{order.id}</td>
              <td>{order.date}</td>
              <td>
                <div className="flex items-center gap-3">
                  <Image
                    src={image}
                    alt={order.productName}
                    width={40}
                    height={40}
                    className="rounded"
                  />
                  <div>
                    <p className="font-medium">{order.productName}</p>
                    <p className="text-sm text-gray-600">
                      Qty: {order.quantity} | Price: ${order.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </td>
              <td className="font-semibold">${order.total.toFixed(2)}</td>
              <td className="text-blue-600">{order.status}</td>
              <td className="text-green-500">{order.paymentStatus}</td>
              <td>
                <button
                  className="px-4 py-1 border border-gray-300 rounded-lg text-gray-500"
                  disabled
                >
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderPage;
