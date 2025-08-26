/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  Tag,
  Button,
  Modal,
  Input,
  Rate,
  notification,
  Form,
} from "antd";
import SectionTitle from "@/components/Shared/SectionTitle";
import { useGetOrdersQuery } from "@/redux/features/ordersApi/ordersApi";
import { useCreateReviewMutation } from "@/redux/features/reviewApi/reviewApi";
import toast from "react-hot-toast";

interface Product {
  image: string;
  name: string;
  price: number;
  quantity: number;
  isReview: boolean;
  productId: string;
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
  console.log("orderData:", orderData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [orderId, setOrderId] = useState<string>("");

  const [createReview, { isLoading: isReviewLoading }] =
    useCreateReviewMutation();

  const handleModalOpen = (productId: string, orderId: string) => {
    setSelectedProductId(productId);
    localStorage.setItem("productId",productId);
    setOrderId(orderId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
    setOrderId("");
    setReview("");
    setRating(0);
  };

  const handleReviewSubmit = async (values: any) => {
    if (!selectedProductId || !values.comment || values.star === 0) {
      notification.error({
        message: "Review Error",
        description:
          "Please provide both a rating and a comment for the review.",
      });
      return;
    }

    const reviewData = {
      orderId,
      productId: selectedProductId,
      star: values.star,
      comment: values.comment,
    };

    try {
      const res = await createReview(reviewData).unwrap();
      console.log("Review response:", res);

      toast.success(res.message);
      handleModalClose();
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

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
                {/* Disable the Review Button if already reviewed */}
                <Button
                  onClick={() =>
                    handleModalOpen(product.productId, product._id)
                  }
                  type="primary"
                  disabled={product.isReview} // Disable if already reviewed
                >
                  {product.isReview ? "Already Reviewed" : "Review"}
                </Button>
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
      <Modal
        title="Leave a Review"
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <Form onFinish={handleReviewSubmit}>
          <div className="mb-4">
            <Form.Item
              name="comment"
              rules={[{ required: true, message: "Please write a review!" }]}
            >
              <Input.TextArea
                rows={4}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
              />
            </Form.Item>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Rating:</span>
            <Form.Item
              name="star"
              rules={[{ required: true, message: "Please select a rating!" }]}
            >
              <Rate value={rating} onChange={setRating} />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isReviewLoading}>
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderPage;
