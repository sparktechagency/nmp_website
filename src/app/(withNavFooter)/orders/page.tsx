/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Image from "next/image";
import { Table, Tag, Button } from "antd";
import SectionTitle from "@/components/Shared/SectionTitle";
import { useGetOrdersQuery } from "@/redux/features/ordersApi/ordersApi";

interface Product {
  image: string;
  name: string;
  price: number;
  quantity: number;
  isReview: boolean;
}

interface Order {
  _id: string;
  createdAt: string;
  deliveryAt: string;
  paymentStatus: string;
  status: string;
  token: string;
  totalPrice: number;
  products: Product[];
}

const OrderPage = () => {
  const { data: orderData, isLoading } = useGetOrdersQuery(undefined);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "token",
      key: "token",
      render: (text: string) => (
        <span className="text-blue-600 font-semibold">{text}</span>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: Product[]) => (
        <div className="flex flex-col gap-2">
          {products.map((product, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Image
                src={product.image}
                alt={product.name}
                width={50}
                height={50}
                className="rounded"
              />
              <div>
                <p className="font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  Qty: {product.quantity} | ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (total: number) => (
        <span className="font-semibold">${total.toFixed(2)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "delivered" ? "green" : "gold"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Payment",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (status: string) => (
        <Tag color={status === "paid" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Order) => (
        <Button
          type="primary"
          disabled={!record.products.some((p) => p.isReview)}
        >
          Review
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto mb-20 px-4">
      <SectionTitle heading="All Orders" />
      <Table
        columns={columns}
        dataSource={orderData?.data}
        rowKey="_id"
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default OrderPage;
